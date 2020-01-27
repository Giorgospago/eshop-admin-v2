import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

const routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "products",
        children: [
          {
            path: "",
            component: ProductsComponent
          },
          {
            path: "create",
            component: ProductCreateComponent
          },
          {
            path: "update/:productId",
            component: ProductUpdateComponent
          }
        ]
      },
      {
        path: "categories",
        children: [
          {
            path: "",
            component: CategoriesComponent
          }
        ]
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    CategoriesComponent,
    LoginComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
