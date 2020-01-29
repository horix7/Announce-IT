/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';
import parser from 'body-parser';
import routers from './routes/userRoutes';
import routersV2 from './routesV2/userRoutes';
import announceRouter from './routes/announcementRoutes';
import announceRouterV2 from './routesV2/announcementRoutes';


dotenv.config();
const app = express();

app.use(express.json());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/api/v1/auth', routers);
app.use('/api/v2/auth', routersV2);
app.use('/api/v1/announcement', announceRouter);
app.use('/api/v2/announcement', announceRouterV2);
app.get('/', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to AnnounceIT',
}));
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connected on ${port}`);
  console.log('environment', process.env.NODE_ENV);
});

export default app;
