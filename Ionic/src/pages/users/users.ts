import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GroupProvider } from '../../providers/group/group';

import { Socket } from 'ng-socket-io';
import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage implements OnInit {

  openOwnedGroups: boolean;
  openEnteredGroups: boolean;

  ownedGroups: any;
  enteredGroups: any;

  profile: any;

  nickname = '';
  uID = '';

  lastname = 'Prunariu';

  constructor(public navCtrl: NavController,
    private platform:Platform,
    public navParams: NavParams,
    private groupService: GroupProvider,
    private socket: Socket,
    private profileService: ProfileProvider) {
  }

  ngOnInit() {
    console.log(this.lastname)
    this.profileService.getProfile(this.lastname).subscribe(
      (data) => {
        this.profile = data;
        this.uID = (<DataProfile>data)._id;
        this.nickname = (<DataProfile>data).firstname + " " + (<DataProfile>data).lastname;
        console.log(this.uID);

        // window['plugins'].OneSignal.logoutEmail(function (successResponse) {
        //   //Successfully logged out of email
        // }, function (error) {
        //   //Failed to log out of email
        // });
        // window['plugins'].OneSignal.setEmail((<DataProfile>data).email);
        if(this.platform._platforms['android'])
          window['plugins'].OneSignal.setEmail((<DataProfile>data).email);

        this.groupService.getOwnedGroups(this.uID) // get all group by author_id -- logged user
          .subscribe(
            (data) => {
              this.ownedGroups = data;
              for (let owdGroup of this.ownedGroups)
                owdGroup.open = false;
            }
          )
        this.groupService.getEnteredGroups(this.uID) //lget all entered groups by logged user id
          .subscribe(
            (data) => {
              this.enteredGroups = data;
              for (let entGroup of this.enteredGroups)
                entGroup.open = false;
            }
          )
      }
    );
  }

  setUID() {
    this.profileService.getProfile(this.lastname).subscribe(
      (data) => {
        this.profile = data;
        this.uID = (<DataProfile>data)._id;
        this.nickname = (<DataProfile>data).firstname + " " + (<DataProfile>data).lastname;
        console.log(this.uID);

        window['plugins'].OneSignal.logoutEmail(function (successResponse) {
          console.log("Email has been changed!" + (<DataProfile>data).email);
          window['plugins'].OneSignal.setEmail((<DataProfile>data).email);
        }, function (error) {
          console.log("eroare de desconecare");
        });
        // window['plugins'].OneSignal.setEmail((<DataProfile>data).email);
        
        

        this.groupService.getOwnedGroups(this.uID) // get all group by author_id -- logged user
          .subscribe(
            (data) => {
              this.ownedGroups = data;
              for (let owdGroup of this.ownedGroups)
                owdGroup.open = false;
            }
          )
        this.groupService.getEnteredGroups(this.uID) //lget all entered groups by logged user id
          .subscribe(
            (data) => {
              this.enteredGroups = data;
              for (let entGroup of this.enteredGroups)
                entGroup.open = false;
            }
          )
      }
    );
  }

  ////////////////////////////////////////////

  joinChat(userSelected, channelID) {
    console.log(channelID)
    this.socket.connect();
    //this.socket.emit('set-nickname', this.nickname);
    this.socket.emit('join', { user: this.nickname, socketID: channelID, userSelected: userSelected });
    this.navCtrl.push('ChatRoomPage', { nickname: this.nickname, socketID: channelID });
  }

  goToNotificationPage()
  {
    this.navCtrl.push('NotificationPage');
  }

  clickOpenCloseOwnedGroups() {
    this.openOwnedGroups = !this.openOwnedGroups;
  }
  clickOpenCloseEnteredGroups() {
    this.openEnteredGroups = !this.openEnteredGroups;
  }
  clickOpenCloseGroupContent(selecterGroup) {
    selecterGroup.open = !selecterGroup.open;
  }
}

class DataProfile {
  _id: string;
  lastname: string;
  firstname: string;
  email: string;
  avatar: string;
  borndate: string;
}