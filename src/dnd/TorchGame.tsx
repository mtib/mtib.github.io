import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    background: '#333',
    resizeTo: window,
});

document.body.appendChild(app.view as unknown as Node);

const text = new PIXI.Text(
    "DND Torch Game",
    {
        fontSize: 50,
        fill: "#fff",
    },
);

app.stage.addChild(text);

let elapsed = 0;
app.ticker.add((diff) => {
    elapsed += diff;
    text.y = Math.sin(elapsed / 100) * 20 + 50;
    text.x = Math.sin(elapsed / 80) * 20 + 50;
    text.angle = Math.sin(elapsed / 120) * 3;
    text.scale.set(Math.sin(elapsed / 60) / 5 + 1);
});
