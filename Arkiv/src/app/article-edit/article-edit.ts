import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../directives/highlight.directive';
import { Article } from '../interfaces/article';
import { CommonModule, Location } from '@angular/common';
import { NewsService } from '../services/news.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  imports: [FormsModule, HighlightDirective, CommonModule, AngularEditorModule],
  templateUrl: './article-edit.html',
  styleUrl: './article-edit.css',
})
export class ArticleEdit implements OnInit {
  @ViewChild('articleForm') articleForm: any;

  constructor(
    private newsService: NewsService,
    private Location: Location,
    private router: Router
  ) {}

  isEdit = false;
  loading = false;
  error?: string;

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
    id: 0,
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

  private toDataUrl(mt?: string | null, b64?: string | null) {
    if (!mt || !b64) return '';
    return `data:${mt};base64,${b64}`;
  }
  private stripDataUrl(v: string | null | undefined) {
    return v && v.startsWith('data:') ? v.split(',')[1] ?? '' : v ?? '';
  }

  ngOnInit(): void {
    // Läser artikeln som skickades från listan (via router state)
    const st = history.state?.article as Article | undefined;
    if (st && st.id != null) {
      this.isEdit = true;

      this.article = {
        ...this.article,
        ...st,
        image_data: st.image_data
          ? st.image_data.startsWith('data:')
            ? st.image_data
            : this.toDataUrl(st.image_media_type, st.image_data as any)
          : '',
        thumbnail_image: st.thumbnail_image
          ? st.thumbnail_image.startsWith('data:')
            ? st.thumbnail_image
            : this.toDataUrl(st.thumbnail_media_type, st.thumbnail_image as any)
          : '',
      };
    } else {
      // NEW (ingen state-article skickad)
      this.isEdit = false;
    }
  }

  submitArticle(): void {
    if (!this.article.title || !this.article.abstract || !this.article.category) {
      window.alert('Please fill Title, Abstract and Category.');
      return;
    }
    if (this.article.category === 'All') {
      window.alert('Please choose a real category (not "All").');
      return;
    }

    const stripDataUrl = (v: string | null | undefined) =>
      v && v.startsWith('data:') ? v.split(',')[1] ?? '' : v ?? '';
    const payload: any = {
      id: this.isEdit ? this.article.id : null, // 👈 id med vid EDIT
      title: this.article.title,
      subtitle: this.article.subtitle,
      category: this.article.category,
      abstract: this.article.abstract,
      body: this.article.body ?? '',
      image_media_type: this.article.image_media_type || undefined,
      image_data: stripDataUrl(this.article.image_data),
      thumbnail_media_type: this.article.thumbnail_media_type || undefined,
      thumbnail_image: stripDataUrl(this.article.thumbnail_image),
      is_public: '1',
    };

    this.loading = true;

    this.newsService.createArticle(payload).subscribe({
      next: (created) => {
        window.alert(`The article '${created?.title ?? this.article.title}' has been published.`);
        this.router.navigate(['/article-list']);
      },
      error: (err) => {
        console.error('Create failed', err);
        const code = err?.status ? ` (HTTP ${err.status})` : '';
        window.alert('DIN MAMMA FELMEDDELANDE MEN SKICKAS ÄNDÅ' + code);
      },
    });
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
