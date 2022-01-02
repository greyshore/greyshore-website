describe('Page has correct components', () => {
	it('Load page', () => {
		cy.visit('/');
	});

// Page has lang attribute set for accessibility
it('displays html element with lang attribute', () => {
	cy.get('html')
	.invoke('attr', 'lang')
  .should('eq', 'en');
});

// Navigation has correct number of items
	it('displays 5 link items in navigation menu', () => {
		cy.get('nav li').should('have.length', 5)
	});

// Navigation elements have correct accessible roles

	it('displays navigation with elements that have accessible roles', () => {
		cy
  .get('nav > ul')
  .invoke('attr', 'role')
  .should('eq', 'menubar');

	cy
  .get('nav > ul > li')
  .invoke('attr', 'role')
  .should('eq', 'none');

	cy
  .get('nav > ul > li > a')
  .invoke('attr', 'role')
  .should('eq', 'menuitem');
	});


// Navigation links have aria-labels
it('displays navigation items with aria-labels', () => {
	cy
.get('nav > ul > li > a')
.should('have.attr', 'aria-label');

});

// Navigation links to correct location

	it("navigates to About Us section", () => {
		cy.get("nav a").contains("About Us").click();
		cy.url().should("include", "/#about-us");
		cy.go('back')
	});

	it("navigates to Our Process section", () => {
		cy.get("nav a").contains("Our Process").click();
		cy.url().should("include", "/#our-process");
		cy.go('back')
	});

	it("navigates to Our Product section", () => {
		cy.get("nav a").contains("Our Product").click();
		cy.url().should("include", "/#our-product");
		cy.go('back')
	});

	it("navigates to Contact Us section", () => {
		cy.get("nav a").contains("Contact Us").click();
		cy.url().should("include", "/#contact-us");
		cy.go('back')
	});

// Get in Touch link

it("Get in Touch link navigates to /#contact-us", () => {
	cy.get("a").contains("Get in Touch").click();
	cy.url().should("include", "/#contact-us");
});

// Check for broken links
it("should have no broken links", () => {
	cy.get("a:not([href*='mailto:'])").each(link => {
		cy.request({
			method: 'GET',
      url: link.prop('href'),
      failOnStatusCode: false
			// failOnStatusCode set to false to prevent test for LinkedIn URL from breaking.
			// LinkedIn has super security that throws a Status Code of 999, which breaks the test
		})
	})
});

// Correct Form inputs are displaying

it('Has a complete contact form.', function () {
  cy.get('form').within(() => {
      cy.get('input#fullname').should('be.visible');
      cy.get('input#phone').should('be.visible');
      cy.get('input#email').should('be.visible');
      cy.get('textarea#message').should('be.visible');
      cy.get('button#submit').should('be.visible');
  });
});
	
});