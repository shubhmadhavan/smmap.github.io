# <img src="https://github.com/user-attachments/assets/ee9684da-bd0e-4a96-a202-ebcfff8cfeab" style="float:left; vertical-align: middle; margin-right: 10px;  margin-top: -10px;  height:36px; display: inline-block;" />  SM-Map  


## [Link](https://shubhmadhavan.github.io/smmap.github.io/index.html)

 <!--
<a href="https://shubhmadhavan.github.io/smmap.github.io/">
  <img 
    src="https://github.com/user-attachments/assets/3beca648-b4ea-461b-8897-cad41330724f"
    width="1220"
    alt="smmap–Preview"
  />
</a>

--> 

## Objectives
Facing a dearth of comprehensive sources that present the mapping of various elements of Indian Geography in an interactive and engaging way, I was motivated to create a solution that addressed this gap.    
 
You can access it from this [Link](https://shubhmadhavan.github.io/smmap.github.io/index.html) or clone the repository and run it locally. 

## How to Use
 - Click a map element to reveal its name (click again to hide it)
 - Press the "Reveal" button on top, or **R**, to reveal all names at once
 - Press **?** on any map for the full list of keyboard shortcuts

## Shortcuts
 - **F4** toggle the list (sidebar), **/** filter it
 - **↑ / ↓** move through the list, **Enter** highlight the item on the map
 - **R** reveal all names, **T** (or **Ctrl + I**) show the notes inside the labels
 - **W A S D** pan, **F / G** zoom in / out, **Z** change label size
 - **Ctrl + 1 / 2 / 3** Grey / Green / Beige map, **Ctrl + 4** back to the default
 - **Ctrl + H** home

## Quiz Mode
 - Click **⇌** (top left) to switch between Learn and Quiz for the same map
 - A name is shown at the top; click the matching element on the map
 - **Space** skips the round (or moves on after you answer)

## Adding a map
1. Create a folder (e.g. `Map_Geography/Map_Lakes`) with `map_data.js` and `location_color.css`.
   `map_data.js` is `const mapData = { "Name<br><span class='nl'>note; note</span>": "POINT (lon lat)", ... };`
   (WKT copied from Google My Maps / QGIS: POINT, LINESTRING, POLYGON or GEOMETRYCOLLECTION; a key with `""` is a heading in the list).
2. Add one line to `common/maps.js`: `"lakes": ["Map_Geography/Map_Lakes", "Lakes"],`
3. Add a card linking to `common/Map_Game_2_dark.html?selection=lakes` on one of the `index-N.html` pages.

## Project layout
| Path | What it is |
| --- | --- |
| `index.html`, `index-1…5.html` | Hub pages (`index.js` = zipper cards + type-to-find) |
| `common/Map_Game_2_dark.html` + `learn.js` | Learn mode |
| `common/Map_Game_dark.html` + `quiz.js` | Quiz mode |
| `common/maps.js` | List of every map (selection key → folder, title) |
| `common/core.js` | Shared: Leaflet map, base image, WKT parsing, themes, shortcuts |
| `common/app.css`, `theme1/2/baige.css` | Layout and themes; each map's colours live in its `location_color.css` |
| `tools/optimize_images.py` | Optional: shrinks the base-map JPEGs (same dimensions, so plotting is unchanged) |

## Themes
<div style="overflow: hidden;">
  <p>4 Themes</p> 
</div>

<p align="left">
  <img
    src="https://github.com/user-attachments/assets/1136d1b7-c23d-4980-87d6-05b661edc12c"
    width="380"
    alt="smmap–Preview"
  />
</p>

 <!--
 
## Gallery


<div align="center">
    <img src="https://github.com/user-attachments/assets/90f66f8a-44c3-4c37-88c8-034c4b0b5e29" alt="Image 1" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/26e16e8b-df26-4443-8009-312c7cbce14a" alt="Image 2" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/6098ef94-0ac6-4922-af0b-8c56bcb13dae" alt="Image 3" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/f782ec0d-ec61-4d78-b107-61e2f676c972" alt="Image 4" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/79ee6b41-8e88-4b13-8e76-17ea2b31d7e5" alt="Image 5" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/8d5aa1bf-fca4-45f9-a272-a34b8088bc9e" alt="Image 6" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/cf1ac62f-aa3c-4e5b-b0b9-784dbb1c9216" alt="Image 7" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/326c3be2-a2a1-42e7-9965-9b72cc69357c" alt="Image 8" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/9ef56b33-c370-4aa2-bf52-3fa883f5904c" alt="Image 9" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/eb0ce160-7f4e-4c6c-ad66-cd4296a6abd7" alt="Image 10" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/88a720d7-6da3-4934-b866-2b62e5baf1bc" alt="Image 11" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/cb977034-d88c-41ef-8b8b-0cd475753572" alt="Image 12" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/d838c1fb-2ee9-4f37-a313-20e1d2a2a117" alt="Image 13" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/5c9c43d0-5649-4b7e-99a7-1da8a7b41ce6" alt="Image 14" width="160" height="180" />
    <img src="https://github.com/user-attachments/assets/88c1460e-6482-49b4-8a8c-f7324f2236b6" alt="Image 15" width="160" height="180" />
</div>


## Direct Links:
### Geography
#### [Rivers](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=riv_1)
#### [Mountains](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=mt_1)
#### [National Parks of India](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=np_1)
#### [Tiger Reserves](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=tr_1)
#### [Ramsar Sites of India](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=rs_1)  
#### [Dams & Reservoirs](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=dm_1)
#### [Waterfalls](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=wf_1)


### History
#### [Portuguese Settlements](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=Por_1)
#### [Dutch Settlements](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=Dutch_1)
#### [English Settlements](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=Eng_1)
#### [Danish Settlements](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=Dan_1)
#### [French Settlements](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=Fra_1)


### Economy
#### [Nuclear Power Plants](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=NPP_1)
#### [Major & Minor Ports](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=Ports_1)
#### [Greenfield Airports under UDAN](https://shubhmadhavan.github.io/smmap.github.io/common/Map_Game_dark.html?selection=air_1)

--> 


## Extra
I have nothing to plug here. But here's a quote:
> _"Equanimity of mind in success & failure is the true Yoga"._
> ― Bhagavad Gita, 2:48



