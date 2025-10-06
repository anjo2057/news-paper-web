import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NgbModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // protected readonly title = signal('news-paper-web');
}
