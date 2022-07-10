import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-driver-transaction',
  templateUrl: './driver-transaction.component.html',
  styleUrls: ['./driver-transaction.component.css']
})
export class DriverTransactionComponent implements OnInit {


  driverData: any[] = [];
  status = "edit";
  date = new Date();
  discription = '';
  paidAmount: number = 0;
  totalAmount: number = 0;
  transactions: any[] = [];
  displayedColumns: string[] = ['entries', 'paidAmount', 'totalAmount', 'action'];
  dataSource: any
  objData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(public dialogRef: MatDialogRef<DriverTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: CommonService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.refreshTable(this.data.transaction);
  }

  refreshTable(data: any) {
    this.objData = data[0];
    this.transactions = data;
    this.dataSource = new MatTableDataSource(this.transactions);
  }


  delete(row: any) {
    let vdata = {
      _id: this.data._id
    }
    let rowdId = {
      _id: this.data._id,
      t_id: row.t_id
    }
    this.cs.removeTransaction(rowdId).subscribe((res: any) => {

      this.cs.getDriverById(vdata).subscribe((res: any) => {

        this.refreshTable(res[0].transaction);
      })
    })
  }

  // youGave() {
  //   if (this.totalAmount > 0) {
  //     let obj = {
  //       t_id: '',
  //       _id: this.data._id,
  //       totalAmount: this.totalAmount,
  //       paidAmount: this.paidAmount,
  //       discription: this.discription,
  //       date: this.date,
  //       status: "Gave",
  //       operator: '+'
  //     }
  //     this.cs.addTransaction(obj).subscribe((res: any) => {

  //       let vdata = {
  //         _id: this.data._id
  //       }
  //       this.cs.getDriverById(vdata).subscribe((res: any) => {

  //         this.refreshTable(res[0].transaction);
  //       })
  //     })
  //   } else {
  //     alert('Please fill amount')
  //   }
  // }

  getVehicleById(data: any) {
    this.cs.getDriverById(data).subscribe((res: any) => {

      this.refreshTable(res[0].transaction);
    })
  }

  paid() {
    if (this.totalAmount > 0) {
      let pending: number = 0;
      pending = this.totalAmount - this.paidAmount;
      let obj = {
        t_id: '',
        _id: this.data._id,
        totalAmount: this.totalAmount,
        paidAmount: this.paidAmount,
        pendingAmount: pending,
        discription: this.discription,
        date: this.date,
      }
      this.cs.addTransaction(obj).subscribe((res: any) => {
        let vdata = {
          _id: this.data._id
        }
        this.cs.getDriverById(vdata).subscribe((res: any) => {

          this.refreshTable(res[0].transaction);
        })
      })
    } else {
      alert('Please fill amount')
    }
  }


  // youGot() {
  //   if (this.totalAmount > 0) {
  //     let obj = {
  //       t_id: '',
  //       _id: this.data._id,
  //       totalAmount: this.totalAmount,
  //       paidAmount: this.paidAmount,
  //       discription: this.discription,
  //       date: this.date,
  //       status: "Got",
  //       operator: '-'
  //     }
  //     this.cs.addTransaction(obj).subscribe((res: any) => {
  //       let vdata = {
  //         _id: this.data._id
  //       }
  //       this.cs.getDriverById(vdata).subscribe((res: any) => {

  //         this.refreshTable(res[0].transaction);
  //       })
  //     })
  //   } else {
  //     alert('Please fill amount')
  //   }
  // }

  cancel() {
    this.dialogRef.close();
  }
}
