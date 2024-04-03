import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Tesseract from 'tesseract.js';
import { OEM } from 'tesseract.js';
import * as cv from '@techstark/opencv-js';

@Component({
  selector: 'app-camera-ocr',
  standalone: true,
  templateUrl: './camera-ocr.component.html',
  styleUrl: './camera-ocr.component.scss',
})
export class CameraOcrComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  tesseractWorker!: Tesseract.Worker;

  constructor() {
    (async () => {
      this.tesseractWorker = await Tesseract.createWorker('eng', OEM.DEFAULT, {
        logger: (m) => console.log(m),
      });
    })();
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.setupCamera();
    setTimeout(() => {
      setInterval(() => {
        this.captureScreenshot().then();
      }, 1000);
    }, 5000);
  }

  async setupCamera() {
    const video = this.videoElement.nativeElement;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  async captureScreenshot() {
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
    console.log('Recognized Text:', result);
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
    this.tesseractWorker.terminate();
  }
}
