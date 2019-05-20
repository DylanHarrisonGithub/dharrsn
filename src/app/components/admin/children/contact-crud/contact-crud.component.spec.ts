import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCrudComponent } from './contact-crud.component';

describe('ContactCrudComponent', () => {
  let component: ContactCrudComponent;
  let fixture: ComponentFixture<ContactCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
