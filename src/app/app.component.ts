import {Component, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent
} from "@angular/router";
import {CategoriesService} from "./shared/services/categories.service";
import {UtilitiesService} from "./shared/services/utilities.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'construmart-frontend';
  categories: any = [];
  req: any = {};
  public url: string;

  constructor(private route: ActivatedRoute, private categoryService: CategoriesService, private router: Router, private utils: UtilitiesService) {
    this.req.start = 0;
    this.req.length = 0;
    this.categoryService.getCategories(this.req).subscribe(data => {
      this.categories = data.data.categories;
      console.log(this.categories);
    });

    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  getYear() {
    const date = new Date();
    return date.getFullYear();
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.url = event.url;
      // console.log(this.url);
    }
    if (event instanceof NavigationEnd) {
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      // console.log(this.url);
    }
    if (event instanceof NavigationError) {
      // console.log(this.url);
    }
  }







}
