import { environment } from '../../environments/environment';

/**
 * Universal Editor Configuration
 * This function dynamically updates the meta tags with values from environment
 */
export function configureUniversalEditor() {
  // Validate environment variables
  if (!environment.aemUrl || !environment.ueServiceUrl) {
    console.error('Universal Editor configuration failed: Missing environment variables', {
      aemUrl: environment.aemUrl,
      ueServiceUrl: environment.ueServiceUrl
    });
    return;
  }

  // Update AEM connection meta tag
  const aemConnectionMeta = document.querySelector('meta[name="urn:adobe:aue:system:aemconnection"]');
  const connectionValue = `aem:${environment.aemUrl}`;

  if (aemConnectionMeta) {
    aemConnectionMeta.setAttribute('content', connectionValue);
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'urn:adobe:aue:system:aemconnection');
    meta.setAttribute('content', connectionValue);
    document.head.appendChild(meta);
  }

  // Update Universal Editor service meta tag
  const ueServiceMeta = document.querySelector('meta[name="urn:adobe:aue:config:service"]');
  if (ueServiceMeta) {
    ueServiceMeta.setAttribute('content', environment.ueServiceUrl);
  } else {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'urn:adobe:aue:config:service');
    meta.setAttribute('content', environment.ueServiceUrl);
    document.head.appendChild(meta);
  }

  console.log('Universal Editor configured successfully:', {
    connection: connectionValue,
    service: environment.ueServiceUrl
  });
}
