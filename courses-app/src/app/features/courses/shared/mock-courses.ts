/*
 * Copyright © 2021 EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 */

import { ICourseCardActionButton } from "./course-card-action-buttons-model";
import { Course } from "./course.model";

export const COURSES: Course[] = [
    new Course('Java', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['John Doe', 'Another John Doe'], 121, new Date()),
    new Course('Angular', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['Foo Moo', 'John John'], 90, new Date()),
    new Course('.NET', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['Kovats Foo', 'Someone F'], 60, new Date()),
    new Course('React', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['Another John Doe'], 45, new Date()),
];

export const COURSE_LIST_ACTION_BUTTONS: ICourseCardActionButton[] = [
    {
        type: 'edit',
        buttonText: '',
        buttonIcon: 'fa fa-pencil',
    },
    {
        type: 'delete',
        buttonText: '',
        buttonIcon: 'fa fa-trash',
    },
]