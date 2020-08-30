import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasePointModel, QuestPointModel } from '../../app.config';
import { QuestAnswerActionResult, QuestAnswerService } from '../services/quest-answer.service';
@Component({
  selector: 'app-point-description',
  templateUrl: './point-description.component.html',
})
export class PointDescriptionComponent {
    constructor(
        public dialogRef: MatDialogRef<PointDescriptionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: QuestPointModel,
        private answerService: QuestAnswerService
        ) { }

    onSubmitClick() {
        navigator.geolocation.getCurrentPosition(position => {
            if(position) {
                const userAnswer = {
                    id: this.data.pointId,
                    lati: position.coords.latitude,
                    long: position.coords.longitude
                } as BasePointModel;
                this.answerService.checkAnswer(userAnswer).subscribe(
                    (response: QuestAnswerActionResult) => { 
                        this.dialogRef.close(response.isSuccess);
                    }
                )
            }
        })
    }
}
