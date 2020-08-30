import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasePointModel, QuestPointModel } from '../../app.config';
import { LayoutEventType, LayoutService } from '../../services/layout.service';
import { QuestAnswerActionResult, QuestAnswerService } from '../services/quest-answer.service';
@Component({
  selector: 'app-point-description',
  templateUrl: './point-description.component.html',
})
export class PointDescriptionComponent {
    constructor(
        public dialogRef: MatDialogRef<PointDescriptionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: QuestPointModel,
        private answerService: QuestAnswerService,
        private layoutService: LayoutService
        ) { }

    onSubmitClick() {
        this.layoutService.events.next(LayoutEventType.StartWait);
        navigator.geolocation.getCurrentPosition(position => {
            if(position) {
                const userAnswer = {
                    pointId: this.data.pointId,
                    lati: position.coords.latitude,
                    long: position.coords.longitude
                } as BasePointModel;
                this.answerService.checkAnswer(userAnswer).subscribe(
                    (response: QuestAnswerActionResult) => { 
                        this.layoutService.events.next(LayoutEventType.StopWait);
                        this.dialogRef.close(response.isSuccess);
                    }
                )
            }
        })
    }
}
