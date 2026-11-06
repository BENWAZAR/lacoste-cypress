
import GooglePage from '../../pages/GooglePage';

const googlePage = new GooglePage();

describe('Google Search - Lacoste Markets', () => {

  it('should navigate to the correct Lacoste market', () => {

    cy.fixture('markets').then((markets) => {

      Object.values(markets).forEach((market) => {

        cy.log(`Testing ${market.name}`);

        googlePage.visitGoogle();

        googlePage.search(market.searchTerm);

        googlePage.handleGoogleOutcome(market);

        // Verify destination
        cy.origin('https://www.lacoste.com', {
          args: { expectedPath: market.expectedPath }
        }, ({ expectedPath }) => {

          cy.location('pathname')
            .should('include', expectedPath);

          cy.title().should('contain', 'Lacoste');

          cy.get('body').should('be.visible');

        });

      });

    });

  });

});
