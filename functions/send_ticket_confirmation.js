
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    // Here's an example of setting up some TWiML to respond to with this function
      let client = context.getTwilioClient();
    client.messages
        .create({from: '{sender}', body: 'Your ticket confirmation: \n\nTicket id: ' + event.ticket_id + ' \n\nTicket Subject: ' + event.subject, to: event.phone})
        .then(message => {
          console.log(message.sid)
          return callback(null, message);
          });
  
    // This callback is what is returned in response to this function being invoked.
    // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
    // Or you might return JSON data to a studio flow. Don't forget it!
  };