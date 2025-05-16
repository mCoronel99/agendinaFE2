import { Component } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  navigate(path: string) {
    this.router.navigate([path]);
  }
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
  routes = [
    { path: '/dipendenti', label: 'Dipendenti' },
    { path: '/settore', label: 'Settore' },
    { path: '/progetto', label: 'Progetto' },
    { path: '/ruoli', label: 'Ruoli' },
    { path: '/attivita', label: 'Attività'},
    { path: '/progettoDipendente', label: 'Progetto Dipendente' }
  ];
}

