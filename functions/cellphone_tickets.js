
// This function combines "/user" and "/user_tickets".

const got = require("got");
  
exports.handler = async (context, event, callback) => {
  const headers = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(context.ZENDESK_USER + ":" + context.ZENDESK_API_KEY).toString("base64")
      }
    };
      
  console.log(event);
  const data = await got.get(context.ZENDESK_URL + '/api/v2/users/search?query=' + event.user_number, headers);
  const jsondata = JSON.parse(data.body);
  const user = jsondata.users[0];
  console.log(jsondata, user);
  
  // No user was found
  if (!user || !user.id) {
    callback(null);  
  }
  
  // Get tickets
  const tickets = await got.get(context.ZENDESK_URL + '/api/v2/users/' + user.id + '/tickets/requested', headers);
  let ticketsJson = JSON.parse(tickets.body);
  console.log('ticketsJson', ticketsJson);
  return callback(null, {user, ...ticketsJson});
};