import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/services/vehicle.service';
import { vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  public vehicles: vehicle[] = [];
  public makes = [];
  public filter = {
    makeId: ""
  };

  constructor(private service: VehicleService) { }

  ngOnInit(): void {
    this.service.getMakes().subscribe(m => this.makes = m);
    this.populateVehicles();
  }

  handleChangeFilter() {
    this.populateVehicles();
  }

  populateVehicles() {
    this.service.getVehicles(this.filter).subscribe(v => this.vehicles = v);
  }
}
