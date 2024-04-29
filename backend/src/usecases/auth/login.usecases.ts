import { IJwtService, IJwtServicePayload } from "src/domain/adapters/jwt.interface";
import { IUserRepository } from "src/domain/repositories/user-repository.interface";
import { EnvironmentConfigService } from "src/infrastructure/config/environment-config/environment-config.service";

export class LoginUseCases {
    constructor(
        private readonly jwtTokenService: IJwtService,
        private readonly jwtConfig: EnvironmentConfigService,
        private readonly userRepository: IUserRepository,
    ) {}

    async authenticateUserByUsernameAndPassword(username: string, password: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user || user?.password !== password) {
            return null;
        }
        const payload: IJwtServicePayload = {
            id: user.id,
            username: user.email,
        };
        const accessToken = await this.jwtTokenService.createToken(payload, this.jwtConfig.getJwtSecret(), this.jwtConfig.getJwtExpirationTime());
        return {
            ...user,
            access_token: accessToken,
        };
    }
    
    // async getCookieWithJwtToken(username: string) {
    //     const payload: IJwtServicePayload = { username: username };
    //     const secret = this.jwtConfig.getJwtSecret();
    //     const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    //     const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    //     const result = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
    //     console.log(result);
    //     return result;
    // }
    
    // async getCookieWithJwtRefreshToken(username: string) {
    //     const payload: IJwtServicePayload = { username: username };
    //     const secret = this.jwtConfig.getJwtRefreshSecret();
    //     const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    //     const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    //     // await this.setCurrentRefreshToken(token, username);
    //     const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    //     return cookie;
    // }
    
    async validateUserForLocalStrategy(username: string, pass:string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        const match = pass === user.password;
        if (user && match) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    
    async validateUserForJwtStrategy(username: string) {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            return null;
        }
        return user;
    }
    
    // async updateLoginTime(username: string) {
    //     await this.userRepository.updateLastLogin(username);
    // }
    
    // async setCurrentRefreshToken(refreshToken: string, username: string) {
    //     const currentHashedRefreshToken = refreshToken;
    //     await this.userRepository.updateRefreshToken(username, currentHashedRefreshToken);
    // }
    
    // async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    //     const user = this.userRepository.getUserByUsername(username);
    //     if (!user) {
    //         return null;
    //     }
        
    //     const isRefreshTokenMatching = await this.bcryptService.compare(refreshToken, user.hashRefreshToken);
    //     if (isRefreshTokenMatching) {
    //         return user;
    //     }
        
    //     return null;
    // }
}