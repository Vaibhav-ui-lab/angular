import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  video: any;

  ngOnInit(): void {
    this.video = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      console.log(stream)
      this.video.srcObject = stream;
    });
  }

}
