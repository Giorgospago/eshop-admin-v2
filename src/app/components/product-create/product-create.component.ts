import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment"
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/ICategory';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  public product: Partial<IProduct> = {};
  public categories: ICategory[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  public saveProduct() {
    this.http.post(environment.apiUrl + "/products", this.product)
    .subscribe(response => {
      this.router.navigate(["/products"]);
    });
  }

  public getCategories() {
    this.http.get<ICategory[]>(environment.apiUrl + "/categories")
    .subscribe(response => {
      this.categories = response;
    });
  }

}
