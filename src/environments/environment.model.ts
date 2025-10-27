import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export type AuthMethod = 'basic' | 'none';

export interface EnvironmentConfig {
  production: boolean;
  hostUri: string;
  aemUrl: string;
  graphqlEndpoint: string;
  graphqlProject: string;
  siteName: string;
  ueServiceUrl: string;
  corsOrigin: string;
  localDevUrl: string;
  repoTemplateUrl: string;
  useProxy: boolean;
  authMethod: AuthMethod;
  basicAuthUser: string;
  basicAuthPass: string;
  aemGraphqlEndpoint: string;
}

export type EnvironmentOverrides = Partial<EnvironmentConfig>;

const DEFAULT_ENVIRONMENT: EnvironmentConfig = {
  production: false,
  hostUri: 'https://localhost:8443',
  aemUrl: 'https://localhost:8443',
  graphqlEndpoint: '/graphql/execute.json',
  graphqlProject: 'securbank',
  siteName: 'securbank',
  ueServiceUrl: 'https://localhost:8000',
  corsOrigin: 'https://experience.adobe.com',
  localDevUrl: 'https://localhost:3000',
  repoTemplateUrl: 'https://github.com/your-org/aem-ue-template',
  useProxy: true,
  authMethod: 'basic',
  basicAuthUser: 'admin',
  basicAuthPass: 'admin',
  aemGraphqlEndpoint: 'https://localhost:8443/graphql/execute.json'
};

export function finalizeEnvironment(overrides: EnvironmentOverrides): EnvironmentConfig {
  const merged: EnvironmentConfig = {
    ...DEFAULT_ENVIRONMENT,
    ...overrides
  };

  if (!merged.hostUri) {
    merged.hostUri = DEFAULT_ENVIRONMENT.hostUri;
  }

  if (!merged.aemUrl) {
    merged.aemUrl = merged.hostUri;
  }

  if (!merged.graphqlEndpoint) {
    merged.graphqlEndpoint = DEFAULT_ENVIRONMENT.graphqlEndpoint;
  }

  if (!merged.aemGraphqlEndpoint) {
    const endpointPath = merged.graphqlEndpoint.startsWith('/')
      ? merged.graphqlEndpoint
      : `/${merged.graphqlEndpoint}`;
    merged.aemGraphqlEndpoint = `${merged.hostUri.replace(/\/$/, '')}${endpointPath}`;
  }

  if (!merged.siteName) {
    merged.siteName = merged.graphqlProject || DEFAULT_ENVIRONMENT.siteName;
  }

  if (merged.authMethod !== 'basic') {
    merged.authMethod = 'none';
    merged.basicAuthUser = '';
    merged.basicAuthPass = '';
  }

  return merged;
}

export const ENVIRONMENT_TOKEN = new InjectionToken<EnvironmentConfig>('ENVIRONMENT_TOKEN');

export const AEM_PROJECT_TEMPLATE_META = 'urn:adobe:aue:system:aemsite';

export function provideEnvironment(env: EnvironmentConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ENVIRONMENT_TOKEN, useValue: env }]);
}

