import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../interfaces/article';

@Pipe({
  name: 'articleFilter',
  pure: true,
})
export class ArticleFilterPipe implements PipeTransform {
  transform(items: Article[] | null | undefined, category?: string, search?: string): Article[] {
    if (!items || items.length === 0) return [];

    const cat = (category ?? '').trim();
    const s = (search ?? '').trim().toLowerCase();

    return items.filter((a) => {
      if (cat && cat !== 'All' && a.category !== cat) return false;
      if (s) {
        const hay = (
          (a.title ?? '') +
          ' ' +
          (a.abstract ?? '') +
          ' ' +
          (a.body ?? '')
        ).toLowerCase();
        return hay.indexOf(s) !== -1;
      }
      return true;
    });
  }
}
