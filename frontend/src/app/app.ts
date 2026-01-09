import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AccountList } from './account-list/account-list';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,HttpClientModule,RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('banking-application');
}
