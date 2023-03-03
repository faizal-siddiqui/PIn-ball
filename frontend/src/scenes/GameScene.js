import Phaser from "phaser";

import WebFontFile from "./webFontFile";

export default class Game extends Phaser.Scene {
  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
    this.leftScore = 0;
    this.rightScore = 0;
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }

  create() {
    this.physics.world.setBounds(-100, 0, 1000, 460);

    // for creating ball (x position, y position , width, height, color, )
    this.ball = this.add.circle(400, 250, 10, 0xfffff, 1);

    // for adding physics into it
    this.physics.add.existing(this.ball);

    // for bouncing ball after colliding with paddle
    this.ball.body.setBounce(1, 1);

    // for enabling collision of ball wrt it's boundary
    this.ball.body.setCollideWorldBounds(true, 1, 1);

    // create paddle left
    this.paddleLeft = this.add.rectangle(50, 250, 25, 160, 0x000ff, 1);
    this.paddleRight = this.add.rectangle(800, 250, 25, 160, 0x000ff, 1);

    // for adding physics into it
    this.physics.add.existing(this.paddleLeft, true);
    this.physics.add.existing(this.paddleRight, true);

    // for enabling collision between paddle left and ball
    this.physics.add.collider(this.paddleLeft, this.ball);
    // for enabling collision between paddle left and ball
    this.physics.add.collider(this.paddleRight, this.ball);

    // for setting up the velocity
    this.resetball();

    const textStyle = {
      fontSize: 48,
      color: "red",
      fontFamily: '"Press Start 2P"',
    };

    this.leftScoreLabel = this.add
      .text(300, 125, "0", textStyle)
      .setOrigin(0.5, 0.5);
    this.rightScoreLabel = this.add
      .text(480, 295, "0", textStyle)
      .setOrigin(0.5, 0.5);

    /**
     * @type {Phaser.Physics.Arcade.Body}
     */

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    /**
     * @type {Phaser.Physics.Arcade.StaticBody}
     */

    // accessing the paddle left body in body variable
    const body = this.paddleLeft.body;

    if (this.cursors.up.isDown) {
      // moving the paddle to the upward direction
      this.paddleLeft.y -= 10;
      body.updateFromGameObject(); //* for updating the physics
    } else if (this.cursors.down.isDown) {
      // moving the paddle to the downward direction
      this.paddleLeft.y += 10;
      body.updateFromGameObject(); //* for updating the physics
    }

    const diff = this.ball.y - this.paddleRight.y;

    if (Math.abs(diff) < 10) {
      //* -9 --- 9
      return;
    }

    const aiSpeed = 3;
    if (diff < 0) {
      //* -10 --- -250
      // when ball is above the paddle
      this.paddleRightVelocity.y = -aiSpeed;
      if (this.paddleRightVelocity.y < -10) {
        this.paddleRightVelocity.y = -10;
      }
    } else if (diff > 0) {
      // when ball is below the paddle
      this.paddleRightVelocity.y = aiSpeed;
      if (this.paddleRightVelocity.y > 10) {
        this.paddleRightVelocity.y = 10;
      }
    }

    this.paddleRight.y += this.paddleRightVelocity.y;
    this.paddleRight.body.updateFromGameObject();

    if (this.ball.x < -30) {
      // scored on the left side
      this.resetball();
      this.increamentLeftScore();
    } else if (this.ball.x > 880) {
      // scored on the right side
      this.resetball();
      this.increamentRightScore();
    }
  }

  increamentLeftScore() {
    if (this.leftScore === 2) {
      this.leftScoreLabel.text = "You Lose";
      this.leftScore = 0;
      localStorage.setItem(
        "lose",
        Number(localStorage.getItem("lose") || 0) + 1
      );
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } else {
      this.leftScore += 1;
      this.leftScoreLabel.text = this.leftScore.toString();
    }
  }

  increamentRightScore() {
    this.rightScore += 1;
    this.rightScoreLabel.text = this.rightScore.toString();
  }

  resetball() {
    this.ball.setPosition(400, 250);
    const angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, 200);
    this.ball.body.setVelocity(vec.x, vec.y);
  }
}
