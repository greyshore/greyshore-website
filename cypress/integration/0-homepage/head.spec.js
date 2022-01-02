/**
 * Required Meta Tags
 *
 * Checks the head of the document for required
 * meta tags
 */
 describe('Page has required meta tags', () => {
	it('Load page', () => {
		cy.visit('/');
	});

	it('Has title', () => {
		cy.title().should("eq", "Greyshore Associates | Official Website");
	});

	it('Has description', () => {
		cy.get('meta[name="description"]')
			.should('have.attr', 'content')
			.should("eq", "Greyshore is a modern people-driven service that provides research, strategy, delivery, and up-skilling to support your company on every point of it's journey.");
	});

	it('Has correct charset', () => {
		cy.get('meta[charset="utf-8"]');
	});

	it('Has responsive viewport meta tag', () => {
		cy.get('meta[name="viewport"]')
			.should('have.attr', 'content')
			.should('eq', 'width=device-width,initial-scale=1');
	});

	it('Has UA meta tag', () => {
		cy.get('meta[http-equiv="x-ua-compatible"]');
	});
});

describe('Has other required tags', () => {
	it('Has Favicon', () => {
		cy.get('link[rel="icon"]')
			.should('have.attr', 'href')
			.should('not.be.empty');
	});
});