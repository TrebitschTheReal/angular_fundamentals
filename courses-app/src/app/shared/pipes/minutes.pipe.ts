/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
    transform(n: number): string {
        let num = n;
        let hours = (num / 60);
        let rhours = Math.floor(hours);
        let minutes = (hours - rhours) * 60;
        let rminutes = Math.round(minutes);
        return (rhours < 10 ? '0' + rhours : rhours) + " : " + (rminutes < 10 ? '0' + rminutes : rminutes) + " hours";
    }
}