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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ChartModule } from 'angular2-chartjs';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: environment.apiUrl + '/upload',
  maxFilesize: 20,
  acceptedFiles: 'image/*',
  paramName: 'file'
};


const routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
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
    NgbModule,
    EditorModule,
    NgxWebstorageModule.forRoot(),
    ChartModule,
    DropzoneModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
