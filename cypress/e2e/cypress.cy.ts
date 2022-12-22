/// <reference types="cypress" />
// @ts-check

describe('Order Forming', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('creating an order from a bun and sauce with authorization', () => {
    const dataTransfer = new DataTransfer();

    cy.get('li').contains('булка').first().trigger('dragstart', {
      dataTransfer,
    });

    cy.get('[data-test-id="test-constructor"]').trigger('drop', {
      dataTransfer,
    });

    cy.get('li').contains('Соус').first().trigger('dragstart', {
      dataTransfer,
    });

    cy.get('[data-test-id="test-constructor"]').trigger('drop', {
      dataTransfer,
    });

    cy.get('button').contains('Оформить заказ').click();
    cy.get('button').contains('Войти').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.contains('Ваш заказ начали готовить');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as(
      'getNumberOrder'
    );
    cy.wait('@getNumberOrder');
    cy.get('[data-test-id="test-close-modal"]').click();
    cy.get('h1').contains('Перенесите сюда ингредиенты для вашего бургера');
  });

  it('does not let you order without a bun', () => {
    const dataTransfer = new DataTransfer();

    cy.get('li').contains('Соус').first().trigger('dragstart', {
      dataTransfer,
    });

    cy.get('[data-test-id="test-constructor"]').trigger('drop', {
      dataTransfer,
    });
    cy.get('button').contains('Оформить заказ').should('be.disabled');
  });
});

describe('should open and close the modal window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('creating an order from a bun and sauce with authorization', () => {
    cy.get('li').contains('булка').first().click();
    cy.get('h1').contains('Детали ингредиента');

    cy.get('span').contains('Калории,ккал');
    cy.get('span').contains('Белки, г');
    cy.get('span').contains('Жиры, г');
    cy.get('span').contains('Углеводы, г');

    cy.get('[data-test-id="test-close-modal"]').click();
  });
});

describe('products management works correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should add and subtract products count', () => {
    const dataTransfer = new DataTransfer();

    cy.get('li').contains('Соус').first().as('item');
    cy.get('@item').trigger('dragstart', {
      dataTransfer,
    });

    cy.get('[data-test-id="test-constructor"]').trigger('drop', {
      dataTransfer,
    });
    cy.get('.counter__num').should('contain', '1');

    cy.get('@item').trigger('dragstart', {
      dataTransfer,
    });

    cy.get('[data-test-id="test-constructor"]').trigger('drop', {
      dataTransfer,
    });

    cy.get('.counter__num').should('contain', '2');

    cy.get('.constructor-element__action').first().click();
    cy.get('.counter__num').should('contain', '1');
  });
});
