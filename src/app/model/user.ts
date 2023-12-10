import {Car} from "./car";

export class User {
  private id: number;
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;

  constructor(id: number, firstname: string, lastname: string, email: string, password: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  // Getters and setters for each property
  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getFirstname(): string {
    return this.firstname;
  }

  setFirstname(value: string): void {
    this.firstname = value;
  }

  getLastname(): string {
    return this.lastname;
  }

  setLastname(value: string): void {
    this.lastname = value;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(value: string): void {
    this.email = value;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(value: string): void {
    this.password = value;
  }
}

export interface UserResponse {
  _embedded: {
    user: User;
  };
  _links: {
    self: {
      href: string;
    };
  };
}
