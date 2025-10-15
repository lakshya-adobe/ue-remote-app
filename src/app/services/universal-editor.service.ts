import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversalEditorService {

  // AEM Configuration
  get aemUrl(): string {
    return environment.aemUrl;
  }

  get aemGraphqlEndpoint(): string {
    return environment.aemGraphqlEndpoint;
  }

  // Universal Editor Service
  get ueServiceUrl(): string {
    return environment.ueServiceUrl;
  }

  // CORS Configuration
  get corsOrigin(): string {
    return environment.corsOrigin;
  }

  // Local Development URL
  get localDevUrl(): string {
    return environment.localDevUrl;
  }

  constructor() {
    console.log('Universal Editor Service initialized');
    console.log('AEM URL:', this.aemUrl);
    console.log('UE Service URL:', this.ueServiceUrl);
  }

  /**
   * Check if running in Universal Editor context
   */
  isUniversalEditorContext(): boolean {
    return window.location.ancestorOrigins?.[0]?.includes('adobe.com') || false;
  }

  /**
   * Initialize connection attributes for Universal Editor
   */
  getConnectionAttributes() {
    return {
      'data-aue-resource': `urn:aemconnection:${this.aemUrl}`,
      'data-aue-type': 'reference',
      'data-aue-filter': 'hierarchyModel'
    };
  }
}

