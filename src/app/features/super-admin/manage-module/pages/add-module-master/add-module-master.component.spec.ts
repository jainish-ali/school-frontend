import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleMasterComponent } from './add-module-master.component';

describe('AddModuleMasterComponent', () => {
  let component: AddModuleMasterComponent;
  let fixture: ComponentFixture<AddModuleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModuleMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModuleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
