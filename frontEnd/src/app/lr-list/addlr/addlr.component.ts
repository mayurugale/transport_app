import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddConsignorComponent } from 'src/app/consignor-list/add-consignor/add-consignor.component';
import { AddDriverComponent } from 'src/app/driver-list/add-driver/add-driver.component';
import { CommonService } from 'src/app/module/common.service';
import { error_messege } from 'src/app/module/error_message';
import { AddVehicleComponent } from 'src/app/vehicle-list/add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-addlr',
  templateUrl: './addlr.component.html',
  styleUrls: ['./addlr.component.css']
})
export class AddlrComponent implements OnInit {
  error_messege = error_messege;
  lrForm: FormGroup;
  vehicleData: any[] = [];
  consignorData: any[] = [];
  consigneeData: any[] = [];
  driverData: any[] = [];
  date = new Date()
  constructor(public dialogRef: MatDialogRef<AddlrComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private cs: CommonService, public dialog: MatDialog) {
    this.lrForm = this.fb.group({
      '_id': '',
      'lrNo': '',
      'lrDate': this.date,
      'vehicleNo': '',
      'vehicleType': '',
      'fromLocation': '',
      'toLocation': '',
      'consignor': '',
      'consignee': '',
      'consignorGstNumber': '',
      'consigneeGstNumber': '',
      'invoiceNo': '',
      'quantity': '',
      // 'rate': '',
      // 'servicesTax': '',
      'amount': '',
      'totalAmount': '',
      // 'advanceAmount': '',
      'amountAcquisitionDate': '',
      'isDeleted': false,
      'billStatus': false,
      'otherChar': ''
    })
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.lrForm.patchValue({
        '_id': this.data._id,
        'lrNo': this.data.lrNo,
        'lrDate': this.data.lrDate,
        'vehicleNo': this.data.vehicleNo,
        'vehicleType': this.data.vehicleType,
        'fromLocation': this.data.fromLocation,
        'toLocation': this.data.toLocation,
        'consignor': this.data.consignor,
        'consignee': this.data.consignee,
        'consignorGstNumber': this.data.consignorGstNumber,
        'consigneeGstNumber': this.data.consigneeGstNumber,
        'invoiceNo': this.data.invoiceNo,
        'quantity': this.data.quantity,
        'amount': this.data.amount,
        'totalAmount': this.data.totalAmount,
        'amountAcquisitionDate': this.data.amountAcquisitionDate,
        'isDeleted': this.data.isDeleted,
        'billStatus': this.data.billStatus,
        'otherChar': this.data.otherChar,
      })
    }
    this.getVehicle();
    this.getConsignor();
    // this.getDriver();
  }

  get f() {
    return this.lrForm;
  }

  getVehicle() {
    this.cs.getVehicle().subscribe((res: any) => {
      this.vehicleData = res;
      console.log(res)
    })
  }

  getConsignor() {
    this.cs.getConsignor().subscribe((res: any) => {
      this.consignorData = res;

      console.log(res)
    })
  }

  // getDriver() {
  //   this.cs.getDriver().subscribe((res: any) => {
  //     this.driverData = res;
  //   })
  // }

  submit() {
    if (this.lrForm.invalid) {
      this.lrForm.get('vehicleNo')?.markAsTouched();
      this.lrForm.get('vehicleType')?.markAsTouched();
      this.lrForm.get('lrDate')?.markAsTouched();
      this.lrForm.get('fromLocation')?.markAsTouched();
      this.lrForm.get('toLocation')?.markAsTouched();
      this.lrForm.get('consignor')?.markAsTouched();
      this.lrForm.get('consignee')?.markAsTouched();
      this.lrForm.get('consignorGstNumber')?.markAsTouched();
      this.lrForm.get('consigneeGstNumber')?.markAsTouched();
      this.lrForm.get('amount')?.markAsTouched();
      this.lrForm.get('amountAcquisitionDate')?.markAsTouched();
    } else {
      let obj = this.lrForm.value;
      if (this.data === null) {
        this.cs.addLR(obj).subscribe((res: any) => {
          this.dialogRef.close();
        })
      } else {
        this.cs.updateLR(obj).subscribe((res: any) => {
          this.dialogRef.close();
        })
      }

    }
  }

  cancel() {
    this.dialogRef.close();
  }
  changeOtherAmount(event: any) {

    console.log(event.target.value)
    let OA = Number(event.target.value);
    if (this.lrForm.value.amount !== '') {
      let amount = Number(this.lrForm.value.amount);
      amount += OA;
      this.lrForm.patchValue({
        totalAmount: amount
      });
    }


  }

  changeAmount(event: any) {
    let amount = Number(event.target.value);
    if (this.lrForm.value.otherChar !== '') {
      let otherCharger = Number(this.lrForm.value.otherChar);
      amount += otherCharger;
    }
    this.lrForm.patchValue({
      totalAmount: amount
    });
  }

  AddConsignor() {
    const dialogRef = this.dialog.open(AddConsignorComponent, {
      height: "auto",
      width: "500px",
      data: null
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getConsignor();
    });
  }

  AddVehicle() {
    const dialogRef = this.dialog.open(AddVehicleComponent, {
      height: "auto",
      width: "500px",
      data: null
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getVehicle();
    });
  }

  onChangeVehicle(event: any) {
    let vType = this.vehicleData.filter(x => x.vehicleNo === event.value)[0].vehicleType
    this.lrForm.patchValue({
      vehicleType: vType
    })
  }


  onChangeConsignor(event: any) {

    let gstNo = this.consignorData.filter(x => x.consignorName === event.value)[0].consignorGSTNumber
    let loc = this.consignorData.filter(x => x.consignorName === event.value)[0].location
    this.lrForm.patchValue({
      consignorGstNumber: gstNo,
      fromLocation: loc
    })
  }


  onChangeConsignee(event: any) {
    let gstNo = this.consignorData.filter(x => x.consignorName === event.value)[0].consignorGSTNumber
    let loc = this.consignorData.filter(x => x.consignorName === event.value)[0].location
    this.lrForm.patchValue({
      consigneeGstNumber: gstNo,
      toLocation: loc

    })
  }
  // addDriver() {
  //   const dialogRef = this.dialog.open(AddDriverComponent, {
  //     height: "auto",
  //     width: "500px",
  //     data: null
  //   });
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this.getDriver();
  //   });
  // }
}
