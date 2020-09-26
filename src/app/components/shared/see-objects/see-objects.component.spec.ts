import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeObjectsComponent } from './see-objects.component';

describe('SeeObjectsComponent', () => {
  let component: SeeObjectsComponent;
  let fixture: ComponentFixture<SeeObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
