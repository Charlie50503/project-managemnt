import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataExportImportDialogComponent } from '../../shared/components/data-export-import-dialog/data-export-import-dialog.component';

interface pageInterface {
  pageName: string;
  isShow?: boolean;
  route: string;
  type: 'link' | 'menu';
  children?: pageInterface[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
  ]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('drawer') sidenav!: MatSidenav;
  public userInfo = this.userService.getUserInfo();
  public isDisplayRoleSettingButton = false;
  public isProduction = environment.production;
  public environmentName = environment.name;
  public modulePageList: pageInterface[] = [
    {
      pageName: '案件進度管理',
      isShow: true,
      route: '/home/project-management',
      type: 'link',
      children: [],
    },
    {
      pageName: '資料管理',
      isShow: true,
      route: '/home/data-management',
      type: 'link',
      children: [],
    },

  ];

  constructor(
    public userService: UserService,
    private tokenService: TokenService,
    public router: Router,
    private observer: BreakpointObserver,
    private dialog: MatDialog,
  ) { }

  public onLogout() {
    this.tokenService.removeAllAccessToken();
    this.router.navigate(['login'], {
      queryParams: { isDisabledAutoLogin: 'true' },
    });
  }

  public openExportImportDialog(): void {
    this.dialog.open(DataExportImportDialogComponent, {
      width: '600px',
      disableClose: false
    });
  }

  public ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 768px)']).subscribe((res) => {
      setTimeout(() => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }, 0);
    });
  }
}
