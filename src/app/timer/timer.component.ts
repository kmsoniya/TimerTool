import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timer: string = '05:00';
  timerRunning: boolean = false;
  showPauseButton: boolean = false;
  showResumeButton: boolean = false;
  initialTimeInSeconds: number = 300; // 5 minutes in seconds
  remainingTimeInSeconds: number = this.initialTimeInSeconds;

  
  ngOnInit(): void {
    this.updateTimer();
  }

  startTimer(): void {
    this.timerRunning = true;
    this.showPauseButton = true;
    this.showResumeButton = false;
    this.tick();
  }

  pauseTimer(): void {
    this.timerRunning = false;
    this.showPauseButton = false;
    this.showResumeButton = true;
  }

  resumeTimer(): void {
    this.timerRunning = true;
    this.showPauseButton = true;
    this.showResumeButton = false;
    this.tick();
  }

  resetTimer(): void {
    this.timerRunning = false;
    this.showPauseButton = false;
    this.showResumeButton = false;
    this.remainingTimeInSeconds = this.initialTimeInSeconds;
    this.updateTimer();
  }

  private tick(): void {
    const timerInterval = setInterval(() => {
      if (this.timerRunning && this.remainingTimeInSeconds > 0) {
        this.remainingTimeInSeconds--;
        this.updateTimer();
      } else {
        clearInterval(timerInterval);
        this.timerRunning = false;
        this.showPauseButton = false;
        this.showResumeButton = false;
      }
    }, 1000);
  }

  private updateTimer(): void {
    const minutes = Math.floor(this.remainingTimeInSeconds / 60);
    const seconds = this.remainingTimeInSeconds % 60;
    this.timer = `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
     
  // timer: string = '05:00';
  // private timerSubscription!: Subscription;
  // showPauseButton: boolean = false;
  // showResumeButton: boolean = false;

  // ngOnInit(): void {
  //   this.resetTimer();
  // }

  // startTimer(): void {
  //   this.timerSubscription = interval(1000).subscribe(() => {
  //     this.updateTimer();
  //   });
  //   this.showPauseButton = true;
  //   this.showResumeButton = false;
  // }

  // pauseTimer(): void {
  //   if (this.timerSubscription) {
  //     this.timerSubscription.unsubscribe();
  //   }
  //   this.showPauseButton = false;
  //   this.showResumeButton = true;
  // }

  // resetTimer(): void {
  //   this.pauseTimer();
  //   this.timer = '05:00';
  //   this.showPauseButton = false;
  //   this.showResumeButton = false;
  // }

  // resumeTimer(): void {
  //   this.startTimer();
  // }

  // ngOnDestroy(): void {
  //   this.pauseTimer();
  // }

  // private updateTimer(): void {
  //   const timeArray = this.timer.split(':');
  //   let minutes = +timeArray[0];
  //   let seconds = +timeArray[1];

  //   if (minutes === 0 && seconds === 0) {
  //     this.pauseTimer();
  //     return;
  //   }

  //   if (seconds === 0) {
  //     minutes--;
  //     seconds = 59;
  //   } else {
  //     seconds--;
  //   }

  //   this.timer = `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  // }

  // private padNumber(num: number): string {
  //   return num < 10 ? `0${num}` : `${num}`;
  // }


  
  

}
