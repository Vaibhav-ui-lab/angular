import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.css']
})
export class CamComponent implements OnInit {

  constructor(private service: DataService) { }

  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();


  img = "";
  imageData!: File;
  gender = "............";
  hairColour = "............";
  eyeColour = "............";

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next(void 0);
    this.img = this.webcamImage?.imageAsDataUrl;
    // console.log(this.img)
    const imageName = 'name.jpeg';
    const imageBlob = this.dataURItoBlob(this.img);
    this.imageData = new File([imageBlob], imageName, { type: 'image/jpeg' });
    // console.log(this.imageData)
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  getImg(){
    return this.img;
  }

  clearImg(){
    this.img = '';
  }

  sendImg(){
    let formdata =  new FormData();
    formdata.append('image',this.imageData)
    this.service.postData(formdata).subscribe((val)=>{
      console.log(val);
      this.setData(val);
    });
  }

  setData(data: any){
    this.gender = data[0];
  }

  dataURItoBlob(dataURI: any) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

}
