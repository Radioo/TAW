import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogItemCommentsComponent } from './blog-item-comments.component';

describe('BlogItemCommentsComponent', () => {
  let component: BlogItemCommentsComponent;
  let fixture: ComponentFixture<BlogItemCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogItemCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogItemCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
