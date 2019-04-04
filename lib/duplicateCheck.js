var db = require('diskdb');
db.connect('db', [ 'tickets' ]);

module.exports = async function(context, ticketid) {
	if (await db.tickets.findOne({ id: ticketid })) {
		// Duplicate ticket can delete it now.
		db.tickets.remove({ id: ticketid });
		return true;
	} else {
		// First time seeing this ticketID
		db.tickets.save({ id: ticketid });
		return false;
	}
};
