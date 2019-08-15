import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class ProfileProvider implements OnInit{

  constructor(public http: HttpClient) {
    
  }

  rootPoint = "http://7310d3df.ngrok.io/";

  getProfile(text)
  {
    console.log(text);
    return this.http.get(this.rootPoint + "user/profile/"+text);
  }

  ngOnInit(){}

}
