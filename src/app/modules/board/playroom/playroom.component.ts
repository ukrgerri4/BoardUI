import { Component, OnInit, ChangeDetectionStrategy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playroom',
  templateUrl: './playroom.component.html',
  styleUrls: ['./playroom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayroomComponent implements OnInit {

  public isMenuOpen = false;

  @ViewChild('header', { static: false })
  private headerRef?: ElementRef<HTMLElement>; 

  private prevScrollpos = window.pageYOffset;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: MouseEvent) {
    if (!this.headerRef) { return; }
    
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      this.headerRef.nativeElement.style.top = "0";
    } else {
      this.headerRef.nativeElement.style.top = "-50px";
    }
    this.prevScrollpos = currentScrollPos;
  }

  constructor(private router: Router) { }

  ngOnInit(): void { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.router.navigateByUrl('/auth/sign-in', { state: { returnUrl: '/playroom' } });
  }
}
