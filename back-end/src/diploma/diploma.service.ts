import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDiplomaDto } from './diploma.dto';
@Injectable()
export class DiplomaService {
    constructor(private prisma: PrismaService) { }

    async create(createDiploma: CreateDiplomaDto, req: any) {

        // console.log(createDiploma, "createDiploma");
        let diploma = await this.prisma.diploma.create({
            data: {
                title: createDiploma.title,
                written_year: createDiploma.year.toString(),
                file_url: createDiploma.file,
                description: createDiploma.description,
                departmentId: createDiploma.departmentId,
                writer_firstname: createDiploma.firstname,
                writer_lastname: createDiploma.lastname,
                writer_stud_id: createDiploma.studentId,
                teachers: {
                    create: createDiploma.teachers.map(teacherId => {

                        return {
                            Teacher: {
                                connect: {
                                    id: +teacherId
                                }
                            }
                        }
                    })
                }

            }
        }).then(res => { return { success: true, diploma: res } }).catch(err => { console.log(err, "error at diploma register"); return { success: false, err: err } });

        return diploma
    }

    async count(req: any) {

        if (req.user.university) {
            return await this.prisma.diploma.count({
                where: {
                    teachers: {
                        some: {
                            Teacher: {
                                department: {
                                    universityId: req.user.university
                                }
                            }
                        }
                    }
                }
            })
        }
        return 0;


    }
    async findAll(req: any) {

        if (req.user.university) {
            let diplomas = await this.prisma.diploma.findMany({
                where: {
                    teachers: {
                        some: {
                            Teacher: {
                                department: {
                                    universityId: req.user.university
                                }
                            }
                        }
                    }
                }
            }).catch(err => { console.log(err, "error at diploma findAll"); return { success: false, message: "error at diploma findAll" } }).then(diplomas => { return { success: true, diplomas: diplomas } });

            return diplomas;
        }
        return { success: true, message: "university bish baina", diplomas: [] }
    }

    async delete(id: number) {



    }
}
