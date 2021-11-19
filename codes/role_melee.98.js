var MeleeRole = function () { };
MeleeRole.prototype = Object.assign({}, RoleBase.prototype);

MeleeRole.prototype.mainLoop = function () {
	var partyLeader = get_player('Friction');
	target = this.checkTarget(partyLeader);
	if (target /* && target.hp < target.max_hp */) {
		this.fightTarget(target);
		return;
	}
};

MeleeRole.prototype.fightTarget = function (target) {
	if (!is_in_range(target)) {
		move(
			character.x + (target.x - character.x) / 2,
			character.y + (target.y - character.y) / 2
		);
	}

	if (!can_attack(target)) return;

	set_message("Attacking");

	// check skillz
	attack(target);
};
