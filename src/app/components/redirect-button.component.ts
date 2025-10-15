import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-redirect-button',
  imports: [CommonModule, RouterModule],
  template: `
    <a [href]="href">
      <button [ngClass]="className">
        <ng-content></ng-content>
      </button>
    </a>
  `,
  styles: []
})
export class RedirectButtonComponent {
  @Input() href: string = '';
  @Input() className: string = '';
}

