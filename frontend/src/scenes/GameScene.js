import Phaser from "phaser";

import WebFontFile from "./webFontFile";

export default class Game extends Phaser.Scene {
  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
    this.leftScore = 0;
    this.rightScore = 0;
    this.level = 1;
    this.speed = 700;
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
    // for enabling collision between paddle right and ball
    this.physics.add.collider(this.paddleRight, this.ball);

    // for setting up the velocity
    this.resetball();

    // for styling the score text
    const textStyle = {
      fontSize: 48,
      color: "red",
      fontFamily: '"Press Start 2P"',
    };

    // score label for left
    this.leftScoreLabel = this.add
      .text(300, 125, "0", textStyle)
      .setOrigin(0.5, 0.5);

    // score label for right
    this.rightScoreLabel = this.add
      .text(550, 125, "0", { ...textStyle, color: "green" })
      .setOrigin(0.5, 0.5);

    // score label for level
    this.levelLabel = this.add
      .text(400, 30, `Level 1`, { ...textStyle, fontSize: 28, color: "white" })
      .setOrigin(0.5, 0.5);

    /**
     * @type {Phaser.Physics.Arcade.Body}
     */

    // creating cursors
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

  // increament the left player score
  increamentLeftScore() {
    //* if the score becomes 2 then show lose and the lose count in local storage
    if (this.leftScore === 2) {
      this.leftScoreLabel.text = "You Lose";
      this.leftScore = 0;
      localStorage.setItem(
        "lost",
        Number(localStorage.getItem("lost") || 0) + 1
      );

      this.storeData({ lost: 1 });
      setInterval(() => {
        window.location.reload();
      }, 2000);
    } else {
      this.leftScore += 1;
      this.leftScoreLabel.text = this.leftScore.toString();
    }
  }

  // increament the right player score
  increamentRightScore() {
    if (this.rightScore === 2) {
      //* show you win
      this.rightScoreLabel.text = "You Win";
      this.rightScore = 0;
      this.leftScore = 0;

      //* Reset the score i.e the value of the left Score
      setInterval(() => {
        this.rightScoreLabel.text = this.rightScore.toString();
        this.leftScoreLabel.text = this.leftScore.toString();
      }, 1000);
      this.rightScoreLabel.text = "You Win";
      localStorage.setItem("win", Number(localStorage.getItem("win") || 0) + 1);
      //* increase the level as well as speed after every win
      this.storeData({ win: 1 });
      this.level += 1;
      this.speed += 200;

      this.storeData({ level: this.level });
      this.increamentLevel();
    } else {
      this.rightScore += 1;
      this.rightScoreLabel.text = this.rightScore.toString();
    }
  }

  //* method to increase the level
  increamentLevel() {
    this.levelLabel.text = `Level ${this.level.toString()}`;
  }

  //* method to reset the ball after every die
  resetball() {
    this.ball.setPosition(400, 250);
    const angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, this.speed);
    this.ball.body.setVelocity(vec.x, vec.y);
  }

  //* To store the wins inside the server
  storeData(data) {
    // console.log("data:", data);
    fetch(`https://crimson-ray-shoe.cyclic.app/users/update`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        tkn: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
