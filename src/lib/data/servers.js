module.exports.regions = {
    0: {
        name: "Local",
        latitude: 0,
        longitude: 0
    },
    "vultr:1": {
        name: "New Jersey",
        latitude: 40.1393329,
        longitude: -75.8521818
    },
    "vultr:2": {
        name: "Chicago",
        latitude: 41.8339037,
        longitude: -87.872238
    },
    "vultr:3": {
        name: "Dallas",
        latitude: 32.8208751,
        longitude: -96.8714229
    },
    "vultr:4": {
        name: "Seattle",
        latitude: 47.6149942,
        longitude: -122.4759879
    },
    "vultr:5": {
        name: "Los Angeles",
        latitude: 34.0207504,
        longitude: -118.691914
    },
    "vultr:6": {
        name: "Atlanta",
        latitude: 33.7676334,
        longitude: -84.5610332
    },
    "vultr:7": {
        name: "Amsterdam",
        latitude: 52.3745287,
        longitude: 4.7581878
    },
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
    "vultr:19": {
        name: "Sydney",
        latitude: -33.8479715,
        longitude: 150.651084
    },
    "vultr:24": {
        name: "Paris",
        latitude: 48.8588376,
        longitude: 2.2773454
    },
    "vultr:25": {
        name: "Tokyo",
        latitude: 35.6732615,
        longitude: 139.569959
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
            choices.push({
                name: number,
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
        value: ""
    }
]