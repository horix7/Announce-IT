import express from 'express';
import { routers } from './src/routes/userRoutes';
import { announceRouter } from './src/routes/announcementRoutes';
const app = express();

app.use(express.json());
app.use('/api/v1/auth',routers);
app.use('/api/v1/announcement',announceRouter);
app.listen(5000);