/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        function test_url(feed) {
            /*
            *   test_url function to test the feed has a url define and not null/empty
            *   parm(s):
            *       feed = object that should contain the url to be tested
            */
            it('url is defined and populated', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).toBeTruthy();
            });
        }

        for(var x = 0; x < allFeeds.length; x++) {
            /*
            *   loop thru all the feeds and pass each feed to test_url
            */
            test_url(allFeeds[x]);
        }



        function test_name(feed) {
            /*
             *   test_name function to test the feed has a name define and not null/empty
             *   parm(s):
             *       feed = object that should contain the name to be tested
             */
            it('name is defined and populated', function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name).toBeTruthy();
            });
        }

        for(var x = 0; x < allFeeds.length; x++) {
            /*
             *   loop thru all the feeds and pass each feed to test_name
             */
            test_name(allFeeds[x]);
        }
    });


    describe('The menu', function() {
        /*
        *   Test the menu that the menu element is hiddend by default and
        *   the first part of the click toggle logic
        */
        it('element is hidden by default', function () {
            /*
            * test menu element is defined and hidden by default
            */
            expect($('.menu-hidden')).toBeDefined();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
            //expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        it('icon is triggered NOT to display the menu', function() {
            /*
            *   This is the first test that is part of the click toggle logic
            *   NOT to display the menu.
            */
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });


    describe('The menu', function() {
        /*
         *   Test the second part of the click toggle logic
         */
        beforeEach(function() {
            /*
            *   Simulate or trigger the actual click of the menu icon to show the menu
            */
            $('.menu-icon-link').trigger( 'click' );
        });

        it('icon is triggered to display the menu', function() {
            /*
            *   Test make sure the menu is displayed when the menu icon is click
            *   (see beforeEach logic above to trigger the menu click)
            */
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
        });
    });


    describe('Initial Entries', function() {
        /*
        *   Test the initial entries to make sure there is at least an entry.
        *   Entry is coming from an ajax call.
        */
        beforeEach(function (done) {
            /*
            *   This is make sure that the ajax call, loadFeed(), is executed first and is done
            *   This done() function communicates with the Jazmine's test logic
            */
            loadFeed(0, function () {
                done();
            });
        });

        it('should have at least 1 entry', function (done) {
            /*
            *   Test to make sure that there is at least an entry coming from the ajax call, loadFeed()
            */
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });


    describe('New Feed Selection', function() {
        /*
        *   Test to make sure there is a 'NEW' entry other than the first
        */
        beforeEach(function (done) {
            /*
             *   This is make sure that the ajax call, loadFeed(), is executed first and is done
             *   This done() function communicates with the Jazmine's test logic.
             *   To make sure it's a new entry randomize a number between 1 and 3 so that
             *   the first entry is not picked up.  Random number is store in loadNdx.
             */
            var loadNdx = Math.floor(Math.random() * 3) + 1;
            loadFeed(loadNdx, function () {
                done();
            });
        });


        it('should have new feed', function (done) {
            /*
             *   Test to make sure that the title is not the same as title of the first feed
             *   by comparing the title text of the new against the name of the first feed.
             *   Entry coming from the ajax call, loadFeed()
             */
            expect($('.header-title').text() !== allFeeds[0].name).toBeTruthy();
            done();
        });

        //afterEach(function () {
        //    loadFeed(0);
        //});
    });
}());
