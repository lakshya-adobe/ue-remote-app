import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { configureUniversalEditor } from './app/config/universal-editor-config';

// Configure Universal Editor meta tags from environment
configureUniversalEditor();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
