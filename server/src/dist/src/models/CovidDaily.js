"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var CovidDailySchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true, unique: true },
    confirmed: { type: Number, required: true },
});
var CovidDaily = mongoose_1.default.model("CovidDaily", CovidDailySchema);
exports.default = CovidDaily;
//# sourceMappingURL=CovidDaily.js.map