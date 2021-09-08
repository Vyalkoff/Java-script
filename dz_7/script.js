'use strict';

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};

const config = {
    settings,
    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },
    getRowsCount() {
        return this.settings.rowsCount;
    },
    getColsCount() {
        return this.settings.colsCount;
    },
    getSpeed() {
        return this.settings.speed;
    },
    getWinfoodCount() {
        return this.settings.winFoodCount;
    },
    validate() {
        const result = {
            isValid: true,
            errors: [],
        };
        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки значения rowsCount должно быть в диапазоне [10, 30]')
        };

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки значения colsCount должно быть в диапазоне [10, 30]')
        };
        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки значения getSpeed должно быть в диапазоне [1, 10]')
        };
        if (this.getWinfoodCount() < 5 || this.getWinfoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки значения winFoodCount должно быть в диапазоне [1, 10]')
        };
        return result;
    },

};
const map = {
    cells: {},
    usedCells: [],
    init(rowsCount, colCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colCount; col++) {
                const td = document.createElement('td')
                td.classList.add('cell');

                const cellKey = `x${col}_y${row}`;
                this.cells[cellKey] = td

                tr.appendChild(td);

            };
        };

    },
    render(snakePointArray, foodPoint) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }
        this.usedCells = [];
        snakePointArray.forEach((point, index) => {

            const snakeCell = this.cells[`x${point.x}_y${point.y}`];

            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);

        });


        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];

        foodCell.classList.add('food');

        this.usedCells.push(foodCell)

    },

};
const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },
    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },
    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;

    },

};

const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;

    },

    getBody() {
        return this.body;
    },
    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some(snakePoint => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift({});
        this.getBody().pop();
    },
    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);


        this.getBody().push(lastBodyPointClone);
    },

    getNextHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch (this.direction) {
            case 'up':
                return { x: firstPoint.x, y: firstPoint.y - 1 };
            case 'right':
                return { x: firstPoint.x + 1, y: firstPoint.y };
            case 'down':
                return { x: firstPoint.x, y: firstPoint.y + 1 };
            case 'left':
                return { x: firstPoint.x - 1, y: firstPoint.y };
        }
    },


};
const statuS = {
    condition: null,
    setPlaying() {
        this.codition = 'playing';
    },
    setStopped() {
        this.codition = 'stopped';
    },
    setFinished() {
        this.codition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },
    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    statuS,
    tickInterval: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();
        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }
        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventNandlers();
        this.reset();

    },
    setEventNandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();

        });
        document.getElementById('newGameButton').addEventListener('click', event => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => {
            this.keyDownHandler(event);
        });

    },
    playClickHandler() {

        if (this.statuS.isPlaying()) {
            this.stop();
        } else if (this.statuS.isStopped()) {
            this.play();
        };
    },

    play() {
        this.statuS.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.statuS.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled')
    },
    tickHandler() {
        if (!this.canMakeStep()) {
            return this.finish();
        }

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {

            this.snake.growUp();

            this.score.increment();

            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();

        this.render();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomfreeCoordinates());
        this.render();

    },
    render() {
        this.map.render(this.snake.body, this.food.getCoordinates())
    },
    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomfreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;

        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.statuS.isPlaying()) {
            return;
        };

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);



    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case ' KeyD':
            case 'ArrowRight':
                return 'right';
            case 'Keys':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },
};

game.init({ speed: 10 });
