$(document).ready(function () {
    let hoverbox = null; // Track the hoverbox element
    let isHoverboxVisible = false; // Track if the hoverbox is currently visible
    
    
    
    // Function to create a hoverbox overlay for the last 'target-text-copy'
    function createHoverbox() {
        // Remove any existing hoverbox
        removeHoverbox();
        
        


        let lastInfoTextElement = $('.target-text-copy').last(-1); // Target the last element
        
        if (lastInfoTextElement.length === 0) return; // If no elements found, do nothing

        // Create the hoverbox
        hoverbox = $('<div class="hoverbox-overlay">').css({
            background: 'RGBA(0,0,0,.5)',
            width: '400px',
            height: '40px',
            padding: '8px',
            
            color: '#fff',
            position: 'fixed',
            zIndex: '1000',
            bottom: '2%',
        
            left: '300px',
           
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflowY: 'auto',
            pointerEvents: 'none'
        }).appendTo('body');

        // Add content from the last '.target-text-copy' element to the hoverbox
        hoverbox.append('<div>' + lastInfoTextElement.html() + '</div>');

        // Make the hoverbox closeable by clicking
        hoverbox.click(function () {
            removeHoverbox();
            removeHoverbox();
        });

        isHoverboxVisible = true; // Set hoverbox as visible
    }

    // Function to remove the hoverbox and clean up
    function removeHoverbox() {
        if (hoverbox) {
            hoverbox.remove();
            hoverbox.remove();
            hoverbox = null;
            isHoverboxVisible = false; // Reset visibility flag
        }
    }

    // Handle 'N' key press to toggle the hoverbox for the last element
    $(document).on('keydown', function (e) {
if (e.key === 'f' || e.key === 'F') {
if (isHoverboxVisible) {
    if (intervalId) {
        clearInterval(intervalId);  // Clear the interval
        intervalId = null;  // Reset interval ID
    }
    if (hoverbox) {
        hoverbox.remove();  // Remove the hoverbox
        hoverbox = null;  // Reset hoverbox reference
    }
    isHoverboxVisible = false;  // Update visibility flag
} else {
    createHoverbox();  // Create hoverbox
    intervalId = setInterval(createHoverbox, 100);  // Set up interval
    isHoverboxVisible = true;  // Update visibility flag
}
}
});


//document.getElementById('read-icon').addEventListener('click', () => {
//createHoverbox();  // Create hoverbox
//        intervalId = setInterval(createHoverbox, 100);  // Set up interval
//          isHoverboxVisible = true;  // Update visibility flag
//});



});