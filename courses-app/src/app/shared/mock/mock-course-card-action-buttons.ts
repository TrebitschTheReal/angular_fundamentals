import {ICourseCardActionButton} from "../models/course-card-action-buttons-model";

export const COURSE_LIST_ACTION_BUTTONS: ICourseCardActionButton[] = [
  {
    type: 'view',
    admin: false,
    buttonText: 'Show course',
    buttonIcon: ''
  },
  {
    type: 'edit',
    admin: true,
    buttonText: '',
    buttonIcon: 'fa fa-pencil',
  },
  {
    type: 'delete',
    admin: true,
    buttonText: '',
    buttonIcon: 'fa fa-trash',
  },
];
