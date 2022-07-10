import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-vehicle-transaction',
  templateUrl: './vehicle-transaction.component.html',
  styleUrls: ['./vehicle-transaction.component.css']
})
export class VehicleTransactionComponent implements OnInit {

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
  constructor(public dialogRef: MatDialogRef<VehicleTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cs: CommonService, public dialog: MatDialog) {
    this.data

  }

  ngOnInit(): void {
    this.refreshTable(this.data.trip);
  }

  refreshTable(data: any) {
    this.objData = data[0];
    this.transactions = data;
    this.dataSource = new MatTableDataSource(this.transactions);
  }

  submit() {

  }

  addContact() {
    let obj = {
      amount: '',
      date: '',
      pendingAmount: ''
    }

    // this.paginator = this.dataSource.paginator;
  }

  editContact(row: any, index: number) {

  }

  delete(row: any) {
    let vdata = {
      _id: this.data._id
    }
    let rowdId = {
      _id: this.data._id,
      t_id: row.t_id
    }
    this.cs.removeTrip(rowdId).subscribe((res: any) => {

      this.getVehicleById(vdata);
    })
  }

  // youGave() {
  //   if (this.totalAmount > 0) {
  //     let obj = {
  //       t_id: '',
  //       _id: this.data._id,
  //       amount: this.totalAmount,
  //       discription: this.discription,
  //       date: this.date,
  //       status: "Gave",
  //       operator: '+'
  //     }
  //     this.cs.addtrip(obj).subscribe((res: any) => {

  //       let vdata = {
  //         _id: this.data._id
  //       }
  //       this.getVehicleById(vdata);
  //     })
  //   } else {
  //     alert('Please fill amount')
  //   }
  // }

  getVehicleById(data: any) {
    this.cs.getVehicleById(data).subscribe((res: any) => {

      this.refreshTable(res[0].trip);
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
      this.cs.addtrip(obj).subscribe((res: any) => {
        let vdata = {
          _id: this.data._id
        }
        this.getVehicleById(vdata)
      })
    } else {
      alert('Please fill amount')
    }
  }


  // youGot() {
  //   if (this.amount > 0) {
  //     let obj = {
  //       t_id: '',
  //       _id: this.data._id,
  //       amount: this.amount,
  //       discription: this.discription,
  //       date: this.date,
  //       status: "Got",
  //       operator: '-'
  //     }
  //     this.cs.addtrip(obj).subscribe((res: any) => {
  //       let vdata = {
  //         _id: this.data._id
  //       }
  //       this.getVehicleById(vdata)
  //     })
  //   } else {
  //     alert('Please fill amount')
  //   }
  // }

  cancel() {
    this.dialogRef.close();
  }


}
