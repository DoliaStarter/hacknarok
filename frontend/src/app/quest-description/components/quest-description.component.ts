import { Component, Input } from '@angular/core';
import { QuestModel } from '../../app.config';
import { QuestDescriptionService } from '../services/quest-description.service';
import { QuestAnswerService } from '../services/quest-answer.service';
@Component({
  selector: 'app-quest-description',
  templateUrl: './quest-description.component.html',
})
export class QuestDescriptionComponent {
    @Input()
    public quest: QuestModel;
    constructor(public questservice:QuestDescriptionService)
    {
      
    }
    
}
