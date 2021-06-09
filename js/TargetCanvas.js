class TargetCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.translate(this.width / 2, this.height / 2);
    }

    drawPixel(x, y, color = 'black') {
        this.drawArc(x * r, y * r, 1, 10, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    drawArc(x, y, r, angleA, angleB) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, angleA, angleB, true);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}