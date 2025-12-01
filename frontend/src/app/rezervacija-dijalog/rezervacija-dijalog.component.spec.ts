import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijaDijalogComponent } from './rezervacija-dijalog.component';

describe('RezervacijaDijalogComponent', () => {
  let component: RezervacijaDijalogComponent;
  let fixture: ComponentFixture<RezervacijaDijalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezervacijaDijalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervacijaDijalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
