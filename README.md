[![Build Status](https://travis-ci.org/gigtoday/sdk-songkick-nodejs.svg?branch=master)](https://travis-ci.org/gigtoday/sdk-songkick-nodejs)

# Songkick Sdk NodeJS

Songkick SDK written in NodeJS returning [promise objects](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## About

The [Songkick API](https://www.songkick.com/developer) gives you easy access to the biggest live music database in the world: over 5 million upcoming and past concerts… and growing every day! Easily add concerts to your website or application.

## Usage

```js

    // Creating the client
    const Songkick = new require('sdk-songkick')(process.env.SONGKICK_API_KEY);

    // Get an event by a given id
    Songkick.getEvent(27989954).then(JSON.parse).then(function(res) {
        // do stuff
    });

    // Find events
    Songkick.findEvents('sk:24426').then(JSON.parse).then(function(res) {
        // do stuff
    });

    // Find events by an given artist
    Songkick.findEventsByArtist(468146).then(JSON.parse).then(function(res) {
        // do stuff
    });

    // Find similar artist
    Songkick.findSimilarArtist(468146).then(JSON.parse).then(function(res) {
        // do stuff
    });

    // Get venue details
    Songkick.getVenue(17522).then(JSON.parse).then(function(res) {
        // do stuff
    });

```

Have a look into the `/test` dir to find further examples.

## Test suites

```sh
    $ export SONGKICK_API_KEY={YOUR_SONGKICK_API_KEY} && \
      npm test
```

## Support & Contact

Having trouble with this repository? Check out the documentation at the repository's site or contact m@matchilling.com and we'll help you sort it out.

Happy Coding

:metal:
