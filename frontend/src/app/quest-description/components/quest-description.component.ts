import { Component, Input } from '@angular/core';
import { QuestModel } from '../../app.config';
@Component({
  selector: 'app-quest-description',
  templateUrl: './quest-description.component.html',
})
export class QuestDescriptionComponent {
    @Input()
    public quest: QuestModel;
}
