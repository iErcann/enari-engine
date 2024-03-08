import { Game } from "./Game";
import { initializeAmmo } from "./Physics/Ammo";

async function main() {
  await initializeAmmo();
  const game = Game.getInstance();
  await game.globalLoadingManager.loadAllMeshs();
  game.onLoad();

  // Mettre un setter pour le currentPlayer pour qu'il change automatiquement la camera du renderer.
  game.startUpdateLoop();
}

main();
