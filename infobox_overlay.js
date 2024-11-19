$(document).ready(function () {
    let hoverbox = null; // Tr  ack the hoverbox element
    let isHoverboxVisible = false; // Track if the hoverbox is currently visible

    // Function to create a hoverbox overlay for 'info-text-2'
    function createHoverbox() {
        // Remove any existing hoverbox
        removeHoverbox();

        // Find the 'info-text-2' elements
        let infoTextElements = $('.info-text-2, .target-text-copyRight');


        if (infoTextElements.length === 0) return; // If no elements found, do nothing

        // Create the hoverbox
        hoverbox = $('<div class="hoverbox-overlay">').css({
            background: 'RGBA(0,0,0,.5)',
            width: '426px',
            height: 'auto',
            padding: '20px',
            color: '#fff',
            position: 'fixed',
            zIndex: '1000',

            top: '61.9px',
            left: '510px',
          
      
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflowY: 'auto',
            textAlign: 'left',
pointerEvents: 'none'
        }).appendTo('body');

        

        // Add content from 'info-text-2' elements to the hoverbox
        infoTextElements.each(function () {
            hoverbox.append('<div>' + $(this).html() + '</div>');
        });

        // Make the hoverbox closeable by clicking
        hoverbox.click(function () {
            removeHoverbox();
        });

        isHoverboxVisible = true; // Set hoverbox as visible
    }

    // Function to remove the hoverbox and clean up
    function removeHoverbox() {
        if (hoverbox) {
            hoverbox.remove();
            hoverbox = null;
            isHoverboxVisible = false; // Reset visibility flag
        }
    }

    // Handle 'R' key press to toggle the hoverbox
    $(document).on('keydown', function (e) {
        if (e.key === 'r' || e.key === 'R') {  // Ensure both lowercase and uppercase "F" work
            if (isHoverboxVisible) {
                removeHoverbox(); // Hide hoverbox if it's already visible
                clearInterval(intervalId);
                isHoverboxVisible = false; 
            } else {
                createHoverbox(); // Show hoverbox if it's not visible
                intervalId = setInterval(createHoverbox, 100);
                isHoverboxVisible = true; 
            }
        }
    });


    document.getElementById('read-icon').addEventListener('click', () => {
        if (isHoverboxVisible) {
    removeHoverbox(); // Hide hoverbox if it's already visible
    clearInterval(intervalId); // Clear interval to stop hoverbox from reappearing
    isHoverboxVisible = false; // Update visibility flag
} else {
    createHoverbox(); // Show hoverbox if it's not visible
    intervalId = setInterval(createHoverbox, 100); // Set up interval
    isHoverboxVisible = true; // Update visibility flag
}
                                                                        });

createHoverbox();
    intervalId = setInterval(createHoverbox, 100);


});
