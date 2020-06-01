import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {IResponse} from "./interfaces/IResponse";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private afm: AngularFireMessaging,
    private ls: LocalStorageService,
    private http: HttpClient
  ) {
      this.requestPermission();
      // this.ls.store("lang", "el");
      this.http.get<IResponse>(environment.languagesUrl)
        .subscribe((response) => {
          this.ls.store("languages", response.languages);
        });

  }



  requestPermission() {
    this.afm.requestPermission
      .pipe(mergeMapTo(this.afm.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          this.listen();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  listen() {
    this.afm.messages.subscribe((payload: any) => {
      console.log(payload.notification);
    }, (error) => {
      console.error(error);
    });
  }


}
