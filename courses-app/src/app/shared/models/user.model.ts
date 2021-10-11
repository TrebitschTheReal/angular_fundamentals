export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string
}

export class User implements IUser {
  private readonly _id: string;

  constructor(
    id?: string,
    email?: string,
    name?: string,
    password?: string,
    role?: string,
  ) {
    this._id = id as string;
    this._name = name as string;
    this._email = email as string;
    this._password = password as string;
    this._role = role as string;
  }

  private _role: string;

  public get role(): string {
    return this._role;
  }

  public set role(value: string) {
    this._role = value;
  }

  private _name: string;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  private _password: string;

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }

  private _email: string;
  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get id(): string {
    return this._id;
  }

}
