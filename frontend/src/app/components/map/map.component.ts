import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BasePointModel, mapApiToken } from "../../app.config";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';


  public markers: Array<mapboxgl.Marker> = [];


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

      this.map.setCenter([position.coords.longitude, position.coords.latitude]);
    });
  }

  public DeleteMarker(index: number) {
    this.markers[index].remove();
    this.markers.splice(index, 1);
  }


  public AddRangeMarkers(points: Array<BasePointModel>, isDragable: boolean, onClick?: (point) => void) {
    points.forEach(point => {
      this.AddMarkerInPosition([point.long, point.lati], isDragable, onClick);
    });
  }
  
  public GetPoints(): Array<BasePointModel> {
    const result = new Array<BasePointModel>();
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


  public AddMarkerAtCenter(isDraggable, onClick?: EventListener): void {  // onDragEnd <- function which will be executed after drags end

    this.AddMarkerInPosition(this.map.getCenter(), isDraggable, onClick);
  }
  public AddMarkerInPosition(position: mapboxgl.LngLatLike, isDraggable: boolean, onClick?: (point) => void) {
    var marker = new mapboxgl.Marker({
      draggable: isDraggable,

    })
      .setLngLat(position)
      .addTo(this.map);


    marker.getElement().addEventListener('click', (e) => {
      if(onClick) {
        onClick(this.toBasePoint(marker));
      }
      }
      );

  
    this.markers.push(marker);
  }

  private toBasePoint(marker: mapboxgl.Marker): BasePointModel {
          return {
          pointId: 1,
          lati: marker.getLngLat().lat,
          long: marker.getLngLat().lng
        }
  }
}


