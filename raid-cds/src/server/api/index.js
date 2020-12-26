import {Router} from 'express';
import report from './routes/report';

export default () => {
  const app = Router();

  report(app);

  return app;
}