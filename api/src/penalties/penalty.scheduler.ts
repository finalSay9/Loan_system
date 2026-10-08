
import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { Cron } from '@nestjs/schedule';

import { PenaltyService } from './penalties.service';

@Injectable()
export class PenaltyScheduler {
  private readonly logger =
    new Logger(PenaltyScheduler.name);

  constructor(
    private readonly penaltyService:
      PenaltyService,
  ) {}

  /**
   * Assess overdue installment penalties
   * every day at 00:05 in Africa/Blantyre.
   */
  @Cron('5 0 * * *', {
    name: 'assess-overdue-penalties',
    timeZone: 'Africa/Blantyre',
  })
  async handleOverduePenalties(): Promise<void> {
    this.logger.log(
      'Starting overdue penalty assessment...',
    );

    try {
      const result =
        await this.penaltyService
          .assessOverduePenalties();

      this.logger.log(
        `Penalty job finished: processed=${result.processed}, skipped=${result.skipped}, failed=${result.failed}`,
      );
    } catch (error) {
      this.logger.error(
        'Overdue penalty job failed',
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }
  }
}

