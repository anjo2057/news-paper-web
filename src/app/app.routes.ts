import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEdit } from './article-edit/article-edit';
import { ArticleList } from './article-list/article-list';
import { ArticleDetails } from './article-details/article-details';

export const routes: Routes = [
  // Default route: redirect root to the article list
  { path: '', redirectTo: 'article-list', pathMatch: 'full' },
  { path: 'article-edit', component: ArticleEdit },
  { path: 'article-details/:value', component: ArticleDetails },
  { path: 'article-list', component: ArticleList },
  // Fallback for unknown paths
  { path: '**', redirectTo: 'article-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
