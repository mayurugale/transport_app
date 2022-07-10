import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-add-consignor',
  templateUrl: './add-consignor.component.html',
  styleUrls: ['./add-consignor.component.css']
})
export class AddConsignorComponent implements OnInit {


  consignorForm: FormGroup;
  consignorData: any[] = [];
  status = "edit";
  constructor(public dialogRef: MatDialogRef<AddConsignorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private cs: CommonService, public dialog: MatDialog) {
    this.consignorForm = this.fb.group({
      _id: '',
      consignorName: '',
      consignorGSTNumber: '',
      mobileNumber: '',
      location: '',
      address: ''
    })
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.consignorForm.patchValue({
        _id: this.data._id,
        consignorName: this.data.consignorName,
        consignorGSTNumber: this.data.consignorGSTNumber,
        mobileNumber: this.data?.mobileNumber,
        location: this.data?.location,
        address: this.data?.address
      })
    }
  }



  submit() {
    let obj = this.consignorForm.value;
    if (this.data !== null) {
      this.cs.updateConsignor(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    } else {
      this.cs.addConsignor(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    }
  }


  cancel() {
    this.dialogRef.close();
  }
}
