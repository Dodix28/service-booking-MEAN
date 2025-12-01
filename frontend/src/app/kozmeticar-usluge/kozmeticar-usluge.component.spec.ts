import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KozmeticarUslugeComponent } from './kozmeticar-usluge.component';

describe('KozmeticarUslugeComponent', () => {
  let component: KozmeticarUslugeComponent;
  let fixture: ComponentFixture<KozmeticarUslugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KozmeticarUslugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KozmeticarUslugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
