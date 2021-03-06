import { Component, OnInit } from '@angular/core';
import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { FileUploadService } from 'src/app/shared/service/file-upload.service';
import { first } from 'rxjs/operators';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public closeResult: string;
  public categories = [];
  public totalCategorias: number = 0;
  public categoriaExiste: boolean = false;

  photoSelected: string | ArrayBuffer;
  file: File;
  files: File[] = [];
  saving = false;
  isTrusted = false;

  estaSobreElemento = false;

  public categoriaForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: ['', [Validators.required, Validators.minLength(5)]],
    //state: true,
  });

  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService
  ) {
    this.photoSelected = '';
    this.categories = categoryDB.category;
  }

  get name() {
    return this.categoriaForm.get('name');
  }
  get descripcion() {
    return this.categoriaForm.get('descripcion');
  }
  get imagen() {
    if (this.photoSelected == '' || !this.isTrusted) {
      return this.categoriaForm.invalid;
    }
    return this.categoriaForm.valid;
  }

  open(content) {
    this.saving = false;
    this.categoriaForm.reset();
    this.photoSelected = '';
    this.categoriaExiste = false;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-dialog-centered',
        backdrop: 'static',
        keyboard: false,
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
    console.log('Is de reason ', reason);
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
      add: false,
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    },

    columns: {
      img: {
        title: 'Image',
        type: 'html',
        filter: false,
        editable: false,
        valuePrepareFunction: (poster) => {
          return `<img src="${poster}" width="100px"/>`;
        },
      },
      name: {
        title: 'Name',
        //editable: false, /* Permite poder editar este campo o no */
      },
      descripcion: {
        title: 'Descripcion',
      },
    },
  };

  obtenerCategorias() {
    this.categoriaService.obtenerCategoriasPaginadas().subscribe((resp) => {
      const { itemsList, total } = resp.result;
      this.totalCategorias = total;
      this.categories = itemsList;
    });
  }

  ngOnInit() {
    this.obtenerCategorias();
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      //call to remote api, remember that you have to await this
      //console.log(event.data._id);
      this.categoriaService
        .eliminarCategoria(event.data._id)
        .subscribe((resp) => {
          //console.log(resp);
          this.toastr.error('', resp.msg);
        });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      //call to remote api, remember that you have to await this
      //console.log(event);
      this.categoriaService
        .editarCategoria(event.data._id, event.newData)
        .subscribe((resp) => {
          //console.log(resp);
          this.toastr.success('', resp.msg);
        });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  crearCategoria() {
    this.saving = false;
    if (this.categoriaForm.valid) {
      this.categoriaService
        .createCategoria(this.categoriaForm.value)
        .pipe(first())
        .subscribe({
          next: (resp) => {
            if (resp.ok) {
              //Mostrar el cargando
              this.saving = true;
              this.categoriaExiste = false;
              const { _id } = resp.newCategoria;
              this.subirImagen(_id);
            }
          },
          error: (error) => {
            this.categoriaExiste = true;
          },
        });
    } else {
      this.categoriaForm.markAllAsTouched();
    }
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    console.log(event.isTrusted);
    this.isTrusted = event.isTrusted;

    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      //console.log(this.file);
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result);
      reader.readAsDataURL(this.file);
    }
  }

  subirImagen(id) {
    this.fileUploadService.uploadPhoto(id, 'categorias', this.file).subscribe(
      (res) => {
        res.modelo.img;
        this.obtenerCategorias();
        this.toastr.success('', 'Category Created');
        this.modalService.dismissAll('2');
        this.photoSelected = '';
        this.saving = false;
      },
      (err) => console.log(err)
    );
  }
}
