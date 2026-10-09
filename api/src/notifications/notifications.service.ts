
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from 'prisma/generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

import type { NotificationType } from 'prisma/generated/prisma';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Create a notification.
   *
   * When an idempotency key is supplied, repeated processing
   * of the same event will not create duplicate notifications.
   */
  async createNotification(input: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: Prisma.InputJsonValue;
    idempotencyKey?: string;
  }) {
    const {
      userId,
      type,
      title,
      message,
      data,
      idempotencyKey,
    } = input;

    if (idempotencyKey) {
      return this.prisma.notification.upsert({
        where: { idempotencyKey },
        create: {
          userId,
          type,
          title,
          message,
          ...(data !== undefined ? { data } : {}),
          idempotencyKey,
        },
        update: {},
      });
    }

    return this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        ...(data !== undefined ? { data } : {}),
      },
    });
  }

  /**
   * Return only notifications belonging to the authenticated user.
   */
  async getMyNotifications(
    userId: string,
    page = 1,
    limit = 20,
    unreadOnly = false,
  ) {
    const safePage =
      Number.isInteger(page) && page > 0 ? page : 1;

    const safeLimit =
      Number.isInteger(limit) && limit > 0
        ? Math.min(limit, 100)
        : 20;

    const where = {
      userId,
      ...(unreadOnly ? { readAt: null } : {}),
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.notification.findMany({
        where,
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' },
        ],
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      data: items,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: {
        userId,
        readAt: null,
      },
    });

    return { unreadCount: count };
  }

  /**
   * Mark one notification as read without allowing
   * access to another user's notification.
   */
  async markAsRead(
    userId: string,
    notificationId: string,
  ) {
    const notification =
      await this.prisma.notification.findFirst({
        where: {
          id: notificationId,
          userId,
        },
      });

    if (!notification) {
      throw new NotFoundException(
        'Notification not found.',
      );
    }

    if (notification.readAt !== null) {
      return notification;
    }

    return this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async markAllAsRead(userId: string) {
    const result =
      await this.prisma.notification.updateMany({
        where: {
          userId,
          readAt: null,
        },
        data: {
          readAt: new Date(),
        },
      });

    return {
      updatedCount: result.count,
    };
  }
}