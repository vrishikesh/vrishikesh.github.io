import { Apple } from "./apple.js";
import { Snake } from "./snake.js";
export class Game {
    constructor() {
        this.lastRenderTime = 0;
        this.isGameOver = false;
        this.frameRate = 10;
        this.score = 0;
        this.tileSize = 30;
        this.canvas = document.getElementById("board");
        this.canvas.width = window.innerWidth - (window.innerWidth % this.tileSize);
        this.canvas.height =
            window.innerHeight - (window.innerHeight % this.tileSize);
        if (this.canvas.parentElement) {
            this.canvas.parentElement.addEventListener("keypress", this.handleKeyPress.bind(this));
        }
        else {
            console.log("Probably the html structure has changed");
        }
        this.ctx = this.canvas.getContext("2d");
        this.blockSize = this.tileSize - 2;
        this.tileCountX = Math.floor(this.canvas.width / this.tileSize);
        this.tileCountY = Math.floor(this.canvas.height / this.tileSize);
        this.snake = new Snake(this);
        this.apple = new Apple(this);
        window.requestAnimationFrame(this.draw.bind(this));
    }
    draw(currentTime) {
        const timeSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
        window.requestAnimationFrame(this.draw.bind(this));
        if (timeSinceLastRender < 1 / this.frameRate)
            return;
        this.lastRenderTime = currentTime;
        this.snake.move();
        if (!this.isGameOver)
            this.isGameOver = this.snake.isGameOver();
        if (this.isGameOver)
            return;
        this.clear();
        this.snake.eat();
        this.apple.draw();
        this.snake.draw();
        this.drawScore();
    }
    clear() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawScore() {
        const fontMinLimit = 10;
        const fontMaxLimit = 20;
        const scoreString = `Score: ${this.score} - Speed: ${this.frameRate} `;
        this.ctx.fillStyle = "white";
        let fontSize = this.canvas.width / 40;
        fontSize = Math.min(fontMaxLimit, fontSize);
        fontSize = Math.max(fontMinLimit, fontSize);
        this.ctx.font = fontSize + "pt Verdana";
        const textWidth = this.ctx.measureText(scoreString).width;
        this.ctx.fillText(scoreString, this.canvas.width - textWidth, fontSize);
    }
    handleKeyPress(e) {
        switch (e.code) {
            case "KeyW":
            case "KeyI":
            case "ArrowUp":
                if (this.snake.velocityY === 1)
                    return;
                this.snake.dir(0, -1);
                break;
            case "KeyS":
            case "KeyK":
            case "ArrowDown":
                if (this.snake.velocityY === -1)
                    return;
                this.snake.dir(0, 1);
                break;
            case "KeyA":
            case "KeyJ":
            case "ArrowLeft":
                if (this.snake.velocityX === 1)
                    return;
                this.snake.dir(-1, 0);
                break;
            case "KeyL":
            case "KeyD":
            case "ArrowRight":
                if (this.snake.velocityX === -1)
                    return;
                this.snake.dir(1, 0);
                break;
        }
    }
}
new Game();
