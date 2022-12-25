import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbcComponent } from './bbc.component';

describe('BbcComponent', () => {
  let component: BbcComponent;
  let fixture: ComponentFixture<BbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
