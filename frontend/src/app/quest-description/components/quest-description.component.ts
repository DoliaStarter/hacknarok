import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { QuestModel } from '../../app.config';
import { QuestDescriptionService } from '../services/quest-description.service';
import { QuestAnswerService } from '../services/quest-answer.service';
import { LayoutService, LayoutEventType } from '../../services/layout.service';
@Component({
  selector: 'app-quest-description',
  templateUrl: './quest-description.component.html',
})
export class QuestDescriptionComponent implements OnInit,AfterContentInit{
    @Input()
    public quest: QuestModel;
    constructor(public questservice:QuestDescriptionService,public layoutService:LayoutService)
    {
       
    }
    ngOnInit()
    {
      this.layoutService.events.next(LayoutEventType.StartWait);
    }
   ngAfterContentInit()
   {
    this.layoutService.events.next(LayoutEventType.StopWait);
   }
    
    
}
