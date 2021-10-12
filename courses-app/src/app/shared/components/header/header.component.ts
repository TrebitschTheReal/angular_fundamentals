import {Component, OnInit} from '@angular/core';
import {UserStoreService} from "../../../user/user-store.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  userRole: string | undefined;
  isAuthorized: boolean = false;


  constructor(private userStoreService: UserStoreService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userStoreService.user$.subscribe(user => {
      this.userName = user?.name;
      this.userRole = user?.role;
    })

    this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    })
  }

  logout() {
    this.authService.logout();
  }
}
