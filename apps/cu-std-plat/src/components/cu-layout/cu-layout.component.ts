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
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { AuthService } from '@cu-std-shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CuFormNormalLoginComponent } from '../../auth/login.component';
import { CuFormRegisterComponent } from '../../auth/regsiter.component';

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
    NzButtonComponent,
  ],
})
export class CuLayoutComponent {
  constructor(private modal: NzModalService) {}

  handleLoginClick() {
    this.modal.create({
      nzTitle: 'სისტემაში შესვლა',
      nzContent: CuFormNormalLoginComponent,
      nzFooter: null,
      nzStyle: {
        width: '300px',
        height: 'auto',
        position: 'fixed',
        top: '20dvh',
        left: '50dvw',
        transform: 'translateX(-50%)',
        'transform-origin': 'unset',
        transition: 'all ease-in-out 400ms',
      },
    });
  }

  handleRegisterClick() {
    this.modal.create({
      nzTitle: 'სისტემაში რეგისტრაცია',
      nzContent: CuFormRegisterComponent,
      nzFooter: null,
      nzStyle: {
        width: '820px',
        height: 'auto',
        position: 'fixed',
        top: '20dvh',
        left: '50dvw',
        transform: 'translateX(-50%)',
        'transform-origin': 'unset',
        transition: 'all ease-in-out 400ms',
      },
    });
  }
}
