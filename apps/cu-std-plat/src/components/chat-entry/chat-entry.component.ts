import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
} from '@angular/core';
import { ChatProjectEntryFacade } from '@cu-std-facade';

@Component({
  selector: 'app-chat-entry',
  standalone: true,
  imports: [],
  templateUrl: './chat-entry.component.html',
  styleUrl: './chat-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatEntryComponent {
  constructor() {
    inject(ChatProjectEntryFacade);
  }
}
