import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@aditya_tech/unique-common";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    console.log(authHeader);
    
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/blog', async (c) => {
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());

    const userId = c.get('userId') as string;
    const body = await c.req.json();
    const parsed = createBlogInput.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid input" }, 400);
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            },
        });
        return c.json({ blog });
    } catch (e) {
        return c.json({ error: 'Blog creation failed' }, 403);
    } finally {
        await prisma.$disconnect();
    }
});

blogRouter.put('/blog', async (c) => {
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());

    const userId = c.get('userId') as string;
    const body = await c.req.json();
    const parsed = updateBlogInput.safeParse(body);
    if (!parsed.success) {
        return c.json({ error: "Invalid input" }, 400);
    }


    const blog = await prisma.post.findUnique({
        where: {
            id: body.id,
        },
    });

    if (!blog || blog.authorId !== userId) {
        return c.json({ error: 'Unauthorized' }, 403);
    }

    try {
        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });
        return c.json({ updatedBlog });
    } catch (e) {
        return c.json({ error: 'Blog update failed' }, 403);
    } finally {
        await prisma.$disconnect();
    }
});
blogRouter.get('/blog/:id', async (c) => {
    const id = c.req.param('id');
    console.log(id);
    
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());
    const blog = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });

    if (!blog) {
        return c.json({ error: 'Blog not found' }, 404);
    }
    c.status(200);
    return c.json({ blog });

})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasources: { db: { url: c.env.DATABASE_URL } }
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    c.status(200);
    return c.json({ blogs });
})