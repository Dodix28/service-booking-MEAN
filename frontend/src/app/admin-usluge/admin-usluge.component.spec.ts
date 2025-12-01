import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUslugeComponent } from './admin-usluge.component';

describe('AdminUslugeComponent', () => {
  let component: AdminUslugeComponent;
  let fixture: ComponentFixture<AdminUslugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUslugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUslugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
