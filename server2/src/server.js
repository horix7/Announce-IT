import express from 'express';
import { routers } from './routes/userRoutes';
import { announceRouter } from './routes/announcementRoutes';
const app = express();

app.use(express.json());
app.use('/api/v1/auth',routers);
app.use('/api/v1/announcement',announceRouter);
app.listen(5000);