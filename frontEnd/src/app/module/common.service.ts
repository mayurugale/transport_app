import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl='http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getLR(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}lr/list`, {})
  }

  addLR(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}lr/add`, obj)
  }

  updateLR(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}lr/update`, obj)
  }

  getParty(key: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}lr/lrKey/` + key, {})
  }

  getFilterLR(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}lr/filter`, obj)
  }


  getBill(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bill/list`, {})
  }

  addBill(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bill/add`, obj)
  }

  updateBill(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bill/update`, obj)
  }

  removeBill(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}bill/remove/` + id, {})
  }

  getBankDetails(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}bank/details`, {})
  }

  addBank(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bank/add`, obj)
  }

  updateBank(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}bank/update`, obj)
  }


  getConsignor(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}consignor/list`, {})
  }

  addConsignor(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}consignor/add`, obj)
  }

  updateConsignor(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}consignor/update`, obj)
  }


  getVehicle(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}vehicle/list`, {})
  }

  addVehicle(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}vehicle/add`, obj)
  }

  updateVehicle(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}vehicle/update`, obj)
  }

  getDriver(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}driver/list`, {})
  }

  addDriver(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}driver/add`, obj)
  }

  updateDriver(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}driver/update`, obj)
  }

  addtrip(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}vehicle/trip/add`, obj)
  }

  getVehicleById(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}vehicle/filter`, data)
  }

  removeTrip(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}vehicle/trip/remove`, data)
  }

  addTransaction(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}driver/transaction/add`, obj)
  }

  getDriverById(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}driver/filter`, data)
  }

  removeTransaction(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}driver/transaction/remove`, data)
  }

  getConsignorBill(consignorId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}consignor/billList/${consignorId}`, {})
  }

  addConsignorTransaction(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}consignor/transaction/add`, obj)
  }

  removeConsignorTransaction(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}consignor/transaction/remove`, data)
  }
}
