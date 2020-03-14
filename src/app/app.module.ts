import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { UtilitiesService } from "./shared/services/utilities.service";
import { CategoriesService } from "./shared/services/categories.service";
import { CategoriesResolver, ProductResolver } from "./shared/resolvers/construmart.resolver";
import { ConstantsService } from "./shared/services/constants.service";
import { NotificationService } from "./shared/services/notification.service";
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MoneyFormat } from "./shared/pipes/construmart.pipe";
import { AuthComponent } from './pages/auth/auth.component';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./shared/services/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        ProductComponent,
        ProductListComponent,
        MoneyFormat,
        AuthComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
    providers: [
        UtilitiesService,
        CategoriesService,
        CategoriesResolver,
        ProductResolver,
        ConstantsService,
        NotificationService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
