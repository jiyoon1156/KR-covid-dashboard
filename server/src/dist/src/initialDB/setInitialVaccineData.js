"use strict";
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
/*
    크롤링 시작하기 전 날짜의 데이터들을 데이터베이스에 넣습니다. - vaccineData
*/
var setVaccineData_1 = __importDefault(require("../services/setVaccineData"));
var apiCall_1 = __importDefault(require("../services/apiCall"));
var openApi_1 = __importDefault(require("../config/openApi"));
var getDateRange_1 = __importDefault(require("../services/getDateRange"));
// vaccine data 세팅, 3월 11일 데이터부터 ~ 어제까지 ${인자} 로 넘겨서 받아와서 쌓아놓기
// const getDateRange = () => {
// 	const oneDay = 1 * 24 * 60 * 60 * 1000;
// 	let startDate = new Date(2021, 2, 11).getTime(); //2021-03-11
// 	const endDate = new Date().getTime() - oneDay; //yesterday
// 	let dateArray = new Array();
// 	while (startDate < endDate) {
// 		const date = new Date();
// 		date.setTime(startDate);
// 		const year = date.getFullYear();
//   	const month = (`0${1 + date.getMonth()}`).slice(-2);
// 		const day = (`0${date.getDate()}`).slice(-2);
// 		dateArray.push(`${year}-${month}-${day}`);
// 		startDate += oneDay
// 	}
// 	return dateArray
// }
//vaccine data 의 경우 날짜를 인수로 받아야 함
var setInitialVaccineData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var startDate, endDate, subDay, dates, i, vaccineData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startDate = new Date(2021, 2, 11).getTime();
                endDate = new Date().getTime();
                subDay = 1 * 24 * 60 * 60 * 1000;
                dates = getDateRange_1.default(startDate, endDate, subDay);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < dates.length)) return [3 /*break*/, 5];
                openApi_1.default.vaccine_stat.url = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10&cond%5BbaseDate%3A%3AEQ%5D=" + dates[i] + "%2000%3A00%3A00";
                return [4 /*yield*/, apiCall_1.default(openApi_1.default.vaccine_stat)];
            case 2:
                vaccineData = _a.sent();
                return [4 /*yield*/, setVaccineData_1.default(vaccineData)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                ;
                return [2 /*return*/];
        }
    });
}); };
exports.default = setInitialVaccineData;
//# sourceMappingURL=setInitialVaccineData.js.map