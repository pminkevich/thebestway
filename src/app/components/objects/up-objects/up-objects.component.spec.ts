import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpObjectsComponent } from './up-objects.component';

describe('UpObjectsComponent', () => {
  let component: UpObjectsComponent;
  let fixture: ComponentFixture<UpObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
