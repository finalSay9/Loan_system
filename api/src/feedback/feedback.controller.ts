import { Body, Controller, Get, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUser } from 'src/auth/decorators/getUser.decorator';


@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Submit feedback' })
  async submitFeedback(
    @Body() dto: { rating: number; comment?: string },
    @GetUser('id') userId: string,
  ) {
    return this.feedbackService.submitFeedback(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['SUPER_ADMIN', 'LOAN_OFFICER'])
  @Get('stats')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get satisfaction stats (admin)' })
  async getStats() {
    return this.feedbackService.getSatisfactionStats();
  }
}
