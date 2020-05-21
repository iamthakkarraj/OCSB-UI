export var API_URL = "https://localhost:44364/api/"
export var DealerList;
export var ServiceList;
export var ServiceGroupList;
export var VehicleList;
export var Customer;
export var SelectedServicesList = [];
export var MapBoxAccessToken = 'pk.eyJ1IjoiaWFtdGhha2thcnJhai0iLCJhIjoiY2s5emFnY25kMDR5eTNtcG1tZjNjZHkzNyJ9.ynumrtl6jxSlADaCZjKPoQ';

mapboxgl.accessToken = MapBoxAccessToken;

export var SouthBound = 72.36400;
export var WestBound = 22.85500;
export var NorthBound = 72.78700;
export var EastBound = 23.20100;

export var Bounds = [
    [SouthBound, WestBound],
    [NorthBound, EastBound]
];

export var PickUp = false;
export var Drop = false;

// export var Map =
//     new mapboxgl.Map({
//         container: 'Map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [72.4396547, 23.0204978],
//         zoom: 9,
//         maxBounds: Bounds
//     });

export var DealerListMap =
    new mapboxgl.Map({
        container: 'DealerMap',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [72.4396547, 23.0204978],
        zoom: 2,
        maxBounds: Bounds,        
    });

export var DealerPopUp = new mapboxgl.Popup({
    closeButton: false
});

export var geojson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-77.032, 38.913]
        },
        properties: {
            title: 'Dealer 1 ',
            phoneNo: '9726080715',
            description: 'Washington, D.C.'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
        },
        properties: {
            title: 'Delaer 2',
            phoneNo: '9726080715',
            description: 'Washington, D.C.'
        }
    }]
};

export var GeoCoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    zoom: 16,
    types: 'country,region,place,postcode,locality,neighborhood',
    countries: 'in',
    marker: {
        color: 'orange'
    },
    placeholder: 'Search your location',
    render: function (item) {
        var maki = item.properties.maki || 'marker';
        return (
            "<div class='geocoder-dropdown-item'><img class='geocoder-dropdown-icon' src='https://unpkg.com/@mapbox/maki@6.1.0/icons/" +
            maki +
            "-15.svg'><span class='geocoder-dropdown-text'>" +
            item.text +
            '</span></div>'
        );
    },
    filter: function (item) {
        return item.context
            .map(function (i) {
                return (
                    i.id.split('.').shift() === 'region' &&
                    i.text === 'Gujarat'
                );
            })
            .reduce(function (acc, cur) {
                return acc || cur;
            });
    },
    mapboxgl: mapboxgl
});

export var PickUpMarker = new mapboxgl.Marker({
    draggable: true,
    color: 'orange'
}).setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML('<h5> Your Pick Up Location </h5>'))

export var DropMarker = new mapboxgl.Marker({
    draggable: true,
    color: 'orange'
}).setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML('<h5> Your Drop Location </h5>'))

export var NavigationControl = new mapboxgl.NavigationControl(); 