import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import { NotificationPage } from '../pages/notification/notification';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfileProvider } from '../providers/profile/profile';

import { HttpClient,HttpClientModule } from '@angular/common/http';
import { GroupProvider } from '../providers/group/group';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: 'http://ceacf6f0.ngrok.io', options: {} };

import { FileSelectDirective } from 'ng2-file-upload';
import { MessageProvider } from '../providers/message/message';
import { Geolocation } from '@ionic-native/geolocation';

import { AgmCoreModule } from '@agm/core'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    UsersPage,
    TabsPage,
    FileSelectDirective 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxEFN6kIMOx-6lxm0ni63LMKzFIaeoyLM'
    }),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage,
    UsersPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClient,
    ProfileProvider,
    GroupProvider,
    MessageProvider,
    Geolocation
  ]
})
export class AppModule {}
