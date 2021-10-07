export interface IAuthor {
  id: string;
  name: string;
}

export class Author implements IAuthor {
  private readonly _id: string;

  constructor(
    id?: string,
    name?: string,
  ) {
    this._id = id as string;
    this._name = name as string;
  }

  private _name: string;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get id(): string {
    return this._id;
  }
}
