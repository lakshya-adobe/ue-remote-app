import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SecurbankHeroComponent } from './components/securbank-hero.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SecurbankHeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ue-remote-app');
}
