import { Component, OnInit } from '@angular/core';
import { categoryDB } from 'src/app/shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'src/app/shared/service/productos.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss'],
})
export class ProductStockComponent implements OnInit {
  public closeResult: string;
  public sub_categories = [];

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService
  ) {
    this.sub_categories = categoryDB.category;
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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
      },
      name: {
        title: 'Name',
      },
      precio: {
        title: 'Price',
      },
      status: {
        title: 'Status',
        type: 'html',
      },
      category: {
        title: 'Sub Category',
      },
    },
  };

  ngOnInit() {
    this.obtenerListadoProductos();
  }

  obtenerListadoProductos() {
    this.productosService.obtenerProductosPaginados().subscribe((resp) => {
      console.log(resp);
      this.sub_categories = resp.itemsList;
    });
  }
}
