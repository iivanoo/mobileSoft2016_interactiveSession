var Listing = function(id, nestoriaListing) {
    this.id = id;
    if (nestoriaListing) {
        this.title = nestoriaListing.title;
        this.image = nestoriaListing.img_url;
        this.price = nestoriaListing.price_formatted;
        this.description = nestoriaListing.summary;
        this.size = nestoriaListing.size + " " + nestoriaListing.size_unit;
        if (nestoriaListing.updated_in_days < 7) {
            this.isNew = true;
        }
        this.phone = '12345678';
        this.lat = nestoriaListing.latitude;
        this.lon = nestoriaListing.longitude;
    }

    this.updatePosition = function(currentPosition) {
      var distance = 0;
      if(this.lat && this.lon) {
        distance = calculateDistance(this.lat, this.lon, currentPosition.latitude, currentPosition.longitude);
      }
        document.getElementById('distance' + this.id).innerHTML = Math.round(distance) + " km from you";
    };

    this.isValid = function() {
        // Basically all the data coming from the form should be provided (only image is optional)
        return (this.title && this.price && this.phone && this.description);
    };

    function calculateDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;

        function toRad(Value) {
            /** Converts numeric degrees to radians */
            return Value * Math.PI / 180;
        }
    }
};
