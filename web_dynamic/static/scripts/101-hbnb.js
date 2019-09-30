const listAmenities = {};
const listStates = {};
const listCities = {};
const users = {};

$(function () {
  $('div.amenities li input').change(
    function () {
      if ($(this).is(':checked')) {
        listAmenities[($(this).attr('data-id'))] = $(this).attr('data-name');
        $('div.amenities h4').text(Object.values(listAmenities).join(', '));
      } else {
        delete listAmenities[($(this).attr('data-id'))];
        $('div.amenities h4').text(Object.values(listAmenities).join(', '));
      }
    });

  $('div.locations h2 > input').change(
    function () {
      if ($(this).is(':checked')) {
        listStates[($(this).attr('data-id'))] = $(this).attr('data-name');
        $('div.locations h4').text(Object.values(listStates).join(', '));
      } else {
        delete listStates[($(this).attr('data-id'))];
        $('div.locations h4').text(Object.values(listStates).join(', '));
      }
    });

  $('div.locations li > input').change(
    function () {
      if ($(this).is(':checked')) {
        listCities[($(this).attr('data-id'))] = $(this).attr('data-name');
        $('div.locations h4').text(Object.values(listCities).join(', '));
      } else {
        delete listCities[($(this).attr('data-id'))];
        $('div.locations h4').text(Object.values(listCities).join(', '));
      }
    });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $('button').click(() => {
    const data = {
      amenities: Object.keys(listAmenities),
      states: Object.keys(listStates),
      cities: Object.keys(listCities)
    };
    $.ajax('http://0.0.0.0:5001/api/v1/places_search', {
      data: JSON.stringify(data),
      contentType: 'application/json',
      type: 'POST',
      success: data => {
        $('section.places').empty();
        $('section.places').append('<h1>Places</h1>');
        for (const place of data) {
          const template = `<article>
      <div class="title">

        <h2>${place.name}</h2>

        <div class="price_by_night">

    $${place.price_by_night}

        </div>
      </div>
      <div class="information">
        <div class="max_guest">
    <i class="fa fa-users fa-3x" aria-hidden="true"></i>

    <br />

    ${place.max_guest} Guests

        </div>
        <div class="number_rooms">
    <i class="fa fa-bed fa-3x" aria-hidden="true"></i>

    <br />

    ${place.number_rooms} Bedrooms
        </div>
        <div class="number_bathrooms">
    <i class="fa fa-bath fa-3x" aria-hidden="true"></i>

    <br />

    ${place.number_bathrooms} Bathroom

        </div>
      </div>

      <!-- **********************
     USER
     **********************  -->

      <div class="description">

        ${place.description}

      </div>

      <div class="reviews">
      <h2>Reviews <span class="reviews" data-id="${place.id}">Show</span></h2>
      <ul></ul>
      </div>
    </article> <!-- End 1 PLACE Article -->`;
          $('section.places').append(template);
        }
      }
    });
  });

  $(document).on('click', 'span.reviews', function () {
    const ul = $(this).parent().parent().children('ul').last();
    if ($(this).text() === 'Show') {
      $(this).text('Hide');
      const url = `http://0.0.0.0:5001/api/v1/places/${$(this).attr('data-id')}/reviews`;
      $.get(url, function (data) {
        for (const review of data) {
          const template = `<li>
            <h3>From ${users[review.user_id]} the ${review.updated_at}</h3>
            <p>${review.text}</p>
          </li>`;
          ul.append(template);
          ul.show();
        }
      });
    } else {
      $(this).text('Show');
      ul.hide();
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/users/', (data) => {
    for (const user of data) {
      users[user.id] = `${user.first_name} ${user.last_name}`;
    }
  });
});
