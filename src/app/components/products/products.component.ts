import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from 'src/app/interfaces/IProduct';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/IResponse';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public loading: boolean = false;
  public products: IProduct[] = [];

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService
  ) { }

  ngOnInit() {

    this.getProducts();

  }

  public getProducts() {
    this.loading = true;
    this.http.get<IResponse>(environment.apiUrl + "/products")
    .subscribe(response => {
      this.products = response.products;
      this.loading = false;
    });
  }
  
  public deleteProduct(id) {
    this.http.delete(environment.apiUrl + "/products/" + id)
    .subscribe(_ => {
      this.getProducts();
    });
  }

}
