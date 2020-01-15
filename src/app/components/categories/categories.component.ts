import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment"

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.getCategories();

  }

  public getCategories() {
    this.http.get(environment.apiUrl + "/categories")
    .subscribe(response => {
      this.categories = response;
    });
  }

}
