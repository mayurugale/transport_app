import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankdetailsComponent } from './bankdetails/bankdetails.component';
import { BillListComponent } from './bill-list/bill-list.component';
import { BillPdfComponent } from './bill-list/bill-pdf/bill-pdf.component';
import { ConsignorBillComponent } from './consignor-list/consignor-bill/consignor-bill.component';
import { ConsignorListComponent } from './consignor-list/consignor-list.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { HomeComponent } from './home/home.component';
import { LrListComponent } from './lr-list/lr-list.component';
import { LrPdfComponent } from './lr-list/lr-pdf/lr-pdf.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'lr-list',
        component: LrListComponent,
      },
      {
        path: 'vehicle-list',
        component: VehicleListComponent,
      },
      {
        path: 'bill-list',
        component: BillListComponent,
      },
      {
        path: 'consignor-list',
        component: ConsignorListComponent,
      },
      {
        path: 'driver-list',
        component: DriverListComponent,
      },
      {
        path: 'bill-pdf',
        component: BillPdfComponent,
      },
      {
        path: 'bank-details',
        component: BankdetailsComponent,
      },
      {
        path: 'consignor-bill',
        component: ConsignorBillComponent,
      },
      {
        path: 'lr-pdf',
        component: LrPdfComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
