import * as PIXI from 'pixi.js';
import * as _ from 'lodash';

const app = new PIXI.Application({
    background: '#333',
    resizeTo: window,
});

document.body.appendChild(app.view as unknown as Node);

const count = {
    x: 3,
    y: 3,
} as const;

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

    }
}

class LogicalPoint extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }
}

type Graphics = PIXI.Graphics & {
    hitArea: PIXI.Rectangle,
    on: (eventType: string, func: (event: unknown) => unknown) => unknown,
    eventMode: string,
};

enum ClickBoxState {
    Active = 'cb-active',
    Inactive = 'cb-inactive',
    Solved = 'cb-solved',
}

enum ClickBoxEvent {
    Click = 'cb-click',
    NeighborClick = 'cb-neighbor-click',
}

enum Dice {
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20,
    d100 = 100,
}

enum DamageType {
    Bludgeoning = 'bludgeoning',
    Piercing = 'piercing',
    Slashing = 'slashing',
    Fire = 'fire',
    Cold = 'cold',
    Poison = 'poison',
    Acid = 'acid',
    Psychic = 'psychic',
    Necrotic = 'necrotic',
    Radiant = 'radiant',
    Lightning = 'lightning',
    Thunder = 'thunder',
    Force = 'force',
}

type DamageSpread = { [key in DamageType]: { [key in Dice]: number } };

const damageCalc = (elapsedSeconds: number, numberOfClicks: number): DamageSpread => {
    const penaltySeconds = elapsedSeconds - 4;
    const penaltyClicks = numberOfClicks - 4;
    if (penaltyClicks + penaltySeconds < 0) {
        return {} as DamageSpread;
    }
    const weight = penaltyClicks + penaltySeconds;
    const numDice = Math.floor(Math.pow(weight, 0.35));
    const types = [DamageType.Acid, DamageType.Fire, DamageType.Piercing];
    const diceList = _.times(numDice).map(i => {
        const type = types[i % types.length];
        const die = Dice.d4;
        return { type, die };
    });
    return _.mapValues(_.groupBy(diceList, d => d.type), (v) => _.mapValues(_.groupBy(v, k => k.die), (k) => k.length)) as DamageSpread;
};

const formatDamage = (damage: DamageSpread) => {
    return _.map(damage, (v, k) => {
        const dice = _.map(v, (v, k) => `${v}d${k}`);
        return `${dice.join('+')} ${k}`;
    }).join(' + ');
};

class Timer {
    private started: boolean = false;
    private stopped: boolean = false;
    private text: PIXI.Text;
    private updateFunc: ((diff: number) => void) | null = null;
    private clickCount: number = 0;

    constructor(container: PIXI.Container) {
        let elapsed = 0;
        this.updateFunc = (diff: number) => {
            elapsed += diff;
            this.update(elapsed, diff);
        };
        this.text = new PIXI.Text('0.00\n0', {
            align: 'right',
            fontSize: 30,
            fill: '#888',
            fontFamily: 'monospace',
        });
        this.text.anchor.set(1, 0);
        container.addChild(this.text);
        app.ticker.add(this.updateFunc);
    }

    public get running() {
        return this.started && !this.stopped;
    }

    public start() {
        this.started = true;
    }

    public stop() {
        this.text.style.fill = '#fff';
        this.stopped = true;
    }

    private update(elapsed: number, diff: number) {
        this.text.position.set(app.screen.width - 10, 10);
        if (!this.running) {
            return;
        }
        const elapsedSec = elapsed / 100;
        const sec = Math.floor(elapsedSec);
        const frac = Math.floor((elapsedSec - sec) * 100);
        const text = `${sec}.${frac.toString().padStart(2, '0')}\n${this.clickCount}\n\n${formatDamage(damageCalc(elapsedSec, this.clickCount)).replace(/ \+ /g, "\n+ ")}`;
        this.text.text = text;
    }

    public countClick() {
        this.clickCount++;
    }
}

class UI {
    timer: Timer;
    container: PIXI.Container;
    constructor() {
        this.container = new PIXI.Container();
        this.timer = new Timer(this.container);
    }

    public handleBoxEvent(event: ClickBoxEvent) {
        switch (event) {
            case ClickBoxEvent.Click:
                if (!this.timer.running) {
                    this.timer.start();
                }
                this.timer.countClick();
                break;
            case ClickBoxEvent.NeighborClick:
                break;
        }
    }

    public handleGameEvent(event: GameEvent) {
        switch (event) {
            case GameEvent.Solved:
                this.timer.stop();
                break;
        }
    }
}

class ClickBox {
    private graphics: Graphics;
    private point: LogicalPoint;
    private updateFunc: ((diff: number) => void) | null = null;
    private state: ClickBoxState = ClickBoxState.Inactive;
    private neighbors: ClickBox[] | null = null;
    private parentContainer: PIXI.Container;
    private notify;

    constructor(point: LogicalPoint, container: PIXI.Container, notify: (event: unknown) => unknown) {
        this.notify = notify;
        this.parentContainer = container;
        this.point = point;
        this.graphics = new PIXI.Graphics() as Graphics;
        this.graphics.eventMode = 'static';
        this.graphics.on('click', _.debounce(() => {
            this.handleEvent(ClickBoxEvent.Click);
        }, 150, { leading: true, trailing: false }));
        this.graphics.on('tap', _.debounce(() => {
            this.handleEvent(ClickBoxEvent.Click);
        }, 150, { leading: true, trailing: false }));
    }

    public get logicalPoint() {
        return new LogicalPoint(this.point.x, this.point.y);
    }

    private redraw() {
        const sizes = this.sizes;
        this.graphics.clear();
        this.graphics.beginFill(this.color);
        const rect = new PIXI.Rectangle(
            (sizes.side + sizes.pad.inner) * this.point.x + sizes.pad.outer.x,
            (sizes.side + sizes.pad.inner) * this.point.y + sizes.pad.outer.y,
            sizes.side,
            sizes.side,
        );
        this.graphics.hitArea = rect;
        this.graphics.drawShape(rect);
        this.graphics.endFill();
    }

    public setNeightbors(g: ClickBox[]) {
        this.neighbors = g;
    }

    get sizes() {
        const { width: w, height: h } = app.screen;
        const boxSide = Math.min(w / (count.x + 2), h / (count.y + 2));
        const innerPad = boxSide / Math.max(count.x, count.y);
        const rest = (total: number, count: number) => total - boxSide * count - (innerPad * (count - 1));
        const restX = rest(w, count.x);
        const restY = rest(h, count.y);
        return {
            side: boxSide,
            pad: {
                inner: innerPad,
                outer: {
                    x: restX / 2,
                    y: restY / 2,
                }
            }
        } as const;
    }

    public handleGameEvent(event: GameEvent): void {
        this.handleEvent(event);
    }

    private handleEvent(event: ClickBoxEvent | GameEvent) {
        switch (event) {
            case ClickBoxEvent.Click:
                this.neighbors?.forEach(n => n.handleEvent(ClickBoxEvent.NeighborClick));
                break;
        }
        this.state = ClickBox.stateTransition(this.state, event);
        if (event === ClickBoxEvent.Click) {
            this.notify(event);
        }
    }

    static stateTransition(state: ClickBoxState, event: ClickBoxEvent | GameEvent) {
        if (event === GameEvent.Solved) {
            return ClickBoxState.Solved;
        }
        switch (state) {
            case ClickBoxState.Active:
                switch (event) {
                    case ClickBoxEvent.Click:
                    case ClickBoxEvent.NeighborClick:
                        return ClickBoxState.Inactive;
                }
            case ClickBoxState.Inactive:
                switch (event) {
                    case ClickBoxEvent.Click:
                    case ClickBoxEvent.NeighborClick:
                        return ClickBoxState.Active;

                }
            case ClickBoxState.Solved:
                // TODO support reset
                return ClickBoxState.Solved;
        }
    }

    private get color() {
        switch (this.state) {
            case ClickBoxState.Active:
                return '#f33';
            case ClickBoxState.Inactive:
                return '#555';
            case ClickBoxState.Solved:
                return '#3f3';
        }
    }

    public get active() {
        return this.state === ClickBoxState.Active || this.state === ClickBoxState.Solved;
    }

    public addRender() {
        if (this.updateFunc !== null) {
            throw new Error('Already added to render');
        }
        this.parentContainer.addChild(this.graphics);

        let elapsed = 0;
        this.updateFunc = (diff: number) => {
            elapsed += diff;
            this.update(elapsed, diff);
        };
        app.ticker.add(this.updateFunc);
        this.updateFunc(0);
    }

    public removeRender() {
        if (this.updateFunc === null) {
            throw new Error('No updateFunc');
        }
        app.ticker.remove(this.updateFunc);
        this.updateFunc = null;
        this.parentContainer.removeChild(this.graphics);
    }

    private update(elapsed: number, diff: number) {
        this.redraw();
    }
}

enum GameEvent {
    Solved = 'g-solved',
}

class Game {
    private container: PIXI.Container;
    private ui: UI;
    private boxes: ClickBox[];

    constructor() {
        this.container = new PIXI.Container();
        this.ui = new UI();

        const arr = _.times(count.x).flatMap(x => _.times(count.y).map(y => new LogicalPoint(x, y)));
        this.boxes = arr.map((p: LogicalPoint) => {
            const box = new ClickBox(p, this.container, this.notify.bind(this));
            box.addRender();
            return box;
        });

        this.boxes.forEach(g => {
            const p = g.logicalPoint;
            const neighbors = [
                new LogicalPoint(p.x - 1, p.y),
                new LogicalPoint(p.x + 1, p.y),
                new LogicalPoint(p.x, p.y - 1),
                new LogicalPoint(p.x, p.y + 1),
            ].map(this.getBox).filter(b => b !== undefined) as ClickBox[];
            g.setNeightbors(neighbors);
        });
    }

    private getBox = (p: LogicalPoint) => this.boxes.find(g => g.logicalPoint.x === p.x && g.logicalPoint.y === p.y);

    private get solved() {
        return this.boxes.every(b => b.active);
    }

    public notify(event: unknown) {
        switch (event) {
            case ClickBoxEvent.Click:
                this.ui.handleBoxEvent(event);
                break;
        }
        if (this.solved) {
            this.ui.handleGameEvent(GameEvent.Solved);
            this.boxes.forEach(b => b.handleGameEvent(GameEvent.Solved));
        }
    }

    public start() {
        app.stage.addChild(this.container);
        app.stage.addChild(this.ui.container);
    }
}

const game = new Game();
game.start();
