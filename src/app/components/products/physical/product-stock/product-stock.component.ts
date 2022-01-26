import { Component, OnInit } from '@angular/core';
import { categoryDB } from 'src/app/shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/shared/service/productos.service';
import { ItemsList } from 'src/app/shared/interfaces/producto.interface';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss'],
})
export class ProductStockComponent implements OnInit {
  public closeResult: string;
  public sub_categories: ItemsList[] = [];

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService
  ) {
    //this.sub_categories = categoryDB.category;
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
    this.obtenerListadoProductos();
  }

  obtenerListadoProductos() {
    this.productosService.obtenerProductosPaginados().subscribe((resp) => {
      console.log(resp);
      this.sub_categories = resp.result.itemsList;
    });
  }
}
