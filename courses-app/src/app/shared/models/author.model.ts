export interface IAuthor {
  id: string;
  name: string;
}

export class Author implements IAuthor {
  readonly id: string;
  name: string;

  constructor(
    id?: string,
    name?: string,
  ) {
    this.id = id as string;
    this.name = name as string;
  }
}
