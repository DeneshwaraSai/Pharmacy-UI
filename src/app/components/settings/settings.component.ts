import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
  import { SetupInfo } from './settings.model';
import { MatCardModule } from '@angular/material/card';
 import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
}
