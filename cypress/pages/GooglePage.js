
class GooglePage {

    get searchInput() {
      return cy.get('textarea[name="q"], input[name="q"]')
        .filter(':visible')
        .first();
    }
  
    visitGoogle() {
      cy.visit('https://www.google.com');
    }
  
    search(searchTerm) {
      this.searchInput
        .should('be.visible')
        .and('be.enabled')
        .type(`${searchTerm}{enter}`);
  
      cy.get('body', { timeout: 15000 }).should('be.visible');
    }
  
    detectCaptcha() {
      return cy.location('href').then((url) => {
        return cy.get('body').then(($body) => {
  
          const text = $body.text().toLowerCase();
  
          return (
            url.includes('/sorry/') ||
            $body.find('iframe[src*="recaptcha"]').length > 0 ||
            $body.find('#captcha-form').length > 0 ||
            text.includes('unusual traffic') ||
            text.includes('exceptional traffic') ||
            text.includes('trafic exceptionnel') ||
            text.includes('nos systèmes ont détecté') ||
            text.includes('not a robot')
          );
        });
      });
    }
  
    handleGoogleOutcome(market) {
  
      cy.get('body', { timeout: 15000 }).should('be.visible');
  
      this.detectCaptcha().then((captchaDetected) => {
  
        if (captchaDetected) {
  
          cy.log('Google CAPTCHA detected - using direct navigation');
  
          cy.visit(market.expectedUrl);
  
        } else {
  
          cy.log('Checking Google search results');
  
          cy.get('body').then(($body) => {
  
            const results = $body.find('#search a:has(h3), #rso a:has(h3)');
  
            if (results.length > 0) {
  
              cy.wrap(results.first())
                .should('be.visible')
                .click();
  
            } else {
  
              cy.log('No Google results detected - using direct navigation');
  
              cy.visit(market.expectedUrl);
            }
          });
        }
      });
    }
  }
  
  export default GooglePage;
  