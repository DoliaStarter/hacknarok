import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { QuestModel, QuestPointModel } from "../../app.config";
import { QuestEditorService } from '../../services/quest-editor.service';
import { MapComponent } from '../map/map.component';
import { DialogData, PointEditorComponent } from '../point-editor/point-editor.component';

@Component({
  selector: 'app-quest-creator',
  templateUrl: './quest-creator.component.html',
  styleUrls: ['./quest-creator.component.scss']
})
export class QuestCreatorComponent implements AfterViewInit {

  constructor(public dialog: MatDialog, private editorService: QuestEditorService) { }

  lastPoint:number;

  quest: QuestModel = {
    title: '',
    creator: '',
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
    point.description="";
    point.title="";
 
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
      width: '500px',
      height: '400px',
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
