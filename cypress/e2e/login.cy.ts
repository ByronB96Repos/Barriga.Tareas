describe('Pruebas de Login / Registro', () => {
  it('Debe iniciar sesión correctamente y obtener el token', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5067/api/auth/login', // Ajusta a tu URL de login
      body: {
        email: 'bbarriga96@gmail.com', // Ajusta las credenciales de login
        passwordHash: 'Sharingan96@',
      },
    }).then((response) => {
      // Verifica que la respuesta contenga un token
      expect(response.status).to.equal(200);
      expect(response.body.token).to.exist;

      // Guarda el token en localStorage para las siguientes pruebas
      cy.window().then((win) => {
        win.localStorage.setItem('token', response.body.token);
      });
    });
  });
  it('Debe crear un nuevo usuario', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5067/api/auth/registro', // Ajusta a tu URL de login
      body: {
        nombre: 'Prueba',
        apellido: 'Integracion',
        user: 'pintegracion',
        email: 'pintegracion25@gmail.com', // Ajusta las credenciales de login
        passwordHash: 'Sharingan96@',
      },
    }).then((response) => {
      // Verifica que la respuesta contenga un token
      expect(response.status).to.equal(201);
    });
  });
});
