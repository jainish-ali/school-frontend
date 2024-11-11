import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolWrapperComponent } from './school-wrapper.component';

describe('SchoolWrapperComponent', () => {
  let component: SchoolWrapperComponent;
  let fixture: ComponentFixture<SchoolWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
