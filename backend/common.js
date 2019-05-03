module.exports = class Common {

    static getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1) + 1; // adjust when day is sunday
        return new Date(d.setDate(diff)).toISOString().split("T")[0];
    }

    static getSunday(d){
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1) + 1 + 5; // adjust when day is sunday
        return new Date(d.setDate(diff)).toISOString().split("T")[0];
    }

}
