'use strict';

const assert   = require('assert'),
      Songkick = new require('../src/')(process.env.SONGKICK_API_KEY);

describe('Songkick', function() {

    describe('#getApiVersion', function() {
        it('should return the songkick api version', function() {
            assert.equal(Songkick.getApiVersion(), '3.0');
        });
    });

    describe('#getClientVersion', function() {
        it('should return the songkick sdk version', function() {
            assert.equal(Songkick.getClientVersion(), '1.0.0');
        });
    });

    describe('#getEvent', function() {
        it('should return an json object containing event details', function(done) {
            this.timeout(2500);

            Songkick.getEvent(27989954, function(err, res, statusCode, headers) {
                assert.equal(err, null);

                done();
            });
        });
    });

    describe('#findEvents', function() {
        it('should return an json object containing search results', function(done) {
            this.timeout(2500);

            Songkick.findEvents('sk:24426', function(err, res, statusCode, headers) {
                assert.equal(err, null);

                done(err);
            });
        });
    });

    describe('#findEventsByArtist', function() {
        it('should return an json object containing past events for an artist', function(done) {
            this.timeout(2500);

            Songkick.findEventsByArtist(468146, function(err, res, statusCode, headers) {
                assert.equal(err, null);

                done();
            });
        });
    });

    describe('#findSimilarArtist', function() {
        it('should return an json object containing similar artist', function(done) {
            this.timeout(2500);

            Songkick.findSimilarArtist(468146, function(err, res, statusCode, headers) {
                assert.equal(err, null);

                done();
            });
        });
    });

    describe('#getVenue', function() {
        it('should return an json object containing venue details', function(done) {
            this.timeout(4000);

            Songkick.getVenue(17522, function(err, res, statusCode, headers) {
                assert.equal(err, null);

                done();
            });
        });
    });

});
