import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsjxappComponent } from './rsjxapp.component';

describe('RsjxappComponent', () => {
  let component: RsjxappComponent;
  let fixture: ComponentFixture<RsjxappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RsjxappComponent]
    });
    fixture = TestBed.createComponent(RsjxappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
