import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KozmeticarProfilComponent } from './kozmeticar-profil.component';

describe('KozmeticarProfilComponent', () => {
  let component: KozmeticarProfilComponent;
  let fixture: ComponentFixture<KozmeticarProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KozmeticarProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KozmeticarProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
