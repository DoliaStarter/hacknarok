import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BasePointModel, mapApiToken, PointStatus, QuestPointModel } from "../../app.config";

type QuestMarkerModelOptions  = mapboxgl.MarkerOptions & QuestMarkerModel;
  


class QuestMarkerModel extends mapboxgl.Marker {

  constructor(options) {
    super(options);
    this.pointId = options.pointId;
    this.status = options.status;
    this.description = options.description;
    this.title = options.title;
  }
  public pointId?: number;
  public description?: string;
  public title?: string;
  public status?: PointStatus;
} 

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';


  public markers: Array<QuestMarkerModel> = [];


  constructor() { }
  ngOnInit() {
    (mapboxgl as any).accessToken = mapApiToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [0, 0]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );



    this.CenterMap();
  }
  public CenterMap() {
    navigator.geolocation.getCurrentPosition(position => {
      const currentPoint: BasePointModel = {
        lati: position.coords.latitude,
        long: position.coords.longitude
      };
      const closestPoint = this.findClosestPoint(currentPoint, this.GetPoints()) || currentPoint;      
      this.map.setCenter([closestPoint.long, closestPoint.lati]);
    });
  }

  public DeleteMarker(index: number) {
    this.markers[index].remove();
    this.markers.splice(index, 1);
  }
  
  updateMarkers(points: Array<BasePointModel>, isDragable: boolean, onClick?: (point) => void) {
    this.markers.forEach(m => m.remove());
    this.markers = [];
    this.AddRangeMarkers(points, isDragable, onClick);
    this.CenterMap();
  }

  public AddRangeMarkers(points: Array<BasePointModel>, isDragable: boolean, onClick?: (point) => void) {
    points.forEach(point => {
      this.AddMarkerInPosition(point, isDragable, onClick);
    });
  }

  public GetPoints(): Array<QuestPointModel> {
    const result = new Array<QuestPointModel>();
    this.markers.forEach((marker, index) => {
      result.push(
        {
          pointId: index,
          lati: marker.getLngLat().lat,
          long: marker.getLngLat().lng

        }
      )
    });
    return result;
  }

  

  public AddMarkerAtCenter(isDraggable:boolean, onClick?: (point: BasePointModel) => void): void { 
   
    this.AddMarkerInPosition({long: this.map.getCenter().lng, lati: this.map.getCenter().lat}, isDraggable, onClick);
  }
  public AddMarkerInPosition( point: QuestPointModel, isDraggable: boolean, onClick?: (point: BasePointModel) => void) {
    var position: mapboxgl.LngLatLike = [point.long, point.lati];
    
    var marker = new QuestMarkerModel({
      draggable: isDraggable,
      pointId: point.pointId,
      title: point.title,
      description: point.description,
      status: point.status
    })
      .setLngLat(position)
      .addTo(this.map);


    marker.getElement().addEventListener('click', (e) => {
      if(onClick) {
        onClick(this.toQuestPoint(marker));
      }
      }
      );
    this.markers.push(marker);
  }

  private toQuestPoint(marker:QuestMarkerModel):QuestPointModel
  {
    return {
        pointId:marker.pointId,
        lati:marker.getLngLat().lat,
        long:marker.getLngLat().lng,
        title:marker.title,
        description:marker.description
    }
  }

  private findClosestPoint(source: BasePointModel, points: BasePointModel[]) {
    return [...points].sort((a, b) => this.euclidianDistance(source, a) - this.euclidianDistance(source, b))[0];
  }

  private euclidianDistance(point1: BasePointModel, point2: BasePointModel) {
    return Math.sqrt((point1.lati - point2.lati) * (point1.lati - point2.lati) + (point1.long - point2.long) * (point1.long - point2.long))
  }
}


