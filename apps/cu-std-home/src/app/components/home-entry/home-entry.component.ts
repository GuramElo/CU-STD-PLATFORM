import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from '@cu-std-components';

@Component({
  selector: 'app-home-entry',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './home-entry.component.html',
  styleUrl: './home-entry.component.scss',
})
export class HomeEntryComponent {}
