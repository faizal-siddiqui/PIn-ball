import Phaser from "phaser";
import Game from "./scenes/GameScene";

const config = {
  width: 850,
  height: 460,
  type: Phaser.AUTO,
  backgroundColor: "#616161",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "./crop.png");
  // let image = this.add.image(
  //   this.cameras.main.width / 2,
  //   this.cameras.main.height / 2,
  //   "map"
  // );
  // let scaleX = this.cameras.main.width / image.width;
  // let scaleY = this.cameras.main.height / image.height;
  // let scale = Math.max(scaleX, scaleY);
  // image.setScale(scale).setScrollFactor(0);
}

function create() {
  this.add.image(400, 300, "sky");
}

// export default config;

// game.scene.add("titlescreen", TitleScreen);
game.scene.add("game", Game);

// game.scene.start("titlescreen");
game.scene.start("game");

export default game;
