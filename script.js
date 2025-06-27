// Initialize the map
var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2
});

// Dimensions of the fantasy city image
var imageWidth = 2000;
var imageHeight = 1500;
var bounds = [[0,0], [imageHeight, imageWidth]];

// Add the fantasy city image as an overlay
var image = L.imageOverlay('City_of_Orbonne.jpg', bounds).addTo(map);
map.fitBounds(bounds);

// Function to create a popup form
function createPopupForm(latlng) {
    var container = L.DomUtil.create('div');
    var inputTitle = L.DomUtil.create('input', '', container);
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Title';

    var inputDesc = L.DomUtil.create('textarea', '', container);
    inputDesc.placeholder = 'Description';

    var button = L.DomUtil.create('button', '', container);
    button.innerHTML = 'Add Pin';

    L.DomEvent.on(button, 'click', function() {
        var title = inputTitle.value;
        var desc = inputDesc.value;
        if (title && desc) {
            L.marker(latlng).addTo(map)
                .bindPopup('<b>' + title + '</b><br>' + desc)
                .openPopup();
            map.closePopup();
        }
    });

    return container;
}

// Add click event to add new pins
map.on('click', function(e) {
    var popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(createPopupForm(e.latlng))
        .openOn(map);
});
