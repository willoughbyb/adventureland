var TankRole = function () { };
TankRole.prototype = Object.assign({}, RoleBase.prototype);

TankRole.prototype.mainLoop = function () {
	var target = this.checkTarget();
	if (target) {
		var targetOf = get_target_of(target);
		if (targetOf && targetOf.name && targetOf.name != character.name && !is_on_cooldown('taunt')) {
			set_message('Taunting');
			use_skill('taunt', target);
			return;
		}

		this.fightTarget(target);
	}
};
