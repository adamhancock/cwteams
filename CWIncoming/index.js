var axios = require('axios');
const duplicateCheck = require('../lib/duplicateCheck');

module.exports = async function(context, req) {
	var td = JSON.parse(req.body.Entity);
	const body = req.body;
	var teamsdata = {
		title: `Ticket #${td.Id} from ${td.ContactName} @ ${td.CompanyName}`,
		text: `Summary: ${td.Summary} // BoardName: ${td.BoardName} // Status: ${td.StatusName}`,
		potentialAction: [
			{
				'@type': 'OpenUri',
				name: 'Open Ticket',
				targets: [
					{
						os: 'default',
						uri: `https://${body.FromUrl}/v4_6_release/services/system_io/Service/fv_sr100_request.rails?service_recid=${body.ID}&companyName=${body.CompanyId}`
					}
				]
			}
		]
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
			//context.log(process.env);
			axios.post(process.env[td.BoardName], teamsdata);
		}
		context.res = {
			// status defaults to 200 */
			body: 'Received'
		};
		context.done();
	}
};
