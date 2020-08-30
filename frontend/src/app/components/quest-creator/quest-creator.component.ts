import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BasePointModel, mapApiToken, QuestPointModel, QuestModel } from "../../app.config";
import { MapComponent } from '../map/map.component';
import { PointEditorComponent,DialogData } from '../point-editor/point-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { title } from 'process';
import { QuestEditorService } from '../../services/quest-editor.service';

@Component({
  selector: 'app-quest-creator',
  templateUrl: './quest-creator.component.html',
  styleUrls: ['./quest-creator.component.scss']
})
export class QuestCreatorComponent implements AfterViewInit {

  constructor(public dialog: MatDialog, private editorService: QuestEditorService) { }

  lastPoint:number;

  quest: QuestModel = {
    'title': 'New quest',
    creator: 'Author',
    gamesCount:0,
    points:[]
  };

   
  iterator:number=0;
  @ViewChild(MapComponent, {static: true}) map: MapComponent;


  ngAfterViewInit(): void {
    const myCustomControl = new AddPointControl(() => this.AddMarker());

    this.map.map.addControl(myCustomControl);
  }
  AddMarker()
  {
    this.map.AddMarkerAtCenter(true,  (point) => this.onPointClicked(point));
    this.map.markers[this.map.markers.length-1].pointId=this.iterator;
    this.iterator++;
    const point=  this.map.toQuestPoint(this.map.markers[this.map.markers.length-1]);
    point.description="Description of point goes here";
    point.title="New point";
 
    this.quest.points.push(point);
    point.canOpenPoints=[];
    this.quest.points[this.quest.points.length-1].canOpenPoints=[];


   

  }
   Save()
   {
      
       this.editorService.CreateQuest(this.quest).subscribe();

   }
  private onPointClicked(point: QuestPointModel) {
    this.lastPoint=point.pointId;
    
    var data= {} as DialogData;
    data.point=this.quest.points.find(val=>{return val.pointId==point.pointId});
    data.quest=this.quest;
     

    const dialogRef = this.dialog.open(PointEditorComponent, {
      width: '400px',
      height: '300px',
      data:  data
    });

    dialogRef.afterClosed().subscribe((result:DialogData) => {
      if (!result) return;
      console.log(result);

      this.quest.points[this.lastPoint].title=result.point.title;
      this.quest.points[this.lastPoint].description=result.point.description;
      this.quest.points[this.lastPoint].canOpenPoints=result.point.canOpenPoints;
     

    });
    
  }

  
}
class AddPointControl {
  map: mapboxgl.Map;
  event:EventListener;
  container: HTMLElement;
  onAdd(map){
  
    this.map = map;
    this.container = document.createElement('button');
    this.container.className = 'mapboxgl-ctrl';
    this.container.textContent = 'Add marker';
    this.container.addEventListener('click', this.event
    );
    return this.container;
  }

  constructor(event:EventListener)
  {
    this.event=event;
  }
  onRemove(){
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
}
