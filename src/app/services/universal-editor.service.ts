import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT_TOKEN, EnvironmentConfig } from '../../environments/environment.model';

@Injectable({
  providedIn: 'root'
})
export class UniversalEditorService {

  // AEM Configuration
  constructor(@Inject(ENVIRONMENT_TOKEN) private env: EnvironmentConfig) {
    console.log('Universal Editor Service initialized');
    console.log('AEM URL:', this.env.aemUrl);
    console.log('UE Service URL:', this.env.ueServiceUrl);
  }

  get aemUrl(): string {
    return this.env.aemUrl;
  }

  get aemGraphqlEndpoint(): string {
    return this.env.aemGraphqlEndpoint;
  }

  // Universal Editor Service
  get ueServiceUrl(): string {
    return this.env.ueServiceUrl;
  }

  // CORS Configuration
  get corsOrigin(): string {
    return this.env.corsOrigin;
  }

  // Local Development URL
  get localDevUrl(): string {
    return this.env.localDevUrl;
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

