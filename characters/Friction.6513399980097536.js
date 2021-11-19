var attack_mode = true;

var HP_POTION = 'hpot0';
var MP_POTION = 'mpot0';
var CURRENT_MONSTER = 'snake';

load_code('action_hunt');
load_code('action_party_leader');
load_code('action_restock');
load_code('action_upkeep');
load_code('role_base');
load_code('role_melee');

var role_melee = new MeleeRole();
var party_invites_sent = [];

setInterval(function () {

	var invitee = checkParty();
	if (invitee) {
		game_log('checkParty.invitee:' + invitee);
		send_party_invite(invitee);
		return;
	}

	if (needsRestock()) {
		doRestock();
		return;
	}

	if (upkeepHP()) return;
	if (upkeepMP()) return;

	loot();

	if (!attack_mode || character.rip || is_moving(character)) return;

	role_melee.mainLoop();

}, 1000 / 4); // Loops every 1/4 seconds.
