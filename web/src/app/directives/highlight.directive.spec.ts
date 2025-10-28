import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as any;
    const directive = new HighlightDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
