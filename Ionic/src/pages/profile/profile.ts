import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";

import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://10.0.2.2:3000/api/upload';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  profile: any;

  constructor(public navCtrl: NavController,
    private profileService: ProfileProvider) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; this.uploader.uploadAll()};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("The photo has just been uploaded with success!");
      // console.log("--uploader.getNotUploadedItems().length: " + this.uploader.getNotUploadedItems().length)
      // if (this.uploader.getNotUploadedItems().length < 1) {
      //     console.log("All Image have been uploaded");
      // }
  };
    
    this.profileService.getProfile("Prunariu").subscribe(
      (data) => { console.log(data); this.profile = data; }
    );
  }

}
