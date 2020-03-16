import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'vehicles', pathMatch: 'full'},
  {path: 'vehicles', component: VehiclesListComponent},
  {path: 'vehicle/new', component: VehicleFormComponent},
  {path: 'vehicle/:id', component: VehicleFormComponent},
  {path: '**', redirectTo: 'vehicles'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
