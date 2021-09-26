/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

export interface ICourse {
    title: string;
    description: string;
    authors: string[];
    duration: number;
    creationDate: Date;
}

export class Course implements ICourse {
    private _title: string;
    private _description: string;
    private _authors: string[];
    private _duration: number;
    private _creationDate: Date;

    constructor(
        title: string,
        description: string,
        authors: string[],
        duration: number,
        creationDate: Date
    ) {
        this._title = title;
        this._description = description;
        this._authors = authors;
        this._duration = duration;
        this._creationDate = creationDate;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get authors(): string[] {
        return this._authors;
    }
    public set authors(value: string[]) {
        this._authors = value;
    }

    public get duration(): number {
        return this._duration;
    }
    public set duration(value: number) {
        this._duration = value;
    }

    public get creationDate(): Date {
        return this._creationDate;
    }
    public set creationDate(value: Date) {
        this._creationDate = value;
    }
}