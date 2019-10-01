import { Component } from '@angular/core';
import { BLOCK_SIZE } from '../constants';


export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}

@Component({
  selector: 'app-piece',
  template: `<h1>titrer</h1>`
})


export class Piece implements IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D) {
    this.spawn();
  }


  spawn() {
    this.color = "blue";
    this.shape = [[2, 0, 0], [2, 2, 2], [0, 0, 0]];
    this.x = 3;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        }
      })
    })
  }

  move(p: Piece) {
    this.x = p.x;
    this.y = p.y;

  }

}
