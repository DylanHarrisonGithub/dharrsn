import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioItemEditorComponent } from './portfolio-item-editor.component';

describe('PortfolioItemEditorComponent', () => {
  let component: PortfolioItemEditorComponent;
  let fixture: ComponentFixture<PortfolioItemEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioItemEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioItemEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
