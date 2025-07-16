import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ApodSessionService } from 'src/app/services/apod-session.service';
import { Apod } from 'src/app/models/apod.model';
import { ApodApiService } from 'src/app/services/apod-api.service';
// import { register } from 'swiper/element/bundle';

// register();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  currentImage: Apod | null = null;
  imageList: Apod[] = [];
  isLoading = false;

  @ViewChild('swiperContainer', { static: true }) swiperContainer!: ElementRef;

  constructor(
    private apodApi: ApodApiService,
    private session: ApodSessionService
  ) {}

  ngOnInit(): void {
    this.imageList = this.session.getImages();
  }

  ngAfterViewInit(): void {
    if (this.imageList.length > 0) {
      this.initializeSwiper();
    }
  }

  ngOnDestroy(): void {
    const swiperEl = this.swiperContainer?.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.destroy(true, true);
    }
  }

  private initializeSwiper(): void {
    const swiperEl = this.swiperContainer.nativeElement;
    Object.assign(swiperEl, {
      effect: 'cube',
      grabCursor: true,
      loop: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.8
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
    swiperEl.initialize();
  }

  private updateSwiper(): void {
    const swiperEl = this.swiperContainer.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.update();
      const currentIndex = swiperEl.swiper.realIndex;
      if (currentIndex >= this.imageList.length) {
        swiperEl.swiper.slideTo(this.imageList.length - 1, 0);
      }
    } else if (this.imageList.length > 0) {
      this.initializeSwiper();
    }
  }

  generate(): void {
    this.isLoading = true;
    this.apodApi.getRandomImage().subscribe((img: any) => {
      this.currentImage = img;
      this.isLoading = false;
      if (!img) this.generate();
    });
  }

  save(): void {
    if (this.currentImage) {
      this.imageList = [...this.imageList, this.currentImage];
      this.session.setImages(this.imageList);
      setTimeout(() => this.updateSwiper(), 0);
    }
  }

  clearAll(): void {
    this.imageList = [];
    this.session.clearImages();
    const swiperEl = this.swiperContainer.nativeElement;
    if (swiperEl?.swiper) {
      swiperEl.swiper.destroy(true, true);
    }
  }

  remove(index: number): void {
    this.imageList.splice(index, 1);
    this.session.setImages(this.imageList);
    setTimeout(() => this.updateSwiper(), 0);
  }

  trackByFn(index: number, item: Apod): string {
    return item.url;
  }
}
