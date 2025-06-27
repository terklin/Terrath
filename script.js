
// Initialize the map
var map = L.map('map').setView([0, 0], 2); // Default view

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Example points of interest
var pointsOfInterest = [
    { lat: 10, lng: 10, title: "Castle of Eldoria", description: "The ancient seat of power." },
    { lat: 15, lng: 5, title: "Mystic Market", description: "A bustling market of magical goods." }
];

// Add markers to the map
pointsOfInterest.forEach(function(poi) {
    L.marker([poi.lat, poi.lng])
        .addTo(map)
        .bindPopup("<b>" + poi.title + "</b><br>" + poi.description);
});

// Allow user to add new pins
map.on('click', function(e) {
    var title = prompt("Enter the name of this location:");
    var description = prompt("Enter a description:");
    if (title && description) {
        L.marker([e.latlng.lat, e.latlng.lng])
            .addTo(map)
            .bindPopup("<b>" + title + "</b><br>" + description)
            .openPopup();
    }
});
