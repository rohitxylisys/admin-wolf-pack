import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth/auth.service';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  { path: '/discussion', title: 'Discussion', icon: 'comment', class: '' },
  {
    path: '/advertisement',
    title: 'Advertisement',
    icon: 'comment',
    class: '',
  },
  {
    path: '/email-contacts',
    title: 'Email Contacts',
    icon: 'comment',
    class: '',
  },
  { path: '/group', title: 'Group', icon: 'comment', class: '' },
  { path: '/commentary', title: 'Commentary', icon: 'comment', class: '' },
  { path: '/users', title: 'Users', icon: 'comment', class: '' },
  {
    path: '/change-password',
    title: 'Change Password',
    icon: 'comment',
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  onLogout() {
    this.authService.logout();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
