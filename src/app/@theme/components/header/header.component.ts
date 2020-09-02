import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { TokenStorageService } from '../../../auth/_services/token-storage.service';


@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  currentUser: any;

  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  //userMenu = [ { title: "Log out"  }, { title: "Log os" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router,
    private tokenStorageService:TokenStorageService,
    private token: TokenStorageService
  ) {}

  ngAfterViewInit(): void {
    this.triggerFalseClick()
  }

  ngOnInit() {

    
    this.currentUser = this.token.getUser();
   // console.log("datos usuarios",this.currentUser() )
    this.currentTheme = this.themeService.currentTheme;

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
      
  }

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    console.log("ocultando el sidebar")
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    this.router.navigateByUrl("/pages/home");
    return false;
  }

  toLogin() {
    this.router.navigateByUrl("/auth/login");
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
    //this.router.navigateByUrl("/auth/login");
  }

}
