import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsrComponent } from './create-usr.component';

describe('CreateUsrComponent', () => {
  let component: CreateUsrComponent;
  let fixture: ComponentFixture<CreateUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
