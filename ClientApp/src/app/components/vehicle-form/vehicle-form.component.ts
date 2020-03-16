import { Component, OnInit } from "@angular/core";
import { VehicleService } from "src/services/vehicle.service";
import { Router, ActivatedRoute } from "@angular/router";
import { forkJoin, Observable } from "rxjs";

import { vehicle } from "src/app/models/vehicle";
import { contact } from "src/app/models/contact";
import { keyValuePair } from "src/app/models/keyValuePair";
import { saveVehicle } from "src/app/models/saveVehicle";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-vehicle-form",
  templateUrl: "./vehicle-form.component.html",
  styleUrls: ["./vehicle-form.component.css"]
})
export class VehicleFormComponent implements OnInit {
  public vehicle: saveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: "",
      phone: "",
      email: ""
    }
  };
  public makes: any;
  public models: any;
  public features: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastr: ToastrService
  ) {
    route.params.subscribe(p => (this.vehicle.id = +p["id"]));
  }

  ngOnInit(): void {
    let sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    forkJoin(sources).subscribe(
      data => {
        this.makes = data[0];
        this.features = data[1];

        if (this.vehicle.id) {
          this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {
            this.setVehicle(v);
            this.populateModels();
          });
        }
      },
      error => {
        if (error.status === 404) this.router.navigate(["/home"]);
      }
    );
  }

  private setVehicle(v: vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = v.features.map(f => f.id);
  }

  handleChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  toggleFeature(featureId, event) {
    if (event.target.checked) this.vehicle.features.push(featureId);
    else {
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  handleSubmit() {
    if (this.vehicle.id) {
      this.vehicleService
        .updateVehicle(this.vehicle)
        .subscribe(v => this.toastr.success("Vehicle updated","Update"));
    }
    else {
      this.vehicleService
        .createVehicle(this.vehicle)
        .subscribe(v => console.log(v));
    }
  }

  handleDelete() {
    if (confirm("Are you sure?"))
      this.vehicleService
        .deleteVehicle(this.vehicle.id)
        .subscribe(v => {
            this.router.navigate(["/home"]);
        });
  }
}
