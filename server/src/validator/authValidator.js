const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().refine((val) => val.endsWith('@gmail.com'),{
    message: 'Email must end with @gmail.com',
  }),
  password: z.string().min(6),
  role: z.enum(['admin', 'student']),
  college: z.string().optional(),
  department: z.string().optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

module.exports = { registerSchema, loginSchema };