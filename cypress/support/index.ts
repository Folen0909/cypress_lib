// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
import "./commands"

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            type(originalFn, element, text, options): Cypress.CommandOriginalFn<any>;
            visitBaseUrl(): Chainable<AUTWindow>;
            loginByUI(): Chainable<AUTWindow>;
            loginByRequest(): Chainable<AUTWindow>;
            navigateMenu(menuItemList: string[], navigationBar?: string): Chainable<Element>;
            inputData(form: Object, data: Object): Chainable<Element>;
            paginationSelector(dropDownName: string, selection: number): Chainable<Element>;
        }
    }
}