import '../styles.scss';
import './app.scss';

import { Observable, Subscription } from "rxjs";
import { Snake, GAME_STATES } from "./snake";
import { Pkg } from "../package";
import { HappyNewYear } from './happy-new-year';

const html = require('./app.html');

export class App
{
    private game:Snake;
    private happyNewYear: HappyNewYear;
    private score:HTMLElement;
    private container:HTMLElement;
    private boardContainer:HTMLElement;
    private gameState:string;

    constructor(container:HTMLElement)
    {
        container.innerHTML = html;   
        // Thêm đoạn mã để lấy tên repository động và điều chỉnh lại đường dẫn
        const repoName = window.location.pathname.split('/')[1];
        if (repoName) {
            const startButtonImg = document.getElementById('start-button-img') as HTMLElement;
            if (startButtonImg)
                startButtonImg.setAttribute('src', `/${repoName}/public/play.svg`);
        }        
        this.setupUI();
        this.setupGame();
        this.runHappyNewYear();
    }

    setupUI()
    {
        this.score = document.getElementById('score');
        this.container = document.getElementById('container');
        this.boardContainer = document.getElementById('board-container');
        let startButton = Observable.fromEvent(document.getElementById('start-button'), 'click');
        startButton.subscribe((e:MouseEvent) => { console.log('click'); this.startGame(); })

        console.log(Pkg().version);
    }

    setupGame(size?: number, rows?: number, cols?: number)
    {
        let board = document.getElementById('board');

        if (size && rows && cols) {
            this.game = new Snake(board, size, rows, cols);
        } else {
            this.game = new Snake(board);
        }
        this.game.score.subscribe((score:number) => this.score.innerHTML = String(score));
        this.game.state.subscribe((state:string) => 
        {
            this.gameState = state;
            this.container.setAttribute('class', state)
        })
        this.game.direction.subscribe((direction:string) => this.boardContainer.setAttribute('class', direction))
    }

    async runHappyNewYear() {
        let board = document.getElementById('board');
        
        this.happyNewYear = new HappyNewYear(board);
        await this.happyNewYear.displayHappyNewYearWords();
        await this.happyNewYear.displaySnake();
        
        this.setupGame(20, 20, 20);
        this.game.reset();
    }
    
    startGame()
    {
        if(this.gameState == GAME_STATES.ready || this.gameState == GAME_STATES.ended)
        {
            this.game.start();
        }
    }
}
