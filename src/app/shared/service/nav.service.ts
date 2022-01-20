import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from './windows.service';
// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(@Inject(WINDOW) private window) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      path: '/dashboard/default',
      title: 'Dashboard',
      icon: 'home',
      type: 'link',
      badgeType: 'primary',
      active: false,
    },
    {
      title: 'Products',
      icon: 'box',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/products/physical/category',
          title: 'Category',
          type: 'link',
        },
        {
          path: '/products/physical/product-stock',
          title: 'Product Stock',
          type: 'link',
        },
        /*  {
          path: '/products/physical/sub-category',
          title: 'Sub Category',
          type: 'link',
        }, */
        {
          path: '/products/physical/product-list',
          title: 'Product List',
          type: 'link',
        },
        {
          path: '/products/physical/product-detail',
          title: 'Product Detail',
          type: 'link',
        },
        {
          path: '/products/physical/add-product',
          title: 'Add Product',
          type: 'link',
        },
      ],
    },
    {
      title: 'Users',
      icon: 'user-plus',
      type: 'sub',
      active: false,
      children: [
        { path: '/users/list-user', title: 'User List', type: 'link' },
        { path: '/users/create-user', title: 'Create User', type: 'link' },
      ],
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: 'bar-chart',
      type: 'link',
      active: false,
    },
    {
      title: 'Settings',
      icon: 'settings',
      type: 'sub',
      children: [{ path: '/settings/profile', title: 'Profile', type: 'link' }],
    },
    {
      title: 'Invoice',
      path: '/invoice',
      icon: 'archive',
      type: 'link',
      active: false,
    },

    /**referencias */
    {
      title: 'Sales',
      icon: 'dollar-sign',
      type: 'sub',
      active: false,
      children: [
        { path: '/sales/orders', title: 'Orders', type: 'link' },
        { path: '/sales/transactions', title: 'Transactions', type: 'link' },
      ],
    },
    {
      title: 'Media',
      path: '/media',
      icon: 'camera',
      type: 'link',
      active: false,
    },

    /*-------------------------------------*/
    {
      title: 'Login',
      path: '/auth/login',
      icon: 'log-in',
      type: 'link',
      active: false,
    },
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
