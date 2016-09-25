'use strict';

const https       = require('https'),
      pkg         = require('../package.json'),
      querystring = require('querystring'),
      url         = require('url');

/**
 * Create a new Songkick instance
 * @constructor
 * @param {String} apiKey - The songkick api key
 * @throws {TypeError}
 */
function Songkick(apiKey) {
    if (!(this instanceof Songkick)) {
        return new Songkick(apiKey)
    }

    if (! apiKey) {
        throw new TypeError('Argument "apiKey" must be an non-empty value.');
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
 * @param  {String} method
 * @param  {String} path
 * @param  {Object} query
 * @param  {Object} headers
 * @return {Promise}
 */
Songkick.prototype.request = function(method, path, query, headers) {
    return new Promise(function(resolve, reject) {

        const options = {
            hostname : this.HOST_NAME,
            headers  : headers,
            path     : url.resolve(this.PATH, path) + ( query ? '?' + querystring.stringify(query) : '' ),
            port     : this.port,
            method   : method
        };

        const req = https.request(options, function(res) {
            let body = '';

            res.setEncoding('utf8')
            .on('data', function(data) {
                body += data;
            })
            .on('end', function() {
                resolve(body ? body : null);
            });
        });

        req.end();

        req.on('error', function(err) {
            reject(err);
        });

    }.bind(this));
};

/**
 * Return the current version of the songbird api
 * @return {String}
 */
Songkick.prototype.getApiVersion = function() {
    return this.API_VERSION;
};

/**
 * Return the current version of the songbird sdk
 * @return {String}
 */
Songkick.prototype.getClientVersion = function() {
    return this.CLIENT_VERSION;
};

/**
 * Find upcoming events
 * @see    http://www.songkick.com/developer/event-search
 * @param  {String}  location - (sk:<id>, geo:<lat>,<lng>, ip:<ip>, 'clientip', 'nothing')
 * @param  {Object}  options
 * @return {Promise}
 */
Songkick.prototype.findEvents = function(location, options) {
    const queryParams = {
        apikey   : this.API_KEY,
        location : location,
        page     : 1,
        per_page : 50
    };

    if ('undefined' !== typeof options) {
        queryParams.page     = options.page ? options.page : queryParams.page;
        queryParams.per_page = options.perPage ? options.perPage : queryParams.per_page;

        if (options.minDate && options.maxDate) {
            queryParams.max_date = options.maxDate;
            queryParams.min_date = options.minDate;
        }
    }

    return this.request('get', 'events.json', queryParams);
};

/**
 * Find past events for an artist.
 * @see    http://www.songkick.com/developer/past-events-for-artist
 * @param  {Integer|String} artistId - Songkick or musicbrainz artist id
 * @param  {Object} options
 * @return {Promise}
 */
Songkick.prototype.findEventsByArtist = function(artistId, options) {
    const queryParams = {
        apikey   : this.API_KEY,
        page     : 1,
        per_page : 50,
        order    : 'asc'
    };

    if ('undefined' !== typeof options) {
        queryParams.page     = options.page ? options.page : queryParams.page;
        queryParams.per_page = options.perPage ? options.perPage : queryParams.per_page;
        queryParams.order    = options.order ? options.order : queryParams.order;

        if (options.minDate && options.maxDate) {
            queryParams.max_date = options.maxDate;
            queryParams.min_date = options.minDate;
        }
    }

    return this.request(
        'get',
        Number.isInteger(artistId)
            ? 'artists/' + artistId + '/gigography.json'
            : 'artists/mbid:' + artistId + '/gigography.json',
        queryParams
    );
};

/**
 * A list of artists similar to a given artist, based on our tracking and attendance data.
 * @see    http://www.songkick.com/developer/similar-artists
 * @param  {Integer} artistId - Songkick artist id
 * @return {Promise}
 */
Songkick.prototype.findSimilarArtist = function(artistId) {
    return this.request(
        'get',
        'artists/' + artistId + '/gigography.json',
        { apikey : this.API_KEY }
    );
};

/**
 * Detailed event information, including venue information.
 * @param  {Integer} eventId
 * @return {Promise}
 */
Songkick.prototype.getEvent = function(eventId) {
    return this.request(
        'get',
        'events/' + eventId + '.json',
        { apikey : this.API_KEY }
    );
};

/**
 * Detailed venue information, complete address, phone number, description, and more.
 * @param  {Integer} venueId
 * @return {Promise}
 */
Songkick.prototype.getVenue = function(venueId) {
    return this.request(
        'get',
        'venues/' + venueId + '.json',
        { apikey : this.API_KEY }
    );
};

module.exports = Songkick;
