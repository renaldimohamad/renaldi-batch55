let isOpen = false

function humbergerMenu() {

    humbergerNavContainer = document.getElementById('humbergerNavContainer')
    console.log('test')

    if (!isOpen) {
        humbergerNavContainer.style.display = "block"
        isOpen = true
    } else {
        humbergerNavContainer.style.display = "none"
        isOpen = false
    }
    
}