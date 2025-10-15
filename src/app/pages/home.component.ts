import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { HeroComponent } from '../components/hero/hero.component';
import { AemHeadlessService, PageData } from '../services/aem-headless.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Page data
  pageData: PageData | null = null;

  // Hero component data (derived from pageData)
  heroImage = '';
  heroTitle = '';
  heroContent: any = '';

  constructor(private aemHeadless: AemHeadlessService) {}

  ngOnInit() {
    // Fetch page data
    this.fetchPageData();

    // Listen for Universal Editor content updates
    this.setupUniversalEditorListeners();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.removeUniversalEditorListeners();
  }

  fetchPageData() {
    this.aemHeadless
      .getPageBySlug('home', 'master')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data) {
            this.pageData = data;
            this.updateHeroData(data);
          }
        },
        error: (error) => {
          console.error('Error fetching page data:', error);
        }
      });
  }

  updateHeroData(data: PageData) {
    this.heroImage = data.image?._dynamicUrl || '';
    this.heroTitle = data.title || '';
    this.heroContent = data.content || '';
  }

  private contentUpdateHandler = () => {
    this.fetchPageData();
  };

  private setupUniversalEditorListeners() {
    document.addEventListener('aue:content-update', this.contentUpdateHandler as EventListener);
  }

  private removeUniversalEditorListeners() {
    document.removeEventListener('aue:content-update', this.contentUpdateHandler as EventListener);
  }
}
