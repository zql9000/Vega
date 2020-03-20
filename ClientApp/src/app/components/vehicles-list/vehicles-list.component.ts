import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/services/vehicle.service';
import { vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
  public makes = [];
  public query: any = {
    pageSize: this.PAGE_SIZE
  };
  public columns = [
    {title: '#'},
    {title: 'Make', key: 'Make', isSortable: true},
    {title: 'Model', key: 'Model', isSortable: true},
    {title: 'Contact Name', key: 'ContactName', isSortable: true},
    {title: 'Actions'}
  ];

  constructor(private service: VehicleService) { }

  ngOnInit(): void {
    this.service.getMakes().subscribe(m => this.makes = m);
    this.populateVehicles();
  }

  handleChangeFilter() {
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  populateVehicles() {
    this.service.getVehicles(this.query).subscribe(qr => this.queryResult = qr);
  }

  sortVehicles(column: string) {
    if (this.query.sortBy === column)
      this.query.isSortAscending = !this.query.isSortAscending;
    else {
      this.query.sortBy = column;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }

  handlePageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}
