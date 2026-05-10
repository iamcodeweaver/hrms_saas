import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePerformanceReviewDto } from './dto/create-performance-review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance-review.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class PerformanceService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Performance Reviews
  createReview(dto: CreatePerformanceReviewDto) {
    return this.prisma.performanceReview.create({
      data: {
        employeeId: dto.employeeId,
        reviewerId: dto.reviewerId,
        period: dto.period,
        comments: dto.comments,
      },
    });
  }

  updateReview(id: string, dto: UpdatePerformanceReviewDto) {
    return this.prisma.performanceReview.update({
      where: { id },
      data: { comments: dto.comments },
    });
  }

  getReviews(employeeId: string) {
    return this.prisma.performanceReview.findMany({
      where: { employeeId },
      include: { employee: true, reviewer: true },
    });
  }

  // 🔹 Goals
  createGoal(dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        employeeId: dto.employeeId,
        title: dto.title,
        description: dto.description,
      },
    });
  }

  updateGoal(id: string, dto: UpdateGoalDto) {
    return this.prisma.goal.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  getGoals(employeeId: string) {
    return this.prisma.goal.findMany({
      where: { employeeId },
      include: { employee: true },
    });
  }

  // 🔹 Feedback
  createFeedback(dto: CreateFeedbackDto) {
    return this.prisma.feedback.create({
      data: {
        employeeId: dto.employeeId,
        reviewerId: dto.reviewerId,
        message: dto.message,
      },
    });
  }

  getFeedback(employeeId: string) {
    return this.prisma.feedback.findMany({
      where: { employeeId },
      include: { employee: true, reviewer: true },
    });
  }
}
