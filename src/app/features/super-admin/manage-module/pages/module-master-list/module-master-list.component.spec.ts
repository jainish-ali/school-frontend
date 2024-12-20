import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleMasterListComponent } from './module-master-list.component';

describe('ModuleMasterListComponent', () => {
  let component: ModuleMasterListComponent;
  let fixture: ComponentFixture<ModuleMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleMasterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
