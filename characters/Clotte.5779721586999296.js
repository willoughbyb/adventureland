var attack_mode = true

var HP_POTION = 'hpot0'
var MP_POTION = 'mpot0'
var CURRENT_MONSTER = 'snake'

load_code('action_restock');
load_code('action_hunt');
load_code('action_upkeep');
load_code('role_healer');

var role_healer = new HealerRole();

setInterval(function () {

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
