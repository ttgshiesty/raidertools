const e = "/items";
const i = [
  {
    id: "bettina",
    name: "Bettina",
    rarity: "Epic",
    category: "Weapon",
    description: "Epic weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Advanced Mechanical Components", "3x Heavy Gun Parts", "3x Canister"],
    icon: `${e}/bettina_blueprint.webp`
  },
  {
    id: "blue-light-stick",
    name: "Blue Light Stick",
    rarity: "Common",
    category: "Quick Use",
    description: "Common quick use item",
    craftedAt: "Utility Station 1",
    recipe: ["3x Chemicals"],
    icon: `${e}/blue_light_stick_blueprint.webp`
  },
  {
    id: "aphelion",
    name: "Aphelion",
    rarity: "Legendary",
    category: "Weapon",
    description: "Legendary weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Magnetic Accelerator", "3x Complex Gun Parts", "1x Matriarch Reactor"],
    icon: `${e}/aphelion_blueprint.webp`
  },
  {
    id: "combat-mk3-flanking",
    name: "Combat Mk. 3 (Flanking)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/combat_mk3_flanking_blueprint.webp`
  },
  {
    id: "combat-mk3-aggressive",
    name: "Combat Mk. 3 (Aggressive)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/combat_mk3_aggressive_blueprint.webp`
  },
  {
    id: "complex-gun-parts",
    name: "Complex Gun Parts",
    rarity: "Epic",
    category: "Material",
    description: "Epic crafting material",
    craftedAt: "Refiner 3",
    recipe: ["2x Light Gun Parts", "2x Medium Gun Parts", "2x Heavy Gun Parts"],
    icon: `${e}/complex_gun_parts_blueprint.webp`
  },
  {
    id: "fireworks-box",
    name: "Fireworks Box",
    rarity: "Rare",
    category: "Quick Use",
    description: "Rare quick use item",
    craftedAt: "Explosives Station 2",
    recipe: ["1x Explosive Compound", "3x Pop Trigger"],
    icon: `${e}/fireworks_box_blueprint.webp`
  },
  {
    id: "gas-mine",
    name: "Gas Mine",
    rarity: "Common",
    category: "Mine",
    description: "Common mine",
    craftedAt: "Explosives Station 1",
    recipe: ["4x Chemicals", "2x Rubber Parts"],
    icon: `${e}/gas_mine_blueprint.webp`
  },
  {
    id: "green-light-stick",
    name: "Green Light Stick",
    rarity: "Common",
    category: "Quick Use",
    description: "Common quick use item",
    craftedAt: "Utility Station 1",
    recipe: ["3x Chemicals"],
    icon: `${e}/green_light_stick_blueprint.webp`
  },
  {
    id: "pulse-mine",
    name: "Pulse Mine",
    rarity: "Uncommon",
    category: "Mine",
    description: "Uncommon mine",
    craftedAt: "Explosives Station 1",
    recipe: ["1x Crude Explosives", "1x Wires"],
    icon: `${e}/pulse_mine_blueprint.webp`
  },
  {
    id: "seeker-grenade",
    name: "Seeker Grenade",
    rarity: "Uncommon",
    category: "Grenade",
    description: "Uncommon grenade",
    craftedAt: "Explosives Station 1",
    recipe: ["1x Crude Explosives", "2x ARC Alloy"],
    icon: `${e}/seeker_grenade_blueprint.webp`
  },
  {
    id: "looting-mk3-survivor",
    name: "Looting Mk. 3 (Survivor)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/looting_mk3_survivor_blueprint.webp`
  },
  {
    id: "angled-grip-ii",
    name: "Angled Grip II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Angled Grip II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "3x Duct Tape"],
    icon: `${e}/angled_grip_ii_blueprint.webp`
  },
  {
    id: "angled-grip-iii",
    name: "Angled Grip III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Angled Grip III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Duct Tape"],
    icon: `${e}/angled_grip_iii_blueprint.webp`
  },
  {
    id: "hullcracker",
    name: "Hullcracker",
    rarity: "Epic",
    category: "Weapon",
    description: "Epic weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["1x Magnetic Accelerator", "3x Heavy Gun Parts", "1x Exodus Modules"],
    icon: `${e}/hullcracker_blueprint.webp`
  },
  {
    id: "anvil",
    name: "Anvil",
    rarity: "Uncommon",
    category: "Weapon",
    description: "Uncommon weapon",
    craftedAt: "Gunsmith 2",
    recipe: ["5x Mechanical Components", "5x Simple Gun Parts"],
    icon: `${e}/anvil_blueprint.webp`
  },
  {
    id: "barricade-kit",
    name: "Barricade Kit",
    rarity: "Uncommon",
    category: "Quick Use",
    description: "Uncommon quick use item",
    craftedAt: "Utility Station 2",
    recipe: ["1x Mechanical Components"],
    icon: `${e}/barricade_kit_blueprint.webp`
  },
  {
    id: "blaze-grenade",
    name: "Blaze Grenade",
    rarity: "Rare",
    category: "Grenade",
    description: "Rare grenade",
    craftedAt: "Explosives Station 3",
    recipe: ["1x Explosive Compound", "2x Oil"],
    icon: `${e}/blaze_grenade_blueprint.webp`
  },
  {
    id: "bobcat",
    name: "Bobcat",
    rarity: "Epic",
    category: "Weapon",
    description: "Epic weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Advanced Mechanical Components", "3x Light Gun Parts"],
    icon: `${e}/bobcat_blueprint.webp`
  },
  {
    id: "burletta",
    name: "Burletta",
    rarity: "Uncommon",
    category: "Weapon",
    description: "Uncommon weapon",
    craftedAt: "Gunsmith 1",
    recipe: ["3x Mechanical Components", "3x Simple Gun Parts"],
    icon: `${e}/burletta_blueprint.webp`
  },
  {
    id: "compensator-ii",
    name: "Compensator II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Compensator II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "4x Wires"],
    icon: `${e}/compensator_ii_blueprint.webp`
  },
  {
    id: "compensator-iii",
    name: "Compensator III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Compensator III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "8x Wires"],
    icon: `${e}/compensator_iii_blueprint.webp`
  },
  {
    id: "defibrillator",
    name: "Defibrillator",
    rarity: "Rare",
    category: "Quick Use",
    description: "Rare quick use item",
    craftedAt: "Medical Lab 2",
    recipe: ["9x Plastic Parts", "1x Moss"],
    icon: `${e}/defibrillator_blueprint.webp`
  },
  {
    id: "equalizer",
    name: "Equalizer",
    rarity: "Legendary",
    category: "Weapon",
    description: "Legendary weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Magnetic Accelerator", "3x Complex Gun Parts", "1x Queen Reactor"],
    icon: `${e}/equalizer_blueprint.webp`
  },
  {
    id: "extended-barrel-ii",
    name: "Extended Barrel II",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Extended Barrel II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["3x Mechanical Components", "6x Wires"],
    icon: `${e}/extended_barrel_ii_blueprint.webp`
  },
  {
    id: "extended-barrel-iii",
    name: "Extended Barrel III",
    rarity: "Epic",
    category: "Mod",
    description: "Lets you craft Extended Barrel III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "8x Wires"],
    icon: `${e}/extended_barrel_iii_blueprint.webp`
  },
  {
    id: "extended-light-mag-ii",
    name: "Extended Light Mag II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Extended Light Mag II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "3x Steel Spring"],
    icon: `${e}/extended_light_mag_ii_blueprint.webp`
  },
  {
    id: "extended-light-mag-iii",
    name: "Extended Light Mag III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Extended Light Mag III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Steel Spring"],
    icon: `${e}/extended_light_mag_iii_blueprint.webp`
  },
  {
    id: "extended-medium-mag-ii",
    name: "Extended Medium Mag II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Extended Medium Mag II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "3x Steel Spring"],
    icon: `${e}/extended_medium_mag_ii_blueprint.webp`
  },
  {
    id: "extended-medium-mag-iii",
    name: "Extended Medium Mag III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Extended Medium Mag III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Steel Spring"],
    icon: `${e}/extended_medium_mag_iii_blueprint.webp`
  },
  {
    id: "extended-shotgun-mag-ii",
    name: "Extended Shotgun Mag II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Extended Shotgun Mag II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "3x Steel Spring"],
    icon: `${e}/extended_shotgun_mag_ii_blueprint.webp`
  },
  {
    id: "extended-shotgun-mag-iii",
    name: "Extended Shotgun Mag III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Extended Shotgun Mag III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Steel Spring"],
    icon: `${e}/extended_shotgun_mag_iii_blueprint.webp`
  },
  {
    id: "remote-raider-flare",
    name: "Remote Raider Flare",
    rarity: "Common",
    category: "Quick Use",
    description: "Common quick use item",
    craftedAt: "Utility Station 1",
    recipe: ["2x Chemicals", "4x Rubber Parts"],
    icon: `${e}/remote_raider_flare_blueprint.webp`
  },
  {
    id: "heavy-gun-parts",
    name: "Heavy Gun Parts",
    rarity: "Rare",
    category: "Material",
    description: "Rare crafting material",
    craftedAt: "Refiner 2",
    recipe: ["4x Simple Gun Parts"],
    icon: `${e}/heavy_gun_parts_blueprint.webp`
  },
  {
    id: "venator",
    name: "Venator",
    rarity: "Rare",
    category: "Weapon",
    description: "Rare weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Advanced Mechanical Components", "3x Medium Gun Parts", "5x Magnet"],
    icon: `${e}/venator_blueprint.webp`
  },
  {
    id: "il-toro",
    name: "Il Toro",
    rarity: "Uncommon",
    category: "Weapon",
    description: "Uncommon weapon",
    craftedAt: "Gunsmith 1",
    recipe: ["5x Mechanical Components", "6x Simple Gun Parts"],
    icon: `${e}/il_toro_blueprint.webp`
  },
  {
    id: "jolt-mine",
    name: "Jolt Mine",
    rarity: "Rare",
    category: "Mine",
    description: "Rare mine",
    craftedAt: "Explosives Station 2",
    recipe: ["1x Electrical Components", "1x Battery"],
    icon: `${e}/jolt_mine_blueprint.webp`
  },
  {
    id: "explosive-mine",
    name: "Explosive Mine",
    rarity: "Rare",
    category: "Mine",
    description: "Rare mine",
    craftedAt: "Explosives Station 3",
    recipe: ["1x Explosive Compound", "1x Sensors"],
    icon: `${e}/explosive_mine_blueprint.webp`
  },
  {
    id: "jupiter",
    name: "Jupiter",
    rarity: "Legendary",
    category: "Weapon",
    description: "Legendary weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Magnetic Accelerator", "3x Complex Gun Parts", "1x Queen Reactor"],
    icon: `${e}/jupiter_blueprint.webp`
  },
  {
    id: "light-gun-parts",
    name: "Light Gun Parts",
    rarity: "Rare",
    category: "Material",
    description: "Rare crafting material",
    craftedAt: "Refiner 2",
    recipe: ["4x Simple Gun Parts"],
    icon: `${e}/light_gun_parts_blueprint.webp`
  },
  {
    id: "lightweight-stock",
    name: "Lightweight Stock",
    rarity: "Epic",
    category: "Mod",
    description: "Lets you craft Lightweight Stock mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Duct Tape"],
    icon: `${e}/lightweight_stock_blueprint.webp`
  },
  {
    id: "lure-grenade",
    name: "Lure Grenade",
    rarity: "Uncommon",
    category: "Grenade",
    description: "Uncommon grenade",
    craftedAt: "Utility Station 2",
    recipe: ["1x Speaker Component", "1x Electrical Components"],
    icon: `${e}/lure_grenade_blueprint.webp`
  },
  {
    id: "medium-gun-parts",
    name: "Medium Gun Parts",
    rarity: "Rare",
    category: "Material",
    description: "Rare crafting material",
    craftedAt: "Refiner 2",
    recipe: ["4x Simple Gun Parts"],
    icon: `${e}/medium_gun_parts_blueprint.webp`
  },
  {
    id: "torrente",
    name: "Torrente",
    rarity: "Rare",
    category: "Weapon",
    description: "Rare weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Advanced Mechanical Components", "3x Medium Gun Parts", "6x Steel Spring"],
    icon: `${e}/torrente_blueprint.webp`
  },
  {
    id: "muzzle-brake-ii",
    name: "Muzzle Brake II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Muzzle Brake II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "4x Wires"],
    icon: `${e}/muzzle_brake_ii_blueprint.webp`
  },
  {
    id: "muzzle-brake-iii",
    name: "Muzzle Brake III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Muzzle Brake III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "8x Wires"],
    icon: `${e}/muzzle_brake_iii_blueprint.webp`
  },
  {
    id: "padded-stock",
    name: "Padded Stock",
    rarity: "Epic",
    category: "Mod",
    description: "Lets you craft Padded Stock mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Duct Tape"],
    icon: `${e}/padded_stock_blueprint.webp`
  },
  {
    id: "shotgun-choke-ii",
    name: "Shotgun Choke II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Shotgun Choke II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "4x Wires"],
    icon: `${e}/shotgun_choke_ii_blueprint.webp`
  },
  {
    id: "shotgun-choke-iii",
    name: "Shotgun Choke III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Shotgun Choke III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "8x Wires"],
    icon: `${e}/shotgun_choke_iii_blueprint.webp`
  },
  {
    id: "shotgun-silencer",
    name: "Shotgun Silencer",
    rarity: "Epic",
    category: "Mod",
    description: "Lets you craft Shotgun Silencer mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "8x Wires"],
    icon: `${e}/shotgun_silencer_blueprint.webp`
  },
  {
    id: "showstopper",
    name: "Showstopper",
    rarity: "Rare",
    category: "Grenade",
    description: "Rare grenade",
    craftedAt: "Explosives Station 3",
    recipe: ["1x Advanced Electrical Components", "1x Voltage Converter"],
    icon: `${e}/showstopper_blueprint.webp`
  },
  {
    id: "silencer-i",
    name: "Silencer I",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Silencer I mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "4x Wires"],
    icon: `${e}/silencer_i_blueprint.webp`
  },
  {
    id: "silencer-ii",
    name: "Silencer II",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Silencer II mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "8x Wires"],
    icon: `${e}/silencer_ii_blueprint.webp`
  },
  {
    id: "snap-hook",
    name: "Snap Hook",
    rarity: "Legendary",
    category: "Quick Use",
    description: "Legendary quick use item",
    craftedAt: "Utility Station 3",
    recipe: ["2x Power Rod", "3x Rope", "1x Exodus Modules"],
    icon: `${e}/snap_hook_blueprint.webp`
  },
  {
    id: "stable-stock-ii",
    name: "Stable Stock II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Stable Stock II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "3x Duct Tape"],
    icon: `${e}/stable_stock_ii_blueprint.webp`
  },
  {
    id: "stable-stock-iii",
    name: "Stable Stock III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Stable Stock III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Duct Tape"],
    icon: `${e}/stable_stock_iii_blueprint.webp`
  },
  {
    id: "tagging-grenade",
    name: "Tagging Grenade",
    rarity: "Rare",
    category: "Grenade",
    description: "Rare grenade",
    craftedAt: "Utility Station 3",
    recipe: ["1x Electrical Components", "1x Sensors"],
    icon: `${e}/tagging_grenade_blueprint.webp`
  },
  {
    id: "tempest",
    name: "Tempest",
    rarity: "Epic",
    category: "Weapon",
    description: "Epic weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Advanced Mechanical Components", "3x Medium Gun Parts", "3x Canister"],
    icon: `${e}/tempest_blueprint.webp`
  },
  {
    id: "trigger-nade",
    name: "Trigger 'Nade",
    rarity: "Rare",
    category: "Grenade",
    description: "Rare grenade",
    craftedAt: "Explosives Station 2",
    recipe: ["2x Crude Explosives", "1x Processor"],
    icon: `${e}/trigger_nade_blueprint.webp`
  },
  {
    id: "vertical-grip-ii",
    name: "Vertical Grip II",
    rarity: "Uncommon",
    category: "Mod",
    description: "Lets you craft Vertical Grip II mod",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Mechanical Components", "3x Duct Tape"],
    icon: `${e}/vertical_grip_ii_blueprint.webp`
  },
  {
    id: "vertical-grip-iii",
    name: "Vertical Grip III",
    rarity: "Rare",
    category: "Mod",
    description: "Lets you craft Vertical Grip III mod",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Mod Components", "5x Duct Tape"],
    icon: `${e}/vertical_grip_iii_blueprint.webp`
  },
  {
    id: "vita-shot",
    name: "Vita Shot",
    rarity: "Rare",
    category: "Quick Use",
    description: "Rare quick use item",
    craftedAt: "Medical Lab 3",
    recipe: ["2x Antiseptic", "1x Syringe"],
    icon: `${e}/vita_shot_blueprint.webp`
  },
  {
    id: "vita-spray",
    name: "Vita Spray",
    rarity: "Epic",
    category: "Quick Use",
    description: "Epic quick use item",
    craftedAt: "Medical Lab 3",
    recipe: ["3x Antiseptic", "1x Canister"],
    icon: `${e}/vita_spray_blueprint.webp`
  },
  {
    id: "vulcano",
    name: "Vulcano",
    rarity: "Epic",
    category: "Weapon",
    description: "Epic weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["1x Magnetic Accelerator", "3x Heavy Gun Parts", "1x Exodus Modules"],
    icon: `${e}/vulcano_blueprint.webp`
  },
  {
    id: "wolfpack",
    name: "Wolfpack",
    rarity: "Epic",
    category: "Grenade",
    description: "Epic grenade",
    craftedAt: "Explosives Station 3",
    recipe: ["2x Explosive Compound", "2x Sensors"],
    icon: `${e}/wolfpack_blueprint.webp`
  },
  {
    id: "red-light-stick",
    name: "Red Light Stick",
    rarity: "Common",
    category: "Quick Use",
    description: "Common quick use item",
    craftedAt: "Utility Station 1",
    recipe: ["3x Chemicals"],
    icon: `${e}/red_light_stick_blueprint.webp`
  },
  {
    id: "smoke-grenade",
    name: "Smoke Grenade",
    rarity: "Rare",
    category: "Grenade",
    description: "Rare grenade",
    craftedAt: "Utility Station 2",
    recipe: ["14x Chemicals", "1x Canister"],
    icon: `${e}/smoke_grenade_blueprint.webp`
  },
  {
    id: "deadline",
    name: "Deadline",
    rarity: "Epic",
    category: "Mine",
    description: "Epic mine",
    craftedAt: "Explosives Station 3",
    recipe: ["3x Explosive Compound", "2x ARC Circuitry"],
    icon: `${e}/deadline_blueprint.webp`
  },
  {
    id: "trailblazer",
    name: "Trailblazer",
    rarity: "Rare",
    category: "Grenade",
    description: "Rare grenade",
    craftedAt: "Explosives Station 3",
    recipe: ["1x Explosive Compound", "1x Synthesized Fuel"],
    icon: `${e}/trailblazer_blueprint.webp`
  },
  {
    id: "tactical-mk3-defensive",
    name: "Tactical Mk. 3 (Defensive)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/tactical_mk3_defensive_blueprint.webp`
  },
  {
    id: "tactical-mk3-healing",
    name: "Tactical Mk. 3 (Healing)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/tactical_mk3_healing_blueprint.webp`
  },
  {
    id: "yellow-light-stick",
    name: "Yellow Light Stick",
    rarity: "Common",
    category: "Quick Use",
    description: "Common quick use item",
    craftedAt: "Utility Station 1",
    recipe: ["3x Chemicals"],
    icon: `${e}/yellow_light_stick_blueprint.webp`
  },
  {
    id: "looting-mk3-safekeeper",
    name: "Looting Mk. 3 (Safekeeper)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/looting_mk3_safekeeper_blueprint.webp`
  },
  {
    id: "tactical-mk3-revival",
    name: "Tactical Mk. 3 (Revival)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/tactical_mk3_revival_blueprint.webp`
  },
  {
    id: "osprey",
    name: "Osprey",
    rarity: "Rare",
    category: "Weapon",
    description: "Rare weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Advanced Mechanical Components", "3x Medium Gun Parts", "7x Wires"],
    icon: `${e}/osprey_blueprint.webp`
  },
  {
    id: "canto",
    name: "Canto",
    rarity: "Rare",
    category: "Weapon",
    description: "Rare weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["2x Advanced Mechanical Components", "5x Magnet", "3x Medium Gun Parts"],
    icon: `${e}/canto_blueprint.webp`
  },
  {
    id: "crash-mat",
    name: "Crash Mat",
    rarity: "Uncommon",
    category: "Quick Use",
    description: "Uncommon quick use item",
    craftedAt: "Utility Station 2",
    recipe: ["1x Durable Cloth", "1x Electrical Components"],
    icon: `${e}/crash_mat_blueprint.webp`
  },
  {
    id: "dolabra",
    name: "Dolabra",
    rarity: "Legendary",
    category: "Weapon",
    description: "Legendary weapon",
    craftedAt: "Gunsmith 3",
    recipe: ["3x Magnetic Accelerator", "3x Shredder Gyro", "2x Vaporizer Regulator"],
    icon: `${e}/dolabra_blueprint.webp`
  },
  {
    id: "powered-descender",
    name: "Powered Descender",
    rarity: "Epic",
    category: "Quick Use",
    description: "Epic quick use item",
    craftedAt: "Utility Station 3",
    recipe: ["1x Power Rod", "1x Turbine Compressor"],
    icon: `${e}/powered_descender_blueprint.webp`
  },
  {
    id: "rascal",
    name: "Rascal",
    rarity: "Rare",
    category: "Weapon",
    description: "Rare weapon",
    craftedAt: "Gunsmith 2",
    recipe: ["2x Advanced Mechanical Components", "5x Canister", "3x Heavy Gun Parts"],
    icon: `${e}/rascal_blueprint.webp`
  },
  {
    id: "surge-coil",
    name: "Surge Coil",
    rarity: "Uncommon",
    category: "Quick Use",
    description: "Uncommon quick use item",
    craftedAt: "Explosives Station 3",
    recipe: ["1x Electrical Components", "1x Hornet Driver", "1x Sensors"],
    icon: `${e}/surge_coil_blueprint.webp`
  },
  {
    id: "tactical-mk3-smoke",
    name: "Tactical Mk. 3 (Smoke)",
    rarity: "Epic",
    category: "Augment",
    description: "Epic augment",
    craftedAt: "Gear Bench 3",
    recipe: ["2x Advanced Electrical Components", "3x Processor"],
    icon: `${e}/tactical_mk3_smoke_blueprint.webp`
  },
  {
    id: "white-flag",
    name: "White Flag",
    rarity: "Uncommon",
    category: "Quick Use",
    description: "Uncommon quick use item",
    craftedAt: "Medical Lab 1",
    recipe: ["10x Fabric", "3x Plastic Parts"],
    icon: `${e}/white_flag_blueprint.webp`
  }
];
export { i as b };
