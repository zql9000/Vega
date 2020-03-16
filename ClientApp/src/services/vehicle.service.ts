import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vehicle } from 'src/app/models/vehicle';
import { saveVehicle } from 'src/app/models/saveVehicle';
import { keyValuePair } from 'src/app/models/keyValuePair';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get<keyValuePair[]>("api/features");
  }

  getMakes() {
    return this.http.get<keyValuePair[]>("api/makes");
  }

  createVehicle(vehicle) {
    return this.http.post("api/vehicles", vehicle);
  }

  getVehicles(filter) {
    return this.http.get<vehicle[]>('api/vehicles', { params: filter});
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
