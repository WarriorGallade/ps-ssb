import {ssbSets} from "./random-teams";
import {changeSet, getName, enemyStaff} from './scripts';

export const Conditions: {[k: string]: ModdedConditionData & {innateName?: string}} = {
	/*
	// Example:
	userid: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Username')}|Switch In Message`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Username')}|Switch Out Message`);
		},
		onFaint() {
			this.add(`c:|${getName('Username')}|Faint Message`);
		},
		// Innate effects go here
	},
	IMPORTANT: Obtain the username from getName
	*/
	// Please keep statuses organized alphabetically based on staff member name!
	aelita: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Aelita')}|You know, no one appreciates the work that goes into making weapons and towers.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Aelita')}|Gotta use this tower to change sectors, BRB.`);
		},
		onFaint() {
			this.add(`c:|${getName('Aelita')}|Well, I hope the Lyoko Warriors are at least well equipped.`);
		},
	},
	aquagtothepast: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('A Quag To The Past')}|I'm coming out of my cage and I've been doing just fine`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('A Quag To The Past')}|so true`);
		},
		onFoeSwitchIn(pokemon) {
			if (pokemon.name === 'Aeonic') {
				this.add(`c:|${getName('A Quag To The Past')}|!randpoke natdex`);
				this.add(`c:|${getName('Aeonic')}|!randpoke natdex`);
			}
		},
		onFaint() {
			const lines = [
				'Anger he felt',
				'Before Showderp he knelt',
				'A moderator so quiet',
				'Inventing his riot',
				'[[]]',
				'Onward he gazed',
				'As his cattle had grazed',
				'Wolves on the hills',
				'Mom paying his bills',
				'[[]]',
				'His keyboard he used',
				'His power: abused',
				'"Silent as me"',
				'"You must be"',
				'[[]]',
				'The chatroom is dead',
				'Yet quickly he fled',
				'Before retaliation, he made fast',
				'A Quag To The Past',
			];
			for (const line of lines) {
				this.add(`c:|${getName('A Quag To The Past')}|${line}`);
			}
		},
	},
	archas: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Archas')}|We'll get over this barrier together!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Archas')}|Stand your ground, everyone!`);
		},
		onFaint() {
			this.add(`c:|${getName('Archas')}|What would Grandfather... think of me now...`);
		},
	},
	berry: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c:|${getName('berry')}|berry`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('berry')}|rock`);
		},
		onFaint() {
			this.add(`c:|${getName('berry')}|and all I got was this lousy t-shirt`);
		},
	},
	blitzuser: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c:|${getName('Blitz')}|Hey guys, did you know that Chi-Yu is a Water/Dark-type Pokémon introduced in Generation IX? Chi-Yu is number 1004 in the National Dex, and a member of the Undiscovered egg group. Chi-Yu has no evolutionary relatives. Chi-Yu has a base stat total of 570, as do all the Treasures of Ruin, and it has the ability Blitz of Ruin. Chi-Yu learns various strong moves, such as Fiery Wrath, Lava Plume, and Nasty Plot. Chi-Yu is a blue Pokémon with a fish-like build, weighing in at 10.8 pounds and standing 1'04" feet tall. Chi-Yu's design is inspired by goldfish, flames, and beads. Chi-Yu controls flames burning at over 5,400 degrees Fahrenheit, and casually swims through the sea of lava it creates by melting rock and sand, according to various Pokedex entries. Chi-Yu is the only Treasure of Ruin in Generation IX that was quickbanned from Smogon's OverUsed tier. Many Trainers like Chi-Yu for its design, which mixes cool and cute, as well as its good stats and movepool.`);
			this.add('-start', pokemon, 'typechange', 'Water/Dark', '[silent]');
		},
		onSwitchOut() {
			this.add(`c:|${getName('Blitz')}|Splashyyy!`);
		},
		onFaint() {
			const img = "https://discord.com/assets/2d827842d29f3408d9eb56fcdd96e589.svg";
			this.add(`c:|${getName('Blitz')}|/html <img src="${img}" width="32" height="32" />`);
		},
	},
	corjon: {
		noCopy: true,
		onStart(pokemon) {
			if (enemyStaff(pokemon) === "Mad Monty") {
				this.add(`c:|${getName('Cor\'Jon')}|Ope, sorry`);
			} else {
				this.add(`c:|${getName('Cor\'Jon')}|I loeuf you <3`);
			}
		},
		// onSwitchOut implemented in ability instead
		onFoeSwitchIn(pokemon) {
			if (pokemon.name === "Mad Monty") {
				this.add(`c:|${getName('Cor\'Jon')}|Ope, sorry`);
			}
		},
		onFaint() {
			this.add(`c:|${getName('Cor\'Jon')}|Oh, ma vie... c'est 'pitable'...`);
		},
		onFoeFaint(target, source, effect) {
			if (source === this.effectState.target && effect?.name === 'Painful Exit') {
				this.add(`c:|${getName('Cor\'Jon')}|Ashes to ashes, crust to crust.`);
			} else if (target.name === "Mad Monty") {
				this.add(`c:|${getName('Cor\'Jon')}|G.G, weather you like it or not`);
			} else {
				this.add(`c:|${getName('Cor\'Jon')}|Ope, someone's swallowing fishes.`);
			}
		},
	},
	cake: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Cake')}|Hello, and welcome to the Random Battles experience. Please enjoy your hazards.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Cake')}|can't remove all of these randbats devs pls fix`);
		},
		onFaint() {
			this.add(`c:|${getName('Cake')}|/wall moist`);
		},
	},
	chloe: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Chloe')}|hey!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Chloe')}|cya soon o/`);
		},
		onFaint() {
			this.add(`c:|${getName('Chloe')}|ouch :(`);
		},
	},
	clerica: {
		noCopy: true,
		onStart() {
			const img = "https://media.discordapp.net/attachments/764667730468536320/1079168714513064008/meow_gm.png";
			this.add(`c:|${getName('clerica')}|/html <img src=${img} style="width:32px" />`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('clerica')}|gn`);
		},
		onFaint() {
			this.add(`c:|${getName('clerica')}|unfort`);
		},
	},
	coolcodename: {
		onStart(pokemon) {
			this.add(`c:|${getName('Coolcodename')}|LFGI ${pokemon.side.name}`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Coolcodename')}|right, i forgot i have a skill issue`);
		},
		onFaint() {
			this.add(`c:|${getName('Coolcodename')}|mb LOL`);
		},
	},
	dawnofartemis: {
		noCopy: true,
		onStart(pokemon) {
			const god = (pokemon.species.id === 'necrozmaultra') ? 'Ares' : 'Artemis';
			this.add(`c:|${getName('Dawn of Artemis')}|Time for you to witness the power of ${god}!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Dawn of Artemis')}|You'll witness it again later.`);
		},
		onFaint() {
			this.add(`c:|${getName('Dawn of Artemis')}|Sad.`);
		},
	},
	dawoblefet: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('DaWoblefet')}|What's going on guys? This is DaWoblefet, and welcome to Mechanics Monday.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('DaWoblefet')}|Until next time, have a good one.`);
		},
		onFaint() {
			this.add(`c:|${getName('DaWoblefet')}|mished`);
		},
	},
	deftinwolf: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('deftinwolf')}|Run, little rabbit.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('deftinwolf')}|I'll give you a moment to say your prayers.`);
		},
		onFaint() {
			this.add(`c:|${getName('deftinwolf')}|Death is only the beginning.`);
		},
	},
	elly: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Elly')}|any`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Elly')}|ok bye`);
		},
		onFaint(pokemon) {
			this.add(`c:|${getName('Elly')}|that wasn't very nice, ${enemyStaff(pokemon)}.`);
		},
	},
	ganjafin: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Ganjafin')}|How's it going guys, Ganjafin here`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Ganjafin')}|And I'll see you guys, in the next one`);
		},
		onFaint() {
			this.add(`c:|${getName('Ganjafin')}|I knew I'd die before Silksong came out`);
		},
	},
	havi: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('havi')}|kos, or some say kosm`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('havi')}|grant us eyes, grant us eyes`);
		},
		onFaint() {
			this.add(`c:|${getName('havi')}|the nightmare swirls and churns unending n_n`);
		},
	},
	hizo: {
		noCopy: true,
		onStart() {
			// TODO: Confirm nicks later
			let friends;
			const tier = this.sample(['pic', 'sketch', 'ggsp']);
			switch (tier) {
			case 'pic':
				friends = ['chromate', 'yuki', 'YoBuddyTheBaker', 'zoe', 'jasprose'];
				break;
			case 'sketch':
				friends = ['Eggs', 'career ended', 'ponchlake'];
				break;
			default:
				friends = ['roonie217', 'chromate', 'tkhanh', 'lilyhii'];
				break;
			}
			this.add(`c:|${getName('HiZo')}|/pm ${this.sample(friends)}, ${tier}?`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('HiZo')}|maybe later then`);
		},
		onFaint() {
			this.add(`c:|${getName('HiZo')}|can i try that matchup again?`);
		},
	},
	hoeenhero: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('HoeenHero')}|Ok what did Hippopotas break now?`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('HoeenHero')}|TODO think of a switch out message later.`);
		},
		onFaint() {
			this.add(`c:|${getName('HoeenHero')}|I should of reprogrammed the RNG to be in my favor too...`);
		},
	},
	hsy: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('hsy')}|BANJO!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('hsy')}|LEMME SCRAP COWARD`);
		},
		onFaint() {
			this.add(`c:|${getName('hsy')}|https://www.youtube.com/watch?v=g104OJIh9hs`);
		},
	},
	inthehills: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('in the hills')}|in (the hills)`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('in the hills')}|i'll be out back`);
		},
		onFaint() {
			this.add(`c:|${getName('in the hills')}|im starting to feel kinda stupid can i please leave`);
		},
	},
	ironwater: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('ironwater')}|Jirachi Ban Hammer!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('ironwater')}|Let me grab a bigger hammer`);
		},
		onFaint() {
			this.add(`c:|${getName('ironwater')}|I'll ban you in the next game...`);
		},
	},
	irpachuza: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Irpachuza!')}|Hf. I never say gl because I sincerely don't want my oppo to have better luck than me in rands n.n`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Irpachuza!')}|bye and HOOP HOOP n.n`);
		},
		onFaint(pokemon) {
			this.add(`c:|${getName('Irpachuza!')}|how DARE YOU ${pokemon.side.foe.name} ;-; n.n`);
		},
		innateName: "Prankster",
		desc: "This Pokemon's non-damaging moves have their priority increased by 1. Opposing Dark-type Pokemon are immune to these moves, and any move called by these moves, if the resulting user of the move has this Ability.",
		shortDesc: "This Pokemon's Status moves have priority raised by 1, but Dark types are immune.",
		onModifyPriority(priority, pokemon, target, move) {
			if (pokemon.illusion) return;
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
	},
	isaiah: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c:|${getName('Isaiah')}|Who dyin'?`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Isaiah')}|Misclick`);
		},
		onFaint() {
			this.add(`c:|${getName('Isaiah')}|Bruh, nice cteam`);
		},
	},
	kenn: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c:|${getName('kenn')}|*old man grumbling*`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('kenn')}|Ope`);
		},
		onFaint() {
			this.add(`c:|${getName('kenn')}|I'm too old for this shi-`);
		},
	},
	kennedy: {
		noCopy: true,
		innateName: "Battle Bond",
		shortDesc: "After KOing a Pokemon: becomes Cinderace-Gmax.",
		onStart(target, source, effect) {
			const message = this.sample(['Justice for the 97', 'up the reds']);
			this.add(`c:|${getName('Kennedy')}|${message}`);
			if (source && source.name === 'Clementine') {
				if (source.volatiles['flipped']) {
					source.removeVolatile('flipped');
					this.add(`c:|${getName('Kennedy')}|┬──┬◡ﾉ(° -°ﾉ)`);
				} else {
					source.addVolatile('flipped', target, this.effect);
					this.add(`c:|${getName('Kennedy')}|(╯°o°）╯︵ ┻━┻`);
				}
			}
			if (target.species.id === 'cinderacegmax' && !target.terastallized) {
				this.add('-start', target, 'typechange', target.getTypes(true, true).join('/'), '[silent]');
			}
		},
		onSwitchOut() {
			this.add(`c:|${getName('Kennedy')}|Stream some Taylor Swift whilst I’m gone!`); // TODO replace
		},
		onFoeSwitchIn(pokemon) {
			switch ((pokemon.illusion || pokemon).name) {
			case 'Links':
				this.add(`c:|${getName('Kennedy')}|Blue and white shite, blue and white shite, hello, hello.`);
				this.add(`c:|${getName('Kennedy')}|Blue and white shite, blue and white shite, hello, hello.`);
				break;
			case 'Clementine':
				this.add(`c:|${getName('Kennedy')}|Not the Fr*nch....`);
				break;
			case 'Kris':
				this.add(`c:|${getName('Kennedy')}|fuck that`);
				this.effectState.target.faint();
				this.add('message', 'Kennedy fainted mysteriously.....');
				break;
			}
		},
		onFaint() {
			this.add(`c:|${getName('Kennedy')}|FUCK OFF, REALLY?????`);
		},
		onSourceAfterFaint(length, target, source, effect) {
			const message = this.sample(['ALLEZZZZZ', 'VAMOSSSSS', 'FORZAAAAA', 'LET\'S GOOOOO']);
			this.add(`c:|${getName('Kennedy')}|${message}`);
			if (source.species.id === 'cinderace' && this.field.pseudoWeather['anfieldatmosphere'] &&
				!source.transformed && effect?.effectType === 'Move' && source.hp && source.side.foePokemonLeft()) {
				this.add('-activate', source, 'ability: Battle Bond');
				source.formeChange('Cinderace-Gmax', this.effect, true);
				source.baseMaxhp = Math.floor(Math.floor(
					2 * source.species.baseStats['hp'] + source.set.ivs['hp'] + Math.floor(source.set.evs['hp'] / 4) + 100
				) * source.level / 100 + 10);
				const newMaxHP = source.volatiles['dynamax'] ? (2 * source.baseMaxhp) : source.baseMaxhp;
				source.hp = newMaxHP - (source.maxhp - source.hp);
				source.maxhp = newMaxHP;
				this.add('-heal', source, source.getHealth, '[silent]');
			}
		},
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add(`c:|${getName('Kennedy')}|NAAA FUCK OFF, I'd rather be dead`);
				pokemon.faint();
				this.add('message', 'Kennedy would have been infatuated but fainted mysteriously');
			}
		},
		onSourceCriticalHit(pokemon, source, move) {
			this.add(`c:|${getName('Kennedy')}|LOOOOOOL ffs`);
		},
		onFlinch(pokemon) {
			if (pokemon.illusion) return;
			this.add(`c:|${getName('Kennedy')}|LOOOOOOL ffs`);
		},
	},
	kris: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Kris')}|ok`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Kris')}|ok`);
		},
		onFaint() {
			this.add(`c:|${getName('Kris')}|ok`);
		},
	},
	krytocon: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Krytocon')}|:3`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Krytocon')}|PartMan is a nerd`);
		},
		onFaint() {
			this.add(`c:|${getName('Krytocon')}|D:`);
		},
	},
	lasen: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Lasen')}|That's a Hungarian yield sign, easy Budapest guess.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Lasen')}|Will give QC 2/2 after implementation.`);
		},
		onFaint() {
			this.add(`c:|${getName('Lasen')}|I'm out and NOT about...`);
		},
	},
	loethalion: {
		noCopy: true,
		onStart(pokemon) {
			const foe = enemyStaff(pokemon);
			if (foe === 'WigglyTree') {
				this.add(`c:|${getName('Loethalion')}|No, I'm not drawing Dialga on a bike again`);
			} else if (foe === 'Swiffix') {
				this.add(`c:|${getName('Loethalion')}|Oh hi Stinky`);
			} else if (foe === 'Mex') {
				this.add(`c:|${getName('Loethalion')}|In spain without the A`);
			} else if (foe === 'Billo') {
				this.add(`c:|${getName('Loethalion')}|So your saying I can't ban myself?`);
			} else if (foe === 'Clefable') {
				this.add(`c:|${getName('Loethalion')}|But what if I hack a tiny bit?`);
			} else if (foe === 'Lunell') {
				this.add(`c:|${getName('Loethalion')}|We bean posting?`);
			} else if (foe === 'Ciran') {
				this.add(`c:|${getName('Loethalion')}|So I have another great piplup drawing idea :>`);
			} else {
				this.add(`c:|${getName('Loethalion')}| ...from Zero`);
			}
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (enemyStaff(source) === 'Swiffix') {
				this.add(`c:|${getName('Loethalion')}|It's still pfp...`);
			}
		},
		onSwitchOut(pokemon) {
			this.add(`c:|${getName('Loethalion')}| I don't remember why I'm even here __walks out the room__`);
		},
		onFaint() {
			this.add(`c:|${getName('Loethalion')}|__Wheezing laugh__`);
		},
	},
	lumari: {
		noCopy: true,
		// quotes added later
		onSwitchOut(pokemon) {
			if (pokemon.illusion) return;
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		innateName: "Regenerator",
		shortDesc: "User will heal 33% of their max HP on switch-out.",
	},
	madmonty: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Mad Monty')}|I'm here to make sure you don't get eaten by llamas!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Mad Monty')}|Ope! The Library's on fire. Gotta tend to that for a sec...`);
		},
		onFaint() {
			this.add(`c:|${getName('Mad Monty')}|Well great. Now the llamas are gonna come back. Is that what you wanted?`);
		},
	},
	mathy: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Mathy')}|Nooooo i broke tera again`);
		},
		onSwitchOut(pokemon) {
			this.add(`c:|${getName('Mathy')}|whatever i'll make ${enemyStaff(pokemon)} fix it`);
		},
		onFaint() {
			this.add(`c:|${getName('Mathy')}|thanks for making my job harder :/`);
		},
	},
	meteordash: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Meteordash')}|hi`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Meteordash')}|oh`);
		},
		onFaint() {
			this.add(`c:|${getName('Meteordash')}|man.`);
		},
	},
	mex: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Mex')}|Time to make the donuts.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Mex')}|Brb, there's a Dialga raid.`);
		},
		onFaint() {
			this.add(`c:|${getName('Mex')}|pain.`);
		},
	},
	mia: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Mia')}|git pull ps mia`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Mia')}|git switch`);
		},
		onFaint() {
			this.add(`c:|${getName('Mia')}|git checkout --detach HEAD && git commit -m "war crimes"`);
		},
	},
	ney: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Ney')}|Hi I'm Ney. I love mischiefs.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Ney')}|Unloading more tricks.`);
		},
		onFaint() {
			this.add(`c:|${getName('Ney')}|How long am I banned for?`);
		},
	},
	notater517: {
		noCopy: true,
		// phrases TBD
	},
	peary: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Peary')}|This bout to grind yalls gears`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Peary')}|Did my Part, no Man`);
		},
		onFaint() {
			this.add(`c:|${getName('Peary')}|Blood all on my gears... damn`);
		},
	},
	phoopes: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('phoopes')}|phoopes! (There It Is)`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('phoopes')}|phoopes! (There He Goes)`);
		},
		onFaint() {
			this.add(`c:|${getName('phoopes')}|Jynx! Knock on wood`);
		},
	},
	pyro: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('PYRO')}|and I'm your host, the Supervillain`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('PYRO')}|Operation: Lifesaver is in effect, as of right now`);
		},
		onFaint() {
			this.add(`c:|${getName('PYRO')}|Just remember ALL CAPS when you spell the man name...`);
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType === 'Move') {
				if (effect.id === 'meatgrinder') {
					this.add(`c:|${getName('PYRO')}|Tripping off the beat kinda, dripping off the meat grinder`);
					return;
				}
				if (!source.m.msgPlayed) {
					this.add(`c:|${getName('PYRO')}|This Villain was a ruthless mass conqueror, with aspirations to dominate the universe`);
					source.m.msgPlayed = true;
				}
			}
		},
	},
	returntomonkey: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('ReturnToMonkey')}|Where banana`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('ReturnToMonkey')}|**Monkey Scream**`);
		},
		onFaint() {
			this.add(`c:|${getName('ReturnToMonkey')}|Reject the humanity...if you dare...`);
		},
	},
	rumia: {
		noCopy: true,
		onStart(pokemon) {
			if (enemyStaff(pokemon) === 'umowu') {
				this.add(`c:|${getName('Rumia')}|OMG who could that be (⁠●⁠♡⁠∀⁠♡⁠)`);
			} else {
				this.add(`c:|${getName('Rumia')}|is the mon in front of me the edible kind?`);
			}
		},
		onSwitchOut(pokemon) {
			if (enemyStaff(pokemon) === 'umowu') {
				this.add(`c:|${getName('Rumia')}|i cant bring myself to do this...`);
			} else {
				this.add(`c:|${getName('Rumia')}|brb ^_^`);
			}
		},
		onFaint(pokemon) {
			if (enemyStaff(pokemon) === 'umowu') {
				this.add(`c:|${getName('Rumia')}|this is the best way to go out...`);
			} else {
				this.add(`c:|${getName('Rumia')}|is that sooooo...`);
			}
		},
	},
	scotteh: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Scotteh')}|\`\`Compilation completed successfully. Executing...\`\``);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Scotteh')}|\`\`Execution temporarily paused.\`\``);
		},
		onFaint() {
			this.add(`c:|${getName('Scotteh')}|\`\`Segmentation fault (core dumped)\`\``);
		},
	},
	sharpclaw: {
		noCopy: true,
		onStart(pokemon) {
			if (pokemon.species.name === 'Sneasel') {
				this.add(`c:|${getName('sharp_claw')}|Hi, I'm Tumble! hf :D`);
			} else {
				this.add(`c:|${getName('sharp_claw')}|Hi, I'm Rough! gl >:)`);
			}
		},
		onSwitchOut(pokemon) {
			if (pokemon.species.name === 'Sneasel') {
				this.add(`c:|${getName('sharp_claw')}|brb, getting my brother :3`);
				if (pokemon.illusion) return;
				changeSet(this, pokemon, ssbSets['sharp_claw-Rough']);
			} else {
				this.add(`c:|${getName('sharp_claw')}|brb, getting my sister C:`);
				if (pokemon.illusion) return;
				changeSet(this, pokemon, ssbSets['sharp_claw']);
			}
		},
		onFaint(pokemon) {
			if (pokemon.species.name === 'Sneasel') {
				this.add(`c:|${getName('sharp_claw')}|ur no fun ;~;`);
			} else {
				this.add(`c:|${getName('sharp_claw')}|ur no fun T_T`);
			}
		},
		innateName: "Rough and Tumble",
		shortDesc: "Changes Sneasel forme on switch out.",
	},
	snake: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('snake')}|CAP Concept: Pure Utility Pokemon`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('snake')}|CAP is a community focused project that creates singular Pokemon through structured Smogon based discussion threads. We define a concept to build around and proceed through various stages to determine typing, ability, stats, and movepool to complement that concept. We also run stages to determine a CAP's art, name, Pokedex entry, and sprite, so even if you're not a competitive Pokemon person you can get involved. At the end of each process we implement each CAP here on Pokemon Showdown!, where they are made available with the rest of our creations in the CAP metagame, found under 'S/V Singles'.`);
		},
		onFaint() {
			this.add(`c:|${getName('snake')}|CAP does not accept personal creations. This refers to any idea for a Pokemon that already has predefined typing, stats, abilities, movepool, name, art, pokedex entries, weight, height, or even generic themes such as "rabbit" or "angry". These facets of a Pokemon are all decided through community discussion in CAP during the CAP process. If you think you have an idea for a Pokemon that does not define these features, you may have a concept. CAP bases our Pokemon around concepts that look to explore the mechanics behind Pokemon and we take open submissions whenever we start a new project. Examples of past concepts include Perfect Sketch User, Momentum, Trapping mechanics, delayed move user, and weather enabler.`);
		},
	},
	spoouser: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('spoo')}|heyy girlypop`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('spoo')}|oh nah`);
		},
		onFaint() {
			this.add(`c:|${getName('spoo')}|dies`);
		},
	},
	swiffix: {
		noCopy: true,
		onStart() {
			const img = "https://cdn.discordapp.com/emojis/995771554904408234.png?size=64&quality=lossless";
			this.add(`c:|${getName('Swiffix')}|/html <img src="${img}" width="50" height="50" />`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Swiffix')}|brb, gonna get some ketchup for my pizza`);
		},
		onFaint() {
			this.add(`c:|${getName('Swiffix')}|Remember: it's pp, not pfp!`);
		},
	},
	theia: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c:|${getName('Theia')}|gm ${enemyStaff(pokemon)}`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Theia')}|(cat)ch you later`);
		},
		onFaint() {
			this.add(`c:|${getName('Theia')}|gn`);
		},
	},
	thejesucristoosama: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('TheJesucristoOsAma')}|In the name of the Father, the Son and the Holy Spirit. I bless you, Amen.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('TheJesucristoOsAma')}|Oh well, I think it's time to call my apostles.`);
		},
		onFaint() {
			this.add(`c:|${getName('TheJesucristoOsAma')}|And that's how I've died for the third time, I'll go to host a game at eventos.`);
		},
	},
	traceuser: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('trace')}|I'm both the beginning and the end.`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('trace')}|Why does the violence never end?`);
		},
		onFaint() {
			this.add(`c:|${getName('trace')}|How disappointingly short a dream lasts.`);
		},
	},
	ut: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('UT')}|I just hope both teams have fun!`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('UT')}|this path is reckless`);
		},
		onFaint() {
			this.add(`c:|${getName('UT')}|screaming, crying, perfect storm`);
		},
	},
	umowu: {
		noCopy: true,
		onStart(pokemon) {
			const foe = enemyStaff(pokemon);
			if (foe === 'Rumia') {
				this.add(`c:|${getName('umowu ✮彡')}|You come around here often?`);
			} else if (foe === 'spoo') {
				this.add(`c:|${getName('umowu ✮彡')}|Big bald head spotted...`);
			} else if (foe === 'ausma') {
				this.add(`c:|${getName('umowu ✮彡')}|The weekly Smogon furry convention starts NOW`);
			} else if (foe === 'Peary') {
				this.add(`c:|${getName('umowu ✮彡')}|Any arters or culturers?`);
			} else {
				this.add(`c:|${getName('umowu ✮彡')}|Hey, howzit!`);
			}
		},
		onSwitchOut() {
			const gif = "https://cdn.discordapp.com/emojis/659987060794327051.gif?size=160&quality=lossless";
			this.add(`c:|${getName('umowu ✮彡')}|/html <img src="${gif}" width="50" height="50" />`);
		},
		onFaint() {
			this.add(`c:|${getName('umowu ✮彡')}|Tell.. My wife... She STINKS!!`);
		},
	},
	venous: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Venous')}|bro the flute on stal is bonkers`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('2013 hindi room')}|when i said tine wins i didnt mean now`);
			this.add(`c:|${getName('Venous')}|dw watch this`);
		},
		onFaint() {
			this.add(`c:|${getName('Venous')}|teachin bitches how to swim`);
		},
	},
	violet: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Vio͜͡let')}|...Heed my words. I am Malenia, Blade of Miquella. And I have never known defeat.`);
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect?.effectType === 'Move') {
				if (source?.m.phaseChange) {
					this.add(`c:|${getName('Vio͜͡let')}|Let your flesh be consumed. By the scarlet rot.`);
				} else {
					this.add(`c:|${getName('Vio͜͡let')}|I am Malenia, Blade of Miquella.`);
				}
			}
		},
		onFaint() {
			this.add(`c:|${getName('Vio͜͡let')}|Your strength, extraordinary… The mark... of a true Lord…`);
		},
	},
	warriorgallade: {
		noCopy: true,
		onStart(pokemon) {
			this.add(`c:|${getName('WarriorGallade')}|i wanted to proc berries, but it seems that i was better at proc rastinating instead. nom nom nom.`);
			// innate
			if (pokemon.illusion) return;
			pokemon.abilityState.gluttony = true;
			this.add('-activate', pokemon, 'ability: TBA');
			this.boost({def: 1, spd: 1}, pokemon);
		},
		onSwitchOut() {
			this.add(`c:|${getName('WarriorGallade')}|amidst this tactical retreat, you didn't think i forgot about the pokeradar, did you? you can bet that my return with even more questions will be __eventful__ :3`);
		},
		onFaint() {
			this.add(`c:|${getName('WarriorGallade')}|a wig flew, and now i must bid you adieu. farewell my berries accrued, for this is the end of my etude.`);
		},
		onSourceAfterFaint() {
			this.add(`c:|${getName('WarriorGallade')}|Triumphant through trouncing tough, tenacious threats today, though testing 212 takeovers tarry. Theorizing these techniques tends to torrid, terribly tiresome tabulations, therefore torrential tactics traverse thorough thoughts.`);
		},
		innateName: "TBA",
		shortDesc: "Gluttony + Thick Fat + Neuroforce + +1 Def/Sp. Def boost.",
		onDamage(item, pokemon) {
			if (pokemon.illusion) return;
			pokemon.abilityState.gluttony = true;
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (defender.illusion) return;
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (defender.illusion) return;
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onModifyDamage(damage, source, target, move) {
			if (source.illusion) return;
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([5120, 4096]);
			}
		},
	},
	wigglytree: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('WigglyTree')}|hi ur qt :3`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('WigglyTree')}|Is that a watering can I see?`);
		},
		onFaint() {
			this.add(`c:|${getName('WigglyTree')}|Keep wiggling!`);
		},
	},
	yellowpaint: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Yellow Paint')}|cheers`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Yellow Paint')}|luckynbad`);
		},
		onFaint() {
			this.add(`c:|${getName('Yellow Paint')}|The canvas is filled with different screams.`);
		},
		onModifyMove(move) {
			if (move.id === 'iondeluge') {
				move.onHitField = function () {
					this.add(`c:|${getName('Yellow Paint')}|Paint it Yellow!`);
				};
			}
		},
	},
	zalm: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('Zalm')}|<(:O)00000>`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('Zalm')}|brb gonna check if my lasagne didn't explode e-e`);
		},
		onFaint() {
			this.add(`c:|${getName('Zalm')}|I should have picked an actual fish pokémon like veluza instead...`);
		},
	},
	zee: {
		noCopy: true,
		onStart() {
			this.add(`c:|${getName('zee')}|So is this your first VGC tournament?`);
		},
		onSwitchOut() {
			this.add(`c:|${getName('zee')}|Sorry, I've got a plane to catch!`);
		},
		onFaint() {
			this.add(`c:|${getName('zee')}|Hey everyone it's been a great time working with you all in this Super Staff Bros battle but I think it's the right time for me to step down. Thank you all and see you around.`);
		},
	},

	// Custom effects
	// Elly
	stormsurge: {
		name: 'StormSurge',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('damprock')) {
				return 8;
			}
			return 5;
		},
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move?.effectType === 'Move' && move.category !== 'Status' && type === 'Flying' && typeMod > 0) {
				this.add('-fieldactivate', 'Storm Surge');
				return 0;
			}
		},
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella')) return;
			if (move.flags['wind']) {
				this.debug('Storm Surge wind boost');
				return this.chainModify(1.2);
			}
			if (move.type === 'Water') {
				this.debug('Storm Surge water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('Storm Surge fire suppress');
				return this.chainModify(0.5);
			}
		},
		onAccuracy(accuracy, attacker, defender, move) {
			if (move?.flags['wind'] && !attacker.hasItem('utilityumbrella')) return true;
			return accuracy;
		},
		onFieldStart(battle, source, effect) {
			if (effect?.effectType === 'Ability') {
				if (this.gen <= 5) this.effectState.duration = 0;
				this.add('-weather', 'StormSurge', '[from] ability: ' + effect.name, '[of] ' + source);
			} else {
				this.add('-weather', 'StormSurge');
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasItem('utilityumbrella')) return;
			if (type === 'frz') return false;
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'StormSurge', '[upkeep]');
			this.eachEvent('Weather');
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	// HoeenHero
	virus: {
		name: 'Virus',
		onStart(target, source, sourceEffect) {
			this.effectState.stage = 0;
			this.add('-start', target, 'virus');
		},
		onResidualOrder: 9,
		onResidual(pokemon) {
			if (this.effectState.stage < 15) {
				this.effectState.stage++;
			}
			this.damage(this.clampIntRange(pokemon.baseMaxhp / 16, 1) * this.effectState.stage);
		},
	},

	// kenn
	deserteddunes: {
		name: 'DesertedDunes',
		effectType: 'Weather',
		duration: 0,
		onEffectivenessPriority: -1,
		onEffectiveness(typeMod, target, type, move) {
			if (move?.effectType === 'Move' && move.category !== 'Status' && type === 'Rock' && typeMod > 0) {
				this.add('-fieldactivate', 'Deserted Dunes');
				return 0;
			}
		},
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('deserteddunes')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'DesertedDunes', '[from] ability: ' + effect.name, '[of] ' + source);
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'DesertedDunes', '[upkeep]');
			this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 16);
		},
		onFieldEnd() {
			this.add('-weather', 'none');
		},
	},

	// Effects needed to be overriden for things to happen
	attract: {
		onStart(pokemon, source, effect) {
			if (!(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M')) {
				if (effect.name !== 'The Love Of Christ') {
					this.debug('incompatible gender');
					return false;
				}
			}
			if (!this.runEvent('Attract', pokemon, source)) {
				this.debug('Attract event failed');
				return false;
			}

			if (effect.name === 'Cute Charm') {
				this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', '[of] ' + source);
			} else if (effect.name === 'Destiny Knot') {
				this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', '[of] ' + source);
			} else {
				this.add('-start', pokemon, 'Attract');
			}
		},
		onUpdate(pokemon) {
			if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
				this.debug('Removing Attract volatile on ' + pokemon);
				pokemon.removeVolatile('attract');
			}
		},
		onBeforeMovePriority: 2,
		onBeforeMove(pokemon, target, move) {
			this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
			if (this.randomChance(1, 2)) {
				this.add('cant', pokemon, 'Attract');
				return false;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, 'Attract', '[silent]');
		},
	},
	raindance: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella') || move.id === 'geyserblast') return;
			if (move.type === 'Water') {
				this.debug('rain water boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Fire') {
				this.debug('rain fire suppress');
				return this.chainModify(0.5);
			}
		},
	},
	sunnyday: {
		inherit: true,
		onWeatherModifyDamage(damage, attacker, defender, move) {
			if (defender.hasItem('utilityumbrella') || move.id === 'geyserblast') return;
			if (move.type === 'Fire') {
				this.debug('Sunny Day fire boost');
				return this.chainModify(1.5);
			}
			if (move.type === 'Water' && move.id !== 'hydrosteam') {
				this.debug('Sunny Day water suppress');
				return this.chainModify(0.5);
			}
		},
	},
};
