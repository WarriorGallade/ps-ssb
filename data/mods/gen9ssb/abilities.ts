import {ssbSets} from "./random-teams";
import {changeSet, getName, enemyStaff} from "./scripts";

const STRONG_WEATHERS = ['desolateland', 'primordialsea', 'deltastream', 'deserteddunes'];

export const Abilities: {[k: string]: ModdedAbilityData} = {
	/*
	// Example
	abilityid: {
		desc: "", // long description
		shortDesc: "", // short description, shows up in /dt
		name: "Ability Name",
		// The bulk of an ability is not easily shown in an example since it varies
		// For more examples, see https://github.com/smogon/pokemon-showdown/blob/master/data/abilities.ts
	},
	*/
	// Please keep abilites organized alphabetically based on staff member name!
	// Aelita
	fortifiedmetal: {
		shortDesc: "This Pokemon's weight is doubled and Attack is 1.5x when statused.",
		name: "Fortified Metal",
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg * 2;
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {breakable: 1},
		gen: 9,
	},

	// A Quag To The Past
	quagofruin: {
		shortDesc: "Active Pokemon without this Ability have their Def multiplied by 0.85. Ignores abilities.",
		name: "Quag of Ruin",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Quag of Ruin');
		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Quag of Ruin')) return;
			if (!move.ruinedDef?.hasAbility('Quag of Ruin')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Quag of Ruin Def drop');
			return this.chainModify(0.85);
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		flags: {},
		gen: 9,
	},
	clodofruin: {
		shortDesc: "Active Pokemon without this Ability have their Atk multiplied by 0.85. Ignores stat changes.",
		name: "Clod of Ruin",
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Clod of Ruin');
		},
		onAnyModifyAtk(atk, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Clod of Ruin')) return;
			if (!move.ruinedAtk?.hasAbility('Clod of Ruin')) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Clod of Ruin Atk drop');
			return this.chainModify(0.85);
		},
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		flags: {breakable: 1},
		gen: 9,
	},

	// Archas
	saintlybullet: {
		shortDesc: "Snipe Shot always has STAB and heals the user by 1/8 (or 1/6 on a crit) of its max HP.",
		name: "Saintly Bullet",
		onModifyMove(move) {
			if (move.id === 'snipeshot') {
				move.forceSTAB = true;
			}
		},
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.id === 'snipeshot') {
				const ratio = source.getMoveHitData(move).crit ? 6 : 8;
				this.heal(source.maxhp / ratio, source);
			}
		},
		flags: {},
		gen: 9,
	},

	// Blitz
	blitzofruin: {
		shortDesc: "Active Pokemon without this Ability have their Speed multiplied by 0.75. Also Dazzling.",
		name: "Blitz of Ruin",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Blitz of Ruin');
			this.add('-message', `${pokemon.name}'s Blitz of Ruin lowered the Speed of all surrounding Pokémon!`);
		},
		onAnyModifySpe(spe, pokemon) {
			if (!pokemon.hasAbility('Blitz of Ruin')) {
				return this.chainModify(0.75);
			}
		},
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Blitz of Ruin', move, '[of] ' + target);
				return false;
			}
		},
		flags: {breakable: 1},
	},

	// Cake
	notenoughremoval: {
		shortDesc: "Sets hazards at the end of every turn.",
		name: "Not Enough Removal",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			const hazard = this.sample(['stealthrock', 'spikes', 'toxicspikes', 'stickyweb', 'gmaxsteelsurge']);
			let willDoSomething = false;
			let hasActivated = false;
			for (const side of this.sides) {
				if (!side.sideConditions[hazard]) {
					willDoSomething = true;
				} else {
					if (hazard === 'spikes') {
						willDoSomething = side.sideConditions[hazard].layers < 3;
					} else if (hazard === 'toxicspikes') {
						willDoSomething = side.sideConditions[hazard].layers < 2;
					}
				}
				if (willDoSomething && !hasActivated) {
					this.add('-activate', pokemon, 'ability: Not Enough Removal');
					hasActivated = true;
				}
				side.addSideCondition(hazard);
			}
		},
		flags: {},
	},

	// Chloe
	acetosa: {
		shortDesc: "This Pokemon's moves are changed to be Grass type and have 1.2x power.",
		name: "Acetosa",
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') && !noModifyType.includes(move.id) &&
				!(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Grass';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
	},

	// clerica
	masquerade: {
		shortDesc: "(Mimikyu only) The first hit is blocked: instead, takes 1/8 damage and gets +1 Atk/Spe.",
		name: "Masquerade",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (
				effect && effect.effectType === 'Move' &&
				['mimikyu', 'mimikyutotem'].includes(target.species.id) && !target.transformed
			) {
				this.add('-activate', target, 'ability: Masquerade');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id) || target.transformed) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move.type)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
				this.boost({atk: 1, spe: 1});
				const img = "https://media.discordapp.net/attachments/764667730468536320/1079168557553831947/alcremie.png";
				this.add(`c:|${getName('clerica')}|/html <img src=${img} style="width:32px" />`);
			}
		},
		flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
	},


	// Coolcodename
	firewall: {
		shortDesc: "Burns opponents that attempt to use status moves on this Pokemon; Status move immunity.",
		name: "Firewall",
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				if (!source.trySetStatus('brn', target)) {
					this.add('-immune', target, '[from] ability: Firewall');
				}
				return null;
			}
		},
		flags: {breakable: 1},
	},

	// Cor'Jon
	painfulexit: {
		shortDesc: "When this Pokemon switches out, foes lose 25% HP.",
		name: "Painful Exit",
		onBeforeSwitchOutPriority: -1,
		onBeforeSwitchOut(pokemon) {
			if (enemyStaff(pokemon) === "Mad Monty") {
				this.add(`c:|${getName('BreadLoeuf')}|Welp`);
			} else {
				this.add(`c:|${getName('BreadLoeuf')}|Just kidding!! Take this KNUCKLE SANDWICH`);
			}
			for (const foe of pokemon.foes()) {
				if (!foe || foe.fainted || !foe.hp) continue;
				this.add(`-anim`, pokemon, "Tackle", foe);
				this.damage(foe.hp / 4, foe, pokemon);
			}
		},
		flags: {},
	},

	// Dawn of Artemis
	formchange: {
		shortDesc: ">50% HP Necrozma, else Necrozma-Ultra. SpA boosts become Atk boosts and vice versa.",
		name: "Form Change",
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Necrozma' || pokemon.transformed || !pokemon.hp) return;
			let newSet = 'Dawn of Artemis';
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.id === 'necrozma') return;
				this.add(`c:|${getName('Dawn of Artemis')}|Good, I'm healthy again, time to swap back.`);
			} else {
				if (pokemon.species.id === 'necrozmaultra') return;
				this.add(`c:|${getName('Dawn of Artemis')}|Time for me to transform and you to witness the power of Ares now!`);
				newSet += '-Ultra';
			}
			this.add('-activate', pokemon, 'ability: Form Change');
			changeSet(this, pokemon, ssbSets[newSet]);
			[pokemon.boosts['atk'], pokemon.boosts['spa']] = [pokemon.boosts['spa'], pokemon.boosts['atk']];
			this.add('-setboost', pokemon, 'spa', pokemon.boosts['spa'], '[silent]');
			this.add('-setboost', pokemon, 'atk', pokemon.boosts['atk'], '[silent]');
			this.add('-message', `${pokemon.name} swapped its Attack and Special Attack boosts!`);
		},
		flags: {},
	},

	// DaWoblefet
	shadowartifice: {
		shortDesc: "Traps adjacent foes. If KOed with a move, that move's user loses an equal amount of HP.",
		name: "Shadow Artifice",
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility(['shadowtag', 'shadowartifice']) && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility(['shadowtag', 'shadowartifice'])) {
				pokemon.maybeTrapped = true;
			}
		},
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		flags: {},
	},

	// Elly
	stormsurge: {
		shortDesc: "On switch-in, this Pokemon summons Storm Surge.",
		name: "Storm Surge",
		onStart(source) {
			this.field.setWeather('stormsurge');
		},
	},

	// Ganjafin
	gamblingaddiction: {
		shortDesc: "When under 1/4 max HP: +1 Spe, heal to full HP, and all moves become Final Gambit.",
		name: "Gambling Addiction",
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (!this.effectState.gamblingAddiction && pokemon.hp && pokemon.hp < pokemon.maxhp / 4) {
				this.boost({spe: 1});
				this.heal(pokemon.maxhp);
				const move = this.dex.moves.get('finalgambit');
				const finalGambit = {
					move: move.name,
					id: move.id,
					pp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
					maxpp: (move.noPPBoosts || move.isZ) ? move.pp : move.pp * 8 / 5,
					target: move.target,
					disabled: false,
					used: false,
				};
				pokemon.moveSlots.fill(finalGambit);
				pokemon.baseMoveSlots.fill(finalGambit);
				this.effectState.gamblingAddiction = true;
			}
		},
		flags: {},
	},

	// havi
	mensiscage: {
		shortDesc: "Immune to status and is considered to be asleep. 30% chance to disable when hit.",
		name: "Mensis Cage",
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mensis Cage');
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Mensis Cage');
			}
			return false;
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		flags: {},
	},

	// HiZo
	martyrcomplex: {
		desc: "If this Pokemon is knocked out, next Pokemon gets +1 Speed and +1 Attack/Special Attack, whichever is higher.",
		shortDesc: "If this Pokemon is KOed, next Pokemon gets +1 Spe and +1 Atk or SpA.",
		name: "Martyr Complex",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-activate', target, 'ability: Martyr Complex');
				this.add('-message', `${target.name} will be avenged!`);
				target.side.addSlotCondition(target, 'martyrcomplex');
			}
		},
		condition: {
			onSwap(target) {
				const boosts: SparseBoostsTable = {};
				boosts['spe'] = 1;
				if (target.getStat('atk', false, true) > target.getStat('spa', false, true)) {
					boosts['atk'] = 1;
				} else {
					boosts['spa'] = 1;
				}
				this.boost(boosts, target, target, this.effect);
				target.side.removeSlotCondition(target, 'martyrcomplex');
			},
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		flags: {},
	},

	// HoeenHero
	misspelled: {
		shortDesc: "SpA 1.5x, Accuracy 0.8x, Never misses, only misspells moves.",
		name: "Misspelled",
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.modify(spa, 1.5);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Special' && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
		// Misspelling implemented in scripts.ts#hitStepAccuracy
		flags: {},
	},

	// in the hills
	illiterit: {
		shortDesc: "Immune to moves with 12 or more alphanumeric characters.",
		name: "Illiterit",
		onTryHit(target, source, move) {
			if (target !== source && move.id.length >= 12) {
				this.add('-immune', target, '[from] ability: Illiterit');
				this.add(`c:|${getName('in the hills')}|Gee ${source.name}, maybe I should get a dictionary so I can understand what move you just used.`);
				return null;
			}
		},
		flags: {breakable: 1},
	},

	// Irpachuza
	mimeknowsbest: {
		desc: "Uses a random screen/protect move on switch in.",
		name: "Mime knows best",
		onStart(target) {
			const randomMove = [
				"Light Screen", "Reflect", "Protect", "Detect", "Barrier", "Spiky Shield", "Baneful Bunker",
				"Safeguard", "Mist", "King's Shield", "Magic Coat", "Aurora Veil",
			];
			const move = this.dex.getActiveMove(this.sample(randomMove));
			// allows use of Aurora Veil without hail
			if (move.name === "Aurora Veil") delete move.onTry;
			this.actions.useMove(move, target);
		},
		flags: {},
	},

	// kenn
	deserteddunes: {
		onStart(source) {
			this.field.setWeather('deserteddunes');
		},
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'deserteddunes' && !STRONG_WEATHERS.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deserteddunes')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		flags: {},
		name: "Deserted Dunes",
		gen: 9,
	},

	// Kennedy
	anfield: {
		shortDesc: "Clears terrain/hazards/pseudo weathers. Summons Anfield Atmosphere.",
		name: "Anfield",
		onStart(target) {
			let success = false;
			if (this.field.terrain) {
				success = this.field.clearTerrain();
			}
			for (const side of this.sides) {
				const remove = [
					'reflect', 'lightscreen', 'auroraveil', 'safeguard', 'mist', 'spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge',
				];
				for (const sideCondition of remove) {
					if (side.removeSideCondition(sideCondition)) {
						success = true;
					}
				}
			}
			if (Object.keys(this.field.pseudoWeather).length) {
				for (const pseudoWeather in this.field.pseudoWeather) {
					if (this.field.removePseudoWeather(pseudoWeather)) success = true;
				}
			}
			if (success) {
				this.add('-activate', target, 'ability: Anfield');
			}
			this.field.addPseudoWeather('anfieldatmosphere', target, target.getAbility());
		},
		flags: {},
	},
	youllneverwalkalone: {
		shortDesc: "Boosts Atk, Def, SpD, and Spe by 25% under Anfield Atmosphere.",
		name: "You'll Never Walk Alone",
		onStart(pokemon) {
			if (this.field.getPseudoWeather('anfieldatmosphere')) {
				this.add('-ability', pokemon, 'You\'ll Never Walk Alone');
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, source, target, move) {
			if (this.field.getPseudoWeather('anfieldatmosphere')) {
				this.debug('You\'ll Never Walk Alone atk boost');
				return this.chainModify([5120, 4096]);
			}
		},
		onModifyDefPriority: 6,
		onModifyDef(def, target, source, move) {
			if (this.field.getPseudoWeather('anfieldatmosphere')) {
				this.debug('You\'ll Never Walk Alone def boost');
				return this.chainModify([5120, 4096]);
			}
		},
		onModifySpDPriority: 6,
		onModifySpD(spd, target, source, move) {
			if (this.field.getPseudoWeather('anfieldatmosphere')) {
				this.debug('You\'ll Never Walk Alone spd boost');
				return this.chainModify([5120, 4096]);
			}
		},
		onModifySpe(spe, pokemon) {
			if (this.field.getPseudoWeather('anfieldatmosphere')) {
				this.debug('You\'ll Never Walk Alone spe boost');
				return this.chainModify([5120, 4096]);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1},
	},

	// Kris
	cacophony: {
		name: "Cacophony",
		shortDesc: "Sound moves: 1.5x BP, ignore type-based immunities. Opposing sound fails.",
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Cacophony boost');
				return this.chainModify([6144, 4096]);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Cacophony');
				return null;
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			move.ignoreImmunity = true;
		},
		flags: {},
	},

	// Krytocon
	curseofdexit: {
		name: "Curse of Dexit",
		shortDesc: "User sets Curse against foe on entry; 25% of max HP lost.",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Curse of Dexit');
					this.directDamage(pokemon.maxhp / 4, pokemon, pokemon);
					activated = true;
				}
				target.addVolatile('curse', pokemon);
			}
		},
		flags: {},
	},

	// Lasen
	idealizedworld: {
		shortDesc: "Removes everything on Switchin.",
		name: "Idealized World",
		onStart(pokemon) {
			const target = pokemon.side.foe;
			this.add('-ability', pokemon, 'Idealized World');
			const displayText = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const targetCondition of Object.keys(target.sideConditions)) {
				if (target.removeSideCondition(targetCondition) && displayText.includes(targetCondition)) {
					this.add('-sideend', target, this.dex.conditions.get(targetCondition).name, '[from] ability: Idealized World', '[of] ' + pokemon);
				}
			}
			for (const sideCondition of Object.keys(pokemon.side.sideConditions)) {
				if (pokemon.side.removeSideCondition(sideCondition) && displayText.includes(sideCondition)) {
					this.add('-sideend', pokemon.side, this.dex.conditions.get(sideCondition).name, '[from] ability: Idealized World', '[of] ' + pokemon);
				}
			}
			this.field.clearTerrain();
			this.field.clearWeather();
			for (const pseudoWeather of Object.keys(this.field.pseudoWeather)) {
				this.field.removePseudoWeather(pseudoWeather);
			}
			this.add('-clearallboost');
			for (const poke of this.getAllActive()) {
				poke.clearBoosts();
			}
		},
		flags: {},
	},

	// Lumari
	pyrotechnic: {
		shortDesc: "Critical hits are guaranteed when foe is burned.",
		name: "Pyrotechnic",
		onModifyCritRatio(critRatio, source, target) {
			if (target?.status === 'brn') return 5;
		},
		flags: {},
	},

	// Mad Monty
	climatechange: {
		shortDesc: "1.5x SpA in sun, 1.5x Def/SpD in snow, heals 50% in rain. Changes forme/weather.",
		name: "Climate Change",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
				this.field.setWeather('raindance');
				break;
			case 'raindance':
				this.field.setWeather('snow');
				break;
			default:
				this.field.setWeather('sunnyday');
				break;
			}
		},
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			let relevantMove = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') {
					forme = 'Castform-Sunny';
					relevantMove = 'Solar Beam';
				}
				break;
			case 'raindance':
			case 'primordialsea':
			case 'stormsurge':
				if (pokemon.species.id !== 'castformrainy') {
					forme = 'Castform-Rainy';
					relevantMove = 'Thunder';
					this.heal(pokemon.baseMaxhp / 2);
				}
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') {
					forme = 'Castform-Snowy';
					relevantMove = 'Aurora Veil';
				}
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');

				if (!relevantMove) return;
				const move = this.dex.moves.get(relevantMove);

				const sketchIndex = Math.max(
					pokemon.moves.indexOf("solarbeam"), pokemon.moves.indexOf("thunder"), pokemon.moves.indexOf("auroraveil")
				);
				if (sketchIndex < 0) return;
				const carryOver = pokemon.moveSlots[sketchIndex].pp / pokemon.moveSlots[sketchIndex].maxpp;
				const sketchedMove = {
					move: move.name,
					id: move.id,
					pp: Math.floor((move.pp * 8 / 5) * carryOver),
					maxpp: (move.pp * 8 / 5),
					target: move.target,
					disabled: false,
					used: false,
				};
				pokemon.moveSlots[sketchIndex] = sketchedMove;
				pokemon.baseMoveSlots[sketchIndex] = sketchedMove;
			}
		},
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifyDef(def, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD(spd, pokemon) {
			if (['hail', 'snow'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
	},

	// Mathy
	dynamictyping: {
		shortDesc: "Moves used by all Pokemon are ??? type.",
		name: "Dynamic Typing",
		onStart(pokemon) {
			this.add('-ability', pokemon, "Dynamic Typing");
		},
		onModifyTypePriority: 2,
		onAnyModifyType(move, pokemon, target) {
			move.type = "???";
		},
		flags: {},
	},

	// Mex
	timedilation: {
		shortDesc: "+10% BP for every 10 turns passed in battle, max 200%.",
		name: "Time Dilation",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			const turnMultiplier = Math.floor(this.turn / 10);
			let bpMod = 1 + (0.1 * turnMultiplier);
			if (bpMod > 2) bpMod = 2;
			return this.chainModify(bpMod);
		},
		flags: {},
	},

	// Mia
	hacking: {
		name: "Hacking",
		shortDesc: "Hacks into PS and finds out if the enemy has any super effective moves.",
		onStart(pokemon) {
			this.add(`c:|${getName('Mia')}|One moment, please. One does not simply go into battle blind.`);
			const side = pokemon.side.id === 'p1' ? 'p2' : 'p1';
			this.add(
				`message`,
				(
					`ssh sim@pokemonshowdown.com && nc -U logs/repl/sim <<< ` +
					`"Users.get('mia').popup(battle.sides.get('${side}').pokemon.map(m => Teams.exportSet(m)))"`
				)
			);
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) {
				this.add(`c:|${getName('Mia')}|Fascinating. None of your sets have any moves of interest.`);
				return;
			}
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add(
				'message',
				`Mia hacked into PS and looked at her opponent's sets. ` +
					`${warnTarget.name}'s move ${warnMoveName} drew her eye.`
			);
			this.add(`c:|${getName('Mia')}|Interesting. With that in mind, bring it!`);
		},
		flags: {},
	},

	// Ney
	pranksterplus: {
		shortDesc: "This Pokemon's Status moves have priority raised by 1. Dark types are not immune.",
		name: "Prankster Plus",
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				return priority + 1;
			}
		},
		flags: {},
	},

	// Notater517
	ventcrosser: {
		shortDesc: "Uses Baton Pass after every move.",
		name: "Vent Crosser",
		onAfterMove(source, target, move) {
			this.actions.useMove('Baton Pass', source);
		},
		flags: {},
	},

	// phoopes
	ididitagain: {
		shortDesc: "Bypasses Sleep Clause Mod once per battle.",
		name: "I Did It Again",
		flags: {},
		// implemented in rulesets.ts
	},

	// PYRO
	hardcorehustle: {
		shortDesc: "Moves have 15% more power and -5% Acc for each fainted ally, up to 5 allies.",
		name: "Hardcore Hustle",
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Hardcore Hustle');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [1, 1.15, 1.3, 1.45, 1.6, 1.75];
				this.debug(`Hardcore Hustle boost: ${powMod[this.effectState.fallen]}`);
				return this.chainModify(powMod[this.effectState.fallen]);
			}
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (this.effectState.fallen) {
				const accMod = [1, 0.95, 0.90, 0.85, 0.80, 0.75];
				this.debug(`Hardcore Hustle debuff: ${accMod[this.effectState.fallen]}`);
				return this.chainModify(accMod[this.effectState.fallen]);
			}
		},
		flags: {},
	},

	// ReturnToMonkey
	monkeseemonkedo: {
		shortDesc: "Boosts Atk or SpA by 1 based on foe's defenses, then copies foe's Ability.",
		name: "Monke See Monke Do",
		onStart(pokemon) {
			let totaldef = 0;
			let totalspd = 0;
			for (const target of pokemon.foes()) {
				totaldef += target.getStat('def', false, true);
				totalspd += target.getStat('spd', false, true);
			}
			if (totaldef && totaldef >= totalspd) {
				this.boost({spa: 1});
			} else if (totalspd) {
				this.boost({atk: 1});
			}

			// n.b. only affects Hackmons
			// interaction with No Ability is complicated: https://www.smogon.com/forums/threads/pokemon-sun-moon-battle-mechanics-research.3586701/page-76#post-7790209
			if (pokemon.adjacentFoes().some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.gaveUp = true;
			}
			// interaction with Ability Shield is similar to No Ability
			if (pokemon.hasItem('Ability Shield')) {
				this.add('-block', pokemon, 'item: Ability Shield');
				this.effectState.gaveUp = true;
			}
		},
		onUpdate(pokemon) {
			if (!pokemon.isStarted || this.effectState.gaveUp) return;

			const possibleTargets = pokemon.adjacentFoes().filter(
				target => !target.getAbility().flags['notrace'] && target.ability !== 'noability'
			);
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			if (pokemon.setAbility(ability)) {
				this.add('-ability', pokemon, ability, '[from] ability: Monke See Monke Do', '[of] ' + target);
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
	},

	// Rumia
	youkaiofthedusk: {
		shortDesc: "Defense: x2. Status moves: +1 Priority.",
		name: "Youkai of the Dusk",
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		flags: {},
	},

	// Swiffix
	stinky: {
		desc: "10% chance to either poison or paralyze the Pokemon on hit.",
		name: "Stinky",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stinky psn/par');
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 10,
					onHit(target, source) {
						const result = this.random(2);
						if (result === 0) {
							target.trySetStatus('par', source);
						} else {
							target.trySetStatus('psn', source);
						}
					},
				});
			}
		},
		flags: {},
	},

	// Theia
	powerabuse: {
		shortDesc: "Summons Sun; attacks do 66% less damage to this Pokemon; may burn physical attackers.",
		name: "Power Abuse",
		onStart() {
			this.field.setWeather('sunnyday');
		},
		onSourceModifyDamage() {
			return this.chainModify(0.34);
		},
		onDamagingHit(damage, target, source, move) {
			if (move.category === "Physical" && this.randomChance(1, 5)) {
				source.trySetStatus('brn', target);
			}
		},
		flags: {breakable: 1},
	},

	// TheJesucristoOsAma
	thegraceofjesuschrist: {
		shortDesc: "Changes plates at the end of every turn.",
		name: "The Grace Of Jesus Christ",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			const plates = this.dex.items.all().filter(item => item.onPlate && !item.zMove);
			const item = this.sample(plates.filter(plate => this.toID(plate) !== this.toID(pokemon.item)));
			pokemon.item = '';
			this.add('-item', pokemon, item, '[from] ability: The Grace Of Jesus Christ');
			pokemon.setItem(item);
		},
		flags: {},
	},

	// trace
	eyesofeternity: {
		shortDesc: "Moves used by/against this Pokemon always hit; only damaged by attacks.",
		name: "Eyes of Eternity",
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {},
	},

	// UT
	galeguard: {
		shortDesc: "Only damaged by direct attacks; Flying moves +1 priority.",
		name: "Gale Guard",
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying') return priority + 1;
		},
		flags: {},
	},

	// umuwo
	soulsurfer: {
		name: "Soul Surfer",
		shortDesc: "Rain on entry; Speed: x2 in Electric Terrain.",
		onStart(source) {
			this.field.setWeather('raindance');
		},
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(2);
			}
		},
		flags: {},
	},

	// Venous
	concreteoverwater: {
		shortDesc: "+1 Def/Spd before getting hit by a Super Effective move",
		name: "Concrete Over Water",
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			if (target.runEffectiveness(move) > 0) {
				this.boost({def: 1, spd: 1}, target);
			}
		},
		flags: {},
	},

	// Violet
	scarletaeonia: {
		shortDesc: "50% HP: +Flying-type, summons Scarlet Aeonia Terrain, loses item.",
		name: "Scarlet Aeonia",
		onStart(pokemon) {
			if (pokemon.m.phaseChange) {
				if (pokemon.addType('Flying')) {
					this.add('-start', pokemon, 'typeadd', 'Flying', '[from] ability: Scarlet Aeonia');
				}
				this.field.setTerrain('scarletaeoniaterrain');
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Scarlet Aeonia');
			this.add(`c:|${getName('Vio͜͡let')}|The scarlet bloom flowers once more. You will witness true horror. Now, rot!`);
			pokemon.m.phaseChange = true;
			if (pokemon.addType('Flying')) {
				this.add('-start', pokemon, 'typeadd', 'Flying', '[from] ability: Scarlet Aeonia');
			}
			pokemon.takeItem();
			this.field.setTerrain('scarletaeoniaterrain');
		},
		flags: {},
	},

	// WarriorGallade
	primevalharvest: {
		shortDesc: "Sun: Heal 1/8 max HP, random berry if no item. Else 50% random berry if no item.",
		name: "Primeval Harvest",
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			const isSunny = this.field.isWeather(['sunnyday', 'desolateland']);
			if (isSunny) {
				this.heal(pokemon.baseMaxhp / 8, pokemon, pokemon, pokemon.getAbility());
			}
			if (isSunny || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item) {
					const berry = this.sample([
						'cheri', 'chesto', 'pecha', 'lum', 'aguav', 'liechi', 'ganlon', 'petaya',
						'apicot', 'salac', 'micle', 'lansat', 'enigma', 'custap', 'kee', 'maranga',
					]) + 'berry';
					pokemon.setItem(berry);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Primeval Harvest');
				}
			}
		},
		flags: {},
	},

	// WigglyTree
	treestance: {
		shortDesc: "No recoil; 3/4 damage from supereffective attacks.",
		name: "Tree Stance",
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Tree Stance neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: {breakable: 1},
	},

	// Yellow Paint
	yellowmagic: {
		shortDesc: "+25% HP, +1 SpA, +1 Spe, Charge, or Paralyzes attacker when hit by an Electric move; Electric immunity.",
		name: "Yellow Magic",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				let didSomething = false;
				switch (this.random(5)) {
				case 0:
					didSomething = !!this.heal(target.baseMaxhp / 4);
					break;
				case 1:
					didSomething = !!this.boost({spa: 1}, target, target);
					break;
				case 2:
					didSomething = !!this.boost({spe: 1}, target, target);
					break;
				case 3:
					if (!target.volatiles['charge']) {
						this.add('-ability', target, 'Yellow Magic');
						target.addVolatile('charge', target);
						didSomething = true;
					}
					break;
				case 4:
					didSomething = source.trySetStatus('par', target);
					break;
				}
				if (!didSomething) {
					this.add('-immune', target, '[from] ability: Yellow Magic');
				}
				return null;
			}
		},
		flags: {breakable: 1},
	},

	// Modified abilities
	baddreams: {
		inherit: true,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility(['comatose', 'mensiscage'])) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
	},
	deltastream: {
		inherit: true,
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'deltastream' && !STRONG_WEATHERS.includes(weather.id)) return false;
		},
	},
	desolateland: {
		inherit: true,
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'desolateland' && !STRONG_WEATHERS.includes(weather.id)) return false;
		},
	},
	dryskin: {
		inherit: true,
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea' || effect.id === 'stormsurge') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
	},
	forecast: {
		inherit: true,
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
			case 'sunnyday':
			case 'desolateland':
				if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
				break;
			case 'raindance':
			case 'primordialsea':
			case 'stormsurge':
				if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
				break;
			case 'hail':
			case 'snow':
				if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
				break;
			default:
				if (pokemon.species.id !== 'castform') forme = 'Castform';
				break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '[msg]');
			}
		},
	},
	hydration: {
		inherit: true,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea', 'stormsurge'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
	},
	neutralizinggas: {
		inherit: true,
		onPreStart(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityState.ending = false;
			for (const target of this.getAllActive()) {
				if (target.hasItem('Ability Shield')) {
					this.add('-block', target, 'item: Ability Shield');
					continue;
				}
				// Can't suppress a Tatsugiri inside of Dondozo already
				if (target.volatiles['commanding']) {
					continue;
				}
				if (target.illusion) {
					this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, pokemon, 'neutralizinggas');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
				if (STRONG_WEATHERS.includes(target.getAbility().id)) {
					this.singleEvent('End', this.dex.abilities.get(target.getAbility().id), target.abilityState, target, pokemon, 'neutralizinggas');
				}
			}
		},
	},
	overcoat: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'deserteddunes' || type === 'hail' || type === 'powder') return false;
		},
	},
	primordialsea: {
		inherit: true,
		onAnySetWeather(target, source, weather) {
			if (this.field.getWeather().id === 'primordialsea' && !STRONG_WEATHERS.includes(weather.id)) return false;
		},
	},
	raindish: {
		inherit: true,
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea' || effect.id === 'stormsurge') {
				this.heal(target.baseMaxhp / 16);
			}
		},
	},
	sandforce: {
		inherit: true,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather(['sandstorm', 'deserteddunes'])) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'deserteddunes') return false;
		},
	},
	sandrush: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['sandstorm', 'deserteddunes'])) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'deserteddunes') return false;
		},
	},
	sandveil: {
		inherit: true,
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'deserteddunes') return false;
		},
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['sandstorm', 'deserteddunes'])) {
				this.debug('Sand Veil - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
	},
	swiftswim: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea', 'stormsurge'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
	},
};
