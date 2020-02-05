import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IResponse } from 'src/app/interfaces/IResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public type: string = 'line';
  public data = {};
  public options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getStats();
  }

  public getStats() {
    this.http.get<IResponse>(environment.apiUrl + "/stats")
      .subscribe(response => {
        if (response.success) {
          this.data = response.data;
        }
      });
  }

}
