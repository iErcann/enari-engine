import Ammo from "ammojs-typed";

let AmmoInstance: typeof Ammo | null = null;

async function initializeAmmo(): Promise<typeof Ammo> {
  try {
    if (!AmmoInstance) {
      AmmoInstance = await Ammo.call({});
      console.log("Ammo initialized successfully:", AmmoInstance);
    }
    // Export the initialized Ammo instance
    return AmmoInstance;
  } catch (error) {
    console.error("Error initializing Ammo:", error);
    throw error; // Rethrow the error to let the calling code handle it
  }
}

// Call the initialization function
export { initializeAmmo, AmmoInstance, Ammo as AmmoTyped };
