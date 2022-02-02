import { Component, OnInit } from '@angular/core';
import { categoryDB } from 'src/app/shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/shared/service/productos.service';
import { ItemsList } from 'src/app/shared/interfaces/producto.interface';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Stogare } from 'src/app/shared/interfaces/storage.interface';

import { FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from 'src/app/shared/service/proveedores.service';
import { Proveedor } from 'src/app/shared/interfaces/proveedores.interface';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss'],
  //providers: [DatePipe],
})
export class ProductStockComponent implements OnInit {
  public closeResult: string;
  public sub_categories: ItemsList[] = [];
  storages: Stogare[] = [];
  proveedores: Proveedor[] = [];
  //myDate = new Date().toLocaleDateString('en-CA');
  filter_storage: Stogare[] = [];

  public productForm = this.formBuilder.group({
    proveedor: ['0', [Validators.required]],
    storage: ['0', [Validators.required]],
    /*  product: this.formBuilder.group({
      _id: [''],
      cant: [''],
    }), */
    arrival_day: ['', [Validators.required]],
    paking_list: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private productosService: ProductosService,
    private storageService: StorageService,
    private proveedoresService: ProveedoresService //private datePipe: DatePipe
  ) {
    this.filter_storage.unshift({
      _id: '0',
      name: 'Select Storage',
      identificador: '0',
    });
  }

  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        keyboard: false,
        size: 'xl',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public settings = {
    actions: {
      position: 'right',
    },
    columns: {
      img: {
        title: 'Image',
        type: 'html',
        filter: false,
        editable: false,
        valuePrepareFunction: (img) => {
          return `<img src="${img}" width="80px"/>`;
        },
      },
      name: {
        title: 'Name',
      },
      precio: {
        title: 'Price',
      },
      cantidad: {
        title: 'Stock',
        type: 'html',
        valuePrepareFunction: (cantidad) => {
          return `<span>${cantidad}</span>`;
        },
      },
      stock_min: {
        title: 'Stock min',
        type: 'html',
        valuePrepareFunction: (stock_min) => {
          return `<span class='badge badge-info'>${stock_min}</span>`;
        },
      },
      categoria: {
        title: 'Category',
        valuePrepareFunction: (arg) => {
          return arg.name;
        },
      },
      almacen: {
        title: 'WareHosue',
        valuePrepareFunction: (almacen) => {
          return almacen.name;
        },
      },
      proveedor: {
        title: 'Proveedor',
        valuePrepareFunction: (proveedor) => {
          return proveedor.name;
        },
      },
    },
  };

  ngOnInit() {
    this.getListStorage();
    this.getListProveedores();
    this.obtenerListadoProductos();
  }

  getListStorage() {
    this.storageService.obtenerStorage().subscribe((resp) => {
      this.storages = resp.result.itemsList;
      this.storages.unshift({
        _id: '0',
        name: 'Select Storage',
        identificador: '0',
      });
      //console.log(this.storages);
    });
  }
  getListProveedores() {
    this.proveedoresService.obtenerProveedores().subscribe((resp) => {
      this.proveedores = resp.result.itemsList;
      this.proveedores.unshift({
        _id: '0',
        name: 'Select Proveedores',
      });
      //console.log(this.proveedores);
    });
  }

  obtenerListadoProductos() {
    this.productosService.obtenerProductosPaginados().subscribe((resp) => {
      //console.log(resp);
      this.sub_categories = resp.result.itemsList;
    });
  }
}
