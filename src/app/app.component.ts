import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription  } from 'rxjs';
import "rxjs/add/operator/debounceTime";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

   constructor(){

   }
  title       : string = 'TIMER';
  ticks       : any = 0;
  click       : number = 0;
  time        : string;
  start_timer : boolean = false;
  stopHandler : boolean = false;
  ms          : number = 300;
  hh          : any;
  mm          : any;
  ss          : any;
  stop_time   : any;



    private timer;
    private sub: Subscription;

  startTimer(){
      if(!this.stopHandler){
        this.start_timer = true;
        this.timerFunc();
        }else{
        return;
      }
}

timerFunc() {

  this.timer = Observable.timer(0,1000);

  if(this.stopHandler){
    this.stopHandler = false;
   this.sub = this.timer.subscribe(t => {
     t = t + this.stop_time;
     this.formaToUTC(t)
   });
  } else {
   this.sub = this.timer.subscribe(t =>this.formaToUTC(t));
}
}

  formaToUTC(tick){
     this.ticks  = tick;
     let seconds = this.ticks;
     let date = new Date(seconds * 1000);
     this.hh = date.getUTCHours();
     this.mm = date.getUTCMinutes();
     this.ss = date.getSeconds();

    if (this.hh < 10) {this.hh = "0"+ this.hh;}
    if (this.mm < 10) {this.mm = "0"+ this.mm;}
    if (this.ss < 10) {this.ss = "0"+ this.ss;}

    this.time = this.hh +":" + this.mm+":" + this.ss ;
  }

  stopTimer(){
       this.click = 0;
       this.stop_time = this.ticks;
       this.stopHandler = true;
       this.sub.unsubscribe();
  }

  resetTimer(){
      this.sub.unsubscribe();
      this.ticks = 0;
      this.time = "00:00:00";
  }

  continueTimer() {
    this.ticks = this.stop_time;
    this.timerFunc()
  }



  ngOnInit() {
    let startWait;
    const node = document.getElementById('wait');
    let waitClick = Observable
      .fromEvent(node, 'click')
      .subscribe(() => {
        this.click++;
        startWait = Date.now();
         if(this.click = 2) {
           let rangeWait = Date.now() - startWait;
             if(rangeWait <= 300){
               this.stopTimer();
           }
        }
        this.continueTimer();
      })
 }
  ngOnDestroy(){
        console.log("Destroy timer");
        this.sub.unsubscribe();
    }
}
