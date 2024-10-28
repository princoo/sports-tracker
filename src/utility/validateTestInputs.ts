import { BadRequestException } from '@nestjs/common';

export function validateMetrics(userMetrics: any, requiredMetrics: string[]) {
  // Check for missing metrics
  const missingMetrics = requiredMetrics.filter(
    (metric) => !(metric in userMetrics),
  );

  // Check for unexpected metrics
  const unexpectedMetrics = Object.keys(userMetrics).filter(
    (metric) => !requiredMetrics.includes(metric),
  );

  // Create error messages
  const errors: string[] = [];
  if (missingMetrics.length > 0) {
    errors.push(`Missing required metrics: ${missingMetrics.join(', ')}`);
  }

  if (unexpectedMetrics.length > 0) {
    errors.push(`Unexpected metrics: ${unexpectedMetrics.join(', ')}`);
  }
  // Check if required metrics are provided and not empty
  const missingOrEmptyMetrics = requiredMetrics.filter(
    (metric) =>
      // !(metric in userMetrics) ||
      userMetrics[metric] === '' || userMetrics[metric] == null,
  );

  if (missingOrEmptyMetrics.length > 0) {
    errors.push(
      `Missing or empty required metrics: ${missingOrEmptyMetrics.join(', ')}`,
    );
  }
  // If there are any errors, throw a BadRequestException
  if (errors.length > 0) {
    throw new BadRequestException(errors.join('; '));
  }
}

export function validateMetricsOnUpdate(
  userMetrics: any,
  requiredMetrics: string[],
) {
  // Check for unexpected metrics
  const unexpectedMetrics = Object.keys(userMetrics).filter(
    (metric) => !requiredMetrics.includes(metric),
  );
  const errors: string[] = [];

  if (unexpectedMetrics.length > 0) {
    errors.push(`Unexpected metrics: ${unexpectedMetrics.join(', ')}`);
  }
  // Check if required metrics are provided and not empty
  const missingOrEmptyMetrics = requiredMetrics.filter(
    (metric) =>
      // !(metric in userMetrics) ||
      userMetrics[metric] === '',
    //  || userMetrics[metric] == null,
  );

  if (missingOrEmptyMetrics.length > 0) {
    errors.push(
      `Missing or empty required metrics: ${missingOrEmptyMetrics.join(', ')}`,
    );
  }
  // If there are any errors, throw a BadRequestException
  if (errors.length > 0) {
    throw new BadRequestException(errors.join('; '));
  }
}
