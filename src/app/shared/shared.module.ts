import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToggleFullscreenDirective } from './directives/fullscreen.directive';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';

import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

import { SpinnersComponent } from './components/spinners/spinners.component';

@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    NgDropFilesDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    SpinnersComponent,
  ],
  imports: [CommonModule, RouterModule],
  providers: [NavService, WINDOW_PROVIDERS],
  exports: [
    FeatherIconsComponent,
    SpinnersComponent,
    ToggleFullscreenDirective,
    NgDropFilesDirective,
  ],
})
export class SharedModule {}
