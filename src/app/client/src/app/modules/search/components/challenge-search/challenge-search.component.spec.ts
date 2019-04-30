import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeSearchComponent } from './challenge-search.component';

describe('ChallengeSearchComponent', () => {
  let component: ChallengeSearchComponent;
  let fixture: ComponentFixture<ChallengeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
