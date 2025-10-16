import { RenderMode, ServerRoute } from '@angular/ssr';

// Use server-side rendering at runtime so incoming requests (like GET /)
// are handled by the SSR engine. Prerender is meant for build-time
// generation and may not produce a runtime response.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
