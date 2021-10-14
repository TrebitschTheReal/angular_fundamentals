import {Author} from "./author.model";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  authors: Author[];
  duration: number;
  creationDate: Date;
}

export class Course implements ICourse {
  public id: string;
  public title: string;
  public description: string;
  public authors: Author[];
  public duration: number;
  public creationDate: Date;

  constructor(
    id?: string,
    title?: string,
    description?: string,
    authors?: Author[],
    duration?: number,
    creationDate?: Date
  ) {
    this.id = id as string;
    this.title = title as string;
    this.description = description as string;
    this.authors = authors as Author[];
    this.duration = duration as number;
    this.creationDate = creationDate as Date;
  }

}
