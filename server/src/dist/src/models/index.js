"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var connect = function () {
    if (process.env.NODE_ENV !== 'production') {
        mongoose_1.default.set('debug', true);
    }
};
mongoose_1.default.connect("mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PWD + "@localhost:27017/admin", {
    dbName: 'covidDashboard',
    useNewUrlParser: true,
    useCreateIndex: true,
}, function (error) {
    if (error) {
        console.log('몽고디비 연결 에러', error);
    }
    else {
        console.log('몽고디비 연결 성공');
    }
});
mongoose_1.default.connection.on('error', function (error) {
    console.error('몽고디비 연결 에러', error);
});
mongoose_1.default.connection.on('disconnected', function () {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});
exports.default = connect;
//# sourceMappingURL=index.js.map