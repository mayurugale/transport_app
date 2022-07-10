import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../module/common.service';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { DriverTransactionComponent } from './driver-transaction/driver-transaction.component';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  driverData: any[] = [];
  displayedColumns: string[] = ['driverName', 'mobileNo', 'drivingLicence', 'action'];
  data: any[] = [];
  datasource: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined
  constructor(private cs: CommonService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDriver();
  }

  getDriver() {
    this.cs.getDriver().subscribe((res: any) => {
      this.driverData = res;
      this.datasource = new MatTableDataSource(this.driverData)
      this.datasource.paginator = this.paginator;
    })
  }

  addDriver() {
    const dialogRef = this.dialog.open(AddDriverComponent, {
      height: "auto",
      width: "1000px",
      data: null
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDriver();
    });
  }

  editDriver(row: any) {
    const dialogRef = this.dialog.open(AddDriverComponent, {
      height: "auto",
      width: "500px",
      data: row
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDriver();
    });
  }
  deleteDrive(row: any) {

  }

  addTransaction(row: any) {
    const dialogRef = this.dialog.open(DriverTransactionComponent, {
      height: "auto",
      width: "1000px",
      data: row
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
