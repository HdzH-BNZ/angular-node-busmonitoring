import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  map;
  url = 'https://busgisapi.herokuapp.com/api/arrets/?format=json';
  arretsBus;

  constructor(private http: HttpClient) {
    this.http.get(this.url)
              .toPromise()
              .then(response => {
                this.arretsBus = response;
                for (const arret of this.arretsBus.features) {
                  const lat = arret.geometry.coordinates[1];
                  const lng = arret.geometry.coordinates[0];
                  const name = arret.properties.nom_exploit;
                  const busMarker = L.marker([lat, lng]).bindPopup(name).addTo(this.map);
                }
              });
  }

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    const lat = 49.03912;
    const lng = 2.07536;

    const facCergy = {
      lat : lat,
      lng : lng,
    };

    const scale = 13;

    this.map = L.map('myMap').setView([lat, lng], scale);

    const tilesLyr = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const facMarker = L.marker(facCergy).bindPopup('Université de Cergy').addTo(this.map);

  }

}
