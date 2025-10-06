import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEdit } from './article-edit/article-edit';
import { ArticleView } from './article-view/article-view';
import { ArticleList } from './article-list/article-list';

export const routes: Routes = [
  // Default route: redirect root to the article list
  { path: '', redirectTo: 'article-list', pathMatch: 'full' },
  { path: 'article-edit', component: ArticleEdit },
  { path: 'article-view', component: ArticleView },
  { path: 'article-list', component: ArticleList },
  // Fallback for unknown paths
  { path: '**', redirectTo: 'article-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
