
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/getUser.decorator';

@ApiTags('Notifications')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get my notifications',
  })
  async getMyNotifications(
    @GetUser('id') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('unreadOnly') unreadOnly?: string,
  ) {
    return this.notificationsService.getMyNotifications(
      userId,
      Number(page ?? 1),
      Number(limit ?? 20),
      unreadOnly === 'true',
    );
  }

  @Get('unread-count')
  @ApiOperation({
    summary: 'Get my unread notification count',
  })
  async getUnreadCount(
    @GetUser('id') userId: string,
  ) {
    return this.notificationsService.getUnreadCount(
      userId,
    );
  }

  @Patch(':id/read')
  @ApiOperation({
    summary: 'Mark one of my notifications as read',
  })
  async markAsRead(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) notificationId: string,
  ) {
    return this.notificationsService.markAsRead(
      userId,
      notificationId,
    );
  }

  @Patch('read-all')
  @ApiOperation({
    summary: 'Mark all my notifications as read',
  })
  async markAllAsRead(
    @GetUser('id') userId: string,
  ) {
    return this.notificationsService.markAllAsRead(
      userId,
    );
  }
}