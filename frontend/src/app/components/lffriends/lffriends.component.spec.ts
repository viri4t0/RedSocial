import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LffriendsComponent } from './lffriends.component';

describe('LffriendsComponent', () => {
  let component: LffriendsComponent;
  let fixture: ComponentFixture<LffriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LffriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LffriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
