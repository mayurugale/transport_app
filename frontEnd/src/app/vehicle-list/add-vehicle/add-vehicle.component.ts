import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/module/common.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleData: any[] = [];
  status = "edit";
  constructor(public dialogRef: MatDialogRef<AddVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private cs: CommonService, public dialog: MatDialog) {
    this.vehicleForm = this.fb.group({
      _id: '',
      vehicleName: '',
      vehicleNo: '',
      vehicleType: ''
    })
  }

  ngOnInit(): void {
    if (this.data !== null) {
      this.vehicleForm.patchValue({
        _id: this.data._id,
        vehicleName: this.data.vehicleName,
        vehicleNo: this.data.vehicleNo,
        vehicleType: this.data.vehicleType,
      })
    }
  }


  submit() {
    let obj = this.vehicleForm.value;
    if (this.data !== null) {
      this.cs.updateVehicle(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    } else {
      this.cs.addVehicle(obj).subscribe((res: any) => {
        this.dialogRef.close();
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
