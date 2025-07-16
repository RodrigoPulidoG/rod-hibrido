import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApodCardComponent } from '../../../prensentation/components/apod-card/apod-card.component';

describe('ApodCardComponent', () => {
  let component: ApodCardComponent;
  let fixture: ComponentFixture<ApodCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApodCardComponent]
    });
    fixture = TestBed.createComponent(ApodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
