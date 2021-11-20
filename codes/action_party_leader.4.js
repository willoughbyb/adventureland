
var PARTY_MEMBER_OPTIONS = ['FricPriest', 'FricRogue', 'FricMage'];

function checkParty() {
	var party = get_party() || {};
	// log(party);
	// log(party_invites_sent);
	for (var pmo of PARTY_MEMBER_OPTIONS) {
		// log('Checking ' + pmo);
		if (!party.hasOwnProperty(pmo) && !party_invites_sent.includes(pmo)) {
			// log('Inviting ' + pmo);
			party_invites_sent.push(pmo);
			return pmo;
		}
	}
}

function canReceiveInvites(target) {
	return get_player(target) != null;
}
