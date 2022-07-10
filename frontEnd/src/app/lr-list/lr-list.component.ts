import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommonService } from '../module/common.service';
import { AddlrComponent } from './addlr/addlr.component';

@Component({
  selector: 'app-lr-list',
  templateUrl: './lr-list.component.html',
  styleUrls: ['./lr-list.component.css']
})
export class LrListComponent implements OnInit {
  displayedColumns: string[] = ['lrNo', 'lrDate', 'vehicleNo', 'fromLocation', 'toLocation',
    'consignor', 'consignee', 'invoiceNo',
    'amount', 'amountAcquisitionDate', 'action'];
  // exampleDatabase: ExampleHttpDatabase | null;
  data: any[] = [
    // {
    //   'lrNo': "test", 'lrDate': "test", 'vehicleNo': "test", 'fromLocation': "test",
    //   'toLocation': "test", 'consignor': "test", 'consignorMobileNo': "test", 'consigneeMobileNo': "test",
    //   'description': "test", 'quantity': "test", 'rate': "test", 'servicesTax': "test",
    //   'amount': "test", 'advanceAmount': "test", 'amountAcquisitionDate': "test"
    // },
    // {
    //   'lrNo': "test", 'lrDate': "test", 'vehicleNo': "test", 'fromLocation': "test",
    //   'toLocation': "test", 'consignor': "test", 'consignorMobileNo': "test", 'consigneeMobileNo': "test",
    //   'description': "test", 'quantity': "test", 'rate': "test", 'servicesTax': "test",
    //   'amount': "test", 'advanceAmount': "test", 'amountAcquisitionDate': "test"
    // },
  ];
  datasource: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(public dialog: MatDialog, private cs: CommonService, private route: Router) { }

  ngOnInit(): void {
    this.getLR()

  }

  getLR() {
    this.cs.getLR().subscribe((res: any) => {
      this.data = res;
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      console.log(res)
    })
  }

  createLR() {
    const dialogRef = this.dialog.open(AddlrComponent, {
      height: "auto",
      width: "1200px"
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getLR();
    });
  }

  // viewLr(data: any) {
  //   this.route.navigate(['../bill-pdf'],
  //     { state: { data: data } });
  // }

  editLr(data: any) {
    const dialogRef = this.dialog.open(AddlrComponent, {
      height: "auto",
      width: "1200px",
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getLR();
    });
  }

  openDialog(row: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: "160px",
      width: "400px",
      data: {
        value: row
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.confirmed == true) {
        this.deleteLr(result.value);
      }
    });
  }

  deleteLr(data: any) {
    let obj = {
      _id: data._id,
      isDeleted: true
    }
    this.cs.updateLR(obj).subscribe((res: any) => {
      alert(' Record Delete Successfully');
      this.getLR()
    })
  }

}
