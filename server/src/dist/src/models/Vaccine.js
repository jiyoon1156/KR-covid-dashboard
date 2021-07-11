"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var VaccineSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true, unique: true },
    accumulateFirstCnt: { type: Number, required: true },
    accumulateSecondCnt: { type: Number, required: true },
});
var Vaccine = mongoose_1.default.model("Vaccine", VaccineSchema);
exports.default = Vaccine;
//# sourceMappingURL=Vaccine.js.map