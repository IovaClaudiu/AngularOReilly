import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent {
  interval: number;
  lastNumber: number = 0;
  @Output() intervalFired: EventEmitter<number> = new EventEmitter();
  @Output() intervalPause: EventEmitter<number> = new EventEmitter();

  onStartGame(): void {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onPauseGame(): void {
    clearInterval(this.interval);
    this.intervalPause.emit(this.lastNumber);
  }
}
