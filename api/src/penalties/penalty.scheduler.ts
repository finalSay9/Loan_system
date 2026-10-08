
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
    private readonly penaltyService: PenaltyService,
  ) {}

  /**
   * Runs every day at 00:05 Africa/Blantyre.
   *
   * We intentionally run shortly after midnight so
   * installments whose grace period ended yesterday
   * are assessed as overdue.
   */
  @Cron('5 0 * * *', {
    name: 'assess-overdue-penalties',
    timeZone: 'Africa/Blantyre',
  })
  async handleOverduePenalties(): Promise<void> {
    this.logger.log(
      'Starting overdue penalty assessment...',
    );

    const result =
      await this.penaltyService
        .assessOverduePenalties();

    this.logger.log(
      `Penalty job finished: processed=${result.processed}, skipped=${result.skipped}, failed=${result.failed}`,
    );
  }
}

