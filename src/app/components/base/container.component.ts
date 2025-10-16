import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  imports: [CommonModule],
  template: `
    <div [attr.data-aue-resource]="resource"
         [attr.data-aue-type]="type"
         [attr.data-aue-label]="label"
         [attr.data-aue-filter]="filter"
         [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class ContainerComponent {
  @Input() resource: string = '';
  @Input() type: string = 'container';
  @Input() label: string = 'Container';
  @Input() filter: string = 'content-fragments';
  @Input() className: string = '';
}

