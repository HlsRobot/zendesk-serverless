
// This is your new function. To start, set the name and path on the left.
const got = require("got");

exports.handler = function(context, event, callback) {
  console.log(event);
  
  let response = new Twilio.Response();
  
  got
    .get(context.ZENDESK_URL + '/api/v2/tickets/' + event.ticket_id, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(context.ZENDESK_USER + ":" + context.ZENDESK_API_KEY).toString("base64")
      }
    })
    .then(function(data) {
      let jsondata = JSON.parse(data.body);
      console.log(jsondata);
      response.appendHeader("Content-Type", "application/json");
      response.setBody(jsondata);
      callback(null, response);
    })
    .catch(function(error) {
        console.log("error");
      //response.appendHeader("Content-Type", "application/json");
      response.setBody(error.message);
      response.setStatusCode(500);
      callback(response);
    });


  // This callback is what is returned in response to this function being invoked.
  // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
  // Or you might return JSON data to a studio flow. Don't forget it!
  
};