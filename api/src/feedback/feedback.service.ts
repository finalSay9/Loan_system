import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  // In a new feedback.service.ts
  async getSatisfactionStats() {
    const ratings = await this.prisma.feedback.groupBy({
      by: ['rating'],
      _count: { rating: true },
    });

    const total = ratings.reduce((s, r) => s + r._count.rating, 0);
    const labels = { 4: 'Excellent', 3: 'Good', 2: 'Neutral', 1: 'Poor' };

    return {
      total,
      data: [4, 3, 2, 1].map((r) => {
        const found = ratings.find((x) => x.rating === r);
        const count = found?._count.rating ?? 0;
        return {
          label: labels[r as keyof typeof labels],
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        };
      }),
      overallPercentage:
        total > 0
          ? Math.round(
              (ratings
                .filter((r) => r.rating >= 3)
                .reduce((s, r) => s + r._count.rating, 0) /
                total) *
                100,
            )
          : 0,
    };
  }

  async submitFeedback(
    userId: string,
    dto: { rating: number; comment?: string },
  ) {
    return this.prisma.feedback.create({
      data: { userId, rating: dto.rating, comment: dto.comment },
    });
  }
}
