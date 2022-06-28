import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDepartmentDto } from './department.dto';
@Injectable()
export class DepartmentService {

    constructor(private prisma: PrismaService) { }

    async create(userId: string, username: string, university: number, department: CreateDepartmentDto) {

        let departmentCreated = await this.prisma.department.create({
            data: {
                name: department.name,
                description: department.description,
                University: {
                    connect: {
                        id: +university
                    }
                },
            }
        }).catch(err => { console.log(err); return undefined; });
        return departmentCreated;
    }

    async findAll(university: any) {

        let deps = [];
        if (university) {

            deps = await this.prisma.department.findMany({
                where: {
                    universityId: university
                }
            });

            // console.log(deps, "deps");
            return deps;
        }
        return deps;

    }
}
