import { Component, OnInit } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @LocalStorage("user")
  public user: IUser;

  @LocalStorage("languages")
  public languages: any[];

  @LocalStorage("lang")
  public lang: string;


  constructor(
    private ls: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public logout() {
    this.ls.clear("token");
    this.ls.clear("user");
    this.router.navigate(["/login"]);
  }

  public changeLanguage(lang) {
    this.ls.store("lang", lang);
    window.location.reload();
  }

}
