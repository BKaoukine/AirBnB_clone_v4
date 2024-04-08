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
});
