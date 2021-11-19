var HealerRole = function () { };
HealerRole.prototype = Object.assign({}, RoleBase.prototype);

HealerRole.prototype.mainLoop = function () {
	if (get_party()) {
		var target = this.healPartyCheck();
		if (target) {
			game_log('Target needs healing: ' + target.name);

			if (!is_in_range(target)) {
				move(
					character.x + (target.x - character.x) / 2,
					character.y + (target.y - character.y) / 2
				);
			} else if (can_heal(target)) {
				set_message("Healing");
				heal(target);
			}

			use_skill('partyheal', target);
			return;
		}

		var partyLeader = get_player('Friction');
		target = this.checkTarget(partyLeader);
		if (target && target.hp < target.max_hp) {
			fightTarget(target);
			return;
		}
	}
};

HealerRole.prototype.healPartyCheck = function () {
	var heal_potency = G.skills.partyheal['output'];
	var party = get_party();
	if (!party) return false;

	var needsHealing = [];
	for (var memberName in party) {
		var player = get_player(memberName);
		var missing_hp = player.max_hp - player.hp
		var missing_hp_pct = Math.round((player.hp / player.max_hp) * 100)
		if (missing_hp_pct > 65 && missing_hp > heal_potency) {
			needsHealing.push(player);
		}
	}

	if (needsHealing.length == 0) return false;

	return needsHealing[0];
};
