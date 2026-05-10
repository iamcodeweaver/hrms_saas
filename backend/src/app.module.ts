import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { BranchModule } from './branch/branch.module';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { AuthModule } from './auth/auth.module';
import { RbacModule } from './rbac/rbac.module';
import { EmployeeModule } from './employee/employee.module';
import { WalletModule } from './wallet/wallet.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveModule } from './leave/leave.module';
import { LoanModule } from './loan/loan.module';
import { NotificationModule } from './notification/notification.module';
import { FileModule } from './file/file.module';
import { PayrollModule } from './payroll/payroll.module';
import { ShiftModule } from './shift/shift.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { PerformanceModule } from './performance/performance.module';
import { TrainingModule } from './training/training.module';
import { ComplianceModule } from './compliance/compliance.module';
import { AssetModule } from './asset/asset.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env automatically
    CompanyModule,
    BranchModule,
    DepartmentModule,
    PositionModule,
    AuthModule,
    RbacModule,
    EmployeeModule,
    WalletModule,
    AttendanceModule,
    LeaveModule,
    LoanModule,
    NotificationModule,
    FileModule,
    PayrollModule,
    ShiftModule,
    RecruitmentModule,
    PerformanceModule,
    TrainingModule,
    ComplianceModule,
    AssetModule,
    AnalyticsModule,
    IntegrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
