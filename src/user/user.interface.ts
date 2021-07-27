export class UserDTO {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface UserInterface extends UserDTO {
  id: string;
}
