import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { snakeCaseToTitleCase } from '../../utils';

export interface TextContent {
  plaintext?: string;
  html?: string;
}

@Component({
  selector: 'app-text',
  imports: [CommonModule],
  template: `
    <div *ngIf="shouldRenderPlaintext()"
      [attr.data-aue-prop]="prop"
      data-aue-type="text"
      [attr.data-aue-label]="getLabel()"
      [ngClass]="className">
      <ng-content></ng-content>{{ getPlaintext() }}
    </div>
    <div *ngIf="shouldRenderRichtext()"
      [attr.data-aue-prop]="prop"
      data-aue-type="richtext"
      [attr.data-aue-label]="getLabel()"
      [ngClass]="className"
      [innerHTML]="getRichtext()">
    </div>
  `,
  styles: []
})
export class TextComponent {
  @Input() content?: string | TextContent;
  @Input() prop: string = '';
  @Input() label?: string;
  @Input() className: string = '';
  @Input() behavior?: string;

  getLabel(): string {
    return this.label || (this.prop ? snakeCaseToTitleCase(this.prop) : '');
  }

  shouldRenderPlaintext(): boolean {
    return typeof this.content === 'object' && !!this.content?.plaintext;
  }

  shouldRenderRichtext(): boolean {
    if (typeof this.content === 'string') {
      return true;
    }
    return typeof this.content === 'object' && !!this.content?.html;
  }

  getPlaintext(): string {
    if (typeof this.content === 'object' && this.content?.plaintext) {
      return this.content.plaintext;
    }
    return '';
  }

  getRichtext(): string {
    if (typeof this.content === 'string') {
      return this.content;
    }
    if (typeof this.content === 'object' && this.content?.html) {
      return this.content.html;
    }
    return '';
  }
}
