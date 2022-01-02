describe('Page follows SEO best practice', () => {
	it('Load page', () => {
		cy.visit('/');
		cy.hash().should('be.empty')
	});

	it('Does not have noindex tag', () => {
		cy.get('meta[content*="noindex"]').should('not.exist');
	});

	it('Images have ALT tags', () => {
		cy.get('img').each((img) => {
			cy.wrap(img).should('have.attr', 'alt');
		});
	});

	if (Cypress.config('hasLinkingData') === true) {
		it('Has JSON Linking Data', () => {
			cy.get('script[type="application/ld+json"]');
		});
	}

	it('Has an H1 tag', () => {
		// Should only be 1 of these!
		cy.get('h1').should('have.length', 1);
	});

	// no broken external links
	// it("navigates to Twitter", () => {
	// 	cy.get("a#twitter").click();
	// 	cy.url().should('be.equal', 'https://twitter.com/greyshored');
	// 	cy.go('back');
	// });

	// it("navigates to LinkedIn", () => {
	// 	cy.get("a#linkedin").click();
	// 	cy.url().should('be.equal', 'https://www.linkedin.com/company/greyshore/');
	// 	cy.go('back');
	// });

	// it("navigates to Medium", () => {
	// 	cy.get("a#medium").click();
	// 	cy.url().should('be.equal', 'https://medium.com/simply-technology/');
	// });
	
	
});