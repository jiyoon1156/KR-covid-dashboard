"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var CovidCompositionSchema = new mongoose_1.default.Schema({
    date: { type: Date, required: true, unique: true },
    accumulatedConfirmed: { type: Number, required: true },
    deaths: { type: Number, required: true },
    recovered: { type: Number, required: true },
    active: { type: Number, required: true },
});
var CovidComposition = mongoose_1.default.model("CovidComposition", CovidCompositionSchema);
exports.default = CovidComposition;
//# sourceMappingURL=CovidComposition.js.map