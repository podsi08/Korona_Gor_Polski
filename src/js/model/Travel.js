class Travel {
    constructor(mountain, date, description) {
        this.mountain = mountain;
        this.date = date;
        this.description = description;
    }

    toJson() {
        return JSON.stringify(this);
    }

    static ofJson(jsonData) {
        let travelData = JSON.parse(jsonData);
        return new Travel(travelData.mountain, travelData.date, travelData.description);
    }
}
