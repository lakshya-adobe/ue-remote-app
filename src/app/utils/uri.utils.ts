import { environment } from '../../environments/environment';

/**
 * Get the service URL based on environment configuration
 * Matches React's getURI implementation
 */
export function getURI(path: string = ''): string {
  // In Angular, we'll use environment variables similar to React
  const serviceURL = environment.useProxy ? '/' : environment.hostUri;
  return serviceURL + path;
}

/**
 * Convert snake_case to Title Case
 * Example: "hero_title" => "Hero Title"
 */
export function snakeCaseToTitleCase(str: string): string {
  return str
    .split('_')
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
