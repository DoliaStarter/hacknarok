import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestPointModel } from '../../app.config';
import { MapComponent } from '../../components/map/map.component';
import { QuestAnswerService } from '../services/quest-answer.service';
import { PointDescriptionComponent } from './point-description.component';

@Component({
  selector: 'app-quest-point-description',
  templateUrl: './quest-point-description.component.html',
})
export class QuestPointDescriptionComponent implements AfterViewInit {
    @Input()
    public points: QuestPointModel[];

    @Input()
    public questId: number;
    
    @ViewChild(MapComponent, {static: true}) map: MapComponent;
    
    constructor(
      protected dialog: MatDialog,
      protected answerService: QuestAnswerService,
      protected snackbar: MatSnackBar ) { }

    
    ngAfterViewInit() {
      this.refreshMarkers();  
    }

    private onPointClicked(point: QuestPointModel) {
        console.log(point);
        const dialogRef = this.dialog.open(PointDescriptionComponent, {
          width: '500px',
          height: '500px',
          data: point
        });
        dialogRef.afterClosed().subscribe(result => {

          if (result) {
            this.answerService.getQuestPoints(this.questId).subscribe(
              (points) => {
                this.points = points;
                this.refreshMarkers();
                this.snackbar.open('Congrats! You points were successfully updated', 'Hoora', {duration: 4000})
              }
            )
          } else {
            this.snackbar.open('Sorry, but you are still not in this point', ':(', {duration: 4000})

          }
        });
    }


    private refreshMarkers(): void {
      this.map.updateMarkers(this.points, false, (point) => this.onPointClicked(point));
    }
}
