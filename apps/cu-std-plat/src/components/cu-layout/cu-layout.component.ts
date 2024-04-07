import { Component } from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent,
} from 'ng-zorro-antd/layout';
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
} from 'ng-zorro-antd/menu';
import {
  NzBreadCrumbComponent,
  NzBreadCrumbItemComponent,
} from 'ng-zorro-antd/breadcrumb';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cu-layout',
  templateUrl: './cu-layout.component.html',
  styleUrls: ['./cu-layout.component.scss'],
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzHeaderComponent,
    NzMenuDirective,
    NzContentComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzFooterComponent,
    NzSiderComponent,
    NzMenuItemComponent,
    NzSubMenuComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class CuLayoutComponent {}
