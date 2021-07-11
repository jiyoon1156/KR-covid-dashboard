"use strict";
/*
  < Open API >
  1. Covid19 status from https://covid19api.com/
  2. Korea vaccination status from https://www.data.go.kr/index.do 2021-03-11부터 데이터있음
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var yesterday = function () {
    var date = new Date();
    var yesterdate = date.getTime() - (1 * 24 * 60 * 60 * 1000);
    date.setTime(yesterdate);
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
};
var openApi = {
    covid_stat: {
        Method: 'get',
        url: 'https://api.covid19api.com/live/country/korea-south/status/confirmed',
        headers: {},
    },
    vaccine_stat: {
        Method: 'get',
        url: "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=" + yesterday() + "%2000%3A00%3A00",
        headers: {
            Authorization: "Infuser " + process.env.AUTH_KEY,
        },
    },
};
exports.default = openApi;
//# sourceMappingURL=openApi.js.map