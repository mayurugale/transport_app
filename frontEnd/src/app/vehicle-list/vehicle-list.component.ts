import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../module/common.service';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { VehicleTransactionComponent } from './vehicle-transaction/vehicle-transaction.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  displayedColumns: string[] = ['vehicleName', 'vehicleNo', 'vehicleType', 'action'];
  vehicleData: any[] = [];
  datasource: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(private cs: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle() {
    this.cs.getVehicle().subscribe((res: any) => {
      this.vehicleData = res;
      this.datasource = new MatTableDataSource(this.vehicleData)
      this.datasource.paginator = this.paginator;
    })
  }


  editVehicle(row: any) {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      height: "auto",
      width: "500px",
      data: row
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getVehicle();
    });
  }

  deleteVehiclel(row: any) {
    // this.cs.removeBill(row._id).subscribe((res: any) => {
    //   alert(' Record Delete Successfully');
    //   this.getBill();
    // })
  }

  createVehicle() {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      height: "auto",
      width: "500px",
      data: null
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getVehicle();
    });
  }

  addTransaction(row: any) {
    const dialogRef = this.dialog.open(VehicleTransactionComponent, {
      height: "auto",
      width: "1000px",
      data: row
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
