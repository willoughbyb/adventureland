
function upkeepHP() {
    var hp_pot_heal = G.items[HP_POTION]['gives'][0][1];

    if (mssince(last_potion) >= min(200, character.ping * 3)) {
        var used = true;
        if (is_on_cooldown("use_hp")) return;
        // if (character.max_hp - character.hp > hp_pot_heal) use_skill('use_hp');
        else if (character.hp / character.max_hp < 0.7) use_skill('use_hp');
        else used = false;
        if (used) last_potion = new Date();
    }

    return used;
}

function upkeepMP() {
    var mp_pot_heal = G.items[MP_POTION]['gives'][0][1];
    var mp_missing = character.max_mp - character.mp;
    // game_log('upkeepMP - mp_pot_heal:' + mp_pot_heal + ' missing:' + mp_missing, 'FFD700')

    if (mssince(last_potion) >= min(200, character.ping * 3)) {
        var used = true;
        if (is_on_cooldown("use_mp")) return;
        if (mp_missing > mp_pot_heal) use_skill('use_mp');
        else used = false;
        if (used) last_potion = new Date();
    }

    return used;
}
