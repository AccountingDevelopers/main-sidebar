import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleControlsComponent } from './module-controls.component';

describe('ModuleControlsComponent', () => {
  let component: ModuleControlsComponent;
  let fixture: ComponentFixture<ModuleControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
