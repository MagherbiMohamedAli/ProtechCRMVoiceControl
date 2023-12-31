import { Component } from '@angular/core';
import { LocalStorage } from '../services/local-storage';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import Swal from 'sweetalert2';

//import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  connecter!: Boolean;
  constructor(private localSt: LocalStorage, private userSer: UsersService, private route: Router) {
    if (localSt.isLoggedIn()) {
      this.connecter = true;
    } else {
      this.connecter = false;
    }
  }
  signOut() {
    this.localSt.Signout();
    this.connecter = false;
    this.route.navigate(["login"]);
  }
  title = 'azure-voice-recognition';
  recognizedText: string = '';
  x: string = '';
  startRecognition() {
    const speechConfig = sdk.SpeechConfig.fromSubscription('f8b231305ab9465fa950e75e6234f5fc', 'francecentral');
    speechConfig.speechRecognitionLanguage = 'fr-FR';
    const speechRecognizer = new sdk.SpeechRecognizer(speechConfig);
    let recognitionTimeout: any;

    speechRecognizer.recognizeOnceAsync(
      result => {
        this.recognizedText = result.text;
        const command = result.text;
        if (this.recognizedText == 'Accueil.') {
          this.route.navigate(['/home']);
          console.log(this.recognizedText);
        } else if (this.recognizedText == 'Message.') {
          this.route.navigate(['/chat']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Administrateur.') {
          this.route.navigate(['/admindashboard']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Formulaire.') {
          this.route.navigate(['/form']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Question.') {
          this.route.navigate(['/faq']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Connecter.') {
          this.route.navigate(['/login']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Inscrire.') {
          this.route.navigate(['/signup']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Utilisateur.') {
          this.route.navigate(['/userslist']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Modifier.') {
          this.route.navigate(['/editprofile']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Profil.') {
          this.route.navigate(['/profile']);
          console.log(this.recognizedText)
        } else if (this.recognizedText == 'Aide.') {
          this.route.navigate(['/aide']);
          console.log(this.recognizedText)
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Invalide!',
            text: this.x = this.recognizedText + " n'est pas une commande, vous pouvez dire 'AIDE' pour voir la liste des commandes",
          });
        }
      },
      error => {
        console.log(`ERROR: ${error}`);
      }
    );
    recognitionTimeout = setTimeout(() => {
      if (speechRecognizer) {
        speechRecognizer.stopContinuousRecognitionAsync(
          () => {
            console.log('Speech recognition stopped');
          },
          error => {
            console.log(`ERROR: ${error}`);
          }
        );
      }
    }, 2000);


  }

}


