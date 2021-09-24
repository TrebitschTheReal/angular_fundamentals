/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

export interface ICourse {
    name: string;
    description: string;
    editable: boolean;
    author: string[];
    duration: string;
    created: string;
}

export class Course implements ICourse {
    private _name: string;
    private _description: string;
    private _editable: boolean;
    private _author: string[];
    private _duration: string;
    private _created: string;

    constructor(
        name: string,
        description: string,
        editable: boolean,
        author: string[],
        duration: string,
        created: string
    ) {
        this._name = name;
        this._description = description;
        this._editable = editable;
        this._author = author;
        this._duration = duration;
        this._created = created;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get editable(): boolean {
        return this._editable;
    }
    public set editable(value: boolean) {
        this._editable = value;
    }

    public get author(): string[] {
        return this._author;
    }
    public set author(value: string[]) {
        this._author = value;
    }

    public get duration(): string {
        return this._duration;
    }
    public set duration(value: string) {
        this._duration = value;
    }

    public get created(): string {
        return this._created;
    }
    public set created(value: string) {
        this._created = value;
    }
}