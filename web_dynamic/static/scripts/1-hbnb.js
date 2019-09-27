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
