import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

/*
  Generated class for the MessageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageProvider {

  rootPoint = "http://7310d3df.ngrok.io/";

  constructor(public http: HttpClient) {
  }

  getMessages(channelID)
  {
    return this.http.get(this.rootPoint + "messages/" + channelID);
  }

}
