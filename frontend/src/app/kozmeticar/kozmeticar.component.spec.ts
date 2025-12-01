import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KozmeticarComponent } from './kozmeticar.component';

describe('KozmeticarComponent', () => {
  let component: KozmeticarComponent;
  let fixture: ComponentFixture<KozmeticarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KozmeticarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KozmeticarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
