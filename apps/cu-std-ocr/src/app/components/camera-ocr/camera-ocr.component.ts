import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-ocr',
  standalone: true,
  templateUrl: './camera-ocr.component.html',
  styleUrl: './camera-ocr.component.scss',
})
export class CameraOcrComponent implements OnInit {
  ngOnInit() {
    console.log('init');
  }
}
