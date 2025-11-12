import { Component } from '@angular/core';
import { SetupInfo } from '../settings.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings-info',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './settings-info.component.html',
  styleUrl: './settings-info.component.scss',
})
export class SettingsInfoComponent {
  setupInfo: SetupInfo[] = [
    {
      title: 'Drug',
      icon: 'local_pharmacy',
      resourceId: 'Drug-Component',
      path: '/settings/drug/dashboard',
    },
    {
      title: 'Supplier',
      icon: 'store',
      resourceId: 'Supplier-Component',
      path: '/settings/supplier/dashboard',
    },
  ];

  constructor(private router: Router) {}

  handlerNavigation(path: string) {
    this.router.navigate([path]);
  }
}
