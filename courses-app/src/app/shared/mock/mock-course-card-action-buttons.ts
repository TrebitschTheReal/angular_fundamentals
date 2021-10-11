import {ICourseCardActionButton} from "../models/course-card-action-buttons-model";

export const COURSE_LIST_ACTION_BUTTONS: ICourseCardActionButton[] = [
  {
    type: 'view',
    buttonText: 'Show course',
    buttonIcon: ''
  },
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
];
