import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentUslugeComponent } from './klijent-usluge.component';

describe('KlijentUslugeComponent', () => {
  let component: KlijentUslugeComponent;
  let fixture: ComponentFixture<KlijentUslugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentUslugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentUslugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
