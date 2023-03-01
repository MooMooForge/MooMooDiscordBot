module.exports.regions = {
    "vultr:8": {
        name: "London",
        latitude: 51.5283063,
        longitude: -0.382486
    },
    "vultr:9": {
        name: "Frankfurt",
        latitude: 50.1211273,
        longitude: 8.496137
    },
    "vultr:12": {
        name: "Silicon Valley",
        latitude: 37.4024714,
        longitude: -122.3219752
    },
    "vultr:39": {
        name: "Miami",
        latitude: 25.7823071,
        longitude: -80.3012156
    },
    "vultr:40": {
        name: "Singapore",
        latitude: 1.3147268,
        longitude: 103.7065876
    }
}

module.exports.extractRegionsToChoices = function () {
    let choices = [];
    Object.keys(module.exports.regions).forEach(key => {
        if (key.startsWith("vultr:")) {
            let number = key.split(":")[1];
            let name = module.exports.regions[key].name;
            choices.push({
                name: number,
                value: number
            });
            choices.push({
                name: name,
                value: number
            });
        }
    });
    return choices;
}

module.exports.serverTypes = [
    {
        name: "sandbox",
        value: "sandbox"
    },
    {
        name: "dev",
        value: "dev"
    },
    {
        name: "mm_beta",
        value: "mm_beta"
    },
    {
        name: "normal",
        value: "normal"
    }
]