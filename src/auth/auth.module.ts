import { Module, forwardRef } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtStrategy } from './guards/jwt-strategy';
// import { UserModule } from 'src/user/user.module';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        // forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    providers: [AuthService],
    // providers: [AuthService, JwtStrategy ],
     exports: [AuthService]
})
export class AuthModule { }