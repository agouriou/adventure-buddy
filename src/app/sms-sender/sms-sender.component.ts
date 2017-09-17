import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

declare var unescape;

@Component({
  selector: 'app-sms-sender',
  templateUrl: './sms-sender.component.html',
  styleUrls: ['./sms-sender.component.css']
})
export class SmsSenderComponent implements OnInit {

  currentTime: Date;
  sendIn: number;
  sendingTime: Date;
  phoneNumber: string;
  text: string;
  sendingEnabled: boolean;
  alreadySent: boolean;

  constructor(private http: Http) { }

  ngOnInit() {
    this.currentTime = new Date();
    this.sendingEnabled = false;
    this.alreadySent = false;

    // for test
    this.phoneNumber = '+33673208396';
    this.text = 'salut salut';

    const interval = 1000;
    setInterval(() => this.checkSending(), interval);
  }

  checkSending() {
    this.currentTime = new Date();
    if (this.sendingEnabled && this.currentTime >= this.sendingTime && !this.alreadySent) {
      console.log('sending message now');
      this.sendMessage();
      this.alreadySent = true;
    }
  }

  onSendInChange(sendIn: number) {
    this.sendingTime = new Date(this.currentTime.getTime() + sendIn * 1000);
    this.alreadySent = false;
  }

  sendMessage() {
    // const body = {
    //   To: this.phoneNumber,
    //   From: '+33757900527',
    //   Body: this.text
    // };
    const body = `To=${this.phoneNumber}&From=+33757900527&Body=${this.text}`;
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + this.base64Encode('AC36bf05d57197b7f2c6fbba635bcbc975:327f2f288d57281de59a6548f3254679'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const url = 'https://api.twilio.com/2010-04-01/Accounts/AC36bf05d57197b7f2c6fbba635bcbc975/Messages.json';
    this.http.post(url, body, { headers: headers })
      .subscribe(
      () => console.log('Success!!!'),
      err => console.error('Error!!!! ', err)
      );
  }

  base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

}
