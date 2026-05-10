import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceReviewDto } from './dto/create-performance-review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance-review.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Post('review')
  createReview(@Body() dto: CreatePerformanceReviewDto) {
    return this.performanceService.createReview(dto);
  }

  @Patch('review/:id')
  updateReview(@Param('id') id: string, @Body() dto: UpdatePerformanceReviewDto) {
    return this.performanceService.updateReview(id, dto);
  }

  @Get('reviews/:employeeId')
  getReviews(@Param('employeeId') employeeId: string) {
    return this.performanceService.getReviews(employeeId);
  }

  @Post('goal')
  createGoal(@Body() dto: CreateGoalDto) {
    return this.performanceService.createGoal(dto);
  }

  @Patch('goal/:id')
  updateGoal(@Param('id') id: string, @Body() dto: UpdateGoalDto) {
    return this.performanceService.updateGoal(id, dto);
  }

  @Get('goals/:employeeId')
  getGoals(@Param('employeeId') employeeId: string) {
    return this.performanceService.getGoals(employeeId);
  }

  @Post('feedback')
  createFeedback(@Body() dto: CreateFeedbackDto) {
    return this.performanceService.createFeedback(dto);
  }

  @Get('feedback/:employeeId')
  getFeedback(@Param('employeeId') employeeId: string) {
    return this.performanceService.getFeedback(employeeId);
  }
}
