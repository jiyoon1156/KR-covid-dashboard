"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var index_1 = __importDefault(require("./models/index"));
var covidDailyRouter_1 = __importDefault(require("./api/covidDailyRouter"));
var covidCompositionRouter_1 = __importDefault(require("./api/covidCompositionRouter"));
var vaccineRouter_1 = __importDefault(require("./api/vaccineRouter"));
var init_1 = __importDefault(require("./setInitialDB/init"));
var scheduler_1 = __importDefault(require("./jobs/scheduler"));
var openApi_1 = __importDefault(require("./config/openApi"));
var app = express_1.default();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks_1.default.configure('views', {
    express: app,
    watch: true,
});
//몽고db 연결
index_1.default();
init_1.default();
scheduler_1.default('42 10 * * *', openApi_1.default.vaccine_stat).start();
scheduler_1.default('42 10 * * *', openApi_1.default.covid_stat).start();
app.use(morgan_1.default('dev'));
var __dirname = path_1.default.resolve();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/daily', covidDailyRouter_1.default);
app.use('/composition', covidCompositionRouter_1.default);
app.use('/vaccine', vaccineRouter_1.default);
app.use(function (req, res, next) {
    var err = new Error("" + req.method + req.url + " \uB77C\uC6B0\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4");
    // error.status = 404;
    res.status(404);
    next(err);
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    // res.status(err.status || 500);
    res.status(500);
    res.render('error');
});
app.listen(app.get('port'), function () {
    console.log(app.get('port'), '번 포트에서 대기중');
});
//# sourceMappingURL=app.js.map