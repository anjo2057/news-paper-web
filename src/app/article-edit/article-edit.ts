import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../directives/highlight.directive';
import { Article } from '../interfaces/article';
import { CommonModule, Location } from '@angular/common';
import { NewsService } from '../services/news.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-article-edit',
  imports: [FormsModule, HighlightDirective, CommonModule, AngularEditorModule],
  templateUrl: './article-edit.html',
  styleUrl: './article-edit.css',
})
export class ArticleEdit implements OnInit {
  @ViewChild('articleForm') articleForm: any;

  constructor(private newsService: NewsService, private Location: Location) {}

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize'],
      // ['insertImage', 'insertVideo', 'insertHorizontalRule', 'removeFormat', 'toggleEditorMode'],
      // ['link', 'unlink', 'superscript', 'subscript'],
      // ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
      // ['cut', 'copy', 'delete', 'undo', 'redo'],
    ],
  };

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

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.article.image_data = reader.result as string;
        this.article.image_media_type = file.type;
        this.article.thumbnail_image = reader.result as string;
        this.article.thumbnail_media_type = file.type;
      };
      reader.readAsDataURL(file);
    }
  }

  goBack(): void {
    this.Location.back();
  }
}
