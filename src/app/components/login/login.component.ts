import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/IResponse';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public validationErrors: any[] = [];
  public errorMessage: string = "";
  public loginData = {
    email: "",
    password: ""
  };

  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login() {
    this.errorMessage = "";
    this.validationErrors = [];

    this.http.post<IResponse>(environment.apiUrl + "/auth/login", this.loginData)
      .subscribe(response => {
        if (response.success) {
          this.ls.store("token", response.token);
          this.ls.store("user", response.user);
          this.router.navigate(["/"]);
        } else {
          this.errorMessage = response.message || "";
          this.validationErrors = response.errors || [];
        }
      });
  }

}
