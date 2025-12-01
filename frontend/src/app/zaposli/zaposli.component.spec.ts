import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposliComponent } from './zaposli.component';

describe('ZaposliComponent', () => {
  let component: ZaposliComponent;
  let fixture: ComponentFixture<ZaposliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZaposliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaposliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
