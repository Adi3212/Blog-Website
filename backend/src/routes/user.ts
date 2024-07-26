import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from "@aditya_tech/unique-common";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    }>();   



userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const body = await c.req.json();
        const parsed = signupInput.safeParse(body);

        if (!parsed.success) {
            return c.json({ error: "Invalid input" }, 400);
        }
    const user = await prisma.user.create({
        data: {
        email: body.email,
        password: body.password,
        },
    });
    console.log('hello');
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    
    return c.json({
        jwt: token
    })
    } catch (error) {
      console.log(error);
        
    }
})
      
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsed = signinInput.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid input" }, 400);
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
    password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
    
})

