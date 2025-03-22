const { z } = require('zod');

exports.registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'student']),
  college: z.string().optional(),
  department: z.string().optional()
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
