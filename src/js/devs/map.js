;//element id = map, data-zoom, data-marker, data-center, data-lats, data-lons
var mapElement = document.getElementById('map');
if (window.mapElement) {
    var map,
        markerIcon = mapElement.getAttribute('data-marker'), //path to marker image
        zoom = mapElement.getAttribute('data-zoom'), // set zoom
        center = mapElement.getAttribute('data-center').split(','), //set map center coords

        latsStr = mapElement.getAttribute('data-lats'), //string of latitudes
        lonsStr = mapElement.getAttribute('data-lons'), //string of longitudes

        lats = latsStr.substring(0, latsStr.length - 1).split(','), //delete last comma and make array of strings
        lons = lonsStr.substring(0, lonsStr.length - 1).split(','), //delete last comma and make array of strings

        locations = [], //container for coords arrays
        integer = lats.length; // places count

    if (lons.length < lats.length) {
        integer = lons.length; // places count
    }

    for (var i = 0; i < integer; i++) { //making locations array
        var tempArr = [];
        tempArr.push(parseFloat(lats[i]));
        tempArr.push(parseFloat(lons[i]));
        locations.push(tempArr);
    }


    function initialize() {
        map = new google.maps.Map(mapElement, {
            center: new google.maps.LatLng(parseFloat(center[0]), parseFloat(center[1])),
            zoom: +zoom
        });
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][0], locations[i][1]),
                icon: markerIcon,
                map: map
            });
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);
}
