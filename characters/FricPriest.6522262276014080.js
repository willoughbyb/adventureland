var attack_mode = true;

var HP_POTION = 'hpot0';
var MP_POTION = 'mpot0';
var CURRENT_MONSTER = 'snake';
var CURRENT_MONSTERS = ['osnake', 'snake'];

load_code('action_hunt');
load_code('action_party_member');
load_code('action_restock');
load_code('action_upkeep');
load_code('role_base');
load_code('role_healer');

var role_healer = new HealerRole();

var IGNORED_EVENTS = ['hit', 'target_hit', 'incoming', 'loot'];
character.all(function (name, data) {
	data.event_name = name;

	if (IGNORED_EVENTS.includes(name)) return;

	log(data);
});

function on_party_invite(name) {
	log('FricPriest.on_party_invite:' + name);
}

setInterval(function () {
	var invitee = checkPartyInvite();
	if (invitee) {
		accept_party_invite(invitee);
		smart_move(invitee);
	}
	if (smart.moving) return;

	if (needsRestock()) {
		doRestock();
		return;
	}

	if (upkeepHP()) return;
	if (upkeepMP()) return;

	loot();

	if (!attack_mode || character.rip || is_moving(character)) return;

	role_healer.mainLoop();

}, 1000 / 4); // Loops every 1/4 seconds.
