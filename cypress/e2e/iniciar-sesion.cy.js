describe('Prueba de inicio de sesion', () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Inicio de sesión con credenciales correctas", () => {
    cy.fixture("admin-credentials.json").then(admin => {
      cy.get("#email").type(admin.values.email);
      cy.get("#password").type(admin.values.password);
    });
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/#/inicio");
  });

  it("Inicio de sesión con contraseña incorrecta", () => {
    cy.fixture("admin-credentials.json").then(admin => {
      cy.get("#email").type(admin.values.email);
      cy.get("#password").type("Soy un password incorrecto");

      cy.get("button[type=submit]").click();

      cy.url().should("not.include", "/#/inicio");
      cy.get("div.toast-body").should("have.text", admin.errors.invalid);
    });
  });

  it("Inicar sesión con correo incorrecto", () => {
    cy.fixture("admin-credentials.json").then(admin => {
      cy.get("#email").type("correo@gmail.com");
      cy.get("#password").type(admin.values.password);
    });
    cy.get("button[type=submit]").click();
  })

  it("Inicar sesión con credenciales vacias", () => {
    cy.get("button[type=submit]").click();

    cy.url().should("not.include", "/#/inicio");
  });

  it("Cerrar sesión tras iniciar sesion", () => {
    cy.fixture("admin-credentials.json").then(admin => {
      cy.get("#email").type(admin.values.email);
      cy.get("#password").type(admin.values.password);
    });
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/#/inicio");

    cy.get("button[type=button].btn-danger").click();

    cy.url().should("include", "/#/");
  });


  // TODO: Esta prueba falla debido a incidencias (Ya reportado)
  it("Regresa a la pantalla de inicio de sesión", () => {
    cy.fixture("admin-credentials.json").then(admin => {
      cy.get("#email").type(admin.values.email);
      cy.get("#password").type(admin.values.password);
    });
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/#/inicio");

    cy.visit("/#/");
    cy.url().should("not.include", "/#/");
  });
})