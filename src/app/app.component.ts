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
  stop : boolean = false;
  title       : string = 'TIMER';
  ticks       : any = 0;

  click       : number = 0;

  time        : any;
  reset       : boolean = false;
  stopHandler : boolean = false;
  start       : number;
  ms          : number = 300;
  hh          : any;
  mm          : any;
  ss          : any;

  stop_time   : any;

  example :any;

    private timer;
    private sub: Subscription;

  startTimer(){


      if(!this.stopHandler){

        this.ms = Date.now() - this.start;
           if(this.ms >= 300){
               this.timerFunc();
               console.log('this.ms >= 300');
           }
        }
        else
        {
            this.timerFunc();
      }

}

timerFunc() {

  this.timer = Observable.timer(0,1000);

  if(this.stopHandler){
    this.stopHandler = false;
   this.sub = this.timer.subscribe(t =>{
     t = t + this.stop_time;
     console.log(t);
     this.formaToUTC(t)
   });
  }else{
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

       console.log(this.ticks);
       this.stop_time = this.ticks;

       this.stopHandler = true;
       this.start = Date.now();
       this.sub.unsubscribe();
       console.log('stopTimer');
       console.log(this.stopHandler);
       console.log(this.start);
  }

  resetTimer(){
      console.log('resetTimer');
      this.sub.unsubscribe();
      this.ticks = 0;
      this.time = "00:00:00";
      console.log(this.stopHandler);
  }

  continueTimer() {
    console.log('continueTimer');
    this.ticks = this.stop_time;
    console.log(this.ticks);
    this.timerFunc()
  }



  ngOnInit(){
    this.start = Date.now();

    const node = document.getElementById('wait');

    this.example = Observable
      .fromEvent(node, 'click')

    .debounceTime(300)
    .subscribe(() => {
      this.click++;
      this.formaToUTC(this.click);
      console.log(this.click);
    });

   }

  ngOnDestroy(){
        console.log("Destroy timer");
        this.sub.unsubscribe();
    }
}
