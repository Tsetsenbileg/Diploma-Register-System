import { Injectable, StreamableFile } from '@nestjs/common';
import { join } from 'path';
import { DepartmentController } from './department/department.controller';
import { PrismaService } from './prisma.service';
import { createReadStream } from "fs";
import { create } from 'domain';

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) { }
  async diplomasShuffle() {
    let diplomas = await this.prisma.diploma.findMany({
      orderBy: {
        created_at: 'desc'
      },
      include: {
        teachers: {
          select: {
            Teacher: {
              select: {
                id: true,
                lastname: true,
                firstname: true,
                degree: true,
                department: {
                  select: {
                    University: true
                  }
                }
              }
            }
          }
        }
      },
      skip: 0,
      take: 10
    });

    // console.log(diplomas, "diplamas ")
    return {
      succecss: true, diplomas: diplomas
    }
  }

  async diploma(id: number) {

    await this.prisma.diploma.update({
      where: {
        id: id
      },
      data: {
        watched_count: {
          increment: 1
        }
      }
    })
    const diploma = await this.prisma.diploma.findUnique({
      where: {
        id: id
      },
      include: {
        teachers: {
          select: {
            Teacher: true
          }
        }
      }
    })

    if (diploma) {
      const department = await this.prisma.department.findUnique({
        where: {
          id: diploma.departmentId
        },
        include: {
          University: true
        }
      })

      return { diploma: diploma, department: department }
    }
    else {
      return { diploma: null, department: null }
    };

  }

  async search(value: any) {

    const diplomas = await this.prisma.diploma.findMany({
      include: {
        teachers: {
          select: {
            Teacher: {
              select: {
                id: true,
                lastname: true,
                firstname: true,
                degree: true,
                department: {
                  select: {
                    University: true
                  }
                }
              }
            }
          }
        }
      }
      ,
      where: {
        OR: [
          {
            title: {
              contains: value,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: value,
              mode: "insensitive"
            }
          },
          {
            teachers: {
              some: {
                Teacher: {
                  firstname: {
                    contains: value,
                  }
                }
              }
            }
          }
        ]
      }
    }).then(res => ({ sucess: true, diplomas: res })).catch(err => { console.log(err, "error at diploma search"); return { success: false, message: "error at diploma search" } });


    if (diplomas) {
      return diplomas;
    } else {
      return {
        success: true, diplomas: []
      }
    }
  }

  async sorted() {

    return await this.prisma.diploma.findMany({
      orderBy: {
        watched_count: "desc"
      },
      include: {
        teachers: {
          select: {
            Teacher: {
              select: {
                id: true,
                lastname: true,
                firstname: true,
                degree: true,
                department: {
                  select: {
                    University: true
                  }
                }
              }
            }
          }
        }
      },
      skip: 0,
      take: 10
    })
  }
  getHello(): string {
    return 'Hello World!';
  }
}
