import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IsEmail } from 'class-validator';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './authentication.dto';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';
import { RegisterAuthDto, SuperRegisterDto } from './authentication.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AuthenticationService {

  constructor(private prisma: PrismaService, private usersService: UsersService, private jwtTokenService: JwtService, private mailService: MailerService) { }

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.email);
    if (user) {
      let isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, userId: user.id, university: user.universityId };

    return {
      role: user.role,
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async create(registerAuthDto: RegisterAuthDto) {

    let password = generate({ length: 10, numbers: true });
    let hash = await bcrypt.hash(password, 10);
    // let testPass = "hello tsetsenbileg";
    // console.log("ajiljiin shuu");
    let university = await this.prisma.university.create({
      data: {
        name: registerAuthDto.university_name,
        address: registerAuthDto.address,
        phonenumber: +registerAuthDto.university_number,
        description: registerAuthDto.description || "",
        icon_url: registerAuthDto.icon_url || "",
      }
    }).catch(err => { console.log(err); return undefined; });

    if (university) {

      let admin = await this.prisma.admin.create({
        data: {
          firstname: registerAuthDto.firstname,
          lastname: registerAuthDto.lastname,
          email: registerAuthDto.email,
          phonenumber: +registerAuthDto.phonenumber,
          role: registerAuthDto.role,
          university: { connect: { id: university.id } },
          password: hash
        }
      }).catch(err => { console.log(err); return undefined; });

      if (admin) {

        let s = await this.mailService.sendMail({
          to: registerAuthDto.email,
          from: "tsetsenbileg0413@gmail.com",
          subject: "Diploma Project",
          text: " Аюулгүй байдлын үүднээс энэхүү нууц үгийг солино уу. \n Таны нууц үг:" + password,
        })
        if (s) {
          return {
            success: true, message: "Таны нууц үгийг таны имэйл хаягруу илгээсэн тул хаягаа шалгана уу."
          };
        } else {
          return {
            success: false
          }
        }
      } else {
        return { success: false }
      }
    }
  }

  async signUp(superRegisterDto: SuperRegisterDto) {

    let hash = await (bcrypt.hash(superRegisterDto.password, 10));
    this.prisma.admin.create({
      data: {
        email: superRegisterDto.email,
        firstname: superRegisterDto.firstname,
        lastname: superRegisterDto.lastname,
        phonenumber: 88508688,
        role: "super",
        password: hash,
      }
    }).catch(err => { return err; });

    return { success: true, message: "Admin created successfully" };

  }


}
