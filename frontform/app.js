$(function() {
//hash genrator	
function generateUIDNotMoreThan1million() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}
	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		//var formData = $(form).serialize();
		var longurl = $(form).find('input[name="url"]').val();
		var short = generateUIDNotMoreThan1million();
		//ajax setup for headers
//$.ajaxSetup({
  // headers: { "x-api-key": "Iy4W7wpmg72P4XS5wUWtC6R2uJORqhZa49FCxclo" }
//});

var posturl = "https://mir1ws0chd.execute-api.ap-southeast-1.amazonaws.com/prod/";
		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: posturl,
			headers: { "x-api-key" : "Iy4W7wpmg72P4XS5wUWtC6R2uJORqhZa49FCxclo" },
			dataType : "json",
			crossDomain: true,
        	contentType: 'application/json',
			data: JSON.stringify( {token: short, url: longurl}),			     
		})
		//.beforeSend(function(xhr){
             //xhr.setRequestHeader('x-api-key', 'Iy4W7wpmg72P4XS5wUWtC6R2uJORqhZa49FCxclo');
       //})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');
			if (response != undefined ){
			var res = JSON.stringify(response);
			res = JSON.parse(res);
			// Set the message text.
			var redirURL = res.ShortURL
			$(formMessages).append ("The short url is here, Click the link to test :<a href='" + posturl + redirURL + "'>" + redirURL + "</a>" );
			}
			// Clear the form.
			$('#url').val('');			
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your URL could not be processed.');
			}
		});

	});

});
