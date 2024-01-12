describe("Prueba de Perfil de profesor", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("admin-credentials.json").then(admin => {
            cy.get("#email").type(admin.values.email);
            cy.get("#password").type(admin.values.password);
        });
        cy.get("button[type=submit]").click();

        cy.get("a > span").contains("Profesores").click();
        cy.get("a[href='#/perfil-profesores']").click();
    });

    it("Acceder a sección de Perfil de profesor", () => {
        cy.url().should("include", "#/perfil-profesores");
    });

    it("Buscar Profesor inexistente", () => {
        cy.fixture("profesor-info.json").then(profesor => {
            cy.get("input#input-1").type(profesor.values.boleta_inexistente);
            cy.get("button[type=button]").contains("Buscar").click();

            cy.get("div.toast-body").should("contain", profesor.errors.no_exists);
        })
    });

    it("Buscar Profesor existente", () => {
        cy.fixture("profesor-info.json").then(profesor => {
            cy.get("input#input-1").type(profesor.values.boleta_existente);
            cy.get("button[type=button]").contains("Buscar").click();

            cy.get("td[aria-colindex=1]").contains("100");
        });
    });
});

describe("Prueba Editar profesor", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("admin-credentials.json").then(admin => {
            cy.get("#email").type(admin.values.email);
            cy.get("#password").type(admin.values.password);
        });
        cy.get("button[type=submit]").click();

        cy.get("a > span").contains("Profesores").click();
        cy.get("a[href='#/perfil-profesores']").click();

        cy.fixture("profesor-info.json").then(profesor => {
            cy.get("input#input-1").type(profesor.values.boleta_existente);
            cy.get("button[type=button]").contains("Buscar").click();
        });
    });

    it("Acceder a sección de Editar profesor", () => {
        cy.get("td[aria-colindex=6] > button").click();

        cy.url().should("include", "#/editar-profesor?datos=100");
    });

    it("Editar datos de Profesor de manera incorrecta", () => {
        cy.get("td[aria-colindex=6] > button").click();

        cy.get("form").within(($form) => {
            cy.get("input[id=input-8]").type("a");
        });

        cy.fixture("profesor-info.json").then(profesor => {
            cy.get("div.modal-body > p").should("contain", profesor.errors.invalid_number);
        });
    })

    it("Editar datos de Profesor", () => {
        cy.get("td[aria-colindex=6] > button").click();

        cy.fixture("profesor-info.json").then(profesor => {
            cy.get("form").within(($form) => {
                cy.get("input[id=input-2]").clear();
                cy.get("input[id=input-5]").clear().type(profesor.values.edited.academias);
                cy.get("input[id=input-3]").clear().type(profesor.values.edited.correo);
                cy.get("input[id=input-2]").type(profesor.values.edited.nombre);

                cy.get("button[type=submit]").contains("Actualizar datos").click();
            });
        });
    });

    it("Verificar cambios", () => {
        cy.get("a > span").contains("Profesores").click();
        cy.get("a[href='#/perfil-profesores']").click();

        cy.fixture("profesor-info.json").then(profesor => {
            cy.get("input#input-1").type(profesor.values.boleta_existente);
            cy.get("button[type=button]").contains("Buscar").click();

            cy.get("td[aria-colindex=1]").contains(profesor.values.boleta_existente);
            cy.get("td[aria-colindex=2]").contains(profesor.values.edited.nombre);
            cy.get("td[aria-colindex=3]").contains(profesor.values.edited.academias);
            cy.get("td[aria-colindex=4]").contains(profesor.values.edited.correo);
        });
    });

    // it("Cancelar cambios", () => {
    //     cy.get("td[aria-colindex=6] > button").click();

    //     cy.url().should("include", "#/editar-profesor?datos=100");

    //     cy.fixture("profesor-info.json").then(profesor => {
    //         cy.get("form").within(($form) => {
    //             cy.get("input[id=input-2]").clear();
    //             cy.get("input[id=input-5]").clear().type(profesor.values.original.academias);
    //             cy.get("input[id=input-3]").clear().type(profesor.values.original.correo);
    //             cy.get("input[id=input-2]").type(profesor.values.original.nombre);

    //             cy.get("button[type=submit]").contains("Actualizar datos").click();
    //         });
    //     });
    // });
});