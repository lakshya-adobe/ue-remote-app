// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentProviders } from '@angular/core';
import { generatedEnvironment } from './environment.generated';
import {
  EnvironmentConfig,
  EnvironmentOverrides,
  ENVIRONMENT_TOKEN,
  finalizeEnvironment,
  provideEnvironment
} from './environment.model';

const overrides = (generatedEnvironment || {}) as EnvironmentOverrides;

export const environment: EnvironmentConfig = finalizeEnvironment({
  production: false,
  hostUri: overrides.hostUri,
  aemUrl: overrides.aemUrl,
  graphqlEndpoint: overrides.graphqlEndpoint,
  graphqlProject: overrides.graphqlProject,
  siteName: overrides.siteName,
  ueServiceUrl: overrides.ueServiceUrl,
  corsOrigin: overrides.corsOrigin,
  localDevUrl: overrides.localDevUrl,
  repoTemplateUrl: overrides.repoTemplateUrl,
  useProxy: overrides.useProxy,
  authMethod: overrides.authMethod,
  basicAuthUser: overrides.basicAuthUser,
  basicAuthPass: overrides.basicAuthPass,
  aemGraphqlEndpoint: overrides.aemGraphqlEndpoint
});

export const environmentProviders: EnvironmentProviders = provideEnvironment(environment);

export { ENVIRONMENT_TOKEN };
export type { EnvironmentConfig };
