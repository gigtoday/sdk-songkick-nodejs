'use strict';

const https       = require('https'),
      pkg         = require('../package.json'),
      querystring = require('querystring'),
      url         = require('url');

/**
 * Constructor
 *
 * @param {String} apiKey Your songkick api key
 */
function Songkick(apiKey) {
    if (!(this instanceof Songkick)) {
        return new Songkick(apiKey)
    }

    this.API_KEY        = apiKey;

    this.API_VERSION    = '3.0';
    this.CLIENT_VERSION = pkg.version;

    this.HOST_NAME      = 'api.songkick.com';
    this.PATH           = '/api/3.0/';
    this.PORT           = 443;
}

/**
 * Call songbird api
 *
 * @param  {String}   method
 * @param  {String}   path
 * @param  {Object}   query
 * @param  {Object}   headers
 * @param  {Function} callback
 */
Songkick.prototype.request = function(method, path, query, headers, callback) {
    const options = {
            hostname : this.HOST_NAME,
            path     : path = url.resolve(this.PATH, path)
                       + '?' + querystring.stringify(query),
            port     : this.PORT,
            method   : method
          },
          req = https.request(options, function(res) {
              res.setEncoding('utf8');

              res.on('data', function(data) {
                  callback(null, data, res.statusCode, res.headers);
              });
          });

    req.end();

    req.on('error', function(err) {
        callback(err);
    });
};

/**
 * Return the current version of the songbird api
 *
 * @return {String}
 */
Songkick.prototype.getApiVersion = function() {
    return this.API_VERSION;
};

/**
 * Return the current version of the songbird sdk
 *
 * @return {String}
 */
Songkick.prototype.getClientVersion = function() {
    return this.CLIENT_VERSION;
};

/**
 * Find upcoming events
 *
 * @see    http://www.songkick.com/developer/event-search
 * @param  {String}   location (sk:<id>, geo:<lat>,<lng>, ip:<ip>, 'clientip', 'nothing')
 * @param  {Object}   options
 * @param  {Function} callback
 */
Songkick.prototype.findEvents = function(location, options, callback) {
    if (typeof options === 'function') {
        callback = options;
    }

    if (! options || typeof options === 'function') {
        options = {};
    }

    this.request(
        'get',
        'events.json',
        {
            apikey   : this.API_KEY,
            location : location,
            page     : options.page ? options.page : 1,
            per_page : options.perPage ? options.perPage : 50,
            // min_date : (YYYY-MM-DD)
            // max_date : (YYYY-MM-DD)
        },
        {},
        function(err, body, statusCode, headers) {
            callback(err, body, statusCode, headers)
        }
    );
};

/**
 * Find past events for an artist.
 *
 * @param  {Integer|String} artistId Songkick or musicbrainz artist id
 * @param  {Object} options
 * @param  {Function} callback
 * @return {Object}
 */
Songkick.prototype.findEventsByArtist = function(artistId, options, callback) {
    if (typeof options === 'function') {
        callback = options;
    }

    if (! options || typeof options === 'function') {
        options = {};
    }

    this.request(
        'get',
        Number.isInteger(artistId)
            ? 'artists/' + artistId + '/gigography.json'
            : 'artists/mbid:' + artistId + '/gigography.json',
        {
            apikey   : this.API_KEY,
            page     : options.page ? options.page : 1,
            per_page : options.perPage ? options.perPage : 50,
            // min_date : (YYYY-MM-DD)
            // max_date : (YYYY-MM-DD)
            order    : options.order ? options.order : 'asc'
        },
        {},
        function(err, body, statusCode, headers) {
            callback(err, body, statusCode, headers)
        }
    );
};

/**
 * A list of artists similar to a given artist, based on our tracking and attendance data.
 *
 * @param  {Integer|String} artistId Songkick or musicbrainz artist id
 * @param  {Object} options
 * @param  {Function} callback
 * @return {Object}
 */
Songkick.prototype.findSimilarArtist = function(artistId, options, callback) {
    if (typeof options === 'function') {
        callback = options;
    }

    if (! options || typeof options === 'function') {
        options = {};
    }

    this.request(
        'get',
        'artists/' + artistId + '/gigography.json',
        {
            apikey   : this.API_KEY,
            page     : options.page ? options.page : 1,
            per_page : options.perPage ? options.perPage : 50
        },
        {},
        function(err, body, statusCode, headers) {
            callback(err, body, statusCode, headers)
        }
    );
};

/**
 * Detailed event information, including venue information.
 *
 * @param  {Integer} eventId
 * @param  {Function} callback
 * @return {Object}
 */
Songkick.prototype.getEvent = function(eventId, callback) {
    this.request(
        'get',
        'events/' + eventId + '.json',
        { apikey : this.API_KEY },
        null,
        function(err, body, statusCode, headers) {
            callback(err, body, statusCode, headers)
        }
    );
};

/**
 * Detailed venue information, complete address, phone number, description, and more.
 *
 * @param  {Integer} venueId
 * @param  {Function} callback
 * @return {Object}
 */
Songkick.prototype.getVenue = function(venueId, callback) {
    this.request(
        'get',
        'venues/' + venueId + '.json',
        { apikey : this.API_KEY },
        null,
        function(err, body, statusCode, headers) {
            callback(err, body, statusCode, headers)
        }
    );
};

module.exports = Songkick;
