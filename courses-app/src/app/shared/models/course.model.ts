export interface ICourse {
  id: string;
  title: string;
  description: string;
  authors: string[];
  duration: number;
  creationDate: Date;
}

export class Course implements ICourse {
  private readonly _id: string;

  constructor(
    id?: string,
    title?: string,
    description?: string,
    authors?: string[],
    duration?: number,
    creationDate?: Date
  ) {
    this._id = id as string;
    this._title = title as string;
    this._description = description as string;
    this._authors = authors as string[];
    this._duration = duration as number;
    this._creationDate = creationDate as Date;
  }

  private _title: string;

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  private _description: string;

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  private _authors: string[];

  public get authors(): string[] {
    return this._authors;
  }

  public set authors(value: string[]) {
    this._authors = value;
  }

  private _duration: number;

  public get duration(): number {
    return this._duration;
  }

  public set duration(value: number) {
    this._duration = value;
  }

  private _creationDate: Date;

  public get creationDate(): Date {
    return this._creationDate;
  }

  public set creationDate(value: Date) {
    this._creationDate = value;
  }

  public get id(): string {
    return this._id;
  }
}
