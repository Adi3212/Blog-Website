import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();
console.log('hello world')
app.route('/api/v1/user', userRouter)
app.route('/api/v1/post', blogRouter)

export default app