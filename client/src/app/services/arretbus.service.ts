import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArretbusService {
  private arrets = [];

  constructor() { }

  form: FormGroup = new FormGroup({
    nom_ligne: new FormControl(''),
    nom_exploit: new FormControl(''),
    nom_arret: new FormControl(''),
    nom_commune: new FormControl(''),
    etat_arret: new FormControl(''),
    acces_pmr: new FormControl(),
    marquage_au_sol: new FormControl(),
    etat_marquage: new FormControl(''),
    poubelle: new FormControl(),
    banc: new FormControl(),
    carte_trajets: new FormControl(),
    horaires: new FormControl(),
    toit: new FormControl(),
    commentaires: new FormControl(''),
    lat: new FormControl(),
    lng: new FormControl(),
    date_eval: new FormControl('')
  });
}
