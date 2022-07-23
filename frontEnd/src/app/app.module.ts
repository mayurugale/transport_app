import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LrListComponent } from './lr-list/lr-list.component';
import { AddlrComponent } from './lr-list/addlr/addlr.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { MaterialModule } from './module/material-model';
import { HttpClientModule } from '@angular/common/http';
import { BillListComponent } from './bill-list/bill-list.component';
import { AddBillComponent } from './bill-list/add-bill/add-bill.component';
import { BillPdfComponent } from './bill-list/bill-pdf/bill-pdf.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPrintModule } from 'ngx-print';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { AddVehicleComponent } from './vehicle-list/add-vehicle/add-vehicle.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ConsignorListComponent } from './consignor-list/consignor-list.component';
import { AddDriverComponent } from './driver-list/add-driver/add-driver.component';
import { AddConsignorComponent } from './consignor-list/add-consignor/add-consignor.component';
import { DriverTransactionComponent } from './driver-list/driver-transaction/driver-transaction.component';
import { VehicleTransactionComponent } from './vehicle-list/vehicle-transaction/vehicle-transaction.component';
import { ConsignorBillComponent } from './consignor-list/consignor-bill/consignor-bill.component';
import { ConsignorTransactionComponent } from './consignor-list/consignor-transaction/consignor-transaction.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LrPdfComponent } from './lr-list/lr-pdf/lr-pdf.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LrListComponent,
    AddlrComponent,
    VehicleListComponent,
    BillListComponent,
    AddBillComponent,
    BillPdfComponent,
    BankdetailsComponent,
    AddVehicleComponent,
    DriverListComponent,
    ConsignorListComponent,
    AddConsignorComponent,
    AddDriverComponent,
    DriverTransactionComponent,
    VehicleTransactionComponent,
    ConsignorBillComponent,
    ConsignorTransactionComponent,
    DeleteDialogComponent,
    LrPdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPrintModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddlrComponent,
    AddBillComponent,
    AddConsignorComponent,
    AddDriverComponent,
    BankdetailsComponent,
    AddVehicleComponent,
  ]
})
export class AppModule { }
