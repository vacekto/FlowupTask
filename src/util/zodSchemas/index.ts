import { z } from 'zod';

export const userSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
    id: z.string(),
});
