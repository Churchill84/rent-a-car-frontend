import {CarStatus} from "./car-status";

export class Car {

  private _carId: number;
  private _carName: string;
  private _description: string;
  private _carModelYear: number;
  private _carBrand: string;
  private _color: string;
  private _capacity: number;
  private _plateNumber: string;
  private _rate: number;
  private _carStatus: CarStatus;
  private _createdDate: string;
  private _lastModified: string;
  private _createdBy: number;
  private _lastModifiedBy: number;
  private _imagePath: string;

  constructor(
    carId: number,
    carName: string,
    description: string,
    carModelYear: number,
    carBrand: string,
    color: string,
    capacity: number,
    plateNumber: string,
    rate: number,
    carStatus: CarStatus,
    createdDate: any,
    lastModified: any,
    createdBy: number,
    lastModifiedBy: number,
    imagePath: string
  ) {
    this._carId = carId;
    this._carName = carName;
    this._description = description;
    this._carModelYear = carModelYear;
    this._carBrand = carBrand;
    this._color = color;
    this._capacity = capacity;
    this._plateNumber = plateNumber;
    this._rate = rate;
    this._carStatus = carStatus;
    this._createdDate = createdDate;
    this._lastModified = lastModified;
    this._createdBy = createdBy;
    this._lastModifiedBy = lastModifiedBy;
    this._imagePath = imagePath;
  }


  get carId(): number {
    return this._carId;
  }

  set carId(value: number) {
    this._carId = value;
  }

  get carName(): string {
    return this._carName;
  }

  set carName(value: string) {
    this._carName = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get carModelYear(): number {
    return this._carModelYear;
  }

  set carModelYear(value: number) {
    this._carModelYear = value;
  }

  get carBrand(): string {
    return this._carBrand;
  }

  set carBrand(value: string) {
    this._carBrand = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get capacity(): number {
    return this._capacity;
  }

  set capacity(value: number) {
    this._capacity = value;
  }

  get plateNumber(): string {
    return this._plateNumber;
  }

  set plateNumber(value: string) {
    this._plateNumber = value;
  }

  get rate(): number {
    return this._rate;
  }

  set rate(value: number) {
    this._rate = value;
  }

  get carStatus(): CarStatus {
    return this._carStatus;
  }

  set carStatus(value: CarStatus) {
    this._carStatus = value;
  }

  get createdDate(): any {
    return this._createdDate;
  }

  set createdDate(value: any) {
    this._createdDate = value;
  }

  get lastModified(): any {
    return this._lastModified;
  }

  set lastModified(value: any) {
    this._lastModified = value;
  }

  get createdBy(): number {
    return this._createdBy;
  }

  set createdBy(value: number) {
    this._createdBy = value;
  }

  get lastModifiedBy(): number {
    return this._lastModifiedBy;
  }

  set lastModifiedBy(value: number) {
    this._lastModifiedBy = value;
  }


  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }
}

export interface CarResponse {
  _embedded: {
    carList: Car[];
  };
  _links: {
    self: {
      href: string;
    };
  };
}
