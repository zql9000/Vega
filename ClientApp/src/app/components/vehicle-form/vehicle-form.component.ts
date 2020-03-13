import { Component, OnInit } from "@angular/core";
import { VehicleService } from "src/services/make.service";

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  public makes;
  public models;
  public features;
  public makeSelected;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService
      .getMakes()
      .subscribe(makes => (this.makes = makes));
    this.vehicleService
      .getFeatures()
      .subscribe(features => (this.features = features));
  }

  handleChange() {
    let make = this.makes.find(m => this.makeSelected == m.id);
    this.models = make ? make.models : null;
  }
}
