/* This is the spec file that Jasmine will read and contains
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

    /* test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('have defined URLs', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
        //the URL should always begin with"http"
        expect(feed.url.startsWith('http')).toBe(true);
      });
    });

    /* a test that loops through each feed
    * in the allFeeds object and ensures it has a name defined
    * and that the name is not empty.
    */
    it('have defined names', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });

  });


  describe('The menu', function() {

    //variables available for all specs
    const blogBody = $('body'),
    menuIcon = $('.menu-icon-link');

    // a test that ensures the menu element is hidden by default
    it('slider is hidden by default', function() {
      expect(blogBody.hasClass('menu-hidden')).toBe(true);
    });

    /* a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * has two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('slider visibility is toggled upon every click on the menu icon', function() {

      menuIcon.click();
      expect(blogBody.hasClass('menu-hidden')).not.toBe(true);

      menuIcon.click();
      expect(blogBody.hasClass('menu-hidden')).toBe(true);
    });

  });


  describe('Initial Entries', function() {

    //variables available for all specs
    const feeds = $('.feed');

    /*  a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    //the feed container should have at least one descendant with the'.entry' class
    it('contain at least one entry', function() {
      expect(feeds.find($('.entry')).length).toBeGreaterThan(0);
    });

  });

  describe('New Feed Selection', function() {

    /* a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */

    //variables available for all specs
    const feeds = $('.feed');

    // load, store and compare the html content of the feeds 'Udacity Blog' and 'CSS Tricks'
    beforeEach(function(done) {
      loadFeed(0, function() {
        feed1 = feeds.html();
      });

      loadFeed(1, function() {
        feed2 = feeds.html();
        done();
      });
    });

    // reset the original state of the code after testing
    afterEach(function(done) {
      loadFeed(0, function() {
      });
      done();
    });

    it('updates the content', function() {
      expect(feed1).not.toEqual(feed2);
    });
  });

}()
);
