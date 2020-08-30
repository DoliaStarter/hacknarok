import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BasePointModel, mapApiToken, QuestPointModel } from "../../app.config";
import { MapComponent } from '../map/map.component';
import { PointEditorComponent,DialogData } from '../point-editor/point-editor.component';
import { MatDialog } from '@angular/material/dialog';
import { title } from 'process';

@Component({
  selector: 'app-quest-creator',
  templateUrl: './quest-creator.component.html',
  styleUrls: ['./quest-creator.component.scss']
})
export class QuestCreatorComponent implements AfterViewInit {

  constructor(public dialog: MatDialog) { }

  title:string;
  description:string;
  

  lastPoint:number;
  points: Array<QuestPointModel>=[];

  tree =[];
   
  iterator:number=0;
  @ViewChild(MapComponent, {static: true}) map: MapComponent;


  ngAfterViewInit(): void {
    const myCustomControl = new AddPointControl(() => this.AddMarker());

    this.map.map.addControl(myCustomControl);
  }
  AddMarker()
  {
    this.map.AddMarkerAtCenter(true,  (point) => this.onPointClicked(point));
    const point =this.map.markers[this.map.markers.length-1];
    point.pointId=this.iterator;
    point.description="Description of point goes here";
    point.title="New point";
    this.iterator++;
    var tmp= new Array<{id:number, canBeVisited:boolean}>();


    this.map.markers.forEach(element => {
        tmp.push(
          {
            id:element.pointId,
            canBeVisited:false
          }
        )
    });
    

    this.tree.forEach(element => {
          element.push(
            {
              id:point.pointId,
              canBeVisited:false
            }
          )
     
    });
    this.tree[point.pointId]=tmp;
    
   

  }
   Save()
   {
       console.log(this.tree);
   }
  private onPointClicked(point: QuestPointModel) {
    this.lastPoint=point.pointId;
    let possible= new Array<{title:string, id:number, canBeVisited:boolean}>()


    console.log(this.tree);
    this.tree[point.pointId].forEach(element => {
         possible.push(
            {
              title:this.map.markers[element.id].title,
              id:element.id,
              canBeVisited:element.canBeVisited
            }
         );
     });
     console.log(possible);
     
    const dialogRef = this.dialog.open(PointEditorComponent, {
      width: '800px',
      height: '600px',
      data: {title: point.title, description:point.description,
      possible: possible }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
     
      this.map.markers[this.lastPoint].title=result.title;
      this.map.markers[this.lastPoint].description=result.description;

      console.log(result.possible);
      var tmp= new Array<{id:number, canBeVisited:boolean}>();


     result.possible.forEach(element => {
        tmp.push(
          {
            id:element.id,
            canBeVisited: element.canBeVisited
          }
        )
    });
      this.tree[point.pointId] = tmp;
      console.log(this.tree);
   
      
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
