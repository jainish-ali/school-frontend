import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryTypeComponent } from './inquiry-type.component';

describe('InquiryTypeComponent', () => {
  let component: InquiryTypeComponent;
  let fixture: ComponentFixture<InquiryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
