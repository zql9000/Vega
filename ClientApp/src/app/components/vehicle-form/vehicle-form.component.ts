import { Component, OnInit } from '@angular/core';
import { MakeService } from 'src/services/make.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  public makes;

  constructor(private service: MakeService) { }

  ngOnInit(): void {
    this.service.getMakes().subscribe(makes => {
      this.makes = makes;
    });
  }

}
