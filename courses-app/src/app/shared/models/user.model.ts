export interface IUser {
  id: string;
  name: string;
  password: string;
  role: string
}

export class User implements IUser {
  private readonly _id: string;
  private _role: string;

  constructor(
    id?: string,
    name?: string,
    password?: string,
    role?: string,
  ) {
    this._id = id as string;
    this._name = name as string;
    this._password = password as string;
    this._role = role as string;
  }

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

  public get id(): string {
    return this._id;
  }

}
