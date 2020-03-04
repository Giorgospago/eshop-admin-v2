import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private afm: AngularFireMessaging) {
      this.requestPermission();
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
