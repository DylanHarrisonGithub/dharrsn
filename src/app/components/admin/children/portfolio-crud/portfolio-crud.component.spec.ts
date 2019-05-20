import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCrudComponent } from './portfolio-crud.component';

describe('PortfolioCrudComponent', () => {
  let component: PortfolioCrudComponent;
  let fixture: ComponentFixture<PortfolioCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
