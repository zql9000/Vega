import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vehicle } from 'src/app/models/vehicle';
import { saveVehicle } from 'src/app/models/saveVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get("api/features");
  }

  getMakes() {
    return this.http.get("api/makes");
  }

  createVehicle(vehicle) {
    return this.http.post("api/vehicles", vehicle);
  }

  getVehicle(id: number) {
    return this.http.get<vehicle>(`api/vehicles/${id}`);
  }

  updateVehicle(vehicle: saveVehicle) {
    return this.http.put(`api/vehicles/${vehicle.id}`, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(`api/vehicles/${id}`);
  }
}
