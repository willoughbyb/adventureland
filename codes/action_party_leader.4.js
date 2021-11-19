
var PARTY_MEMBER_OPTIONS = ['FricPriest', 'FricRogue', 'FricMage'];

function checkParty() {
	var party = get_party() || {};
	for (var pmo of PARTY_MEMBER_OPTIONS) {
		if (!party.hasOwnProperty(pmo) && !party_invites_sent.includes(pmo)) {
			party_invites_sent.push(pmo);
			return pmo;
		}
	}
}
