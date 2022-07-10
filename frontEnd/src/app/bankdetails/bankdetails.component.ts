import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../module/common.service';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.css']
})
export class BankdetailsComponent implements OnInit {

  bankForm: FormGroup;
  bankDetails: any;
  status = "edit";
  constructor(public dialogRef: MatDialogRef<BankdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private cs: CommonService) {
    this.bankForm = this.fb.group({
      _id: '',
      bankDetail: '',
      accountNumber: '',
      IFSC: '',
      userName: '',
      GST: ''
    })
  }

  ngOnInit(): void {
    this.getBankDetails();
  }

  getBankDetails() {
    this.cs.getBankDetails().subscribe((res: any) => {
      this.bankDetails = res[0];
      if (this.bankDetails) {
        this.status = "default";
        this.bankForm.patchValue({
          _id: this.bankDetails._id,
          bankDetail: this.bankDetails.bankDetail,
          accountNumber: this.bankDetails.accountNumber,
          IFSC: this.bankDetails.IFSC,
          userName: this.bankDetails.userName,
          GST: this.bankDetails.GST,
        })
      }
      console.log(res)
    })
  }

  submit() {
    let obj = this.bankForm.value;

    if (this.bankDetails) {
      this.cs.updateBank(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    } else {
      this.cs.addBank(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    }
  }

  edit() {
    this.status = 'edit';
  }

  cancel() {
    this.dialogRef.close();
  }
}
