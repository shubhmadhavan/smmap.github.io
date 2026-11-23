# SM-Map refactor notes (Nov 2026)

## Is the plotting unchanged?

Yes. Both versions were run side by side in headless Chrome for **all 54 maps in Learn and Quiz mode**.
For every map the plotted SVG shapes (pixel paths) and the label text were identical, and screenshots of
the map areas matched pixel for pixel. The WKT parser and the image bounds
(`[[-2.0, 36.78], [41.33, 121.216]]`) were ported unchanged.

## How to apply

1. Copy everything in this folder over your repo (your `Map_Images/` folder is not included and is untouched).
2. Delete the files that are no longer used:

```bash
git rm -r --quiet Bottom_Hoverbox.js jquery-3.6.0.min.js styles.css zipper.html map_data.js map_data.txt \
  site.webmanifest index-navigator.js \
  common/full-list.js common/game_1.css common/game_1_later.css common/game_2.css common/game_2_later.css \
  common/loader.js common/map_game.js common/map_game_2.js common/redirector.js common/theme2_old_dark.css \
  common/theme3.css common/theme4.css common/theme5.css common/theme_map_toggler.js common/theme_selector.js \
  "Map_Geography/Map_World/map_data copy.js" "Map_History/Map_1.3_Ashokan_Edicts/map_data copy.js" \
  "Map_Geography/Map_World_3D/3d/index copy.js" "Map_Geography/Map_World_3D/3d/worldLow copy 2.js" \
  Map_Geography/Map_World_3D/etc Map_Economy/Map_Images Map_History/Map_Images
find . -name .DS_Store -delete
```

`Map_Economy/Map_Images` and `Map_History/Map_Images` (70 MB) are older copies that no page references.
Everything removed is still in git history.

3. Optional: `python3 tools/optimize_images.py --write` (needs `pip3 install pillow`) shrinks the base maps
   from 21.8 MB to 11.3 MB in total. The default dark map goes from 8.4 MB to 3.5 MB with no visible change.
   The dimensions stay the same, so the plotting can't shift.

## What changed

**Structure**
- `common/maps.js`: a single list of every map. It replaces the 54 path pairs in `redirector.js`,
  and `rng.html` uses it too.
- `common/core.js`: shared by both modes (map, base image, WKT parser, themes, shortcuts).
- `common/learn.js` / `common/quiz.js` replace `map_game_2.js` / `map_game.js` and about 900 lines of
  inline script in the HTML pages.
- `common/app.css` replaces `game_1.css` (1,500 lines with many dead or overridden rules), `game_2.css`
  and the CSS that was injected from JS.
- `theme3.css` was merged into `theme1.css` (they differed by one rule); `theme4/5` and the `*_later.css` files were unused.
- `index.js` replaces the zipper script that was copy-pasted into all five hub pages, plus `index-navigator.js`.
- Shared map-page code went from 3,660 to 1,853 lines.

**Performance**
- World maps no longer download the hidden 8.4 MB India image (8.8 MB → 0.3 MB per load).
- A saved theme now loads only its own base image. Before, the dark one was always downloaded too
  (e.g. Grey: 16.6 MB → 8.2 MB).
- The saved theme is applied before first paint (no flash of the default theme).
- Removed a MutationObserver that ran on every DOM change across the whole page, a second
  observer on `<head>`, and an infinite CSS animation on highlighted items that had no visible effect.
- Labels and sidebar items are linked directly, not by matching tooltip text. That approach also
  broke on duplicate names, e.g. "Brazil" twice in Major Coordinates.

**Bugs fixed**
- Every key press used to be swallowed (`if (key === 'F3' || 's')` is always true), which blocked
  Ctrl+R, F5 and similar. Browser shortcuts work again.
- Letters other than W/A/S/D threw an error on each key press (`panBy(undefined)`).
- A "tap radius" handler threw on every click (`path` was undefined). It is now a working touch helper:
  tapping within 20px of a small point selects it.
- Clicking a polygon (states, countries, mountain ranges, reserves) now toggles its label and
  highlight like points do. Before it only flashed a label for 1.6s, because the
  `data-river-name` lookup never matched. This also makes Paint India's polygon states paintable.
- Labels placed to the left of their point were positioned as if 0px wide until the next zoom.
  They are now placed correctly as soon as they are shown.
- Quiz: headings (entries with `""`) could be asked even though they can't be clicked; clicking
  several features in one round advanced several rounds and inflated the score; "Iteration
  Completed" showed `null` as the question.
- Map pages requested a missing `location_color.css` and `map_data_selector.js` (404s).
- The favicon `<link>` placeholders (`...YOUR_EXISTING_DATA...`) broke the icon; the manifest used
  root paths (`/site.webmanifest`) that 404 on GitHub Pages; `rng.html` / `paint.html` redirected to
  `/common/...` (wrong on a project site). The 3 KB base64 favicon is no longer repeated in every page;
  the pages link the identical `favicon/favicon-48x48.png` instead.
- 3D globe: a missing colour picker threw an error, so the grid-opacity slider and the initial
  theme never got wired up.
- Hub pages: Enter after type-to-find did nothing (it read a `data-href` that doesn't exist).

**Small additions**
- **?** shows a shortcuts panel; buttons have hover titles.
- A filter box at the top of the list (**/** to focus). Arrow keys move through the list whenever it is open.
- The **⇌** Learn/Quiz switch is visible again. It was hidden by CSS, but the README documents it.
- Quiz: **Space / Enter** skip or go to the next round. W/A/S/D/F/G work there too.
- Each map page has its own title ("Rivers · SM-Map"), each hub page too; the sitemap lists every page.
- An unknown `?selection=` shows a message and a link home instead of a blank page.
- The sidebar position is remembered per map, not shared across maps.

**Deliberately kept as is**
- Points and lines are still painted twice (now as a plain under-layer without labels or extra logic).
  The translucent fills and thin strokes in several `location_color.css` files (Coal, Seas, Paint India…)
  were tuned against that look, and drawing them once made them visibly lighter.
- The shortcut **Q** (focus the list) and holding **Shift** to keep labels open were removed: arrow keys
  now work without focusing the list, and labels already stay open until clicked again.
- All map data, `location_color.css` files, file names and URLs (`?selection=…`) are unchanged,
  so existing links and bookmarks keep working.
