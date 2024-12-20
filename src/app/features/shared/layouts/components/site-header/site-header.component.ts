import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, HostListener, Inject, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { topHeader } from '../../../constant/menu';
import { DOCUMENT, Location } from '@angular/common';
import { MenuConfigService } from '../../services/menu-config.service';
import { SidenavService } from '../../services/sidenav.service';
import { menuType } from "../../../constant/menu/menu.type";
import { StorageService } from 'src/app/features/http-services/storage.service';
import { SessionService } from 'src/app/features/http-services/session.service';
import { SharedService } from 'src/app/features/http-services/shared.service';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
})
export class SiteHeaderComponent implements OnInit {
  logoType: string = 'residential';
  logo: string = '';
  topHeader: any = topHeader;
  menuCheck: any;
  faAngleRight: any = faAngleRight;
  faAngleUp: any = faAngleUp;
  headerMenuData: any;
  activeUrlPath: any;
  mobileSearchCollapse: boolean = true;
  faAngleDown = faAngleDown;
  menuRight: Array<any> = [];
  @ViewChild("collapse") mobileTopNavbarCollapses!: any;
  hideNavigation = false;
  screenWidth: any;
  username: any;
  email: any;
  userType: any;
  school: any;
  constructor(private router: Router, private location: Location,
    private sideNav: SidenavService,
    private menuConfig: MenuConfigService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef,
    public storageService : StorageService,
    private sessionService : SessionService,
  private sharedService : SharedService) { }
    toggleMobileTopNav() {
      this.mobileTopNavbarCollapses.isTransitioning = true;
      this.mobileTopNavbarCollapses.isCollapsed =
        !this.mobileTopNavbarCollapses.isCollapsed;
    }
    @HostListener("window:resize", ["$event"])
    onWindowResize() {
      this.screenWidth = window.innerWidth;
    }
    toggleDropdown(id: string) {
      const el: any = this.document.getElementById(id);
      if (el && this.screenWidth <= 992) {
        el.classList.toggle("show");
        this.cd.detectChanges();
      }
    }
  ngOnInit(): void {
    this.storageService.getItem("userDetail").subscribe((res: any) => {
    // console.log(res,'userdetail');
     this.username = res.loginName
     this.email = res.email
     this.userType = res.roleName
  
     
    });
    if(this.userType !== 'SuperAdmin' ){

      this.sharedService.getselectedSchool().subscribe(school => {
       this.school = school
       console.log(this.school);
       
      });
    }
    let urlPath = this.location.path();
    this.activeUrlPath = urlPath.split('/');
    this.topHeader.filter((val: any) => {
      if (this.activeUrlPath[1] == val.type) {
        this.headerMenuData = val;
      }
    });
  }

  /**
   * active class add here
   * @param menuName 
   * @returns 
   */
  setActive(menuName: any) {
    let className = '';
    const path: any = this.router.url.split('?');

    if (path[0].includes(menuName)) {
      className = 'active';
    }
    return className;
  }

  /**
   * change top menu part 
   * @param menu 
   */
  changeType(menu: any) {
    this.activeUrlPath = menu;
    this.topHeader.filter((val: any) => {      
      if (this.activeUrlPath == val.type) {
        this.headerMenuData = val;
      }
    });
  }
  menuState!: boolean;
  showSideNav: string = menuType.sideNav;
  showTopNav: string = menuType.topNav;
  menuType!: string;
  menuList: Array<any> = [];
  ngAfterViewInit() {
    this.menuConfig.currentState.subscribe(
      (_menuType) => (this.menuType = _menuType)
    );
   this.sideNav.currentState.subscribe((open) => (this.menuState = open));
    this.cd.detectChanges();
  }
  hideMenu() {
    this.sideNav.hide();
  }
  @Output() exitEvent = new EventEmitter();
  navigateToUserSearch() {
    const scrollerElement = document.getElementsByClassName(
      "ng-sidebar__content"
    )[0];
    if (scrollerElement) {
      this.renderer.setStyle(scrollerElement, "padding", "unset");
    }
   
    const showPopup = this.document.querySelector(".show-pop-menu");
    showPopup?.classList.remove("show-pop-menu");
    const backdropElement: any = document.getElementsByClassName(
      "ng-sidebar__backdrop"
    );
    if (backdropElement && backdropElement.length > 0) {
      backdropElement[0].classList.remove("ng-sidebar__backdrop");
    }
    this.exitEvent.emit(true);
  }
  showMenu() {
    this.sideNav.show();
  }
  logout(){
    this.sessionService.logout();
    
  }
  getUserIcon(): string {
    switch (this.userType) {
      case 'SuperAdmin':
        return 'bi bi-shield-lock-fill';
      case 'Admin':
        return 'bi bi-gear-fill';
      case 'User':
        return 'bi bi-person-fill';
      default:
        return 'bi bi-question-circle'; // Default icon for unknown user types
    }
  }
}
