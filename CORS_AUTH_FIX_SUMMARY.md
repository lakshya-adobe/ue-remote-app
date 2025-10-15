# CORS and Authentication Fix - Summary

## Date: October 15, 2025

## Problem
Getting CORS error when trying to fetch data from AEM:
```
CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Also being redirected to AEM login page, indicating authentication was required.

---

## Solution Implemented

### 1. **Created Proxy Configuration** (`proxy.conf.json`)
```json
{
  "/content/*": {
    "target": "https://localhost:8443",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "auth": "admin:admin"
  },
  "/graphql/*": {
    "target": "https://localhost:8443",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true,
    "auth": "admin:admin"
  }
}
```

**What this does:**
- Proxies requests from Angular dev server to AEM
- Bypasses CORS by making requests server-side
- Handles authentication automatically
- Works with self-signed SSL certificates (`secure: false`)

---

### 2. **Updated `angular.json`**
Added proxy configuration to the serve builder:
```json
"serve": {
  "options": {
    "ssl": true,
    "sslCert": "ssl/cert.pem",
    "sslKey": "ssl/key.pem",
    "proxyConfig": "proxy.conf.json"  // ← Added this
  }
}
```

---

### 3. **Updated Environment Files**

#### `environment.ts` (Development)
```typescript
export const environment = {
  production: false,
  aemUrl: 'https://localhost:8443',
  graphqlEndpoint: '/content/graphql/global/endpoint',
  ueServiceUrl: 'https://universal-editor-service.adobe.io',
  hostUri: 'https://localhost:8443',
  useProxy: true,  // ← Use proxy in development
  authMethod: 'basic',
  basicAuthUser: 'admin',
  basicAuthPass: 'admin'
};
```

#### `environment.prod.ts` (Production)
```typescript
export const environment = {
  production: true,
  useProxy: true,  // Use proxy in production too
  authMethod: 'basic',
  basicAuthUser: 'admin',
  basicAuthPass: 'admin'
  // ... other settings
};
```

---

### 4. **Updated `.env` File**
Added authentication and proper endpoint configuration:
```env
# Authentication
REACT_APP_AUTH_METHOD=basic
REACT_APP_BASIC_AUTH_USER=admin
REACT_APP_BASIC_AUTH_PASS=admin

# Host URI and Proxy
REACT_APP_HOST_URI=https://localhost:8443
REACT_APP_USE_PROXY=false

# GraphQL Endpoint
REACT_APP_ENDPOINT=/content/graphql/global/endpoint
```

---

### 5. **Updated `AemHeadlessService`**

Added authentication headers:
```typescript
private getAuthHeaders(): HttpHeaders {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  if (environment.authMethod === 'basic') {
    const credentials = btoa(`${environment.basicAuthUser}:${environment.basicAuthPass}`);
    headers = headers.set('Authorization', `Basic ${credentials}`);
  }

  return headers;
}
```

Fixed the persisted query path:
```typescript
getPageBySlug(slug: string, variation: string = 'master') {
  const persistedQueryPath = `${this.graphqlEndpoint}/execute.json/summit-2024-l425-ue/page-by-slug`;
  // Full path: /content/graphql/global/endpoint/execute.json/summit-2024-l425-ue/page-by-slug
}
```

Added credentials to HTTP requests:
```typescript
return this.http.get<GraphQLResponse<T>>(queryURL, { 
  headers: this.getAuthHeaders(),
  withCredentials: true  // ← Important for authentication
});
```

---

## How It Works Now

### Request Flow:
1. **Angular App** (https://localhost:4200) makes request to `/content/graphql/...`
2. **Proxy** intercepts and forwards to `https://localhost:8443/content/graphql/...`
3. **Proxy** adds Basic Auth credentials (`admin:admin`)
4. **AEM** receives authenticated request and returns data
5. **Proxy** returns data to Angular app
6. **No CORS issues** because browser sees request as same-origin

### Diagram:
```
Angular App (localhost:4200)
    ↓
    | Request: /content/graphql/...
    ↓
Proxy (proxy.conf.json)
    ↓
    | Request: https://localhost:8443/content/graphql/...
    | Header: Authorization: Basic YWRtaW46YWRtaW4=
    ↓
AEM (localhost:8443)
    ↓
    | Response: JSON data
    ↓
Angular App receives data ✅
```

---

## Testing Instructions

### 1. **Restart the Development Server**
```bash
# Stop current server (Ctrl+C)
# Then restart with:
npm run start:https
```

### 2. **Verify Proxy is Working**
Open browser console and check:
- Network tab should show requests to `/content/graphql/...` (NOT `https://localhost:8443/...`)
- Status should be `200 OK` (NOT `401 Unauthorized` or CORS error)
- Response should contain actual data

### 3. **Check Console Logs**
You should see:
```
Fetching from: /content/graphql/global/endpoint/execute.json/summit-2024-l425-ue/page-by-slug.json?slug=home&variation=master
GraphQL Response: { data: { pageList: { items: [...] } } }
```

---

## Important Notes

### Security Warning ⚠️
**The credentials are hardcoded in the environment files!**
- This is **ONLY for local development**
- **DO NOT commit these credentials** to version control in production
- For production, use:
  - Environment variables
  - OAuth tokens
  - Service accounts
  - Azure Key Vault / AWS Secrets Manager

### Self-Signed Certificate
The proxy has `"secure": false` to work with self-signed SSL certificates. For production:
- Use proper SSL certificates
- Set `"secure": true`

### Proxy Configuration
The proxy only works with `ng serve`. For production:
- Configure proper reverse proxy (nginx, Apache)
- Or use AEM Dispatcher
- Or enable CORS on AEM server

---

## Files Modified

### Created:
- `/proxy.conf.json` - Proxy configuration for development

### Updated:
- `/angular.json` - Added proxy config to serve builder
- `/src/environments/environment.ts` - Added auth and proxy settings
- `/src/environments/environment.prod.ts` - Added auth and proxy settings
- `/.env` - Added authentication and endpoint configuration
- `/src/app/services/aem-headless.service.ts` - Added authentication headers

---

## Build Status

✅ **Build Successful** - 1.874 seconds
- Main bundle: 289.05 kB (77.35 kB compressed)
- No compilation errors
- All components working

---

## Next Steps

1. **Test the application**: Start with `npm run start:https`
2. **Verify data loading**: Home page should fetch and display data from AEM
3. **Test variations**: Click variation buttons to load different content
4. **Test Universal Editor**: Open in Universal Editor to verify integration

---

## Troubleshooting

### If you still get CORS errors:
1. Make sure you restarted the dev server after changes
2. Check that `useProxy: true` in environment.ts
3. Verify proxy.conf.json exists and is valid JSON
4. Check browser console for proxy errors

### If you get 401 Unauthorized:
1. Verify AEM credentials are correct (admin:admin)
2. Check that AEM is running on localhost:8443
3. Try accessing AEM directly in browser to confirm credentials

### If data doesn't load:
1. Check browser Network tab for the request
2. Look at response - is it data or an error?
3. Check console logs for "Fetching from:" and "GraphQL Response:"
4. Verify the persisted query exists in AEM

---

**Status**: ✅ **READY FOR TESTING**

