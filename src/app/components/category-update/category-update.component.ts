import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ICategory} from "../../interfaces/ICategory";
import {LocalStorage} from "ngx-webstorage";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  @LocalStorage("languages")
  public languages;

  public category: ICategory = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.init(params.categoryId);
    });
  }

  public init(id: string) {
    this.http.get(environment.apiUrl + "/categories/" + id)
      .subscribe((response: any) => {
        this.category = response;
      });
  }

  public save() {
    this.http.put(
      environment.apiUrl + "/categories/" + this.category._id,
      this.category
    ).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }

}
