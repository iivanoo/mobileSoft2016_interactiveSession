document.addEventListener('deviceready', start, false);

var listings = [];
var titleNode;
var addListingNode;
var addListingForm;

function start() {
    contentsNode = document.getElementById('contents');
    titleNode = document.getElementById('title');
    addlistingNode = document.getElementById('addListing');

    navigator.notification.alert('Welcome!', function() {}, "");

    showListings();
}

function showListings(newListing) {
    titleNode.innerHTML = "Flats";
    addlistingNode.classList.add('visible');
    addlistingNode.classList.remove('hidden');
    addlistingNode.addEventListener('tap', addListing, false);

    var nestoriaUrl = "http://api.nestoria.it/api?encoding=json&pretty=1&action=search_listings&country=it&listing_type=buy&centre_point=42.368676,13.353735,100km";
    // backup URL in case we do not have internet during the demo
    //nestoriaUrl = "./res/nestoriaResponse.json";
    $.getJSON(nestoriaUrl, dataLoaded);

    function dataLoaded(data) {
        var nestorialistings = data.response.listings;
        var htmlFragments = "";
        if(newListing) {
          htmlFragments += createListingFragment(newListing);
          listings.push(newListing);
        }
        for (var i = 0; i < nestorialistings.length; i++) {
            var currentListing = new Listing(i, nestorialistings[i]);
            htmlFragments += createListingFragment(currentListing);
            listings.push(currentListing);
        }
        contentsNode.innerHTML = htmlFragments;
        addlistingForm = document.getElementById('addListingForm');

        getCurrentPosition();
    }

    function createListingFragment(listing) {
        var fragment = "";
        var imagePath = listing.image;
        if(!imagePath) {
          imagePath = './img/photoPlaceholder.png';
        }
        fragment = '<div class="row" id="listingTemplate">' +
            '<div class="col s12 m6">' +
            '<div class="card">' +
            '<div class="card-image">';
        if (listing.isNew) {
            fragment += '<span class="newListing badge">New!</span>';
        }
        fragment += '<span class="distance" id="distance' + listing.id + '"><i class="fa fa-spinner" aria-hidden="true"></i></span>' +
            '<img src="' + imagePath + '">' +
            '<span class="listingTitle card-title">' + listing.title + '</span>' +
            '</div>' +
            '<div class="card-content">' +
            '<span class="card-title grey-text text-darken-4" id="listingPrice">' + listing.price + '</span>' +
            '<p class="listingDescription">' + listing.description + '</p>' +
            '</div>' +
            '<div class="listingAction card-action">' +
            '<i class="fa fa-phone" aria-hidden="true"></i><a href="tel:' + listing.phone + '" class="listingTelephone">' + listing.phone + '</a>' +
            '<i class="fa fa-envelope-o" aria-hidden="true"></i><a class="listingContact" href="mailto:ivanomalavolta@gmail.com">Mail</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return fragment;
    }

    function addListing() {
        showAddListingForm();
    }

    function getCurrentPosition() {

        var options = {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 5000
        };

        navigator.geolocation.getCurrentPosition(win, fail, options);

        function win(pos) {
            updateDistances(pos.coords);
        }

        function fail(err) {
            console.log('We have some issue with the geolocation, so we go with the default location.');
            var defaultPosition = {
                latitude: 42.368676,
                longitude: 13.353735
            };
            updateDistances(defaultPosition);
        }

        function updateDistances(position) {
            for (var i = 0; i < listings.length; i++) {
                listings[i].updatePosition(position);
            }
        }
    }
}
