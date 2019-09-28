const listAmenities = {};

$(function () {
  $('div.amenities li input').change(
    function () {
      if ($(this).is(':checked')) {
        listAmenities[($(this).attr('data-id'))] = $(this).attr('data-name');
	$('div.amenities h4').text(Object.values(listAmenities).join(", "));
        console.log('checked', $(this).attr('data-name'));
      } else {
        delete listAmenities[($(this).attr('data-id'))];
	$('div.amenities h4').text(Object.values(listAmenities).join(", "));
        console.log('un-checked', $(this).attr('data-name'));
      }
    });
});

$.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) => {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('avavilable');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
