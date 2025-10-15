# Hero Component Documentation

## Overview
The Hero component is a fully optimized Angular implementation based on the React version, complete with all base components for Universal Editor integration. All utilities now match the React implementation exactly.

## Component Structure

### Base Components (`src/app/components/base/`)

#### 1. **TitleComponent** (`title.component.ts`)
- Dynamic heading levels (h1-h6)
- Auto-generates labels using `snakeCaseToTitleCase` from prop names
- Universal Editor text type support

**Usage:**
```typescript
<app-title heading="h1" prop="hero_title" className="color-light">
  {{ titleText }}
</app-title>
<!-- Automatically generates label: "Hero Title" -->
```

**Props:**
- `heading`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' (default: 'h1')
- `prop`: string - Property name for Universal Editor (supports snake_case)
- `label`: string (optional) - Custom label (auto-generated from prop if not provided)
- `className`: string - CSS classes
- `behavior`: string (optional) - Universal Editor behavior

---

#### 2. **ImageComponent** (`image.component.ts`)
- Handles image URLs with environment-based `getURI` utility
- Auto-generates labels using `snakeCaseToTitleCase`
- Universal Editor media type support

**Usage:**
```typescript
<app-image
  [src]="'/content/dam/image.jpg'"
  alt="Description"
  prop="hero_image"
  className="hover-effect"
></app-image>
<!-- Automatically generates label: "Hero Image" -->
<!-- URL becomes: https://localhost:8443/content/dam/image.jpg in dev -->
```

**Props:**
- `src`: string - Image source URL (relative or absolute)
- `alt`: string - Alt text
- `prop`: string (optional) - Property name for Universal Editor
- `type`: string (optional) - Universal Editor type (default: 'media')
- `label`: string (optional) - Custom label
- `className`: string - CSS classes
- `behavior`: string (optional)

---

#### 3. **TextComponent** (`text.component.ts`)
- Supports both plaintext and richtext modes
- Automatically detects content type
- Handles string content or structured content objects
- Auto-generates labels using `snakeCaseToTitleCase`

**Usage:**
```typescript
<!-- Simple string content -->
<app-text [content]="'Your text here'" prop="description_text" className="color-grey"></app-text>
<!-- Label: "Description Text" -->

<!-- Structured content with plaintext -->
<app-text [content]="{ plaintext: 'Plain text' }" prop="hero_description"></app-text>

<!-- Structured content with HTML -->
<app-text [content]="{ html: '<p>Rich <strong>text</strong></p>' }" prop="body_content"></app-text>
```

**Props:**
- `content`: string | TextContent - Text content (string for richtext, object for plaintext/html)
- `prop`: string - Property name for Universal Editor
- `label`: string (optional) - Custom label
- `className`: string - CSS classes
- `behavior`: string (optional)

**TextContent Interface:**
```typescript
interface TextContent {
  plaintext?: string;
  html?: string;
}
```

---

#### 4. **ContainerComponent** (`container.component.ts`)
- Universal Editor container type
- Supports different HTML tags
- Filterable content

**Usage:**
```typescript
<app-container tag="section" prop="items" label="Items Container" filter="item">
  <ng-content></ng-content>
</app-container>
```

**Props:**
- `tag`: string (optional) - HTML tag ('div', 'section', 'article', 'aside')
- `prop`: string (optional) - Property name
- `label`: string (optional) - Container label
- `filter`: string (optional) - Content filter
- `className`: string - CSS classes

---

#### 5. **ContentFragmentComponent** (`content-fragment.component.ts`)
- AEM Content Fragment integration
- Universal Editor reference type
- Auto-generates labels from fragment metadata

**Usage:**
```typescript
<app-content-fragment [cf]="fragmentData" tag="article" className="fragment-wrapper">
  <!-- Fragment content here -->
</app-content-fragment>
```

**Props:**
- `tag`: string (optional) - HTML tag
- `cf`: ContentFragmentMetadata (optional) - Fragment metadata
- `label`: string (optional) - Custom label
- `behavior`: string (optional)
- `className`: string - CSS classes

---

### Supporting Components

#### **RedirectButtonComponent** (`redirect-button.component.ts`)
Simple button with link functionality.

**Usage:**
```typescript
<app-redirect-button href="/services" className="hover-effect">
  Our Services
</app-redirect-button>
```

---

## Hero Component

### Usage

**In your component template:**
```typescript
<app-hero 
  [image]="'/content/dam/hero-banner.jpg'" 
  [title]="'SecurBank'" 
  [content]="'Welcome to SecurBank - Your Trusted Partner for Financial Solutions...'"
></app-hero>
```

**Props:**
- `image`: string - Hero banner image URL (will be processed by `getURI`)
- `title`: string - Hero title text
- `content`: string - Hero description/content

### Styling

The Hero component includes responsive SCSS with:
- Blue background theme
- Flexbox layout
- Hover effects
- Mobile-responsive design
- Gap-based spacing

### Features

✅ **Universal Editor Integration**: All components include proper `data-aue-*` attributes
✅ **Type Safety**: Full TypeScript support with interfaces
✅ **Standalone Components**: Uses Angular's new standalone API
✅ **Optimized**: Matches React implementation exactly
✅ **Responsive**: Mobile-first design
✅ **Accessible**: Proper semantic HTML and alt text support
✅ **Environment-based URIs**: Dynamic URL handling based on environment configuration

---

## Utility Functions (`src/app/utils/uri.utils.ts`)

### `getURI(path: string): string`
Handles image and asset URLs based on environment configuration. Matches React implementation exactly.

**How it works:**
- In development (`useProxy: false`): Prepends `hostUri` (e.g., `https://localhost:8443`)
- In production (`useProxy: true`): Returns relative path with `/` prefix

**Example:**
```typescript
import { getURI } from './utils';

// Development
getURI('/content/dam/image.jpg') 
// Returns: 'https://localhost:8443/content/dam/image.jpg'

// Production (with proxy)
getURI('/content/dam/image.jpg') 
// Returns: '/content/dam/image.jpg'
```

---

### `snakeCaseToTitleCase(str: string): string`
Converts snake_case strings to Title Case. Matches React implementation exactly.

**Examples:**
```typescript
snakeCaseToTitleCase('hero_title') // Returns: 'Hero Title'
snakeCaseToTitleCase('main_image') // Returns: 'Main Image'
snakeCaseToTitleCase('body_content_text') // Returns: 'Body Content Text'
```

---

### `capitalizeFirst(str: string): string`
Capitalizes only the first letter of a string.

**Examples:**
```typescript
capitalizeFirst('title') // Returns: 'Title'
capitalizeFirst('description') // Returns: 'Description'
```

---

## Environment Configuration

### Development (`environment.ts`)
```typescript
export const environment = {
  production: false,
  aemUrl: 'https://localhost:8443',
  aemGraphqlEndpoint: 'https://localhost:8443/content/graphql/global/endpoint.json',
  ueServiceUrl: 'https://localhost:8000',
  corsOrigin: 'https://experience.adobe.com',
  localDevUrl: 'https://localhost:4200',
  hostUri: 'https://localhost:8443',
  useProxy: false  // Direct AEM connections
};
```

### Production (`environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  aemUrl: 'https://localhost:8443',
  aemGraphqlEndpoint: 'https://localhost:8443/content/graphql/global/endpoint.json',
  ueServiceUrl: 'https://localhost:8000',
  corsOrigin: 'https://experience.adobe.com',
  localDevUrl: 'https://localhost:4200',
  hostUri: 'https://localhost:8443',
  useProxy: true  // Use proxy for relative paths
};
```

---

## Easy Imports

You can import all components and utilities from centralized locations:

```typescript
// Import all components
import { 
  HeroComponent, 
  TitleComponent, 
  ImageComponent, 
  TextComponent,
  ContainerComponent,
  ContentFragmentComponent,
  RedirectButtonComponent 
} from './components';

// Or import just base components
import { TitleComponent, ImageComponent, TextComponent } from './components/base';

// Import utilities
import { getURI, snakeCaseToTitleCase, capitalizeFirst } from './utils';
```

---

## Example: Using in App Component

```typescript
import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-root',
  imports: [HeroComponent],
  template: `
    <app-hero 
      [image]="heroImage" 
      [title]="heroTitle" 
      [content]="heroContent"
    ></app-hero>
  `
})
export class AppComponent {
  // Will be processed by getURI to: https://localhost:8443/content/dam/hero-banner.jpg
  heroImage = '/content/dam/hero-banner.jpg';
  heroTitle = 'SecurBank';
  heroContent = 'Welcome to SecurBank - Your Trusted Partner for Financial Solutions...';
}
```

---

## Key Improvements from React Reference

✅ **`getURI` utility**: Now matches React implementation with environment-based URL handling
✅ **`snakeCaseToTitleCase`**: Auto-generates proper labels for snake_case prop names
✅ **Environment configuration**: Separate dev/prod settings for `hostUri` and `useProxy`
✅ **Label generation**: All base components now use `snakeCaseToTitleCase` instead of simple capitalization
✅ **Consistent API**: Matches React component props and behavior exactly

---

## Notes

- All components and utilities are optimized based on the React reference implementation
- Universal Editor attributes are properly configured for AEM integration
- Components follow Angular 20 best practices with standalone components
- Full type safety with TypeScript interfaces
- Environment-based configuration allows flexible deployment strategies
