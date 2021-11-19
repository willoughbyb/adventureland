
function needsRestock() {
	return quantity(HP_POTION) < 10 || quantity(MP_POTION) < 10
}

function doRestock() {
	set_message('Restock');
	if (smart.moving) return;

	smart_move('potions', buyPotions);
}

function buyPotions() {
	if (quantity(HP_POTION) < 10) {
		buy_with_gold(HP_POTION, 300);
	}
	if (quantity(MP_POTION) < 10) {
		buy_with_gold(MP_POTION, 100);
	}
}
