
// Initialize the map with CRS.Simple for image coordinates
const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2
});

// Dimensions of the image
const imageWidth = 1536;
const imageHeight = 2048;
const bounds = [[0, 0], [imageHeight, imageWidth]];

// Add the image overlay
 
L.imageOverlay('https://terklin.github.io/Terrath/City_of_Orbonne.jpg', bounds).addTo(map);

// Set the view to the center of the image
map.fitBounds(bounds);

// Load saved markers from localStorage
const savedMarkers = JSON.parse(localStorage.getItem('markers')) || [];

savedMarkers.forEach(({ lat, lng, title, description }) => {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${title}</b><br>${description}`);
});

// Add new marker on map click
map.on('click', function(e) {
    const title = prompt("Enter title for this location:");
    if (!title) return;
    const description = prompt("Enter description:");
    if (!description) return;

    const marker = L.marker(e.latlng).addTo(map);
    marker.bindPopup(`<b>${title}</b><br>${description}`);

    // Save marker to localStorage
    savedMarkers.push({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        title,
        description
    });
    localStorage.setItem('markers', JSON.stringify(savedMarkers));
});
