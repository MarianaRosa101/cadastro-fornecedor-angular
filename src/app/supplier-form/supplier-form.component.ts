import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../supplier.service';
import { Supplier } from '../supplier-model';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  suppliers: Supplier[] = [];
  editing = false;
  editingSupplierId: number | null = null;

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService) {}

  ngOnInit() {
    this.supplierForm = this.formBuilder.group({
      name: ['', Validators.required],
      active: [false],
      category: ['', Validators.required],
      contact: ['', Validators.required]
    });

    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }

  onSubmit() {
    if (this.supplierForm.invalid) {
      return;
    }

    const supplier: Supplier = {
      id: this.editingSupplierId || 0,
      name: this.supplierForm.value.name,
      active: this.supplierForm.value.active,
      category: this.supplierForm.value.category,
      contact: this.supplierForm.value.contact
    };

    if (this.editing) {
      this.supplierService.updateSupplier(supplier).subscribe(() => {
        this.loadSuppliers();
        this.cancelEdit();
      });
    } else {
      this.supplierService.addSupplier(supplier).subscribe(() => {
        this.loadSuppliers();
        this.supplierForm.reset();
      });
    }
  }

  editSupplier(supplier: Supplier) {
    this.editing = true;
    this.editingSupplierId = supplier.id;
    this.supplierForm.setValue({
      name: supplier.name,
      active: supplier.active,
      category: supplier.category,
      contact: supplier.contact
    });
  }

  deleteSupplier(id: number) {
    this.supplierService.deleteSupplier(id).subscribe(() => {
      this.loadSuppliers();
    });
  }

  cancelEdit() {
    this.editing = false;
    this.editingSupplierId = null;
    this.supplierForm.reset();
  }
}

