import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import connect from './models/index';
import covidRouter from './api/covidDailyRouter';
import covidCompositionRouter from './api/covidCompositionRouter';
import vaccineRouter from './api/vaccineRouter';
import setInitialDB from './setInitialDB/init';
import task from './jobs/scheduler';
import openApi from './config/openApi';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
})

//몽고db 연결
connect();
setInitialDB();
task('42 10 * * *', openApi.vaccine_stat).start();
task('42 10 * * *', openApi.covid_stat).start();

app.use(morgan('dev'));
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/daily', covidRouter);
app.use('/composition', covidCompositionRouter);
app.use('/vaccine', vaccineRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`${req.method}${req.url} 라우터가 없습니다`);
  // error.status = 404;
  res.status(404);
  next(err);
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  // res.status(err.status || 500);
  res.status(500);
  res.render('error');
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
