// test/jest.setup.ts
beforeAll(() => {
  process.env.DATABASE_URL = "mysql://root:myConpa55!@localhost:3306/hrms_db";
  process.env.JWT_SECRET = "testsecret";
  process.env.JWT_EXPIRES_IN = "7d";
  process.env.PORT = "3000";
});
