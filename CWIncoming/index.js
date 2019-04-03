var axios = require('axios');

module.exports = function(context, req) {
	var td = JSON.parse(req.body.Entity);
	context.log(req.body);

	var teamsdata = {
		title: `Ticket #${td.Id} from ${td.ContactName} @ ${td.CompanyName}`,
		text: `Summary: ${td.Summary} // BoardName: ${td.BoardName} // Status: ${td.StatusName}`
	};

	if (td.BoardName) {
		axios.post(process.env[td.BoardName], teamsdata);
	}

	context.done();
};
