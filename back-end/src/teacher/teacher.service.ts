import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma.service"
import { CreateTeacherDto } from './teacher.dto';
@Injectable()
export class TeacherService {

    constructor(private prisma: PrismaService) { }

    async create(createTeacherDto: CreateTeacherDto, req: any) {

        // console.log(createTeacherDto, "createDto");

        try {
            let teacher = this.prisma.teacher.create({
                data: {
                    firstname: createTeacherDto.firstname,
                    lastname: createTeacherDto.lastname,
                    degree: createTeacherDto.degree,
                    photo_url: createTeacherDto.photo_url,
                    phonenumber: +createTeacherDto.phonenumber,
                    email: createTeacherDto.email,
                    department: {
                        connect: {
                            id: createTeacherDto.departmentId
                        }
                    }
                }
            })

            return teacher;

        } catch (err: any) {
            console.log(err, "teacher create error");

        }

    }

    async findAll(req: any) {

        if (req.user.university) {
            let teachers = this.prisma.teacher.findMany({
                where: {
                    department: {
                        universityId: req.user.university
                    }
                }
            }).catch(err => { console.log(err, "error at teacher findAll"); return { success: false, message: "error at teacher findAll" } }).then(teachers => { return { success: true, teachers: teachers } });

            return teachers;
        }
        return { teachers: [] }
    }
}
