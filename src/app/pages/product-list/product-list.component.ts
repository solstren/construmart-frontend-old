import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilitiesService} from '../../shared/services/utilities.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public categories: any = [];
  public products: any = [];
  public req: any = {};
  public numberOfProductsFound: number = 0;
  public baseUrl = environment.baseUrl;
  public categoryId: string;

  constructor(private route: ActivatedRoute, private utils: UtilitiesService, private categoryService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.req.start = 0;
    this.req.length = 0;
    this.categoryService.getCategories(this.req).subscribe(data => {
      this.categories = data.data.categories;
    });

    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.getProductsByCategoryId(this.categoryId, this.req);
  }

   getProductsByCategoryId(id: any, request) {
     this.categoryService.getProductsByCategoryId(id, request).subscribe(data => {
       this.products = data.data;
       console.log(this.products);
       this.numberOfProductsFound = data.data.length;
     });
  }

  goToCategoryPage(id: number) {
    this.router.navigate(['/category', id]);
    this.getProductsByCategoryId(id, this.req);
  }
}
