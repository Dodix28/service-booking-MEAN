import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKozmeticariComponent } from './admin-kozmeticari.component';

describe('AdminKozmeticariComponent', () => {
  let component: AdminKozmeticariComponent;
  let fixture: ComponentFixture<AdminKozmeticariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminKozmeticariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKozmeticariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
