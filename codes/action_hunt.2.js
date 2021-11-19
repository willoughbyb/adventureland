
function checkTarget(leader) {
    var target = null;

    if (leader) return get_target_of(leader);
    if (!target) target = get_targeted_monster();
    if (!target) {
        target = get_nearest_monster({ min_xp: 100, max_att: 120, no_target: true, type: CURRENT_MONSTER });
        if (target) {
            change_target(target);
        } else {
            set_message("Tracking");

            if (smart.moving) return;
            smart_move(CURRENT_MONSTER);
            return null;
        }
    }

    return target;
}

function fightTarget(target) {
    if (!is_in_range(target)) {
        move(
            character.x + (target.x - character.x) / 2,
            character.y + (target.y - character.y) / 2
        );
    } else if (can_attack(target)) {
        set_message("Attacking");
        attack(target);
    }
}
