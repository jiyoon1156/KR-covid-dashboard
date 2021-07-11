"use strict";
/*
  Data updates every 10:00am
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = __importDefault(require("node-cron"));
var openApi_1 = __importDefault(require("../config/openApi"));
var apiCall_1 = __importDefault(require("../services/apiCall"));
var setCovidData_1 = __importDefault(require("../services/setCovidData"));
var setVaccineData_1 = __importDefault(require("../services/setVaccineData"));
var CovidDaily_1 = __importDefault(require("../models/CovidDaily"));
var Vaccine_1 = __importDefault(require("../models/Vaccine"));
var getDateRange_1 = __importDefault(require("../services/getDateRange"));
var updateData = function (model, api) { return __awaiter(void 0, void 0, void 0, function () {
    var storedData, len, oneDay, lastDate, today, dates, data, i, i, vaccineData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model.find({}).sort('date')];
            case 1:
                storedData = _a.sent();
                len = storedData.length;
                oneDay = 1 * 24 * 60 * 60 * 1000;
                lastDate = storedData[len - 1].date.getTime();
                today = new Date().getTime();
                if (!(lastDate < today)) return [3 /*break*/, 14];
                dates = getDateRange_1.default(lastDate + oneDay, today, 0);
                if (!(model === CovidDaily_1.default)) return [3 /*break*/, 7];
                console.log("=============COVID19 DATA CRAWLING START==================");
                return [4 /*yield*/, apiCall_1.default(api)];
            case 2:
                data = _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < dates.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, setCovidData_1.default(data, data.length - dates.length + i)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                ;
                console.log("=============COVID19 DATA CRAWLED SUCCESSFULLY============");
                return [3 /*break*/, 13];
            case 7:
                if (!(model === Vaccine_1.default)) return [3 /*break*/, 13];
                console.log("===========VACCINATION DATA CRAWLING START================");
                i = 0;
                _a.label = 8;
            case 8:
                if (!(i < dates.length)) return [3 /*break*/, 12];
                openApi_1.default.vaccine_stat.url = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=" + dates[i] + "%2000%3A00%3A00";
                return [4 /*yield*/, apiCall_1.default(openApi_1.default.vaccine_stat)];
            case 9:
                vaccineData = _a.sent();
                return [4 /*yield*/, setVaccineData_1.default(vaccineData)];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                i++;
                return [3 /*break*/, 8];
            case 12:
                ;
                console.log("===========VACCINATION DATA CRAWLED SUCCESSFULLY==========");
                _a.label = 13;
            case 13:
                ;
                _a.label = 14;
            case 14:
                ;
                return [2 /*return*/];
        }
    });
}); };
var task = function (time, api) { return node_cron_1.default.schedule(time, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (api === openApi_1.default.covid_stat) {
            updateData(CovidDaily_1.default, api);
        }
        else if (api === openApi_1.default.vaccine_stat) {
            updateData(Vaccine_1.default, api);
        }
        return [2 /*return*/];
    });
}); }); };
exports.default = task;
//# sourceMappingURL=scheduler.js.map