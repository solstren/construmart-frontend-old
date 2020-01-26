import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../shared/services/products.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product: any;
  public productId: any;
  public baseUrl: any = environment.baseUrl;
  constructor(private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.productId).subscribe((data: any) => {
      this.product = data.body;
      console.log(this.product);
    });
  }

}
