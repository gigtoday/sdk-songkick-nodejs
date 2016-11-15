'use strict';

const assert = require('assert'),
      pkg = require('../package.json'),
      Songkick = require('../src'),
      songkick = new Songkick(process.env.SONGKICK_API_KEY);

describe('Songkick Sdk', function () {
  const TIME_OUT = 0;
  this.timeout(TIME_OUT);

  describe('#getApiVersion', () => {
    it('should return the songkick api version', () => {
      assert.equal(songkick.getApiVersion(), '3.0');
    });
  });

  describe('#getClientVersion', () => {
    it('should return the songkick sdk version', () => {
      assert.equal(songkick.getClientVersion(), pkg.version);
    });
  });

  describe('#getEvent', () => {
    it('should return an json object containing event details', (done) => {
      songkick.getEvent(27989954).then(JSON.parse).then((res) => {
        assert.equal(res.resultsPage.status, 'ok');

        setTimeout(done, TIME_OUT);
      });
    });
  });

  describe('#findEvents', () => {
    it('should return an json object containing search results', (done) => {
      songkick.findEvents('sk:24426').then(JSON.parse).then((res) => {
        assert.equal(res.resultsPage.status, 'ok');

        setTimeout(done, TIME_OUT);
      });
    });
  });

  describe('#findEventsByArtist', () => {
    it('should return an json object containing past events for an artist', (done) => {
      songkick.findEventsByArtist(468146).then(JSON.parse).then((res) => {
        assert.equal(res.resultsPage.status, 'ok');

        setTimeout(done, TIME_OUT);
      });
    });
  });

  describe('#findSimilarArtist', () => {
    it('should return an json object containing similar artist', (done) => {
      songkick.findSimilarArtist(468146).then(JSON.parse).then((res) => {
        assert.equal(res.resultsPage.status, 'ok');

        setTimeout(done, TIME_OUT);
      });
    });
  });

  describe('#getVenue', () => {
    it('should return an json object containing venue details', (done) => {
      songkick.getVenue(17522).then(JSON.parse).then((res) => {
        assert.equal(res.resultsPage.status, 'ok');

        setTimeout(done, TIME_OUT);
      });
    });
  });
});
