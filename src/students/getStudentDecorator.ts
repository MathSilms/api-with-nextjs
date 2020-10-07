
import { createParamDecorator } from '@nestjs/common';
import { Student } from './student.entity';

export const GetStudent = createParamDecorator(
  (data, req): Student => {
    const student = req.args[0].student;
    console.log(student)
    return student;
  },
);