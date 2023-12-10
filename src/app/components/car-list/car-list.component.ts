import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from "../../service/car.service";
import {Car} from "../../model/car";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {UserService} from "../../service/user-service.service";
import {formatDate} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {
  showCarForm: boolean = false;
  isEditMode: boolean = false;
  carForm!: FormGroup;
  cars: Car[] = [];
  openedDropdown: Car | null = null;
  imageURL: string | null = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthService, private userService: UserService, private carService: CarService, private formBuilder: FormBuilder) {
    this.initCarForm();
  }

  initCarForm() {
    this.carForm = this.formBuilder.group({
      carId: [null], // Assuming it's generated by the backend or not needed for new cars
      carName: ['', Validators.required],
      description: [''],
      carModelYear: ['', Validators.required],
      carBrand: ['', Validators.required],
      color: [''],
      capacity: ['', Validators.required],
      plateNumber: ['', Validators.required],
      rate: ['', Validators.required],
      carStatus: ['', Validators.required],
      createdDate: [{value: '', disabled: true}], // assuming these are set by the backend
      lastModified: [{value: '', disabled: true}],
      createdBy: [{value: '', disabled: true}], // assuming these are set by the backend
      lastModifiedBy: [{value: '', disabled: true}],
      imageURL: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCars();
  }

  toggleDropdown(car: Car) {
    this.openedDropdown = this.openedDropdown === car ? null : car;
  }

  handleSearch(searchTerm: string) {
    // Logic to filter your cars list based on the search term
    // For example, you might call a service method to fetch filtered results
  }

  openAddCarForm() {
    this.isEditMode = false;
    this.carForm.reset();
    this.showCarForm = true;
  }

  getCars(): void {
    this.carService.getAllCars()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cars => this.cars = cars);
  }

  openEditCarForm(car: Car) {
    this.isEditMode = true;
    this.showCarForm = true;
    this.toggleDropdown(car);
    this.carForm.patchValue(car);
    this.imageURL = car.imagePath;
  }

  deleteCar(carId: number) {
    // this.carService.deleteCar(carId).subscribe({
    //   next: (response) => {
    //     console.log('Car deleted successfully', response);
    //     this.getCars();
    //   },
    //   error: (error) => console.error('There was an error deleting the car', error)
    // });
  }

  handleFormSubmit(formData: any) {
    const carId = formData.get('carId');

    if (carId) {
      this.updateCar(Number(carId), formData);
    } else {
      this.addCar(formData);
    }
  }

  addCar(carData: FormData) {
    this.carService.addCar(carData).subscribe(
      response => {
        console.log('Car added successfully', response);
        this.closeCarForm(); // Close the form
        this.getCars(); // Refresh the car list
      },
      error => {
        console.error('There was an error adding the car', error);
      }
    );
  }

  updateCar(carId: number, carData: FormData) {

    if (!carId) {
      console.error('Car ID is required for an update');
      return;
    }

    this.carService.updateCar(carId, carData).subscribe(
      response => {
        console.log('Car updated successfully', response);
        this.closeCarForm(); // Close the form
        this.getCars(); // Refresh the car list
      },
      error => {
        console.error('There was an error updating the car', error);
      }
    );
  }

  formatLastModified(lastModified: string): string {
    return formatDate(lastModified, 'yyyy-MM-dd', 'en-US');
  }

  closeCarForm() {
    this.showCarForm = false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}