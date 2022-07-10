import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommonService } from '../module/common.service';
import { AddBillComponent } from './add-bill/add-bill.component';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  displayedColumns: string[] = ['billNo', 'billDate', 'partyName', 'lrSelection', 'amount', 'action'];
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
  lrNumbers: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(public dialog: MatDialog, private cs: CommonService,
    private route: Router) { }

  ngOnInit(): void {
    this.getBill();

  }

  getBill() {
    this.cs.getBill().subscribe((res: any) => {
      this.data = res;
      for (let i = 0; i < this.data.length; i++) {
        let lrdata = [];
        for (let j = 0; j < this.data[i].lr.length; j++) {
          lrdata.push(this.data[i].lr[j].lrNo)
        }
        this.data[i]['lrNo'] = lrdata.toString();
      }
      this.datasource = new MatTableDataSource(this.data)
      this.datasource.paginator = this.paginator;
      console.log(res)
    })
  }

  createBill() {
    const dialogRef = this.dialog.open(AddBillComponent, {
      height: "auto",
      width: "1100px",
      data: null
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getBill();
    });
  }

  viewBill(data: any) {
    this.route.navigate(['../bill-pdf'],
      { state: { data: data } });
  }

  editBill(data: any) {
    const dialogRef = this.dialog.open(AddBillComponent, {
      height: "auto",
      width: "1200px",
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getBill();
    });
  }

  openDialog(row: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: "150px",
      width: "400px",
      data: {
        value: row
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.confirmed == true) {
        this.deleteBill(result.value);
      }
    });
  }


  deleteBill(data: any) {

    this.cs.removeBill(data._id).subscribe((res: any) => {
      alert(' Record Delete Successfully');
      this.getBill();
    })
  }
}
