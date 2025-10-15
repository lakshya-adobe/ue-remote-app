import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getURI, snakeCaseToTitleCase } from '../../utils/uri.utils';

@Component({
  selector: 'app-image',
  imports: [CommonModule],
  template: `
    <img
      [src]="getImageSrc()"
      [alt]="alt"
      [attr.data-aue-prop]="prop || ''"
      [attr.data-aue-type]="type || 'media'"
      [attr.data-aue-label]="getLabel()"
      [ngClass]="className"
    />
  `,
  styles: []
})
export class ImageComponent {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() prop?: string;
  @Input() type?: string;
  @Input() label?: string;
  @Input() className: string = '';
  @Input() behavior?: string;

  getImageSrc(): string {
    return getURI(this.src || '');
  }

  getLabel(): string {
    return this.label || (this.prop ? snakeCaseToTitleCase(this.prop) : '');
  }
}
