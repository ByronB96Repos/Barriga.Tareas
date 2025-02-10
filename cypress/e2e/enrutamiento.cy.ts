describe('Pruebas de Enrutamiento con JWT', () => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJiYmFycmlnYTk2QGdtYWlsLmNvbSIsImV4cCI6MTczOTE2NjIwMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDY3IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0MjAwIn0.OGIKANmccJogzx8MTamWBKJS7ZhG9CDfQue0_RObtR4'; // El token que generaste al hacer login

  beforeEach(() => {
    cy.visit('/');
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
    });
  });

  it('Debe acceder al dashboard con el token en localStorage', () => {
    cy.visit('/tareas/dashboard');
  });

  it('Debe bloquear el acceso a rutas protegidas si no hay token', () => {
    cy.window().then((win) => {
      win.localStorage.removeItem('token');
    });

    cy.visit('tareas/dashboard');
    cy.url().should('include', '/login');
  });
});
