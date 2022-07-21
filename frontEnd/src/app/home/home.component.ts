import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BankdetailsComponent } from '../bankdetails/bankdetails.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'vehicleNumber',
    'vehicleType',
    'vehicleCapacity',
    'vehicleName',
  ];
  // exampleDatabase: ExampleHttpDatabase | null;
  data: any[] = [
    {
      vehicleNumber: 'test',
      vehicleType: 'test',
      vehicleCapacity: 'test',
      vehicleName: 'test',
    },
    {
      vehicleNumber: 'test1',
      vehicleType: 'test1',
      vehicleCapacity: 'test1',
      vehicleName: 'test1',
    },
  ];
  datasource: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.datasource = new MatTableDataSource(this.data);
    this.datasource.paginator = this.paginator;

    $('a').on('click', function () {
      $(this).addClass('active').siblings('a').removeClass('active');
    });
  }

  createBankDetails() {
    const dialogRef = this.dialog.open(BankdetailsComponent, {
      height: 'auto',
      width: '500px',
      data: null,
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }
}
