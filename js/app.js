const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 731;
canvas.width = 1536;

class Player {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.width = 50;
        this.height = 50;
        this.radius = 25;
        this.color = "#000";
        this.speed = 25;
        this.dx = 0;
        this.dy = 0;
    }

    update(deltaTime) {
        if (!deltaTime) return;

        const normalizedSpeed = this.speed * (deltaTime / 1000);
        this.x += this.dx * normalizedSpeed;
        this.y += this.dy * normalizedSpeed;

        if (this.x - this.width / 2 < 0) this.x = 0 + this.width / 2;
        if (this.x + this.width / 2 > 1536) this.x = 1536 - this.width / 2;
        if (this.y - this.height / 2< 0) this.y = 0 + this.height / 2;
        if (this.y + this.height / 2 > 731) this.y = 731 - this.height / 2;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    updatePlayerVelocity(keys) {
        if (keys.d && keys.a || keys.ArrowLeft && keys.ArrowRight || keys.d && keys.ArrowLeft || keys.a && keys.ArrowRight) {
            player.dx = 0;
        } else if (keys.a || keys.ArrowLeft) {
            player.dx = -player.speed;
        } else if (keys.d || keys.ArrowRight) {
            player.dx = player.speed;
        } else {
            player.dx = 0;
        }

        if (keys.w && keys.s || keys.ArrowUp && keys.ArrowDown || keys.w && keys.ArrowDown || keys.s && keys.ArrowUp) {
            player.dy = 0;
        } else if (keys.w || keys.ArrowUp) {
            player.dy = -player.speed;
        } else if (keys.s || keys.ArrowDown) {
            player.dy = player.speed;
        } else {
            player.dy = 0;
        }
    }
}

const player = new Player();

const keys = {
    d: false,
    a: false,
    w: false,
    s: false,
    ArrowDown: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false,
};

document.addEventListener("keydown", (e) => {
    if (e.key in keys) keys[e.key] = true;
    player.updatePlayerVelocity(keys);
});

document.addEventListener("keyup", (e) => {
    if (e.key in keys) keys[e.key] = false;
    player.updatePlayerVelocity(keys);
})

let lastTime = 0;

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update(deltaTime);
    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

gameLoop(0);