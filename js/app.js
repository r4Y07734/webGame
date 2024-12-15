const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 731;
canvas.width = 1536;

class Player {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.width = 50;
        this.height = 50;
        this.color = "#000";
        this.speed = 5;
        this.dx = 0;
    }

    update() {
        this.x += this.dx;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > 1536) this.x = 1536 - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > 731) this.y = 731 - this.height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player();

const keys = {
    d: false,
    a: false,
    w: false,
    s: false,
};

function updatePlayerVelocity() {
    if (keys.d && keys.a) {
        player.dx = 0;
    } else if (keys.a) {
        player.dx = -player.speed;
    } else if (keys.d) {
        player.dx = player.speed;
    } else {
        player.dx = 0;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key in keys) keys[e.key] = true;
    updatePlayerVelocity();
});

document.addEventListener("keyup", (e) => {
    if (e.key in keys) keys[e.key] = false;
    updatePlayerVelocity();
})

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop();