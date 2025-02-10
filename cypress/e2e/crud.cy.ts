describe('Pruebas CRUD con JWT y Modales', () => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJiYmFycmlnYTk2QGdtYWlsLmNvbSIsImV4cCI6MTczOTE2NjIwMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY3IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.OGIKANmccJogzx8MTamWBKJS7ZhG9CDfQue0_RObtR4'; // El token que generaste al hacer login

  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
    });
  });

  it('Leer todas las tareas', () => {
    cy.visit('/tareas/tareas');
  });
  /*
  it('Crear una Tarea', () => {
    cy.visit('/tareas/tareas');
    cy.get('button').contains('add').click();
    cy.get('mat-dialog-container').should('be.visible');
    cy.get('input[id="nombre"]').type('Nueva Tarea');

    cy.get('button[type="submit"]').should('be.visible').click();
  });

  it('Editar una Tarea', () => {
    cy.visit('/tareas/tareas');
    cy.get('button').contains('edit_square').click();
    cy.get('mat-dialog-container').should('be.visible');
    cy.get('input[name="nombre"]').clear().type('Nueva Tarea1');
    cy.get('button[type="submit"]').should('be.visible').click();
  });

  it('Eliminar una Tarea', () => {
    cy.visit('/tareas/tareas');
    cy.get('button').contains('delete').click();
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true); // Simula que el usuario hace clic en "Aceptar"
    });
  });
  */
  it('Debe redirigir al login si no hay token', () => {
    cy.window().then((win) => {
      win.localStorage.removeItem('token');
    });
    cy.visit('/tareas');
    cy.url().should('include', '/login');
  });
});
