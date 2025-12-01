import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KozmeticarStatistikaComponent } from './kozmeticar-statistika.component';

describe('KozmeticarStatistikaComponent', () => {
  let component: KozmeticarStatistikaComponent;
  let fixture: ComponentFixture<KozmeticarStatistikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KozmeticarStatistikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KozmeticarStatistikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
