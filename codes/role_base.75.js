var RoleBase = function () { };

RoleBase.prototype.checkTarget = function (leader) {
	var target = null;

	if (leader) return get_target_of(leader);
	if (!target) target = get_targeted_monster();
	if (!target) {
		for (var monsterName of CURRENT_MONSTERS) {
			target = get_nearest_monster({ min_xp: 100, max_att: 120, no_target: true, type: monsterName });
			if (target) break;
		}

		if (target && target.x && target.y) {
			var d = Math.floor(distance(character, target));
			log("Distance to target: " + d);
			if (d > 350) {
				log("  It's too far");
				target = null;
			}
		}
	}
	if (!target) {
		set_message("Tracking");

		if (smart.moving) return;
		smart_move(CURRENT_MONSTERS[0]);
		return null;
	}

	if (target) change_target(target);
	return target;
};

RoleBase.prototype.fightTarget = function (target) {
	if (!is_in_range(target)) {
		move(
			character.x + (target.x - character.x) / 2,
			character.y + (target.y - character.y) / 2
		);
	} else if (can_attack(target)) {
		set_message("Attacking");
		attack(target);
	}
};
