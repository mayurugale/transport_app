import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/module/common.service';
import { error_messege } from 'src/app/module/error_message';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  error_messege = error_messege;
  lrData: any[] = [];
  partyData: any[] = [];
  billForm: FormGroup;
  newdate = new Date();
  partydata: any;
  lr = new FormControl();
  constructor(public dialogRef: MatDialogRef<AddBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private cs: CommonService) {
    this.billForm = this.fb.group({
      '_id': '',
      'billNo': '',
      'billDate': this.newdate,
      'type': '',
      'partyName': '',
      'lr': [],
      'amount': '',
      'amountInWord': '',
      'GST': '',
      'CGST': '',
      'SGST': '',
      'advanceRS': '',
      'totalAmount': '',
      'grossAmount': '',
      'address': '',
      "gstNo": ''
    })
  }

  ngOnInit(): void {

    this.getLR()
  }

  selectalllang(event: any) {

    this.calculate(this.lr.value);
  }

  getLR() {
    this.cs.getLR().subscribe((res: any) => {
      // this.lrData = res;

      if (this.data !== null) {
        this.lrData = this.data.lr;
        this.onchangeType(this.data.type);
        this.onchangePartyName(this.data.partyName);
        let arr = []
        let arrData = []
        for (let i = 0; i < this.data.lr.length; i++) {
          arr.push(this.data.lr[i].lrNo)
        }
        for (let i = 0; i < this.lrData.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (this.lrData[i].lrNo === Number(arr[j])) {
              arrData.push(this.lrData[i]);
            }
          }
        }


        let lrId = arr.join(',');
        this.lr.setValue(arrData);
        this.billForm.patchValue({
          '_id': this.data._id,
          'billNo': this.data.billNo,
          'billDate': this.data.billDate,
          'type': this.data.type,
          'partyName': this.data.partyName,
          'amount': this.data.amount,
          'amountInWord': this.data.amountInWord,
          'GST': this.data.GST,
          'CGST': this.data.CGST,
          'SGST': this.data.SGST,
          'advanceRS': this.data.advanceRS,
          'totalAmount': this.data.totalAmount,
          'grossAmount': this.data.grossAmount,
          'address': this.data.address,
          "gstNo": this.data.gstNo
        })
      }
    })
  }

  submit() {

    let obj = this.billForm.value;
    obj.lr = [];
    obj.lr = this.lr.value;
    if (this.data === null) {
      this.cs.addBill(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    } else {
      this.cs.updateBill(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    }

  }

  onchangeType(event: any) {

    this.cs.getParty(event).subscribe((res: any) => {
      this.partyData = res;
      if (this.data !== null) {
        let data = this.partyData.filter(x => x.consignorName === this.data.partyName.consignorName)[0]
        this.partydata = data
        this.billForm.patchValue({
          'partyName': data,
          'address': data.address,
          "gstNo": data.consignorGSTNumber
        })
        console.log(res)
      }

    })
  }

  onchangePartyName(event: any) {
    if (this.data === null) {
      let obj
      this.billForm.patchValue({
        partyName: event.value,
        address: event.value.address,
        gstNo: event.value.consignorGSTNumber
      })
      if (this.billForm.value.type === "consignor") {
        obj = {
          'consignor': event.value.consignorName,
          'billStatus': false,
          'isDeleted': false
        }
      } else {
        obj = {
          'consignee': event.value.consignorName,
          'billStatus': false,
          'isDeleted': false
        }
      }
      this.getFilterLR(obj)
    } else {
      this.billForm.patchValue({
        partyName: event.consignorName,
        address: event.address,
        gstNo: event.consignorGSTNumber
      })
    }

  }

  getFilterLR(obj: any) {
    this.cs.getFilterLR(obj).subscribe((res: any) => {
      this.lrData = res;


    })
  }

  changeGST(event: any) {

    this.calculate(this.lr.value);
  }

  calculate(data: any) {

    console.log(data);
    if (data.length > 0) {
      let Amount = data.reduce(this.getSum, 0)
      let grossAmount = data.reduce(this.getgrossSum, 0)
      let otherChar = grossAmount - Amount;
      if (this.billForm.value.GST !== '' && this.billForm.value.GST !== null) {
        let gstValue = (this.billForm.value.GST / 100);
        let cgst = (gstValue * Amount);
        let sgst = (gstValue * Amount);
        let totalAmount = Amount + cgst + sgst + otherChar;
        this.billForm.patchValue({
          'amount': Amount,
          'CGST': cgst,
          'SGST': sgst,
          'totalAmount': totalAmount,
          'grossAmount': grossAmount
        })
      } else {
        this.billForm.patchValue({
          'amount': Amount,
          'CGST': '',
          'SGST': '',
          'totalAmount': Amount,
          'grossAmount': grossAmount
        })
      }
    } else {
      this.billForm.patchValue({
        'amount': '',
        'CGST': '',
        'SGST': '',
        'GST': '',
        'totalAmount': '',
        'grossAmount': ''
      })
    }
  }

  getSum(total: any, data: any) {
    return total + Number(data.amount);
  }
  getgrossSum(total: any, data: any) {

    return total + Number(data.totalAmount);
  }

  cancel() {
    this.dialogRef.close();
  }

}
