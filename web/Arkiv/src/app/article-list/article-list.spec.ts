import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from '../login/login';
import { ArticleList } from './article-list';

describe('ArticleList', () => {
  let component: ArticleList;
  let fixture: ComponentFixture<ArticleList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleList, Login]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
