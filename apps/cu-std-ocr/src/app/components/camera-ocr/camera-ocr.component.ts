import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { OEM } from 'tesseract.js';
import * as cv from '@techstark/opencv-js';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take, timer } from 'rxjs';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
@UntilDestroy()
@Component({
  selector: 'app-camera-ocr',
  standalone: true,
  templateUrl: './camera-ocr.component.html',
  styleUrl: './camera-ocr.component.scss',
  imports: [NzButtonComponent, NzTypographyModule],
})
export class CameraOcrComponent implements OnDestroy, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;
  recognizedText$ = signal('');
  stream!: MediaStream;

  tesseractWorker!: Tesseract.Worker;

  constructor() {
    (async () => {
      this.tesseractWorker = await Tesseract.createWorker('eng', OEM.DEFAULT, {
        logger: (m) => console.warn(m),
      });
    })();
  }
  ngAfterViewInit() {
    this.setupCamera();
    timer(3000, 3000)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        // this.captureScreenshot().then();
      });
  }

  async setupCamera() {
    const video = this.videoElement.nativeElement;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = this.stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }
  stopCamera() {
    try {
      const video = this.videoElement.nativeElement;
      if (this.stream) {
        const tracks = this.stream.getTracks(); // Get all tracks from the stream
        tracks.forEach((track) => track.stop()); // Stop each track
        video.srcObject = null; // Remove the stream from the video element
      }
    } catch (err) {
      console.error(err);
    }
  }

  async captureScreenshot() {
    try {
      const video = this.videoElement.nativeElement;
      const canvas = this.canvasElement.nativeElement;

      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image data to OpenCV Mat
      const src = cv.imread(canvas);

      // Convert the image to grayscale
      cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);

      // Convert OpenCV Mat back to canvas
      cv.imshow(canvas, src);
      src.delete(); // Free memory

      const imageData = canvas.toDataURL(); // Convert canvas image data to base64 encoded string

      // Perform text recognition using Tesseract.js
      const result = await this.recognizeText(imageData);
      this.recognizedText$.set(result);
      console.log('Recognized Text:', result);
    } catch (err) {
      console.error(err);
    }
  }

  async recognizeText(imageData: string): Promise<string> {
    await this.tesseractWorker.load();
    // await this.tesseractWorker.loadLanguage('eng');
    // await this.tesseractWorker.initialize();
    const {
      data: { text },
    } = await this.tesseractWorker.recognize(imageData);
    return text;
  }

  ngOnDestroy() {
    try {
      this.tesseractWorker.terminate();
      this.stopCamera();
    } catch (err) {
      console.log(err);
    }
    console.log('midiii');
  }
}
