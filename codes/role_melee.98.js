var MeleeRole = function () { };
MeleeRole.prototype = Object.assign({}, RoleBase.prototype);

MeleeRole.prototype.mainLoop = function () {
	var target = this.checkTarget();
	if (target) {
		this.fightTarget(target);
	}
};
