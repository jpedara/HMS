import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:Product[]=[];
  
  constructor(private ps:ProductApiService,private router:Router) { }

  ngOnInit() {
    this.ps.getAllProducts().subscribe(
      (data:Product[])=>{
        console.log(data);
        this.products = data;
      }
    );
  }

  deleteProduct(productid:number){
    this.ps.deleteProduct(productid).subscribe(
      response=>{
        console.log(response);
        this.products = this.products.filter(item => item.id != productid);
        this.router.navigateByUrl('/');
      }
    )
  }

}
