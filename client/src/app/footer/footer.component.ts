import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faLinkedin, faGitlab, faBlogger } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  linkList = [];
  faLinkedin = faLinkedin;
  faGitlab = faGitlab;
  faBlogger = faBlogger;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.linkList = [
      {title : 'Linkedin', icone : faLinkedin, lien : ''},
      {title : 'Gitlab', icone : faGitlab, lien : ''},
      {title : 'VeilleCarto', icone : faBlogger, lien : ''},
    ]
  }

}
