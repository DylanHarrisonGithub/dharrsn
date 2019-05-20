import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgGalleryCardComponent } from './img-gallery-card.component';

describe('ImgGalleryCardComponent', () => {
  let component: ImgGalleryCardComponent;
  let fixture: ComponentFixture<ImgGalleryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgGalleryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgGalleryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
