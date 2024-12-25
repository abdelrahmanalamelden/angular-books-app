import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksContainerComponent } from './books-container.component';

describe('BooksContainerComponent', () => {
  let component: BooksContainerComponent;
  let fixture: ComponentFixture<BooksContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
