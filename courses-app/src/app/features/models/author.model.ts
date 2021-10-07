export interface IAuthor {
  id: number;
  name: string;
}

export class Author implements IAuthor {
  private readonly _id: number;

  constructor(
    id?: number,
    name?: string,
  ) {
    this._id = id as number;
    this._name = name as string;
  }

  private _name: string;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get id(): number {
    return this._id;
  }
}
