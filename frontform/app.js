$(function() {

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
			data: JSON.stringify( {token: "A12345", url: longurl}),			     
		})
		//.beforeSend(function(xhr){
             //xhr.setRequestHeader('x-api-key', 'Iy4W7wpmg72P4XS5wUWtC6R2uJORqhZa49FCxclo');
       //})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response.token);

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
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});
