import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../product-api.service';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  productid:number;
  productname:string;
  productprice:number;
  productquantity:number;
  productdescription:string;
  constructor(private ps:ProductApiService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.productid=+params['productid'];
      }
    );
    if (this.productid){
    this.ps.getProduct(this.productid).subscribe(
      (data:Product)=>{
        this.productname = data.name;
        this.productprice = data.price;
        this.productquantity = data.quantity;
        this.productdescription = data.description;
      }
    )
    }
    
  }

  onSubmit(form){

    if (this.productid){
     
      this.ps.updateProduct(this.productid,form).subscribe(
        response=>{
          console.log(response);
          this.router.navigateByUrl('/home');
        }
      );
    }
    else{
      this.ps.createProduct(form).subscribe(
        response=>{
          console.log(response);
          this.router.navigateByUrl('/home');
        }
      )
    }
    
   // console.log(product);
  }


}
