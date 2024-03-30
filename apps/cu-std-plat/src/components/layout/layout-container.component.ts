import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-container.component.html',
  styleUrl: './layout-container.component.scss',
})
export class LayoutContainerComponent {}
