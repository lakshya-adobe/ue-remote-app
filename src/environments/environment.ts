// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aemUrl: 'https://localhost:8443',
  aemGraphqlEndpoint: 'https://localhost:8443/graphql/execute.json',
  graphqlEndpoint: '/graphql/execute.json',
  graphqlProject: 'securbank',
  ueServiceUrl: 'https://localhost:8000',
  corsOrigin: 'https://experience.adobe.com',
  localDevUrl: 'https://localhost:3000',
  hostUri: 'https://localhost:8443',
  useProxy: true,  // Use proxy in development to avoid CORS issues
  authMethod: 'basic',
  basicAuthUser: 'admin',
  basicAuthPass: 'admin'
};
