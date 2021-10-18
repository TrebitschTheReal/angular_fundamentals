import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {UserStoreService} from "../../../user/user-store.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isAuthorized: boolean = false;
  userName: string | undefined;
  userRole: string | undefined;

  constructor(private authService: AuthService, private userStoreService: UserStoreService) {
    this.authService.isAuthorized$.subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    })

    this.userStoreService.user$.subscribe(user => {
      this.userName = user?.name;
      this.userRole = user?.role;
    })
  }

  ngOnInit(): void {
  }

}
