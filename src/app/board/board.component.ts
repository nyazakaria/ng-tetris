import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { COLS, ROWS, BLOCK_SIZE, KEY } from '../constants';
import { BoardService } from '../services/board-service.service';
import { Piece, IPiece } from '../piece/piece.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})


export class BoardComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;
  points: number;
  lines: number;
  level: number;
  board: number[][];
  piece: Piece;
  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.SPACE]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: (p: IPiece): IPiece => this.BoardS.rotate(p)
  };

  constructor(private BoardS: BoardService) { }


  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.moves[event.keyCode]) {
    
      event.preventDefault();
    
      const p = this.moves[event.key](this.piece);
   
      this.piece.move(p);
     
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
      this.piece.draw();
    }
  }

  ngOnInit() {
    this.initBoard();
  }

  initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
  }

  play() {
    this.board = this.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.draw();
    //console.table(this.board);
  }

  getEmptyBoard(): number[][] {
    console.log(Array(COLS), 'les cols');
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

}
