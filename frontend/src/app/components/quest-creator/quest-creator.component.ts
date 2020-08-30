import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BasePointModel, mapApiToken, QuestPointModel } from "../../app.config";
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-quest-creator',
  templateUrl: './quest-creator.component.html',
  styleUrls: ['./quest-creator.component.scss']
})
export class QuestCreatorComponent implements AfterViewInit {

  constructor() { }

  title:string;
  description:string;
  

  points: Array<QuestPointModel>=[];
  iterator:number;
  @ViewChild(MapComponent, {static: true}) map: MapComponent;


  ngAfterViewInit(): void {
    const myCustomControl = new AddPointControl(() => this.AddMarker());

    this.map.map.addControl(myCustomControl);
  }
  AddMarker()
  {
    this.map.AddMarkerAtCenter(true, this.onPointClicked);
    const point =this.map.markers[this.map.markers.length-1];
    point.pointId=this.iterator;
    point.description="Description of point goes here";
    point.title="New point";

    this.iterator++;

  }

  private onPointClicked(point: BasePointModel) {
    console.log(point);
    
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
