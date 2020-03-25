// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../shared/services/template.service';
import {AuthService} from '../services/auth.service'
import { NgxSpinnerService } from "ngx-spinner";
export type HeaderType = 'header-default' | 'header-primary' | 'header-info' | 'header-success' | 'header-danger' | 'header-dark';
export type SideNavType = 'sidenav-default' | 'side-nav-dark';
declare var $:any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './common-layout.component.html'
})

export class CommonLayoutComponent implements OnInit {
    mydate = Date();

    headerSelected: HeaderType = 'header-default';
    sidenavSelected : SideNavType = "sidenav-default"
    isCollapse : boolean;
    rtlActived: boolean = false;
    isOpen: boolean;
    
    themeConfigOpen: boolean = false;

    constructor(private tplSvc: TemplateService,
                public authservice: AuthService,
                private spinner: NgxSpinnerService) {
        
    }

    ngOnInit(){
          //    tooltip
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();   
      });
      
             /** spinner starts on init */
       this.spinner.show();
       setTimeout(() => {
         /** spinner ends after 5 seconds */
         this.spinner.hide();
       }, 1000);

  
       
        this.tplSvc.isSideNavCollapseChanges.subscribe(isCollapse => this.isCollapse = isCollapse);
        this.tplSvc.isSidePanelOpenChanges.subscribe(isOpen => this.isOpen = isOpen);
    }

    toggleSideNavCollapse() {
        this.isCollapse = !this.isCollapse;
        this.tplSvc.toggleSideNavCollapse(this.isCollapse);
    }
    toggleSidePanelOpen() {
        this.isOpen = !this.isOpen;
        this.tplSvc.toggleSidePanelOpen(this.isOpen);
    }
}
// |________________________________________________
// | © 2019 Selectical Pvt.Ltd All Rights Reserved |
// | @ Designed & Developed By Vikrant Rana        |
// |_______________________________________________| 

