import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneMnemonicsComponent } from './phone-mnemonics.component';

describe('PhoneMnemonicsComponent', () => {
  let component: PhoneMnemonicsComponent;
  let fixture: ComponentFixture<PhoneMnemonicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneMnemonicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneMnemonicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
