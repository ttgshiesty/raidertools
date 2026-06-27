/*
METAFORGE BkK6U8zV — HUMAN READABLE RECONSTRUCTED LOGIC

SOURCE CHUNK:
02513__metaforge.app___app__immutable__chunks__BkK6U8zV.js

PURPOSE:
This is the readable reconstruction of the compiled MetaForge item editor logic.

IMPORTANT:
- This is for understanding the script.
- This is NOT the original Svelte/compiled runtime output.
- This keeps the same data flow and table logic.
- The compiled variable names were replaced with human names.
- The save/load logic is preserved in readable form.

CORE TABLES / ENDPOINTS:
- arc_items
- arc_item_components
- arc_item_recycle_components
- arc_item_mods
- arc_item_traders
- /api/arc-raiders/items/private
- /api/process-image
- /api/posts?category=arc-raiders&include_embedded=true&limit=1000
- /api/posts/:slug/embed
*/

// ============================================================
// Types inferred from the compiled file
// ============================================================

type ArcItemId = string;

type ArcItemLite = {
  id: ArcItemId;
  name: string;
  item_type: string;
  rarity: string;
};

type ArcItemComponentRow = {
  id: string;
  quantity: number;
  component: ArcItemLite;
};

type ArcItemRecycleComponentRow = {
  id: string;
  quantity: number;
  component: ArcItemLite;
};

type ArcItemModRow = {
  id: string;
  mod: ArcItemLite;
};

type ArcItemTraderRow = {
  trader_name: string;
  price: number | null;
};

type ArcItemLocation =
  | {
      map: string;
      x: number;
      y: number;
    }
  | {
      map: string;
      id: string;
    };

type ArcGuideLink = {
  label: string;
  url: string;
};

type ArcItemStatBlock = {
  damage: number;
  fireRate: number;
  range: number;
  stability: number;
  agility: number;
  stealth: number;
  increasedFireRate: number;
  reducedReloadTime: number;
  reducedDurabilityBurnRate: number;
  increasedADSSpeed: number;
  reducedEquipTime: number;
  reducedUnequipTime: number;
  increasedVerticalRecoil: number;
  reducedVerticalRecoil: number;
  increasedRecoilRecoveryTime: number;
  movementPenalty: number;
  weight: number;
  stamina: number;
  healing: number;
  useTime: number;
  duration: number;
  stackSize: number;
  shield: number;
  radius: number;
  damagePerSecond: number;
  healingPerSecond: number;
  arcStun: number;
  raiderStun: number;
  damageMult: number;
  damageMitigation: number;
  staminaPerSecond: number;
  weightLimit: number;
  shieldCompatibility: string;
  shieldCharge: number;
  quickUseSlots: number;
  backpackSlots: number;
  safePocketSlots: number;
  reducedRecoilRecoveryTime: number;
  reducedDispersionRecoveryTime: number;
  increasedEquipTime: number;
  increasedUnequipTime: number;
  magazineSize: number;
  health: number;
  increasedBulletVelocity: number;
  illuminationRadius: number;
  reducedPerShotDispersion: number;
  reducedMaxShotDispersion: number;
  reducedNoise: number;
  augmentSlots: number;
  healingSlots: number;
  [key: string]: number | string | undefined;
};

type ArcItem = {
  id: ArcItemId;
  name: string;
  description: string;
  item_type: string;
  loadout_slots: string[];
  icon: string;
  rarity: string;
  value: number | null;

  components: ArcItemComponentRow[];
  recycle_components: ArcItemRecycleComponentRow[];
  recycle_from: unknown[];
  mods: ArcItemModRow[];

  workbench: string | null;
  ammo_type: string;
  stat_block: ArcItemStatBlock;

  flavor_text: string;
  subcategory: string;
  shield_type: string;
  loot_area: string;
  locations: ArcItemLocation[];
  guide_links: ArcGuideLink[];
  guide_url?: string | null;

  /*
  This field is in the editor, but the save flow removes it from the
  arc_items payload and saves it separately through:
  /api/arc-raiders/items/private
  */
  game_asset_id?: number | null;

  used_in?: unknown;
  dropped_by?: unknown;
  sold_by?: unknown;

  [key: string]: unknown;
};

type SupabaseClient = {
  from(table: string): any;
};

type ToastApi = {
  error(message: string): void;
  success(message: string): void;
};

type ImageUploadResponse = {
  originalUrl?: string;
  error?: string;
};

// ============================================================
// Constants inferred from the compiled file
// ============================================================

const COMPONENT_ITEM_TYPES = [
  "Basic Material",
  "Modification",
  "Augment",
  "Advanced Material",
  "Nature",
  "Recyclable",
  "Refined Material",
  "Topside Material",
  "Misc",
];

const MODIFICATION_EXCLUDED_ZERO_STATS = new Set([
  "increasedADSSpeed",
  "reducedEquipTime",
  "increasedEquipTime",
  "reducedUnequipTime",
  "increasedUnequipTime",
  "reducedVerticalRecoil",
  "increasedVerticalRecoil",
  "reducedRecoilRecoveryTime",
  "increasedRecoilRecoveryTime",
  "reducedPerShotDispersion",
  "reducedBaseDispersion",
  "reducedDispersionRecoveryTime",
  "increasedFireRate",
  "increasedBulletVelocity",
  "reducedNoise",
  "increasedDurabilityBurnTime",
  "reducedProjectileDamage",
  "magazineSize",
  "projectilesPerShot",
  "agility",
  "stealth",
  "movementPenalty",
]);

const DEFAULT_STAT_BLOCK: ArcItemStatBlock = {
  damage: 0,
  fireRate: 0,
  range: 0,
  stability: 0,
  agility: 0,
  stealth: 0,
  increasedFireRate: 0,
  reducedReloadTime: 0,
  reducedDurabilityBurnRate: 0,
  increasedADSSpeed: 0,
  reducedEquipTime: 0,
  reducedUnequipTime: 0,
  increasedVerticalRecoil: 0,
  reducedVerticalRecoil: 0,
  increasedRecoilRecoveryTime: 0,
  movementPenalty: 0,
  weight: 0,
  stamina: 0,
  healing: 0,
  useTime: 0,
  duration: 0,
  stackSize: 0,
  shield: 0,
  radius: 0,
  damagePerSecond: 0,
  healingPerSecond: 0,
  arcStun: 0,
  raiderStun: 0,
  damageMult: 0,
  damageMitigation: 0,
  staminaPerSecond: 0,
  weightLimit: 0,
  shieldCompatibility: "",
  shieldCharge: 0,
  quickUseSlots: 0,
  backpackSlots: 0,
  safePocketSlots: 0,
  reducedRecoilRecoveryTime: 0,
  reducedDispersionRecoveryTime: 0,
  increasedEquipTime: 0,
  increasedUnequipTime: 0,
  magazineSize: 0,
  health: 0,
  increasedBulletVelocity: 0,
  illuminationRadius: 0,
  reducedPerShotDispersion: 0,
  reducedMaxShotDispersion: 0,
  reducedNoise: 0,
  augmentSlots: 0,
  healingSlots: 0,
};

function createDefaultItem(): ArcItem {
  return {
    id: "",
    name: "",
    description: "",
    item_type: "",
    loadout_slots: [],
    icon: "",
    rarity: "Common",
    value: null,

    components: [],
    recycle_components: [],
    recycle_from: [],
    mods: [],

    workbench: null,
    ammo_type: "",
    stat_block: { ...DEFAULT_STAT_BLOCK },

    flavor_text: "",
    subcategory: "",
    shield_type: "",
    loot_area: "",
    locations: [],
    guide_links: [],
  };
}

// ============================================================
// Dynamic stat block component loader
// ============================================================

/*
The compiled script lazy-loads different stat UI components depending on item_type.

Weapon          -> ./xJ2R8WUa.js
Ammunition      -> ./ShLYimwt.js
Throwable       -> ./ShLYimwt.js
Shield          -> ./D6vAExfM.js
Quick Use       -> ./Cmst7agj.js
Deployable      -> ./9HZjzvy5.js
Gadget          -> ./9HZjzvy5.js
Basic Material  -> ./Dh6L2xau.js
Advanced Material -> ./Dh6L2xau.js
Nature          -> ./Dh6L2xau.js
Recyclable      -> ./Dh6L2xau.js
Refined Material -> ./Dh6L2xau.js
Topside Material -> ./Dh6L2xau.js
Modification    -> ./Dh6L2xau.js
Augment         -> ./Dh6L2xau.js
Misc            -> ./Dh6L2xau.js
Trinket         -> ./Dh6L2xau.js
Blueprint       -> ./9HZjzvy5.js
Key             -> ./9HZjzvy5.js
Quest Item      -> ./9HZjzvy5.js
Unknown         -> ./9HZjzvy5.js
*/

const statComponentImportByItemType: Record<string, () => Promise<unknown>> = {
  Weapon: () => import("./xJ2R8WUa.js"),
  Ammunition: () => import("./ShLYimwt.js"),
  Throwable: () => import("./ShLYimwt.js"),
  Shield: () => import("./D6vAExfM.js"),
  "Quick Use": () => import("./Cmst7agj.js"),
  Deployable: () => import("./9HZjzvy5.js"),
  Gadget: () => import("./9HZjzvy5.js"),
  "Basic Material": () => import("./Dh6L2xau.js"),
  "Advanced Material": () => import("./Dh6L2xau.js"),
  Nature: () => import("./Dh6L2xau.js"),
  Recyclable: () => import("./Dh6L2xau.js"),
  "Refined Material": () => import("./Dh6L2xau.js"),
  "Topside Material": () => import("./Dh6L2xau.js"),
  Modification: () => import("./Dh6L2xau.js"),
  Augment: () => import("./Dh6L2xau.js"),
  Misc: () => import("./Dh6L2xau.js"),
  Trinket: () => import("./Dh6L2xau.js"),
  Blueprint: () => import("./9HZjzvy5.js"),
  Key: () => import("./9HZjzvy5.js"),
  "Quest Item": () => import("./9HZjzvy5.js"),
  Unknown: () => import("./9HZjzvy5.js"),
};

async function loadStatComponentForItemType(itemType: string) {
  const loader = statComponentImportByItemType[itemType];

  if (!loader) {
    return null;
  }

  const startTime = performance.now();

  try {
    const module: any = await loader();
    console.log(
      `Stat block loaded in ${(performance.now() - startTime).toFixed(2)}ms`,
    );

    return module.default;
  } catch (error) {
    console.error("Failed to load stat block component:", error);
    return null;
  }
}

// ============================================================
// Item editor state shape
// ============================================================

class MetaForgeArcItemEditorLogic {
  supabase: SupabaseClient;
  toast: ToastApi;

  mode: "create" | "edit";
  item: ArcItem;

  allItems: ArcItemLite[] = [];
  availableComponentItems: ArcItemLite[] = [];

  guideOptions: Array<{ value: string; label: string; slug: string }> = [];

  traders: ArcItemTraderRow[] = [];

  selectedLootAreas: string[] = [];
  locations: ArcItemLocation[] = [];

  selectedMap = "dam";
  locationEntryMode: "coordinate" | "markerId" = "coordinate";
  locationInput = "";

  guideLinkLabel = "";
  guideLinkUrl = "";

  originalGuideUrl: string | null | undefined = null;

  iconPreview: string | null = null;
  isUploadingIcon = false;
  isSaving = false;
  isLoadingItems = false;
  isLoadingGuides = false;
  isLoadingTraders = false;

  constructor(options: {
    supabase: SupabaseClient;
    toast: ToastApi;
    mode?: "create" | "edit";
    item?: ArcItem | null;
  }) {
    this.supabase = options.supabase;
    this.toast = options.toast;
    this.mode = options.mode || "edit";
    this.item = options.item || createDefaultItem();
  }

  // ============================================================
  // Initial load behavior
  // ============================================================

  async init() {
    await this.loadItems();
    await this.loadGuides();

    if (this.mode === "edit" && this.item.id) {
      await this.loadTraders();

      if (
        (this.item.components && this.item.components.length > 0) ||
        (this.item.recycle_components &&
          this.item.recycle_components.length > 0) ||
        this.item.workbench
      ) {
        /*
        The compiled file opens the crafting/collapsible section when edit mode
        already has components/recycle components/workbench.
        */
      }
    }

    if (this.item.loot_area) {
      this.selectedLootAreas = this.item.loot_area
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    }

    if (this.item.locations) {
      this.locations = [...this.item.locations];
    }

    if (this.item.guide_url) {
      this.originalGuideUrl = this.item.guide_url;
    }

    if (this.item.icon) {
      this.iconPreview = this.item.icon;
    }

    this.ensureStatBlockDefaults();
    await loadStatComponentForItemType(this.item.item_type);
  }

  // ============================================================
  // Main item loading for dropdowns
  // ============================================================

  async loadItems() {
    this.isLoadingItems = true;

    try {
      const { data, error } = await this.supabase
        .from("arc_items")
        .select("id, name, item_type, rarity")
        .order("name");

      if (error) {
        console.error("Error loading items:", error);
        this.toast.error("Failed to load items");
        return;
      }

      this.allItems = data || [];

      this.availableComponentItems = this.allItems.filter((item) => {
        return (
          item &&
          item.item_type &&
          COMPONENT_ITEM_TYPES.includes(item.item_type)
        );
      });
    } catch (error) {
      console.error("Unexpected error loading items:", error);
      this.toast.error("Failed to load items");
    } finally {
      this.isLoadingItems = false;
    }
  }

  // ============================================================
  // Guides loading
  // ============================================================

  async loadGuides() {
    this.isLoadingGuides = true;

    try {
      const response = await fetch(
        "/api/posts?category=arc-raiders&include_embedded=true&limit=1000",
      );

      const json = response.ok ? await response.json() : { posts: [] };
      const posts = [...(json.posts || [])];

      this.guideOptions = posts.map((post: any) => ({
        value: `/${post.categories?.[0]?.slug || "arc-raiders"}/${post.slug}`,
        label: post.title,
        slug: post.slug,
      }));
    } catch (error) {
      console.error("Error loading guides:", error);
      this.toast.error("Failed to load guides");
    } finally {
      this.isLoadingGuides = false;
    }
  }

  // ============================================================
  // Name / id behavior
  // ============================================================

  updateName(name: string) {
    this.item.name = name;

    if (this.mode === "create") {
      this.item.id = slugifyArcItemName(name);
    }
  }

  // ============================================================
  // Stat block defaults
  // ============================================================

  ensureStatBlockDefaults() {
    const defaultStats =
      this.item.item_type === "Modification"
        ? Object.fromEntries(
            Object.entries(DEFAULT_STAT_BLOCK).filter(([statName]) => {
              return !MODIFICATION_EXCLUDED_ZERO_STATS.has(statName);
            }),
          )
        : DEFAULT_STAT_BLOCK;

    if (!this.item.stat_block) {
      this.item.stat_block = { ...defaultStats } as ArcItemStatBlock;
      return;
    }

    for (const key of Object.keys(defaultStats)) {
      if (!(key in this.item.stat_block)) {
        this.item.stat_block[key] = defaultStats[key];
      }
    }

    if (this.item.item_type === "Modification") {
      for (const key of MODIFICATION_EXCLUDED_ZERO_STATS) {
        if (this.item.stat_block?.[key] === 0) {
          delete this.item.stat_block[key];
        }
      }
    }
  }

  // ============================================================
  // arc_item_components logic
  // ============================================================

  addComponent() {
    this.item.components ||= [];

    this.item.components.push({
      id: "",
      quantity: 1,
      component: {
        id: "",
        name: "",
        item_type: "",
        rarity: "",
      },
    });
  }

  removeComponent(index: number) {
    if (this.item.components) {
      this.item.components.splice(index, 1);
    }
  }

  updateComponentItem(index: number, componentId: string) {
    if (!this.item.components?.[index]) {
      return;
    }

    const component = this.allItems.find((item) => item.id === componentId);

    if (component) {
      this.item.components[index].id = componentId;
      this.item.components[index].component = component;
    }
  }

  updateComponentQuantity(index: number, quantity: number) {
    if (this.item.components?.[index]) {
      this.item.components[index].quantity = quantity;
    }
  }

  buildComponentInsertRows() {
    return (this.item.components || [])
      .filter((row) => row.component.id && row.quantity > 0)
      .map((row) => ({
        item_id: this.item.id,
        component_id: row.component.id,
        quantity: row.quantity,
      }));
  }

  // ============================================================
  // arc_item_recycle_components logic
  // ============================================================

  addRecycleComponent() {
    this.item.recycle_components ||= [];

    this.item.recycle_components.push({
      id: "",
      quantity: 1,
      component: {
        id: "",
        name: "",
        item_type: "",
        rarity: "",
      },
    });
  }

  removeRecycleComponent(index: number) {
    if (this.item.recycle_components) {
      this.item.recycle_components.splice(index, 1);
    }
  }

  updateRecycleComponentItem(index: number, componentId: string) {
    if (!this.item.recycle_components?.[index]) {
      return;
    }

    const component = this.allItems.find((item) => item.id === componentId);

    if (component) {
      this.item.recycle_components[index].id = componentId;
      this.item.recycle_components[index].component = component;
    }
  }

  updateRecycleComponentQuantity(index: number, quantity: number) {
    if (this.item.recycle_components?.[index]) {
      this.item.recycle_components[index].quantity = quantity;
    }
  }

  buildRecycleComponentInsertRows() {
    return (this.item.recycle_components || [])
      .filter((row) => row.component.id && row.quantity > 0)
      .map((row) => ({
        item_id: this.item.id,
        component_id: row.component.id,
        quantity: row.quantity,
      }));
  }

  // ============================================================
  // arc_item_mods logic
  // ============================================================

  addMod() {
    this.item.mods ||= [];

    this.item.mods.push({
      id: "",
      mod: {
        id: "",
        name: "",
        item_type: "",
        rarity: "",
      },
    });
  }

  removeMod(index: number) {
    if (this.item.mods) {
      this.item.mods.splice(index, 1);
    }
  }

  updateModItem(index: number, modId: string) {
    if (!this.item.mods?.[index]) {
      return;
    }

    const mod = this.allItems.find((item) => item.id === modId);

    if (mod) {
      this.item.mods[index].id = modId;
      this.item.mods[index].mod = mod;
    }
  }

  buildModInsertRows() {
    return (this.item.mods || [])
      .filter((row) => row.mod.id)
      .map((row) => ({
        item_id: this.item.id,
        mod_id: row.mod.id,
      }));
  }

  // ============================================================
  // arc_item_traders logic
  // ============================================================

  async loadTraders() {
    if (!this.item.id) {
      return;
    }

    this.isLoadingTraders = true;

    try {
      const { data, error } = await this.supabase
        .from("arc_item_traders")
        .select("trader_name, price")
        .eq("item_id", this.item.id);

      if (error) {
        console.error("Error loading traders:", error);
        this.toast.error("Failed to load traders");
        return;
      }

      this.traders = (data || []).map((row: any) => ({
        trader_name: row.trader_name,
        price: row.price,
      }));
    } catch (error) {
      console.error("Unexpected error loading traders:", error);
      this.toast.error("Failed to load traders");
    } finally {
      this.isLoadingTraders = false;
    }
  }

  addTrader() {
    this.traders = [
      ...this.traders,
      {
        trader_name: "",
        price: null,
      },
    ];
  }

  removeTrader(index: number) {
    this.traders = this.traders.filter((_, traderIndex) => {
      return traderIndex !== index;
    });
  }

  updateTraderName(index: number, traderName: string) {
    this.traders = this.traders.map((trader, traderIndex) => {
      if (traderIndex !== index) {
        return trader;
      }

      return {
        ...trader,
        trader_name: traderName,
      };
    });
  }

  updateTraderPrice(index: number, price: number | null) {
    this.traders = this.traders.map((trader, traderIndex) => {
      if (traderIndex !== index) {
        return trader;
      }

      return {
        ...trader,
        price,
      };
    });
  }

  getAvailableTraderNamesForRow(index: number, allTraderNames: string[]) {
    const selectedTraderNamesInOtherRows = this.traders
      .map((trader, traderIndex) => {
        if (traderIndex !== index && trader.trader_name) {
          return trader.trader_name;
        }

        return null;
      })
      .filter((traderName): traderName is string => traderName !== null);

    return allTraderNames.filter((traderName) => {
      return !selectedTraderNamesInOtherRows.includes(traderName);
    });
  }

  buildTraderInsertRows() {
    return this.traders
      .filter((row) => row.trader_name && row.price !== null)
      .map((row) => ({
        item_id: this.item.id,
        trader_name: row.trader_name,
        price: row.price,
      }));
  }

  // ============================================================
  // Loot area and location logic
  // ============================================================

  toggleLootArea(lootArea: string) {
    if (this.selectedLootAreas.includes(lootArea)) {
      this.selectedLootAreas = this.selectedLootAreas.filter((value) => {
        return value !== lootArea;
      });
    } else {
      this.selectedLootAreas = [...this.selectedLootAreas, lootArea];
    }

    this.item.loot_area = this.selectedLootAreas.join(", ");
  }

  addLocation() {
    const input = this.locationInput.trim();

    if (!input) {
      return;
    }

    if (this.locationEntryMode === "coordinate") {
      const splitParts = input.split(",").map((part) => part.trim());

      if (splitParts.length === 2) {
        const x = parseFloat(splitParts[0]);
        const y = parseFloat(splitParts[1]);

        if (!Number.isNaN(x) && !Number.isNaN(y)) {
          this.locations = [
            ...this.locations,
            {
              x,
              y,
              map: this.selectedMap,
            },
          ];

          this.item.locations = [...this.locations];
          this.locationInput = "";
          this.toast.success("Location added");
          return;
        }
      }

      const coordinateMatch = input.match(/x:\s*([\d.]+),\s*y:\s*([\d.]+)/i);

      if (coordinateMatch) {
        const x = parseFloat(coordinateMatch[1]);
        const y = parseFloat(coordinateMatch[2]);

        if (!Number.isNaN(x) && !Number.isNaN(y)) {
          this.locations = [
            ...this.locations,
            {
              x,
              y,
              map: this.selectedMap,
            },
          ];

          this.item.locations = [...this.locations];
          this.locationInput = "";
          this.toast.success("Location added");
          return;
        }
      }

      this.toast.error('Invalid coordinate format. Use "x, y" or "x: 123, y: 456"');
      return;
    }

    if (input.length > 0) {
      this.locations = [
        ...this.locations,
        {
          id: input,
          map: this.selectedMap,
        },
      ];

      this.item.locations = [...this.locations];
      this.locationInput = "";
      return;
    }

    this.toast.error("Please enter a marker ID");
  }

  removeLocation(index: number) {
    this.locations = this.locations.filter((_, locationIndex) => {
      return locationIndex !== index;
    });

    this.item.locations = [...this.locations];
  }

  // ============================================================
  // Guide link logic
  // ============================================================

  addGuideLink() {
    if (!this.guideLinkLabel.trim() || !this.guideLinkUrl.trim()) {
      this.toast.error("Guide label and URL are required");
      return;
    }

    if (!this.guideLinkUrl.startsWith("http")) {
      this.toast.error("Guide URL must start with http");
      return;
    }

    this.item.guide_links ||= [];

    this.item.guide_links = [
      ...this.item.guide_links,
      {
        label: this.guideLinkLabel.trim(),
        url: this.guideLinkUrl.trim(),
      },
    ];

    this.guideLinkLabel = "";
    this.guideLinkUrl = "";
  }

  removeGuideLink(index: number) {
    if (this.item.guide_links) {
      this.item.guide_links = this.item.guide_links.filter((_, guideIndex) => {
        return guideIndex !== index;
      });
    }
  }

  async updateGuideEmbed(guideUrl: string | null | undefined, embeddedUrl: string | null) {
    if (!guideUrl) {
      return;
    }

    const slug = guideUrl.split("/").pop();

    if (!slug) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${slug}/embed`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embedded_url: embeddedUrl,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update guide embedding", await response.text());
      }
    } catch (error) {
      console.error("Failed to update guide embedding:", error);
    }
  }

  // ============================================================
  // Icon upload / remove logic
  // ============================================================

  async uploadIconFromInput(input: HTMLInputElement) {
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      this.toast.error("Image must be smaller than 10MB");
      input.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      this.toast.error("Please select a valid image file");
      input.value = "";
      return;
    }

    this.isUploadingIcon = true;

    try {
      const reader = new FileReader();

      reader.onload = (event) => {
        this.iconPreview = event.target?.result as string;
      };

      reader.readAsDataURL(file);

      const itemId = this.item.id;
      const formData = new FormData();

      formData.append("image", file);
      formData.append("maxWidth", "1024");
      formData.append("maxHeight", "1024");
      formData.append("quality", "95");
      formData.append("uploadToGCS", "true");
      formData.append("folder", "arc-raiders/icons");
      formData.append("filename", `${itemId}.webp`);
      formData.append("generateScaled", "true");
      formData.append("scaledSize", "48");

      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorJson = await response.json();
        console.error(errorJson);
        throw new Error(errorJson.error || "Upload failed");
      }

      const uploadResult: ImageUploadResponse = await response.json();

      if (uploadResult.originalUrl) {
        this.item.icon = uploadResult.originalUrl;
        this.toast.success("Image uploaded successfully");
      } else {
        this.toast.error("Failed to get image URL");
      }
    } catch (error) {
      console.error("Unexpected error during upload:", error);
      this.toast.error("Failed to upload image");
    } finally {
      this.isUploadingIcon = false;
      input.value = "";
    }
  }

  removeIcon() {
    this.item.icon = "";
    this.iconPreview = null;
  }

  // ============================================================
  // Validation
  // ============================================================

  validateItemBeforeSave() {
    if (!this.item.item_type) {
      this.toast.error("Item Type is required");
      return false;
    }

    const nameError = validateStatField(this.item.item_type, "name", this.item.name);

    if (nameError) {
      this.toast.error(nameError);
      return false;
    }

    return true;
  }

  // ============================================================
  // Main save flow
  // ============================================================

  async saveItem(options: {
    canSave: boolean;
    votesApi?: {
      hasPendingVotes?: () => boolean;
      savePendingVotes?: () => Promise<boolean>;
    };
    onSave: () => void;
  }) {
    if (!options.canSave) {
      return;
    }

    if (!this.validateItemBeforeSave()) {
      return;
    }

    this.isSaving = true;

    try {
      if (
        options.votesApi?.hasPendingVotes?.() &&
        !(await options.votesApi.savePendingVotes?.())
      ) {
        this.isSaving = false;
        return;
      }

      this.ensureStatBlockDefaults();

      this.item.locations = [...this.locations];

      /*
      IMPORTANT:
      These fields are removed before saving the main row to arc_items.

      components              -> saved to arc_item_components
      recycle_components      -> saved to arc_item_recycle_components
      mods                    -> saved to arc_item_mods
      trader rows             -> saved to arc_item_traders
      game_asset_id           -> saved to /api/arc-raiders/items/private
      used_in / recycle_from / dropped_by / sold_by are not saved in this payload.
      */
      const {
        components,
        used_in,
        recycle_components,
        recycle_from,
        mods,
        dropped_by,
        sold_by,
        game_asset_id,
        ...arcItemsPayload
      } = this.item;

      let saveError: any;

      if (this.mode === "edit") {
        saveError = (
          await this.supabase
            .from("arc_items")
            .update(arcItemsPayload)
            .eq("id", this.item.id)
        ).error;
      } else {
        saveError = (
          await this.supabase.from("arc_items").insert(arcItemsPayload)
        ).error;
      }

      if (saveError) {
        console.error(saveError.message);
        this.toast.error("Failed to save item");
        return;
      }

      if (this.item.id) {
        await this.savePrivateGameAssetId(game_asset_id ?? null);

        if (this.mode === "edit") {
          await this.deleteExistingRelationshipRows();
        }

        await this.insertComponentRows();
        await this.insertRecycleComponentRows();
        await this.insertModRows();
        await this.insertTraderRows();
      }

      if (this.item.guide_url !== this.originalGuideUrl) {
        if (this.originalGuideUrl) {
          await this.updateGuideEmbed(this.originalGuideUrl, null);
        }

        if (this.item.guide_url) {
          await this.updateGuideEmbed(
            this.item.guide_url,
            `/arc-raiders/database/item/${this.item.id}`,
          );
        }

        this.originalGuideUrl = this.item.guide_url;
      }

      options.onSave();
      this.toast.success("Item saved successfully");
    } catch (error) {
      console.error("Unexpected error:", error);
      this.toast.error("Failed to save item");
    } finally {
      this.isSaving = false;
    }
  }

  // ============================================================
  // Private game_asset_id save
  // ============================================================

  async savePrivateGameAssetId(gameAssetId: number | null) {
    try {
      const response = await fetch("/api/arc-raiders/items/private", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          item_id: this.item.id,
          game_asset_id: gameAssetId ?? null,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          (await response.json().catch(() => null))?.error ||
          "Failed to save game asset id";

        this.toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Failed to save game asset id:", error);
      this.toast.error("Failed to save game asset id");
    }
  }

  // ============================================================
  // Relationship delete strategy
  // ============================================================

  async deleteExistingRelationshipRows() {
    await this.supabase
      .from("arc_item_components")
      .delete()
      .eq("item_id", this.item.id);

    await this.supabase
      .from("arc_item_recycle_components")
      .delete()
      .eq("item_id", this.item.id);

    await this.supabase
      .from("arc_item_mods")
      .delete()
      .eq("item_id", this.item.id);

    await this.supabase
      .from("arc_item_traders")
      .delete()
      .eq("item_id", this.item.id);
  }

  // ============================================================
  // Relationship insert strategy
  // ============================================================

  async insertComponentRows() {
    const rows = this.buildComponentInsertRows();

    if (rows.length === 0) {
      return;
    }

    const { error } = await this.supabase
      .from("arc_item_components")
      .insert(rows);

    if (error) {
      console.error("Error saving components:", error);
      this.toast.error("Item saved but failed to save components");
      throw error;
    }
  }

  async insertRecycleComponentRows() {
    const rows = this.buildRecycleComponentInsertRows();

    if (rows.length === 0) {
      return;
    }

    const { error } = await this.supabase
      .from("arc_item_recycle_components")
      .insert(rows);

    if (error) {
      console.error("Error saving recycle components:", error);
      this.toast.error("Item saved but failed to save recycle components");
      throw error;
    }
  }

  async insertModRows() {
    const rows = this.buildModInsertRows();

    if (rows.length === 0) {
      return;
    }

    const { error } = await this.supabase.from("arc_item_mods").insert(rows);

    if (error) {
      console.error("Error saving mods:", error);
      this.toast.error("Item saved but failed to save mods");
      throw error;
    }
  }

  async insertTraderRows() {
    const rows = this.buildTraderInsertRows();

    if (rows.length === 0) {
      return;
    }

    const { error } = await this.supabase
      .from("arc_item_traders")
      .insert(rows);

    if (error) {
      console.error("Error saving traders:", error);
      this.toast.error("Item saved but failed to save traders");
      throw error;
    }
  }
}

// ============================================================
// UI structure from the compiled render section
// ============================================================

/*
The compiled render section creates these editor sections and fields:

BASIC:
- Name
- Game Asset ID
- Icon Image
  - current/new icon preview
  - Remove button
  - image/* upload input
- Description
- Item Type

DETAILS:
- Rarity
- Sell Value

CRAFTING / BLUEPRINT:
- Workbench
- Components editor
  - item dropdown
  - quantity input
  - remove button
- Recycle Components editor
  - item dropdown
  - quantity input
  - remove button

WEAPON / MODS:
- if item.item_type === "Weapon":
  - compatible mods editor
  - rows saved to arc_item_mods

AMMO:
- if item.item_type === "Weapon" || item.item_type === "Ammunition":
  - Ammo Type dropdown
  - saved on arc_items.ammo_type

SHIELD:
- if item.item_type === "Shield":
  - shieldCompatibility options
  - shield stats in stat_block

STATS:
- lazy-loaded stat block component based on item_type
- values saved inside arc_items.stat_block

LOOT / LOCATIONS:
- loot_area stored as comma separated string
- locations stored as item.locations array
- supports coordinate input:
  - "x, y"
  - "x: 123, y: 456"
- supports marker id input

GUIDES:
- guide_url points one selected MetaForge guide
- guide_links stores extra guide label/url pairs
- /api/posts/:slug/embed is patched when guide_url changes

TRADERS:
- trader rows load from arc_item_traders
- each row has:
  - trader_name
  - price
- save flow deletes old arc_item_traders rows and inserts current rows
*/

// ============================================================
// Relationship table meaning
// ============================================================

/*
arc_items
  Main item table.
  Stores the item itself:
  - id
  - name
  - description
  - item_type
  - rarity
  - value
  - icon
  - workbench
  - ammo_type
  - stat_block
  - loadout_slots
  - flavor_text
  - subcategory
  - shield_type
  - loot_area
  - locations
  - guide_links
  - guide_url
  etc.

arc_item_components
  Crafting requirements.
  item_id      = item being crafted
  component_id = required component item
  quantity     = amount required

arc_item_recycle_components
  Recycling outputs.
  item_id      = item being recycled
  component_id = component returned from recycling
  quantity     = amount returned

arc_item_mods
  Compatible mods.
  item_id = weapon/item being edited
  mod_id  = modification item compatible with it

arc_item_traders
  Trader sale rows.
  item_id     = item being sold
  trader_name = trader name string
  price       = price from that trader

/api/arc-raiders/items/private
  Private save endpoint for game_asset_id.
  Payload:
  {
    item_id: item.id,
    game_asset_id: item.game_asset_id ?? null
  }

Important:
game_asset_id is NOT kept inside the normal arc_items payload in this compiled save flow.
It is pulled out and posted to the private endpoint separately.
*/

// ============================================================
// Helper functions inferred from imports / compiled code
// ============================================================

function slugifyArcItemName(name: string) {
  /*
  Original compiled code calls imported function mi(name).
  That function is not expanded inside this chunk.
  It is used only when mode === "create" to auto-create item.id from item.name.
  */
  return name
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFieldDefinition(itemType: string, fieldName: string): any | null {
  /*
  Original compiled code calls da(itemType, fieldName).
  The field definition map is above this editor in the compiled file.
  It returns a stat/config field for an item type.
  */
  return null;
}

function validateStatField(itemType: string, fieldName: string, value: unknown) {
  const field = getFieldDefinition(itemType, fieldName);

  if (!field) {
    return null;
  }

  if (field.required && (!value || (typeof value === "string" && !value.trim()))) {
    return `${field.label} is required`;
  }

  if (field.type === "number" && value !== null && value !== undefined && value !== "") {
    const parsed = parseFloat(String(value));

    if (Number.isNaN(parsed)) {
      return `${field.label} must be a valid number`;
    }

    if (field.min !== undefined && parsed < field.min) {
      return `${field.label} must be at least ${field.min}`;
    }

    if (field.max !== undefined && parsed > field.max) {
      return `${field.label} must be at most ${field.max}`;
    }
  }

  return null;
}
