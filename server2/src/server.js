/* eslint-disable no-console */
import express from 'express';
import parser from 'body-parser';
import routers from './routes/userRoutes';
import announceRouter from './routes/announcementRoutes';

const app = express();

app.use(express.json());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to AnnounceIT',
}));
app.use('/api/v1/auth', routers);
app.use('/api/v1/announcement', announceRouter);
app.listen(process.env.PORT || 5000, () => {
  console.log('connected');
});

export default app;
