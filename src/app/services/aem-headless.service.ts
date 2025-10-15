import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface GraphQLResponse<T> {
  data: T;
  errors?: any[];
}

export interface PageData {
  _path: string;
  _variations?: string[];
  _variation?: string;
  _metadata?: any;
  _model?: any;
  title?: string;
  content?: {
    plaintext?: string;
    html?: string;
  };
  image?: {
    _dynamicUrl?: string;
    _path?: string;
  };
  featuredServices?: any[];
}

export interface PageListResponse {
  pageList: {
    items: PageData[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AemHeadlessService {
  private serviceURL: string;

  constructor(private http: HttpClient) {
    // When using proxy, serviceURL should be empty string, not '/'
    this.serviceURL = environment.useProxy ? '' : environment.hostUri;
  }

  /**
   * Get authorization headers based on environment configuration
   */
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

  /**
   * Execute a persisted GraphQL query
   * AEM format: /graphql/execute.json/{project}/{query-name};param1=value1;param2=value2
   */
  runPersistedQuery<T>(
    project: string,
    queryName: string,
    queryParameters?: any
  ): Observable<T> {
    // Build the query URL using AEM's persisted query format
    let queryURL = `${this.serviceURL}/graphql/execute.json/${project}/${queryName}`;

    // Add query parameters using semicolon separator (AEM format)
    if (queryParameters) {
      const paramPairs: string[] = [];
      Object.keys(queryParameters).forEach(key => {
        paramPairs.push(`${key}=${encodeURIComponent(queryParameters[key])}`);
      });
      if (paramPairs.length > 0) {
        queryURL += `;${paramPairs.join(';')}`;
      }
    }

    return this.http.get<GraphQLResponse<T>>(queryURL, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('GraphQL Error:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get page by slug
   */
  getPageBySlug(slug: string, variation: string = 'master'): Observable<PageData | null> {
    const queryVariables = { slug, variation };

    // Use the correct project name and query name
    return this.runPersistedQuery<PageListResponse>(
      'securbank',
      'page-by-slug',
      queryVariables
    ).pipe(
      map(response => {
        if (response?.pageList?.items?.length === 1) {
          return response.pageList.items[0];
        }
        return null;
      }),
      catchError(error => {
        console.error('Error fetching page:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Prefix URLs with AEM Host
   */
  addAemHost(url: string): string {
    if (url && url.startsWith('/')) {
      return new URL(url, environment.hostUri).toString();
    }
    return url;
  }
}
