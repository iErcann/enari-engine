import { Game } from "./Game.js";
import { initializeAmmo } from "./Physics/Ammo.js";
async function main() {
  await initializeAmmo();
  const game = Game.getInstance();
  await game.globalLoadingManager.loadAllMeshs();
  game.onLoad();
  game.startUpdateLoop();
}
main();

