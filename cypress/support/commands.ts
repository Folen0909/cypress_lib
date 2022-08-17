// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as data from '../fixtures/commands.json';

/**
 * Navigate to baseUrl set in cypress.config.ts
 * @return Chainable<AUTWindow> same as cy.visit() so any function can be chained that can be chained on cy.visit()
 */
Cypress.Commands.add("visitBaseUrl", () => {
    return cy.visit(Cypress.env('baseUrl'));
});

/**
 * Login user using email and password using UI elements.
 * Creates session to speed up next login.
 * @return Chainable<AUTWindow> same as cy.visit() so any function can be chained that can be chained on cy.visit()
 */
Cypress.Commands.add('loginByUI', () => {
    cy.session('CYPRESS_ENV_LOGIN', () => {
        cy.visitBaseUrl();
        cy.get(data.email).clear().type(Cypress.env('email'));
        cy.get(data.password).clear().type(Cypress.env('password'));
        cy.get(data.loginBtn).click();
    });
    cy.visitBaseUrl();
});

/**
 * Login user using email and password using UI elements.
 * Creates session to speed up next login.
 * @return Chainable<AUTWindow> same as cy.visit() so any function can be chained that can be chained on cy.visit()
 */
Cypress.Commands.add('loginByRequest', () => {
    // body to be sent in request
    const user = {
        email: Cypress.env('email'),
        password: Cypress.env('password')
    };

    cy.request({
        url: 'https://api.demoblaze.com/login',  //URL where login function sends requests from frontend
        method: 'POST',
        body: user
    });

    cy.visitBaseUrl();
});

/**
 * Use for navigating menu.
 * @param menuItemList - list of elements to navigate through
 * @param noDropDown (optional) - skip first element in list, default false
 * Last update 11.8.2022.
 */
Cypress.Commands.add('navigateMenu', (menuItemList: string[], navigationBar?: string) => {
    const clonedList  = Object.assign([], menuItemList);
    if (!navigationBar) navigationBar = data.navigationBar;
    cy.get(navigationBar).within($nav => {
        clonedList.forEach(element => {
            cy.contains(new RegExp("^" + element + "$", "g")).first().click();
        });
    });
});

/**
 * First clears every input inside form, then enters data to each of inputs.
 * @param form is list of all inputs on page that need changing.
 * @param data that is used after clearing inputs.
 */
Cypress.Commands.add('inputData', (form: any, data: any) => {
    clearFields(form);
    checkFieldData(form.checkFields, data);
    selectFieldData(form.selectFields, data);
    inputSuggestionFieldData(form.suggestionFields, data);
    inputFieldData(form.inputFields, data);
});

/**
 * Selects number of element in any dropdown menu used for pagination.
 * @param dropDownName name attribute of select element.
 * @param selection one of available selection values.
 */
Cypress.Commands.add('paginationSelector', (dropDownName: string, selection: number) => {
    cy.get('select[name="' + dropDownName + '"]').select(String(selection));
});

function clearFieldData(inputFields: any) {
    for (let key in inputFields) {
        let field = inputFields[key];
        cy.get(field).clear({force: true});
    }
}

function clearSuggestionFieldData(suggestionFields: any) {
    for (let key in suggestionFields) {
        let field = suggestionFields[key];
        cy.get(field).clear();
    }
}

function uncheckFieldData(checkFields: any) {
    for (let key in checkFields) {
        let field = checkFields[key];
        cy.get(field).uncheck();
    }
}

function clearFields(form: any) {
    clearFieldData(form.inputFields);
    clearSuggestionFieldData(form.suggestionFields);
    uncheckFieldData(form.checkFields);
}

function inputSuggestionFieldData(suggestionFields, data: any) {
    for (let key in suggestionFields) {
        let field = suggestionFields[key];
        if (data[key] != "" && (key in data)) {
            cy.get(field).invoke('val', data[key]).then((element) => {
                cy.get(element[0]).trigger('mousedown').then(() => {
                    cy.intercept('GET', '**').as(field);
                });
                cy.get(element[0]).trigger('mouseup').then(() => {
                    cy.wait(`@${field}`).its('response.statusCode')
                        .should('eq', 200);
                });
            });
            cy.get(field)
                .parent()
                .within(() =>{
                    cy.get('.tt-suggestion').first().click();
                });
        }
    }
}

function checkFieldData(checkFields: any, data: any) {
    for (let key in checkFields) {
        let field = checkFields[key];
        if(data[key] && (key in data))
            cy.get(field).click();
    }
}

function selectFieldData(selectFields: any, data: any) {
    for (let key in selectFields) {
        let field = selectFields[key];
        if(data[key] != "" && (key in data))
            cy.get(field).select(data[key]);
    }
}

function inputFieldData(inputFields: any, data: any) {
    for (let key in inputFields) {
        let field = inputFields[key];
        if(data[key] && data[key].toString().includes('#date')) {
            let days = (data[key].split(' '))[1];
            if (!days) days = 0;
            data[key] = new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000)).toLocaleDateString(Cypress.env('locale'));
        }
        if(data[key] != "" && (key in data)) {
            cy.get(field).type(data[key].toString().replace('#uniqeID', (Math.random() + 1).toString(36).substring(2)));
        }
    }
}




