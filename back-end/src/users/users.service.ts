import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterAuthDto } from 'src/authentication/authentication.dto';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';
import { ChangePasswordDto } from './users.dto';
@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async changePassword(username: any, changePasswordDto: ChangePasswordDto) {

    let user = await this.findOne(username);
    if (user) {
      let isMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
      if (isMatch) {
        let hash = await bcrypt.hash(changePasswordDto.newPassword, 10);
        let result = this.prisma.admin.update({
          where: {
            email: username
          },
          data: {
            password: hash
          }
        }).catch(err => { console.log(err); return undefined; });

        if (result) {
          return { success: true, message: "Password changed successfully" };
        } else {
          return { sucess: false, message: "Something went wrong" }
        }
      } else {
        return { success: false, message: "Old password is incorrect" }
      }
    } else {
      return { sucess: false, message: "Invalid user" }
    }
  }

  async findOne(email: string) {
    return await this.prisma.admin.findUnique({
      where: {
        email: email
      }
    })
  }

  async findAll() {

    return await this.prisma.admin.findMany({
      where: {
        role: "admin"
      },
      select: {
        email: true,
        firstname: true,
        lastname: true,
        role: true,
        created_at: true,
        university: {
          select: {
            name: true,
          }
        }
      }
    })
  }

  async count() {

    let c = await this.prisma.admin.count({
      where: {
        role: 'admin'
      }
    })
    console.log(c, "admin count");
    return c;
  }
}
