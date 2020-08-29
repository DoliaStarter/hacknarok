import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { mapApiToken, BasePointModel } from "../../app.config";
import * as mapboxgl from 'mapbox-gl';

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
    })
  }

  public DeleteMarker(index: number) {
    this.markers[index].remove();
    this.markers.splice(index, 1);
  }


  public initMarkers(points: Array<BasePointModel>, isDragable: boolean) {
    points.forEach(point => {
      this.AddMarkerInPosition([point.long, point.lati], isDragable);
    });

  }

  public AddMarkerAtCenter(isDraggable, onClick?: EventListener): void {  // onDragEnd <- function which will be executed after drags end

    this.AddMarkerInPosition(this.map.getCenter(), isDraggable, onClick);
  }
  public AddMarkerInPosition(position: mapboxgl.LngLatLike, isDraggable: boolean, onClick?: EventListener) {
    var marker = new mapboxgl.Marker({
      draggable: isDraggable,

    })
      .setLngLat(position)
      .addTo(this.map);

    // function onDragEnd() {
    //   var lngLat = marker.getLngLat();
    //   coordinates.style.display = 'block';
    //   coordinates.innerHTML =
    //   'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    //   }
    marker.getElement().addEventListener('click', onClick);

    this.markers.push(marker);
  }


}


