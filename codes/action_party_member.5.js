
var PARTY_LEADER_OPTIONS = ['Friction'];

function checkPartyInvite() {
	var party = get_party() || {};
	if (Object.keys(party).length > 0) return;

	return PARTY_LEADER_OPTIONS[0];
}

function checkPartyLeader(leader) {

}
