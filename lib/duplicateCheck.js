var db = require('diskdb');
var fs = require('fs');
var dir = './db';

if (!fs.existsSync(dir)) {
	// Create db directory if it doesn't exist
	fs.mkdirSync(dir);
}

db.connect('db', [ 'tickets' ]);

module.exports = async function(context, ticketid) {
	if (await db.tickets.findOne({ id: ticketid })) {
		// Duplicate ticket can delete it now.
		// db.tickets.remove({ id: ticketid });
		return true;
	} else {
		// First time seeing this ticketID
		db.tickets.save({ id: ticketid });
		return false;
	}
};
