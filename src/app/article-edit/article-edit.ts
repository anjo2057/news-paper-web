import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../directives/highlight.directive';
import { Article } from '../interfaces/article';
import { CommonModule, Location } from '@angular/common';
import { NewsService } from '../services/news.service'
import { EditorModuleModule } from '../editor-module/editor-module-module';
import { AngularEditorModule } from '@kolkov/angular-editor';






@Component({
  selector: 'app-article-edit',
  imports: [FormsModule, HighlightDirective, CommonModule, EditorModuleModule, AngularEditorModule],
  templateUrl: './article-edit.html',
  styleUrl: './article-edit.css',
})
export class ArticleEdit implements OnInit {
  @ViewChild('articleForm') articleForm: any;

  constructor(private newsService: NewsService, private Location: Location) {}

  article: Article = {
    id: 0, //TODO : might not needed check here and in interfaces
    id_user: 0,
    title: '',
    abstract: '',
    subtitle: '',
    update_date: '',
    category: '',
    body: '',
    timestamp: '',
    image_data: '',
    image_media_type: '',
    thumbnail_image: '',
    thumbnail_media_type: '',
  };
  ngOnInit(): void {}

  submitArticle(): void {
    this.newsService.createArticle(this.article);

    window.alert("The article '" + this.article.title + "'has been published.'");

    this.clear();
  }

  clear(): void {
    this.articleForm.reset();
  }

  goBack(): void {
    this.Location.back();
  }
}
