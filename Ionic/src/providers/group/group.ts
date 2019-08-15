import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class GroupProvider implements OnInit{

  constructor(public http: HttpClient) {
    
  }

  rootPoint = "http://7310d3df.ngrok.io/";

  getOwnedGroups(author_id)
  {
    return this.http.get(this.rootPoint + "group/owned/" + author_id);
  }

  getEnteredGroups(user_id)
  {
    return this.http.get(this.rootPoint + "group/entered/" + user_id);
  }

  ngOnInit(){}

}
