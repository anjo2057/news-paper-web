import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { LoginService } from '../services/login.service';
import { Article } from '../interfaces/article';
import { Login } from '../login/login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleFilterPipe } from '../pipes/article-filter-pipe';
import * as _ from 'lodash';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Login, NgbModule, ArticleFilterPipe],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList implements OnInit {
  articles: Article[] = [];
  filterArticles: Article[] = [];
  category = 'All';
  filterStr = '';

  constructor(
    private newsService: NewsService,
    private loginService: LoginService,
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

  trackById(index: number, item: Article) {
    return item?.id;
  }

  redirect(): void {
    let navigationExtras: NavigationExtras = {};
    this.router.navigate(['article-edit'], navigationExtras);
  }
}
