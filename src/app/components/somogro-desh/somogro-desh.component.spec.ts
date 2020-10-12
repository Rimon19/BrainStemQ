import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomogroDeshComponent } from './somogro-desh.component';

describe('SomogroDeshComponent', () => {
  let component: SomogroDeshComponent;
  let fixture: ComponentFixture<SomogroDeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomogroDeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomogroDeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
