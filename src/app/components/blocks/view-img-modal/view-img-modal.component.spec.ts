import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImgModalComponent } from './view-img-modal.component';

describe('ViewImgModalComponent', () => {
  let component: ViewImgModalComponent;
  let fixture: ComponentFixture<ViewImgModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImgModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImgModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
