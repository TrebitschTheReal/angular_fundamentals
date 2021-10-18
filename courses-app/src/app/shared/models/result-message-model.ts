export interface IResultMessage {
  successful: boolean;
  messages: string[];
}

export class ResultMessage implements IResultMessage {
  constructor(
    successful?: boolean,
    messages?: string[],
  ) {
    this._successful = successful as boolean;
    this._messages = messages as string[];
  }

  private _successful: boolean;

  public get successful(): boolean {
    return this._successful;
  }

  public set successful(value: boolean) {
    this._successful = value;
  }

  private _messages: string[];

  public get messages(): string[] {
    return this._messages;
  }

  public set messages(value: string[]) {
    this._messages = value;
  }

}
