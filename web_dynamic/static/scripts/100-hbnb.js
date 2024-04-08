document.addEventListener('DOMContentLoaded', function () {
  const amenity_list = [];
  $('input:checkbox').change(
    function () {
      if ($(this).is(':amenity_id')) {
        amenity_list.push(this.id);
      } else {
        amenity_list.pop(this.id);
      }

      amenity_list.forEach(function (item) {
        $('.amenities h4').append(item);
      });
    });

    const states_list = [];
    $('input:checkbox').change(
      function () {
        if ($(this).is(':checked')) {
          states_list[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
          delete states_list[$(this).attr('data-id')];
        }
  
        states_list.forEach(function (item) {
          $('.locations h4').append(item);
        });
      });
      const cities_list = [];
      $('input:checkbox').change(
        function () {
          if ($(this).is(':checked')) {
            cities_list[$(this).attr('data-id')] = $(this).attr('data-name');
          } else {
            delete cities_list[$(this).attr('data-id')];
          }
    
          cities_list.forEach(function (item) {
            $('.locations h4').append(item);
          });
        });


  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function () {
      $('div#api_status').addClass('available');
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`
      }));
    }
  });

  let requestData = JSON.stringify({ amenity_list: amenity_list, states_list: states_list, cities_list: cities_list });
  /* On button click add list of Amenities checked*/
  $('button').click(function(){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5001/api/v1/places_search',
        data: requestData,
        dataType: 'json',
        contentType: 'application/json',
      });
  })

});
