import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'http://localhost:3000/customer'
  constructor(private http : HttpClient) { }

  LoadCustomer(){
    return this.http.get(this.apiUrl)
  }

  SaveCustomer(customerdata:any){
    return this.http.post(this.apiUrl, customerdata)
  }
   
  LoadCustomerByCode(id:any){
    return this.http.get(this.apiUrl + '/' + id);
  }

  RemoveCustomer(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }


}
