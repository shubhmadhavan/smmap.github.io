$(document).ready(function () {
    let overlay = null; // Track the overlay element
    let currentImageIndex = -1; // Track the current image index
    let images = []; // Array to store images for navigation

    // Function to create a full-screen overlay with a single image
    function createOverlay() {
        // Remove any existing overlay
        removeOverlay();

        // Create the overlay
        overlay = $('<div class="image-overlay">').css({
            background: 'RGBA(0,0,0,.8) url(' + images[currentImageIndex] + ') no-repeat center',
            backgroundSize: '1200px auto',
            backgroundPosition: '30px center', // Move image 500px to the left
            width: '100%', height: '90%',
            position: 'fixed',
            zIndex: '10000',
            top: '0', left: '0',
   
        }).click(function () {
            removeOverlay(); // Remove overlay on click
        }).appendTo('body');

        // Listen for keydown events for navigation
        $(document).on('keydown.overlayControl', function (e) {
            if (e.key === 'Escape') {
                removeOverlay();
            } else if (e.key === 'ArrowRight') {
                navigateImages(1); // Next image
            } else if (e.key === 'ArrowLeft') {
                navigateImages(-1); // Previous image
            }
        });
    }

    // Function to navigate images
    function navigateImages(direction) {
        const newIndex = currentImageIndex + direction; // Calculate new index
        if (newIndex >= 0 && newIndex < images.length) {
            currentImageIndex = newIndex; // Update current index
            overlay.css('background-image', 'url(' + images[currentImageIndex] + ')'); // Change the overlay image
        }
    }

    // Function to remove the overlay and clean up events
    function removeOverlay() {
        if (overlay) {
            overlay.remove();
            overlay = null;
            currentImageIndex = -1; // Reset index
            images = []; // Clear images
            $(document).off('keydown.overlayControl'); // Remove keydown listener
        }
    }

    // Handle click on images inside `.info-text-3` elements to show overlay
    $(document).on('click', '.info-text-3 img', function () {
        const $parent = $(this).closest('.info-text-3'); // Get parent .info-text-3
        images = $parent.find('img').map(function () {
            return $(this).attr('src'); // Get the src of each image
        }).get(); // Create an array of image sources

        currentImageIndex = 0; // Start with the first image
        createOverlay(); // Show overlay
    });

    // Handle keydown event to enlarge the first image with 'E' key
    $(document).keydown(function (e) {
        if (e.key === 'e' || e.key === 'E') {
            if (overlay) {
                removeOverlay(); // If overlay exists, remove it
            } else {
                const firstImage = $('.info-text-3 img').first(); // Get the first image
                if (firstImage.length > 0) {
                    firstImage.click(); // Trigger click event on the first image
                }
            }
        } else if (e.key === 'd' || e.key === 'D') {
            navigateImages(1); // Next image
        } else if (e.key === 'a' || e.key === 'A') {
            navigateImages(-1); // Previous image
        }
    });
});