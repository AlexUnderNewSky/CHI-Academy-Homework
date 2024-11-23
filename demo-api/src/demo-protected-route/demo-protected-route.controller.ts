import { Controller, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('demo-protected-route')
export class DemoProtectedRouteController {
    
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get protected info' })
    getProtectedInfo() {
        return {
            message: 'This is a protected route',
        };
    }
}
