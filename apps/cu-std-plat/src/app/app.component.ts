import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CuFormNormalLoginComponent } from '../auth/login.component';

@Component({
  standalone: true,
  imports: [RouterModule, CuFormNormalLoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cu-std-plat';
}
