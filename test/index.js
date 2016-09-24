'use strict';

const assert   = require('assert'),
      Songkick = new require('../src/')(process.env.SONGKICK_API_KEY);

describe('Songkick Sdk', function() {
    const TIME_OUT = 0;
    this.timeout(TIME_OUT);

    describe('#getApiVersion', function() {
        it('should return the songkick api version', function() {
            assert.equal(Songkick.getApiVersion(), '3.0');
        });
    });

    describe('#getClientVersion', function() {
        it('should return the songkick sdk version', function() {
            assert.equal(Songkick.getClientVersion(), require('../package.json').version);
        });
    });

    describe('#getEvent', function() {
        it('should return an json object containing event details', function(done) {
            Songkick.getEvent(27989954).then(JSON.parse).then(function(res) {
                assert.equal(res.resultsPage.status, 'ok');

                setTimeout(done, TIME_OUT);
            });
        });
    });

    describe('#findEvents', function() {
        it('should return an json object containing search results', function(done) {
            Songkick.findEvents('sk:24426').then(JSON.parse).then(function(res) {
                assert.equal(res.resultsPage.status, 'ok');

                setTimeout(done, TIME_OUT);
            });
        });
    });

    describe('#findEventsByArtist', function() {
        it('should return an json object containing past events for an artist', function(done) {
            Songkick.findEventsByArtist(468146).then(JSON.parse).then(function(res) {
                assert.equal(res.resultsPage.status, 'ok');

                setTimeout(done, TIME_OUT);
            });
        });
    });

    describe('#findSimilarArtist', function() {
        it('should return an json object containing similar artist', function(done) {
            Songkick.findSimilarArtist(468146).then(JSON.parse).then(function(res) {
                assert.equal(res.resultsPage.status, 'ok');

                setTimeout(done, TIME_OUT);
            });
        });
    });

    describe('#getVenue', function() {
        it('should return an json object containing venue details', function(done) {
            Songkick.getVenue(17522).then(JSON.parse).then(function(res) {
                assert.equal(res.resultsPage.status, 'ok');

                setTimeout(done, TIME_OUT);
            });
        });
    });

});
