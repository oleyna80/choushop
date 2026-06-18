-- Change default role from ADMIN to OPERATOR for new users.
-- Existing users are unaffected; admin users keep their current role.
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'OPERATOR';
