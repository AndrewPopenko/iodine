import 'cypress-iframe'

describe('empty spec', () => {
    it('passes', () => {
        cy.visit('/');

        cy
            .get(LOGO)
            .should('be.visible');


        cy
            .get(MENU)
            .should('be.visible')
            .click();

        // check the presence 'company' item
        cy
            .get(COMPANY_MENU_ITEM.selector)
            .invoke('text')
            .then(itemText => {
                expect(itemText.toLocaleLowerCase()).to.be.equal(COMPANY_MENU_ITEM.expectedText);
            })

        // expand company item
        cy
            .get(ACTION_CONTROL.selector)
            .find(ACTION_CONTROL.subSelector)
            .click();

        // open careers page
        cy
            .get(CAREERS_MENU_ITEM.selector)
            .each(item => {
                if (item.text().toLocaleLowerCase() === CAREERS_MENU_ITEM.expectedText) {
                    cy.wrap(item).invoke('removeAttr', 'target').click();
                }
            })

        // find appropriate offer
        cy.frameLoaded(FRAME_WIN);
        cy
            .iframe(FRAME_WIN)
            .find(OFFER_ITEM.selector)
            .each($item => {
                if ($item.text().trim() === OFFER_ITEM.expectedText) {
                    cy.wrap($item).should('be.visible').parent().click()
                }
            })

        cy
            .get('.section')
            .scrollIntoView()

        // fill form
        cy.clickInFrame(APPLY_BUTTON);
        // visa questions
        cy.clickInFrame(FIRST_NO_BUTTON);
        cy.clickInFrame(SECOND_YES_BUTTON);
        cy.clickInFrame(SAVE_BUTTON);
        // confirm equal opportunity
        cy.clickInFrame(SUBMIT_BUTTON);
        // fill out Self-Identify
        cy.clickInFrame(MALE_CHECK_BOX).click();
        cy.clickInFrame(NO_RACE_CHECK_BOX).click();
        cy.clickInFrame(SUBMIT_BUTTON);
        // Veteran Status
        cy.clickInFrame(SUBMIT_BUTTON);
        // disability
        cy.clickInFrame(NOT_DISABILITY);
        cy.typeInFrame(YOUR_NAME.selector, YOUR_NAME.text);
        cy.clickInFrame(SUBMIT_BUTTON)
        // personal info
        cy.typeInFrame(FIRST_NAME.selector, FIRST_NAME.text);
        cy.typeInFrame(LAST_NAME.selector, LAST_NAME.text);

        cy.on('window:alert', text => {
            expect(text).to.equal(ALERT_MSG);
        });

        cy.clickInFrame(SUBMIT_FORM)
    })

    const LOGO = '.logo-dark';
    const MENU = '.hamburger';
    const COMPANY_MENU_ITEM = {selector: '#menu-item-4042 > a', expectedText: 'company'};
    const CAREERS_MENU_ITEM = {selector: '#menu-item-4042 > ul li a', expectedText: 'careers'};
    const ACTION_CONTROL = {selector: '#menu-item-4042', subSelector: '.drop-down-arrow'};
    const FRAME_WIN = 'iframe#gnewtonIframe';
    const OFFER_ITEM = {selector: 'div > a', expectedText: 'Software Development Engineer in Test (Front-End)'}
    const APPLY_BUTTON = '[ns-qa="applyBtn"]';
    const FIRST_NO_BUTTON = '.gnewtonQuestionWrapper:nth-child(1) .gnewtonQuestionNo';
    const SECOND_YES_BUTTON = '.gnewtonQuestionWrapper:nth-child(2) .gnewtonQuestionYes';
    const SAVE_BUTTON = '#saveBtn';
    const SUBMIT_BUTTON = '#gnewton-submit';
    const MALE_CHECK_BOX = '#male';
    const NO_RACE_CHECK_BOX = '#race-8';
    const NOT_DISABILITY = '#not_disability';
    const YOUR_NAME = {selector: '#your-name', text: 'John Doe'};
    const FIRST_NAME = {selector: '#firstName', text: 'John'};
    const LAST_NAME = {selector: '#lastName', text: 'Doe'};
    const SUBMIT_FORM = '#submitText';
    const ALERT_MSG = 'Please fill out this field';
})