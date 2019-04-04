var axios = require('axios');
const duplicateCheck = require('../lib/duplicateCheck');

module.exports = async function(context, req) {
	var td = JSON.parse(req.body.Entity);
	context.log(req.body);

	var teamsdata = {
		title: `Ticket #${td.Id} from ${td.ContactName} @ ${td.CompanyName}`,
		text: `Summary: ${td.Summary} // BoardName: ${td.BoardName} // Status: ${td.StatusName}`
	};

	if (await duplicateCheck(context, td.Id)) {
		context.log('Duplicate ticket');
		context.res = {
			// status defaults to 200 */
			body: 'Duplicate ticket'
		};
		context.done();
	} else {
		if (td.BoardName) {
			axios.post(process.env[td.BoardName], teamsdata);
		}
		context.res = {
			// status defaults to 200 */
			body: 'Received'
		};
		context.done();
	}
};
