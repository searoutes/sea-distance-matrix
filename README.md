# Sea Distance Calculator

Welcome to Searoutes' Sea Distance Calculator. This application computes sea distances, in nautical miles, between pairs of ports using Searoutes' API's. An example is shown in the table below, between Hamburg (DEHAM) and Rotterdam (NLTRM).

|  | DEHAM | NLRTM |
|- | ------- | ------- |
| DEHAM| 0.0 | 315.47 |
| NLRTM| 303.26 | 0.0 |

Ports are identified uniquely by [UNLOCODE](https://www.unece.org/cefact/locode/service/location.html). To generate a sea distance matrix, you simply need to list the locodes you are interested in. Our `/geocoding` API gets the corresponding geo coordinates, and the distances are fetched from our `/routing` API, and reported in nautical miles.

To run this App, you can request a trial API key by [writing us here](https://searoutes.typeform.com/to/ZRAoy5). Find out more of what you can do with our API's on our [docs page here](http://developer.searoutes.com).

## Installation

Install yarn
```
npm install --global yarn
```

Install application dependencies
```
yarn install
```

In `/env` create a `.env` file by following `template.env`.

## Run

```
yarn start
```

Application should be available at `http://localhost:3000`


### Example

#### Request

URL should be like this
`http://localhost:3000/distance?locode=DEHAM&locode=NLRTM`

Minimum 2 locodes should be entered

#### Result

```
[
    {
        "from": {
            "locode": "DEHAM",
            "lon": "9.93855",
            "lat": "53.519272"
        },
        "to": {
            "locode": "DEHAM",
            "lon": "9.93855",
            "lat": "53.519272"
        },
        "distance": 0
    },
    {
        "from": {
            "locode": "DEHAM",
            "lon": "9.93855",
            "lat": "53.519272"
        },
        "to": {
            "locode": "NLRTM",
            "lon": "4.0458",
            "lat": "51.966"
        },
        "distance": 315.4676259405101
    },
    {
        "from": {
            "locode": "NLRTM",
            "lon": "4.0458",
            "lat": "51.966"
        },
        "to": {
            "locode": "DEHAM",
            "lon": "9.93855",
            "lat": "53.519272"
        },
        "distance": 303.26280502704543
    },
    {
        "from": {
            "locode": "NLRTM",
            "lon": "4.0458",
            "lat": "51.966"
        },
        "to": {
            "locode": "NLRTM",
            "lon": "4.0458",
            "lat": "51.966"
        },
        "distance": 0
    }
]
```

#### Pattern

|  | LOCODE1 | LOCODE2 |
|- | ------- | ------- |
| LOCODE1| Distance(1) | Distance(2) |
| LOCODE2| Distance(3) | Distance(4) |

(\*) = *order in result*
