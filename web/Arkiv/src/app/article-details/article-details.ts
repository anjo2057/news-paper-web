import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../interfaces/article';
import { NavigationExtras, Router } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-details',
  imports: [DatePipe],
  templateUrl: './article-details.html',
  styleUrl: './article-details.css',
})
export class ArticleDetails implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {}

  article: Article | null = null;

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('value');
    if (articleId) {
      this.fetchArticleDetails(articleId);
    }
  }

  fetchArticleDetails(id: string): void {
    this.newsService.getArticle(id).subscribe({
      next: (res) => {
        this.article = res;
      },
      error: (err) => {
        console.error('Failed to fetch article details', err);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
