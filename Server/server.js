import express from 'express';
import { routers } from './src/routes/userRoutes'
const app = express();

app.use(express.json());
app.use('/api/v1/auth',routers)

app.listen(5000);