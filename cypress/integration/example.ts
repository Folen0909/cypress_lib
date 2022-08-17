import * as testData from "../fixtures/example.json";

describe('Test group #1', () => {
   before(() => {
       // use for setting up page, preparing data and cleaning up data
   });

   after(() => {
       // if any test fails, this will not run, be careful
   });

   beforeEach(() => {
       // use to set up page before each test
   });

   afterEach(() => {
       // if any test fails, this will not run, be careful
   });

   it('Single test #1', () => {
       // single test for testing one functionality
       cy.loginByRequest();
   });

    it('Single test #2', () => {
        // single test for testing one functionality
    });

    it('Single test #3', () => {
        // single test for testing one functionality
    });
});

describe('Test group #2', () => {
    before(() => {
        // use for setting up page, preparing data and cleaning up data
    });

    after(() => {
        // if any test fails, this will not run, be careful
    });

    beforeEach(() => {
        // use to set up page before each test
    });

    afterEach(() => {
        // if any test fails, this will not run, be careful
    });

    it('Single test #1', () => {
        // single test for testing one functionality
    });

    it('Single test #2', () => {
        // single test for testing one functionality
    });

    it('Single test #3', () => {
        // single test for testing one functionality
    });
});