import {Component, Inject,OnInit,AfterViewInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QuestPointModel, QuestModel } from '../../app.config';

export interface DialogData {
  quest:QuestModel,
  point:QuestPointModel

}

@Component({
  selector: 'app-point-editor',
  templateUrl: './point-editor.component.html',
  styleUrls: ['./point-editor.component.scss']
})
export class PointEditorComponent implements OnInit {

  checkList: Array<{canTravel:boolean,title:string,id:number}>=[];
  constructor(
    public dialogRef: MatDialogRef<PointEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {

    var can= [];
    this.checkList.forEach(element => {
      if (element.canTravel)
      can.push(element.id);
    });

    var tmp=[];
    this.data.quest.points.forEach(element => {
      if (can.includes(element.pointId))
       tmp.push(element);
    });

    this.data.point.canOpenPoints=tmp;
    this.dialogRef.close(this.data);
    
  }

  ngOnInit(): void {
    console.log(this.data.point.canOpenPoints);
      this.checkList=[];
      this.data.quest.points.forEach(element => {
         this.checkList.push(
         {
           title:element.title,
           id:element.pointId,
           canTravel: this.data.point.canOpenPoints.includes(element)
           
         })
      });
      console.log(this.checkList);
  }

}
