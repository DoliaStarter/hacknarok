import { Component, OnInit } from '@angular/core';
import { LayoutEventType, LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  waiting = false;

  constructor(
    protected layoutService: LayoutService
  ) { }
    
    ngOnInit() {
      this.layoutService.events.subscribe(event => {
        switch(event) {
          case LayoutEventType.StartWait:
            this.waiting = true;
            break;
          case LayoutEventType.StopWait:
            this.waiting = false;
            break;
        }
      })
    }
}
