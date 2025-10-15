# Universal Editor Configuration Guide

This Angular application is configured to work with Adobe Experience Manager's Universal Editor.

## Setup Instructions

### 1. Configure Environment Variables

The application now uses **dynamic configuration** from environment files. You only need to update the environment TypeScript files - no need to edit HTML!

Update the following files with your AEM instance URLs:
- `src/environments/environment.ts` (development)
- `src/environments/environment.prod.ts` (production)

Example configuration:
```typescript
export const environment = {
  production: false,
  aemUrl: 'https://localhost:8443',
  aemGraphqlEndpoint: 'https://localhost:8443/content/graphql/global/endpoint.json',
  ueServiceUrl: 'https://localhost:8000',
  corsOrigin: 'https://experience.adobe.com',
  localDevUrl: 'https://localhost:4200'
};
```

**Current Configuration:**
- AEM URL: `https://localhost:8443`
- Universal Editor Service: `https://localhost:8000`
- Angular Dev Server: `https://localhost:4200`

### 2. Start Development Server

Run the application in HTTPS mode (required for Universal Editor):

```bash
npm start
```

The application will be available at: **https://localhost:4200**

Note: You may see a browser security warning due to self-signed certificates. Click "Advanced" and proceed to localhost.

## How Dynamic Configuration Works

The meta tags in `index.html` are automatically populated from environment files:
- `configureUniversalEditor()` function runs before app bootstrap
- Values from `environment.ts` are injected into meta tags
- No hardcoded URLs in HTML - single source of truth in environment files
- Different URLs for dev/prod builds automatically

You can verify the configuration in the browser console on startup.

## Using the Universal Editor Service

The `UniversalEditorService` provides easy access to configuration:

```typescript
import { UniversalEditorService } from './services/universal-editor.service';

constructor(private ueService: UniversalEditorService) {
  // Check if running in Universal Editor
  if (this.ueService.isUniversalEditorContext()) {
    console.log('Running in Universal Editor');
  }
  
  // Get connection attributes for components
  const attrs = this.ueService.getConnectionAttributes();
}
```

## Adding Universal Editor Attributes to Components

To make components editable in Universal Editor, add data attributes:

```html
<div 
  data-aue-resource="urn:aemconnection:/content/path/to/component"
  data-aue-type="component"
  data-aue-label="My Component">
  <!-- Component content -->
</div>
```

## CORS Configuration

The application is configured to work with:
- Universal Editor Service: `https://localhost:8000` (configurable in environment)
- Adobe Experience Cloud: `https://experience.adobe.com`

The CORS script is automatically loaded in `index.html`.

## Local Development Stack

For full Universal Editor integration, you need three services running:

1. **AEM Instance** - `https://localhost:8443`
2. **Universal Editor Service** - `https://localhost:8000`
3. **Angular App** - `https://localhost:4200`

## References

- [Universal Editor Documentation](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/getting-started)
- [Universal Editor Developer Guide](https://developer.adobe.com/uix/docs/services/aem-universal-editor/)

## Troubleshooting

### CORS Errors
- Ensure your AEM instance is configured to allow requests from `https://localhost:4200`
- Check that the CORS script is loading properly
- Verify the Universal Editor Service is running on port 8000

### Connection Issues
- Verify your AEM author URL is correct in environment files
- Ensure you're running on HTTPS (required by Universal Editor)
- Check that your AEM instance is accessible at port 8443
- Check browser console for configuration logs

### Configuration Not Applied
- Check browser console for "Universal Editor configured with:" message
- Verify `main.ts` is calling `configureUniversalEditor()`
- Inspect meta tags in browser DevTools to confirm values are set

### Certificate Warnings
- The development server uses self-signed certificates
- These are safe to accept for local development
- You may need to accept certificates for all three services (4200, 8000, 8443)
- Production should use proper SSL certificates
