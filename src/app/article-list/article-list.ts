import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { LoginService } from '../services/login.service';
import { Article } from '../interfaces/article';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleFilterPipe } from '../pipes/article-filter-pipe';
import * as _ from 'lodash';
import { Url } from 'url';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, ArticleFilterPipe],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList implements OnInit {
  articles: Article[] = [];
  category = 'All';
  filterStr = '';

  constructor(
    private newsService: NewsService,
    public loginService: LoginService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newsService.getArticles().subscribe({
      next: (res) => (this.articles = res ?? []),
      error: (err) => {
        console.error('Failed to fetch articles', err);
        this.articles = [];
      },
    });
  }

  isLogged(): boolean {
    return this.loginService.isLogged();
  }

  goToArticle(id: number): void {
    let navigationExtras: NavigationExtras = {};
    this.router.navigate(['article-details', id], navigationExtras);
  }

  createNew(): void {
    if (!this.isLogged()) {
      alert('Du behöver vara inloggad för att skapa en artikel.');
      return;
    }
    const navigationExtras: NavigationExtras = {};
    this.router.navigate(['article-edit'], navigationExtras);
  }

  editArticle(a: Article, ev?: Event): void {
    console.log('edited');
    ev?.stopPropagation?.();

    if (!this.isLogged()) {
      alert('You have to be logged in to edit an article');
      return;
    }
    if (!a || a.id == null) {
      alert('Could not open editing page: article misses id');
      return;
    }

    const navigationExtras: NavigationExtras = {
      state: { article: a },
    };
    this.router.navigate(['article-edit'], navigationExtras);
  }

  removeArticle(a: Article, ev?: Event): void {
    ev?.stopPropagation?.();

    if (!a || a.id == null) {
      console.error('Article missing id:', a);
      alert('Could not delete: article has no id.');
      return;
    }

    if (!window.confirm(`Do you want to remove "${a.title}"?`)) return;

    // Lärarens service tar Article | number – vi skickar hela a
    this.newsService.deleteArticle(a).subscribe({
      next: () => {
        this.articles = this.articles.filter((x) => x.id !== a.id);
        alert('Article deleted.');
      },
      error: (err) => {
        console.error('Failed to delete article', a.id, err);
        const code = err?.status ? ` (HTTP ${err.status})` : '';
        alert('Could not delete the article' + code);
      },
    });
  }

  trackById(index: number, item: Article) {
    return item?.id;
  }

  // Inline SVG placeholder (small gray image) to avoid requiring an external asset file
  private readonly _placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 120 80"><rect width="120" height="80" fill="#f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#888" font-family="Arial, Helvetica, sans-serif" font-size="12">No image</text></svg>'
  )}`;

  getImageSrc(a: Article): string {
    const img = a?.thumbnail_image ?? a?.image_data ?? null;
    const media = a?.thumbnail_media_type ?? a?.image_media_type ?? null;

    if (!img) return this._placeholder;
    if (typeof img === 'string' && img.startsWith('data:')) return img;
    if (typeof img === 'string' && /^(https?:)?\/\//i.test(img)) return img;
    if (media) return `data:${media};base64,${img}`;
    if (typeof img === 'string') return `data:image/png;base64,${img}`;
    return this._placeholder;
  }

  onImgError(ev: Event) {
    const el = ev?.target as HTMLImageElement | null;
    if (el) el.src = this._placeholder;
  }
}
