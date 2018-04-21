class Mountain {
    constructor(id, name, height, longitude, latitude, chain, description) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.longitude = longitude;
        this.latitude = latitude;
        this.chain = chain;
        this.description = description;
    }

    static fromServerData(data) {
        return new Mountain(
            data.id,
            data.name,
            data.height,
            data.lng,
            data.lat,
            data.range,
            data.description
        );
    }
}

export default Mountain;
