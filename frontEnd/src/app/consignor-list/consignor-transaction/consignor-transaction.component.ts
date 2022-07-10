import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-consignor-transaction',
  templateUrl: './consignor-transaction.component.html',
  styleUrls: ['./consignor-transaction.component.css']
})
export class ConsignorTransactionComponent implements OnInit {
  transactionData: any;
  discription: any;
  date: any = new Date();
  constructor(public dialogRef: MatDialogRef<ConsignorTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cs: CommonService) {

    this.transactionData = data;
  }

  ngOnInit(): void {
  }

  paid() {
    let arr = [];
    arr.push(this.data._id)
    let obj = {
      "_id": this.data.partyName._id,
      "t_id": "",
      "paidAmount": this.data.paidAmount,
      "discription": this.discription,
      "date": this.date,
      "billId": arr
    }

    this.cs.addConsignorTransaction(obj).subscribe((res: any) => {

      this.dialogRef.close();
    })
  }

  cancel() {

  }
}
