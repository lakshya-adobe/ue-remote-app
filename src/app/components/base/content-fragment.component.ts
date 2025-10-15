import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ContentFragmentMetadata {
  _metadata?: {
    stringMetadata?: Array<{
      name: string;
      value: string;
    }>;
  };
  _model?: {
    title?: string;
  };
  _path?: string;
  _variation?: string;
}

@Component({
  selector: 'app-content-fragment',
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="tag || 'div'">
      <div *ngSwitchCase="'div'"
        [attr.data-aue-resource]="getResource()"
        [attr.data-aue-type]="'reference'"
        [attr.data-aue-label]="getCompositeLabel()"
        [attr.data-aue-behavior]="behavior"
        [ngClass]="className">
        <ng-content></ng-content>
      </div>
      <section *ngSwitchCase="'section'"
        [attr.data-aue-resource]="getResource()"
        [attr.data-aue-type]="'reference'"
        [attr.data-aue-label]="getCompositeLabel()"
        [attr.data-aue-behavior]="behavior"
        [ngClass]="className">
        <ng-content></ng-content>
      </section>
      <article *ngSwitchCase="'article'"
        [attr.data-aue-resource]="getResource()"
        [attr.data-aue-type]="'reference'"
        [attr.data-aue-label]="getCompositeLabel()"
        [attr.data-aue-behavior]="behavior"
        [ngClass]="className">
        <ng-content></ng-content>
      </article>
      <div *ngSwitchDefault
        [attr.data-aue-resource]="getResource()"
        [attr.data-aue-type]="'reference'"
        [attr.data-aue-label]="getCompositeLabel()"
        [attr.data-aue-behavior]="behavior"
        [ngClass]="className">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `,
  styles: []
})
export class ContentFragmentComponent {
  @Input() tag?: string;
  @Input() cf?: ContentFragmentMetadata;
  @Input() label?: string;
  @Input() behavior?: string;
  @Input() className: string = '';

  getResource(): string {
    if (!this.cf?._path) return '';
    const variation = this.cf._variation || 'master';
    return `urn:aemconnection:${this.cf._path}/jcr:content/data/${variation}`;
  }

  getCompositeLabel(): string {
    if (this.label) return this.label;

    let title = '';
    if (this.cf?._metadata?.stringMetadata) {
      const titleMeta = this.cf._metadata.stringMetadata.find(
        (meta) => meta?.name === 'title'
      );
      title = titleMeta?.value || '';
    }

    const modelTitle = this.cf?._model?.title || '';
    return modelTitle + (title ? ` (${title})` : '');
  }
}
