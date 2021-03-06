import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUserDetailComponent } from './book-user-detail.component';

describe('BookUserDetailComponent', () => {
  let component: BookUserDetailComponent;
  let fixture: ComponentFixture<BookUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
