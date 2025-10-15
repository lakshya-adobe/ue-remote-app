import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TextContent {
  plaintext?: string;
  html?: string;
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() content: string | TextContent = '';

  getContentText(): string {
    if (typeof this.content === 'string') {
      return this.content;
    }
    if (typeof this.content === 'object' && this.content?.plaintext) {
      return this.content.plaintext;
    }
    if (typeof this.content === 'object' && this.content?.html) {
      return this.content.html;
    }
    return '';
  }
}
