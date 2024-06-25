 
document.addEventListener('DOMContentLoaded', (event) => {
    initMap();
    initGalleryHover();
    initInfoButtons();
});


let map;
let markers = [];
let activeMarker;

// Define default and highlighted icons using CDN images
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const highlightedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // URL to a red marker icon
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});



function initMap() {
    map = L.map('map').setView([41.10424, 29.01802], 16); // Default center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers to the map based on data-lat and data-lng attributes
    const images = document.querySelectorAll('.gallery');
    images.forEach(img => {
        const lat = parseFloat(img.getAttribute('data-lat'));
        const lng = parseFloat(img.getAttribute('data-lng'));
        const marker = L.marker([lat, lng], { icon: defaultIcon }).addTo(map);
        markers.push(marker);

        img.addEventListener('mouseover', () => highlightMarker(marker));
        img.addEventListener('mouseout', () => unhighlightMarker(marker));
    });
}

function highlightMarker(marker) {
    if (activeMarker) {
        activeMarker.setIcon(defaultIcon); // Reset the icon of the previous marker
        activeMarker.setZIndexOffset(0); // Reset the z-index
    }
    marker.setIcon(highlightedIcon); // Highlighted icon
    marker.setZIndexOffset(1000); // Bring the marker to the front
    map.setView(marker.getLatLng(), map.getZoom());
    activeMarker = marker;
}

function unhighlightMarker(marker) {
    marker.setIcon(defaultIcon); // Reset to the default icon
    marker.setZIndexOffset(0); // Reset the z-index
}


(function() {
    function printButtons() {
        const output = [];

        myBtnsArr.forEach((button) => {
            let myBtn = `<button class="${button.class}" id="${button.id}">
                            ${button.content}
                         </button>`;
            output.push(myBtn);
        });

        buttonsDiv.innerHTML = output.join('');
        addEventListeners();
    }

    function addEventListeners() {
        myBtnsArr.forEach((button) => {
            let btn = document.getElementById(button.id);
            btn.addEventListener('click', () => {
                showDiv(button.divId);
            });
        });
    }

    function showDiv(divId) {
        const allDivs = document.querySelectorAll('.photo_block');
        allDivs.forEach(div => {
            div.classList.remove('active');
        });
        
        const activeDiv = document.getElementById(divId);
        if (activeDiv) {
            activeDiv.classList.add('active');
        }
    }

    const buttonsDiv = document.getElementById('allBtns');
    const myBtnsArr = [
        { class: 'myBtn', id: 'button1', content: 'Gaziler', divId: 'gaziler' },
        { class: 'myBtn', id: 'button2', content: 'Korkuteli', divId: 'korkuteli' },
        // { class: 'myBtn', id: 'button3', content: 'Antalya', divId: 'antalya' }
    ];

    printButtons();
})();

(function() {
    function printButtons() {
        const output = [];

        myBtnsArr.forEach((button) => {
            let myBtn = `<button class="${button.class}" id="${button.id}">
                            ${button.content}
                         </button>`;
            output.push(myBtn);
        });

        buttonsDiv.innerHTML = output.join('');
        addEventListeners();
    }

    function addEventListeners() {
        myBtnsArr.forEach((button) => {
            let btn = document.getElementById(button.id);
            btn.addEventListener('click', () => {
                showDiv(button.divId);
            });
        });

        // Add event listeners for info buttons
        const infoButtons = document.querySelectorAll('.info-btn');
        infoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleText(btn);
            });
        });
    }

    function showDiv(divId) {
        const allDivs = document.querySelectorAll('.photo_block');
        allDivs.forEach(div => {
            div.classList.remove('active');
        });

        const activeDiv = document.getElementById(divId);
        if (activeDiv) {
            activeDiv.classList.add('active');
        }
    }

    function toggleText(button) {
        const imageContainer = button.parentElement;
        const image = imageContainer.querySelector('.gallery');
        const text = image.getAttribute('data-text');

        const textBlock = imageContainer.querySelector('.text-block') || document.createElement('div');
        textBlock.classList.add('text-block');
        textBlock.innerHTML = text;

        if (textBlock.style.display === 'block') {
            textBlock.style.display = 'none';
        } else {
            textBlock.style.display = 'block';
        }

        imageContainer.appendChild(textBlock);
    }

    const buttonsDiv = document.getElementById('allBtns');
    const myBtnsArr = [
        { class: 'myBtn', id: 'button1', content: 'Gaziler', divId: 'gaziler' },
        { class: 'myBtn', id: 'button2', content: 'Korkuteli', divId: 'korkuteli' },
        // { class: 'myBtn', id: 'button3', content: 'Yeleme', divId: 'yeleme' },
    ];

    printButtons();
})();

function initInfoButtons() {
    const buttons = document.querySelectorAll('.info-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const img = button.previousElementSibling;
            const text = img.getAttribute('data-text');

            if (img.nextElementSibling && img.nextElementSibling.classList.contains('info-text')) {
                img.nextElementSibling.remove();
            } else {
                const infoText = document.createElement('div');
                infoText.classList.add('info-text');
                infoText.innerHTML = text;
                infoText.style.position = 'absolute';
                infoText.style.top = '0';
                infoText.style.left = '0';
                infoText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                infoText.style.color = 'white';
                infoText.style.width = '100%';
                infoText.style.height = '100%';
                infoText.style.display = 'flex';
                infoText.style.alignItems = 'center';
                infoText.style.justifyContent = 'center';
                infoText.style.textAlign = 'center';
                img.parentElement.appendChild(infoText);

                infoText.addEventListener('click', () => {
                    infoText.remove();
                });
            }
        });
    });
}

function imageChanger() {
    var emoji = document.getElementById('emoji1');

    if(emoji.getAttribute('src') === 'images/06.png'){
        emoji.src = 'images/um1.jpg';
    } 
    else{
        emoji.src = 'images/06.png';
    }
}