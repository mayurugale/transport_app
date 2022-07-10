import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getLR(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/lr/list', {})
  }

  addLR(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/lr/add', obj)
  }

  updateLR(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/lr/update', obj)
  }

  getParty(key: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/lr/lrKey/' + key, {})
  }

  getFilterLR(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/lr/filter', obj)
  }


  getBill(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bill/list', {})
  }

  addBill(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bill/add', obj)
  }

  updateBill(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bill/update', obj)
  }

  removeBill(id: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bill/remove/' + id, {})
  }

  getBankDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/bank/details', {})
  }

  addBank(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bank/add', obj)
  }

  updateBank(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/bank/update', obj)
  }


  getConsignor(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/consignor/list', {})
  }

  addConsignor(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/consignor/add', obj)
  }

  updateConsignor(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/consignor/update', obj)
  }


  getVehicle(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/vehicle/list', {})
  }

  addVehicle(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/vehicle/add', obj)
  }

  updateVehicle(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/vehicle/update', obj)
  }

  getDriver(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/driver/list', {})
  }

  addDriver(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/driver/add', obj)
  }

  updateDriver(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/driver/update', obj)
  }

  addtrip(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/vehicle/trip/add', obj)
  }

  getVehicleById(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/vehicle/filter', data)
  }

  removeTrip(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/vehicle/trip/remove', data)
  }

  addTransaction(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/driver/transaction/add', obj)
  }

  getDriverById(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/driver/filter', data)
  }

  removeTransaction(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/driver/transaction/remove', data)
  }

  getConsignorBill(consignorId: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/consignor/billList/' + consignorId, {})
  }

  addConsignorTransaction(obj: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/consignor/transaction/add', obj)
  }

  removeConsignorTransaction(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/consignor/transaction/remove', data)
  }
}
