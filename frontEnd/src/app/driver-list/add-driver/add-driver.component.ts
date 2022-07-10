import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  driverForm: FormGroup;
  driverData: any[] = [];
  status = "edit";
  transactions: any[] = [];
  displayedColumns: string[] = ['amount', 'pendingAmount', 'date', 'action'];
  dataSource: any
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(public dialogRef: MatDialogRef<AddDriverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private cs: CommonService, public dialog: MatDialog) {
    this.driverForm = this.fb.group({
      _id: '',
      driverName: '',
      mobileNo: '',
      drivingLicence: ''
    })
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.driverForm.patchValue({
        _id: this.data._id,
        driverName: this.data.driverName,
        mobileNo: this.data.mobileNo,
        drivingLicence: this.data.transaction
      })
    }
  }

  submit() {
    let obj = this.driverForm.value;
    if (this.data !== null) {
      this.cs.updateDriver(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    } else {
      this.cs.addDriver(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    }
  }

  addContact() {
    let obj = {
      amount: '',
      date: '',
      pendingAmount: ''
    }
    this.transactions.push(obj);
    this.dataSource = new MatTableDataSource(this.transactions);
    // this.paginator = this.dataSource.paginator;
  }

  editContact(row: any, index: number) {

  }

  delete(index: any) {

  }

  cancel() {
    this.dialogRef.close();
  }

}
