import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CustomRequest } from 'src/core/interface/customRequest.interface';
import { PlayerTestService } from 'src/player-test/player-test.service';

@Injectable()
export class CheckTestMetricsIdExists implements NestMiddleware {
  constructor(private playerTestService: PlayerTestService) {}
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const testMetricId = req.params.testMetricId;

    const testMetric =
      await this.playerTestService.findOneTestMetricById(testMetricId);
    if (!testMetric) {
      throw new BadRequestException(`Metric does not exists with this ID`);
    }
    req.requiredMetrics = testMetric.playerTest.test.requiredMetrics;
    next();
  }
}
