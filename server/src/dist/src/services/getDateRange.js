"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDateRange = function (startDay, endDay, subDay) {
    var oneDay = 1 * 24 * 60 * 60 * 1000;
    var startDate = startDay;
    var endDate = endDay - subDay;
    var dateArray = new Array();
    while (startDate < endDate) {
        var date = new Date();
        date.setTime(startDate);
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        dateArray.push(year + "-" + month + "-" + day);
        startDate += oneDay;
    }
    return dateArray;
};
exports.default = getDateRange;
//# sourceMappingURL=getDateRange.js.map