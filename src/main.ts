import { Game } from "./Engine/Game";
import Ammo from "ammojs-typed";

Ammo(Ammo).then(() => {
  (async () => {
    const game = Game.getInstance();
    await game.globalLoadingManager.loadAllMeshs()
    game.onLoad();

    // Mettre un setter pour le currentPlayer pour qu'il change automatiquement la camera du renderer.
    game.startUpdateLoop();
  })();
})