
import { Ammo } from '../../libs/ammo/ammo.js';

let AmmoInstance = null;
async function initializeAmmo() {
  try {
    if (!AmmoInstance) {
      AmmoInstance = await Ammo.call({});
      console.log("Ammo initialized successfully:", AmmoInstance);
    }
    return AmmoInstance;
  } catch (error) {
    console.error("Error initializing Ammo:", error);
    throw error;
  }
}
export { initializeAmmo, AmmoInstance, Ammo };

