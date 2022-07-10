import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { CommonService } from '../module/common.service';
import { AddConsignorComponent } from './add-consignor/add-consignor.component';

@Component({
  selector: 'app-consignor-list',
  templateUrl: './consignor-list.component.html',
  styleUrls: ['./consignor-list.component.css']
})
export class ConsignorListComponent implements OnInit {
  consignorData: any[] = [];
  displayedColumns: string[] = ['consignorName', 'consignorGSTNumber', 'address', 'action'];
  data: any[] = [];
  datasource: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined
  constructor(private cs: CommonService, public dialog: MatDialog,
    private route: Router) { }

  ngOnInit(): void {
    this.getConsignor();
  }

  getConsignor() {
    this.cs.getConsignor().subscribe((res: any) => {
      console.log(res);

      this.consignorData = res;
      this.datasource = new MatTableDataSource(this.consignorData)
      this.datasource.paginator = this.paginator;
    })
  }

  createConsignor() {
    const dialogRef = this.dialog.open(AddConsignorComponent, {
      height: "auto",
      width: "500px",
      data: null
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getConsignor();
    });
  }

  editConsignor(row: any) {
    const dialogRef = this.dialog.open(AddConsignorComponent, {
      height: "auto",
      width: "500px",
      data: row
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getConsignor();
    });
  }
  deleteConsignor(row: any) {
    let obj: any = {};
    obj._id = row._id
    obj.isDeleted = true
    this.cs.updateConsignor(obj).subscribe((res: any) => {
      console.log(res);
      this.getConsignor();
    })
  }
  bill(row: any) {
    this.route.navigate(['../consignor-bill'],
      { state: { data: row } });
  }

  openDialog(row: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: "160px",
      width: "400px",
      data: {
        value: row
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.confirmed == true) {
        this.deleteConsignor(result.value);
      }
    });
  }
}
