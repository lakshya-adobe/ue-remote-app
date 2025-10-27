import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { configureUniversalEditor } from './app/config/universal-editor-config';
import { environmentProviders } from './environments/environment';

bootstrapApplication(App, {
  ...appConfig,
  providers: [environmentProviders, ...(appConfig.providers || [])]
})
  .then(() => {
    // Configure Universal Editor after app is initialized
    configureUniversalEditor();
  })
  .catch((err) => console.error(err));
