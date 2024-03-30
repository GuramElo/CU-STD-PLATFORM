import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEntryContainerComponent } from './form-entry-container.component';

describe('FormEntryContainerComponent', () => {
  let component: FormEntryContainerComponent;
  let fixture: ComponentFixture<FormEntryContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEntryContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEntryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
