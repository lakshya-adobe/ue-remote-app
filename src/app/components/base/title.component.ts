import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { snakeCaseToTitleCase } from '../../utils/uri.utils';

@Component({
  selector: 'app-title',
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="heading">
      <h1 *ngSwitchCase="'h1'" [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h1>
      <h2 *ngSwitchCase="'h2'" [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h2>
      <h3 *ngSwitchCase="'h3'" [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h3>
      <h4 *ngSwitchCase="'h4'" [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h4>
      <h5 *ngSwitchCase="'h5'" [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h5>
      <h6 *ngSwitchCase="'h6'" [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h6>
      <h1 *ngSwitchDefault [attr.data-aue-prop]="prop" data-aue-type="text" [attr.data-aue-label]="getLabel()" [ngClass]="className">
        <ng-content></ng-content>
      </h1>
    </ng-container>
  `,
  styles: []
})
export class TitleComponent {
  @Input() heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
  @Input() prop: string = '';
  @Input() label?: string;
  @Input() className: string = '';
  @Input() behavior?: string;

  getLabel(): string {
    return this.label || (this.prop ? snakeCaseToTitleCase(this.prop) : '');
  }
}
