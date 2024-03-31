import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CuLayoutComponent } from './cu-layout.component';

describe('CuLayoutComponent', () => {
  let component: CuLayoutComponent;
  let fixture: ComponentFixture<CuLayoutComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CuLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
