import { Component, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerlist: any;
  constructor(private service : MasterService) { 
    this.service.GetCustomer().subscribe(result=>{
      this.customerlist = result;
    })
  }

  ngOnInit(): void {
  }

}
