import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactWrapperComponent } from './react-wrapper.component';

describe('ReactWraperComponent', () => {
  let component: ReactWrapperComponent;
  let fixture: ComponentFixture<ReactWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactWrapperComponent]
    });
    fixture = TestBed.createComponent(ReactWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
