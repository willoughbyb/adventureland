var attack_mode = true;

var HP_POTION = 'hpot0';
var MP_POTION = 'mpot0';
var CURRENT_MONSTER = 'snake';
var CURRENT_MONSTERS = ['osnake', 'snake'];

load_code('action_hunt');
load_code('action_party_leader');
load_code('action_restock');
load_code('action_upkeep');
load_code('role_base');
load_code('role_tank');

var role_tank = new TankRole();
var party_invites_sent = [];

var IGNORED_EVENTS = ['hit', 'target_hit', 'incoming', 'loot'];
character.all(function (name, data) {
	data.event_name = name;

	if (IGNORED_EVENTS.includes(name)) return;

	log(data);
});

setInterval(function () {
	var invitee = checkParty();
	if (invitee && canReceiveInvites(invitee)) {
		game_log('Inviting ' + invitee);
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

	role_tank.mainLoop();

}, 1000 / 4); // Loops every 1/4 seconds.
