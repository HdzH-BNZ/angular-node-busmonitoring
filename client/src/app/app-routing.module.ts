import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DeleteComponent } from './delete/delete.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path : 'ajout', component: AccueilComponent},
  {path : 'accueil', component: MapComponent},
  {path : 'delete', component: DeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AccueilComponent,
  MapComponent,
  DeleteComponent
]
