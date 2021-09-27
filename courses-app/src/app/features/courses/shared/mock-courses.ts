import {ICourseCardActionButton} from "./course-card-action-buttons-model";
import {Course} from "./course.model";

export const COURSES: Course[] = [
  new Course(42, 'Java', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['John Doe', 'Another John Doe'], 121, new Date()),
  new Course(3, 'Angular', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['Foo Moo', 'John John'], 90, new Date()),
  new Course(96, '.NET', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['Kovats Foo', 'Someone F'], 60, new Date()),
  new Course(27, 'React', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam harum velit praesentium, fugiat quidem nemo cumque explicabo culpa error consequatur, tempore veritatis laudantium expedita ad labore dignissimos dolorum perspiciatis nostrum accusamus repellat dolores ratione natus itaque? Dicta sapiente consequatur deserunt cumque quasi mollitia, esse totam temporibus facilis, quod numquam debitis praesentium. Harum quae cupiditate sapiente laboriosam, facilis temporibus quis ratione nulla rerum a corrupti natus accusantium neque assumenda eligendi aperiam?', ['Another John Doe'], 45, new Date()),
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
