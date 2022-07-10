import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/module/common.service';
import { ConsignorTransactionComponent } from '../consignor-transaction/consignor-transaction.component';

@Component({
  selector: 'app-consignor-bill',
  templateUrl: './consignor-bill.component.html',
  styleUrls: ['./consignor-bill.component.css']
})
export class ConsignorBillComponent implements OnInit {


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
  consignorId: any;
  data1: any;
  objData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(public dialog: MatDialog, private cs: CommonService,
    private route: Router, private _location: Location) {

    if (this.route?.getCurrentNavigation()?.extras.state !== undefined) {
      this.data1 = this.route?.getCurrentNavigation()?.extras.state;
      this.consignorId = this.data1.data._id

    } else {
      this._location.back();
    }
  }

  ngOnInit(): void {
    this.getBill();

  }

  getBill() {
    this.cs.getConsignorBill(this.consignorId).subscribe((res: any) => {
      this.data = res;

      this.objData = this.data[0];
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



  transaction(data: any) {
    const dialogRef = this.dialog.open(ConsignorTransactionComponent, {
      height: "auto",
      width: "800px",
      data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getBill();
    });
  }

  deleteBill(data: any) {

    this.cs.removeBill(data._id).subscribe((res: any) => {
      alert(' Record Delete Successfully');
      this.getBill();
    })
  }
}
