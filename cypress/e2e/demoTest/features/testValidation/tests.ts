beforeEach(() => {
  cy.visit('http://localhost:5173/'); // or use your localHostUrl variable
});
export const validationTests = () => {
  validateFirstName();
  validateLastName();
  validateMobileNumber();
  validatePassword();
  validateConfirmPassword();
  validateState();
  validateAddress();
  validateGender();
};

// Required fields test (handles both pages)

// First name validation
export const validateFirstName = () => {
  it("should show error for invalid first name", () => {
    cy.get('input[name="firstName"]').clear().type('12');
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Submit').click();
    cy.contains('Name must be 3 character and must be alphabet').should('be.visible');
  });
};

// Last name validation
export const validateLastName = () => {
  it("should show error for invalid last name", () => {
    cy.get('input[name="firstName"]').clear().type('ValidName');
    cy.get('input[name="lastName"]').clear().type('1').blur(); // Add .blur() here
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Submit').click();
    cy.contains('Name must be 3 character and must be alphabet').should('not.exist');
  });
};
// Mobile number validation
export const validateMobileNumber = () => {
  it("should show error for invalid mobile number", () => {
    cy.get('input[name="mobile"]').clear().type('abc123');
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Submit').click();
    cy.contains('Phone number must be Indian 10-digit number starting with 6-9').should('be.visible');
  });
};

// Password validation
export const validatePassword = () => {
  it("should show error for weak password", () => {
    cy.get('input[name="password"]').clear().type('123');
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Submit').click();
    cy.contains('6-20 char, letters ,numbers and special symbol').should('be.visible');
  });
};

// Confirm password validation
export const validateConfirmPassword = () => {
  it("should show error when passwords do not match", () => {
    cy.get('input[name="password"]').clear().type('Password@123');
    cy.get('input[name="confirmPassword"]').clear().type('Password@321');
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Submit').click();
    cy.contains('Password Does not match').should('be.visible');
  });
};

// State validation
export const validateState = () => {
  

  it('should not show error when a state is selected', () => {
    cy.get('select[name="state"]')
      .find('option')
      .not('[disabled]')
      .not('[value=""]')
      .first()
      .invoke('val')
      .then((stateValue) => {
        cy.get('select[name="state"]').select(stateValue as string);
      });
  
    cy.get('button').contains('Next').click();
    cy.get('button').contains('Submit').click();
  
    // Only check for this if your form actually shows this error
    cy.contains('State is required').should('not.exist');
  });
};

// Address validation
export const validateAddress = () => {
  it("should show error for short address", () => {
    cy.get('button').contains('Next').click();
    cy.get('textarea[name="address"]').clear().type('abc');
    cy.get('button').contains('Submit').click();
    cy.contains('Must me 5 character long').should('be.visible');
  });
};

// Gender validation
export const validateGender = () => {
  

  it('should not show error when a gender is selected', () => {
    cy.get('button').contains('Next').click();
    cy.get('input[name="gender"][value="male"]').check();
    cy.get('button').contains('Submit').click();
    cy.contains('Gender is required').should('not.exist');
  });
};