  function showAddListingForm() {
      titleNode.innerHTML = "Add new listing";
      addlistingNode.classList.add('hidden');
      addlistingNode.classList.remove('visible');
      contentsNode.innerHTML = createFormFragment();
      contentsNode.scrollTo(0, 0);

      var listing = new Listing(new Date().getTime);

      document.getElementById('takePictureButton').addEventListener("tap", takePicture, false);
      document.getElementById('addListingButton').addEventListener("tap", appendListing, false);


      function takePicture() {
          var options = {
              quality: 50,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.CAMERA
          };

          navigator.camera.getPicture(win, fail, options);

          function win(imageURI) {
              var element = document.getElementById('photo');
              element.setAttribute('src', imageURI);
              listing.image = imageURI;
          }

          function fail(error) {
              navigator.notification.alert('There was an error while taking the picture', function() {}, '');
              console.log(error); // this is provided by the device’s native code
          }
      }

      function appendListing() {
        // as ID of the newly created listing we set the current timestamp
        listing.title = document.getElementById("title_input").value;
        listing.description = document.getElementById("description_input").value;
        listing.price = '$ ' + document.getElementById("price_input").value;
        listing.phone = document.getElementById("phone_input").value;
        if(listing.isValid()) {
          showListings(listing);
        } else {
          navigator.notification.alert('Some data is missing, can you retry?', function() {}, '');
        }
      }
  }



  function createFormFragment() {
      var fragment = "";
      fragment = '<div class="row" id="addListingForm">' +
          '<form class="col s12">' +
          '<div class="row">' +
          '<div id="photoContainer" class="col s6"><img id="photo" src="./img/photoPlaceholder.png"></div>' +
          '<div id="takePictureButton" class="btn btn-large waves-effect waves-light col s6"><i class="fa fa-camera prefix" aria-hidden="true"></i> Take picture</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="input-field col s12">' +
          '<input id="title_input" type="text" class="validate">' +
          '<label for="title_input" class="active"><i class="fa fa-pencil prefix" aria-hidden="true"></i> Listing title</label>' +
          '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="input-field col s12">' +
          '<input id="phone_input" type="tel" class="validate">' +
          '<label for="phone_input" class="active"><i class="fa fa-phone prefix" aria-hidden="true"></i> Phone number</label>' +
          '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="input-field col s12">' +
          '<input id="description_input" type="text" class="materialize-textarea">' +
          '<label for="description_input" class="active"><i class="fa fa-pencil prefix" aria-hidden="true"></i> Description</label>' +
          '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div class="input-field col s12">' +
          '<input id="price_input" type="number" class="validate">' +
          '<label for="price_input" class="active"><i class="fa fa-usd prefix" aria-hidden="true"></i> Price</label>' +
          '</div>' +
          '</div>' +
          '<div class="row">' +
          '<div id="addListingButton" class="btn btn-large waves-effect waves-light col s12">Add</div>' +
          '</div>' +
          '</form>' +
          '</div>';
      return fragment;
  }
