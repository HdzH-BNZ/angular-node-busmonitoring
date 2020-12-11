import { Component, OnInit } from '@angular/core';
import { ArretbusService } from '../services/arretbus.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { faSortNumericDown } from '@fortawesome/free-solid-svg-icons';

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
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  listeEtats = ['neuf', 'propre', 'bon', 'mauvais'];
  etatMarquage = ['neuf', 'bon', 'usé', 'absent'];
  dataNewArret = {
    nom_ligne: '',
    nom_exploit: '',
    nom_arret: '',
    nom_commune: '',
    etat_arret: '',
    acces_pmr: '',
    marquage_au_sol: '',
    etat_marquage: '',
    poubelle: '',
    banc: '',
    carte_trajets: '',
    horaires: '',
    toit: '',
    commentaires: '',
    lat: Number,
    lng: Number,
    date_eval: ''
  };
  map;
  url = 'https://busgisapi.herokuapp.com/api/arrets/?format=json';
  arretsBus;

  constructor(public arretService: ArretbusService, private http: HttpClient) { }

  ngOnInit(): void {
    this.createMap();
  }

  addNewArret(f) {
    alert('Nouvel arrêt enregistré !');
    console.log(f.value);
    this.http.post('http://localhost:8000/api/arrets', f.value)
      .subscribe(() => {
        console.warn('result');
      });
    f.reset();
  }

  createMap() {
    const lat = 49.03912;
    const lng = 2.07536;

    const facCergy = {
      lat: lat,
      lng: lng,
    };

    const scale = 13;

    this.map = L.map('myMap').setView([lat, lng], scale);

    const tilesLyr = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const facMarker = L.marker(facCergy).bindPopup('Université de Cergy').addTo(this.map);

    this.map.on('click', function (point) {
      alert("Lat, Lng : " + point.latlng.lat + ", " + point.latlng.lng);
      (<HTMLInputElement>document.getElementById('latitude')).value = point.latlng.lat;
      (<HTMLInputElement>document.getElementById('longitude')).value = point.latlng.lng;
    });

    console.log(this.dataNewArret);
  }

}
