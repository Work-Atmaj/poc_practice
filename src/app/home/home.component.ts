import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/app.state';
import { isAdmin, isAuthenticated } from '../auth/state/auth.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated!: Observable<boolean>;
  isAdminLogin!: Observable<boolean>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.isAdminLogin = this.store.select(isAdmin);
  }
}
