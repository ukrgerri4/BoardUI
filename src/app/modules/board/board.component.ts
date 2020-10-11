import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  public isMenuOpen = false;

  // @ViewChild('header', { static: false })
  // private headerRef?: ElementRef<HTMLElement>;

  // private prevScrollpos = window.pageYOffset;
  // @HostListener('window:scroll', ['$event'])
  // onScroll(event: MouseEvent) {
  //   if (!this.headerRef) { return; }

  //   const currentScrollPos = window.pageYOffset;
  //   if (this.prevScrollpos > currentScrollPos) {
  //     this.headerRef.nativeElement.style.top = '0';
  //   } else {
  //     this.headerRef.nativeElement.style.top = '-50px';
  //   }
  //   this.prevScrollpos = currentScrollPos;
  // }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('/auth/sign-in', { state: { returnUrl: this.router.url } });
  }

}
