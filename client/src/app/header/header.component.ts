import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { faHome, faToolbox, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  itemList = [];
  faHome = faHome;
  faToolbox = faToolbox;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.itemList = [
      {title : 'Liste des arrêts', icone : faHome, lien: '/accueil'},
      {title : 'Ajouter un arrêt', icone : faPlus, lien: '/ajout'},
      {title : 'Modifier un arrêt', icone : faToolbox, lien: '/'},
      {title : 'Supprimer un arrêt', icone : faMinus, lien: '/delete'},
    ];
  }

}
