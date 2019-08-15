import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { MessageProvider } from '../../providers/message/message';
// import { map } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
  queries: {
    content: new ViewChild(Content)
  }
})
export class ChatRoomPage {
  @ViewChild(Content) content: Content;

  messages = [];
  nickname = '';
  socketID = '';
  message = '';

  scrollToBottom() {
    var element = document.getElementById("destination");
    // I can't remember why I added a short timeout, 
    // but you might be able to use ngzone instead.
    // the below works great though. 
    setTimeout(() => { element.scrollIntoView(true) }, 100);
  }

  ISODateToShowDate(dateInput: string) {
    let date = dateInput.substring(0, 10);
    let dateTemp = date.split('-');
    date = dateTemp[2] + '/' + dateTemp[1] + '/' + dateTemp[0];
    let hour = dateInput.substring(11, 19);
    return hour + " " + date;
  }



  constructor(private messagesService: MessageProvider, private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.nickname = this.navParams.get('nickname');
    this.socketID = this.navParams.get('socketID');

    console.log(this.nickname + " " + this.socketID)
    this.messagesService.getMessages(this.socketID)
      .subscribe((data) => {
        this.messages = (<any>data).messages;
        this.scrollToBottom();
      })

    this.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
      this.scrollToBottom();
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message, socketID: this.socketID });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}