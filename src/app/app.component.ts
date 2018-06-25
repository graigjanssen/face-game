import { Component, OnInit } from '@angular/core';
import { Faces } from './faces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameStart: boolean;
  faces: {}[];
  faceIndex: number;
  total: number;
  available: number;
  numFaces: number;
  answer: string = '';
  score: number;
  message: string;
  messageStyle: string;
  success: boolean;
  finalTitle: string;
  finalScore: number;
  finalText: string = '';

  constructor() {
    this.gameStart = false;
    this.available = Faces.length;
    this.faces = Faces.slice(0);
    this.faceIndex = 0;
    this.total = this.faces.length;
  }

  onStartClick() {
    this.faces = this.prepareFaces();
    this.total = this.faces.length;
    this.faceIndex = 0;
    this.score = 0;
    this.message = '';
    this.gameStart = true;
  }

  onSubmit() {
    if (this.answer.length > 0) {
      const guess = this.answer;
      const name = this.faces[this.faceIndex]['name'];
      if (guess.toLowerCase() === name.toLowerCase()) {
        this.score++;
        this.success = true;
        this.messageStyle = 'success';
        this.message = `Yep! That was ${name}.`;
      } else {
        this.success = false;
        this.messageStyle = 'fail';
        this.message = `Oops, that was ${name}, not ${guess}.`;
      }
      this.answer = '';
      this.faceIndex++;

      if (this.faceIndex === this.total) {
        this.finalScore = (this.score / this.total) * 100;
        this.finalTitle = this.finalScore === 100
          ? 'Perfect!'
          : this.finalScore >= 50
            ? 'Nice Job!'
            : 'Dang!';
        this.finalText = `You got ${this.score} out of ${this.total}`;
      }
    } else {
      this.success = false;
      this.messageStyle = 'fail';
      this.message = "Make a guess!";
    }
  }

  newGame() {
    this.gameStart = false;
    this.faces = Faces.slice(0);
    this.numFaces = null;
    this.message = '';
  }

  onMax() {
    this.numFaces = Faces.length;
  }

  prepareFaces() {
    const faces = Faces.slice(0);
    if (typeof this.numFaces === 'number' && this.numFaces > 0 && this.numFaces <= faces.length) {
      const shuffledFaces = this.shuffleFaces(faces);
      while (shuffledFaces.length > this.numFaces) {
        shuffledFaces.pop();
      }
      return shuffledFaces;
    } else {
      return this.shuffleFaces(faces);
    }
  }

  shuffleFaces(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}
