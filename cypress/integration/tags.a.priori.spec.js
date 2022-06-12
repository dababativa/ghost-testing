import { AdminPage, LoginPage, TagsPage } from "./pages";
describe("Tags functionalities a priori", () => {
    before(() => {
        cy.visit(Cypress.env("login_url"));
        self.loginPage = new LoginPage();
        self.adminPage = new AdminPage(
            Cypress.env("ghost_port")
        );
        self.strangeString = "!@#$%^&*()-_=+{}[]|\\''\"\";:.>,</?`~áéíóú´"
        self.tagsPage = new TagsPage();
        loginPage.login(Cypress.env("username"), Cypress.env("password"));
        cy.wait(3000);
        self.adminPage.navigateToTags();
        cy.wait(1000);
        self.tagsPage.deleteAllExistingTags();
        cy.wait(1000);
        self.adminPage.signOut();

    });

    beforeEach(() => {
        cy.visit(Cypress.env("login_url"));
        self.loginPage.login(Cypress.env("username"), Cypress.env("password"));
        cy.wait(2000);
        self.adminPage.navigateToTags();
        cy.wait(2000);
    });

    it("Test create tag correctly", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[0];
            self.tagsPage.createTag(tag.name, tag.description, tag.slug, tag.color.substring(1));
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.assertTagWithTagNameExists(tag.name);
            cy.wait(1000);
        });
    });
    it("Test create no name", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[1];
            self.tagsPage.createTag("", tag.description, tag.slug, tag.color.substring(1));
            cy.wait(1000);
        });
    });
    it("Test create tag no slug", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[2];
            self.tagsPage.createTag(tag.name, tag.description, "", tag.color.substring(1));
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
        });
    });

    it("Test create tag no description", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[3];
            self.tagsPage.createTag(tag.name, "", tag.slug, tag.color.substring(1));
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
        });
    });

    it("Test create tag no color", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[4];
            self.tagsPage.createTag(tag.name, tag.description, tag.slug, "");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.assertTagWithTagNameExists(tag.name);
            cy.wait(1000);
        });
    });

    it("Test create tag strange name", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[5];
            self.tagsPage.createTag(tag.name + self.strangeString, tag.description, tag.slug, tag.color.substring(1));
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.assertTagWithTagNameExists(tag.name + self.strangeString);
            cy.wait(1000);
        });
    });

    it("Test create tag strange slug", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[6];
            self.tagsPage.createTag(tag.name, tag.description, tag.slug + self.strangeString, tag.color.substring(1));
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.assertTagWithTagNameExists(tag.name);
            cy.wait(1000);
        });
    });

    it("Test create tag strange color", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[7];
            self.tagsPage.createTag(tag.name, tag.description, tag.slug, tag.color.substring(1) + self.strangeString);
            cy.wait(1000);
        });
    });
    it("Test edit tag no color", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[8];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name, tag.description, tag.slug, " ");
            cy.wait(5000);
        });
    });

    it("Test edit tag strange color", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[9];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name, tag.description, tag.slug, tag.color.substring(1) + self.strangeString);
            cy.wait(5000);
        });
    });
    it("Test create tag description over the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[10];
            const descriptionLength = tag.description.length;
            const descriptionModule = parseInt(500 / descriptionLength) + 1;
            const description = tag.description.repeat(descriptionModule);
            self.tagsPage.createTag(tag.name, description, tag.slug, tag.color.substring(1))
            cy.wait(1000);
        });
    });


    it("Test create tag name on the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[11];
            const nameLength = tag.name.length;
            const nameModule = parseInt(191 / nameLength) + 1;
            const name = tag.name.repeat(nameModule).substring(0, 191);
            self.tagsPage.createTag(name, tag.description, tag.slug, tag.color.substring(1))
            cy.wait(1000);
        });
    });

    it("Test create tag slug on the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[12];
            const slugLength = tag.slug.length;
            const slugModule = parseInt(191 / slugLength) + 1;
            const slug = tag.slug.repeat(slugModule).substring(0, 191);
            self.tagsPage.createTag(tag.name, tag.description, slug, tag.color.substring(1))
            cy.wait(1000);
        });
    });

    it("Test create tag description on the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[13];
            const descriptionLength = tag.description.length;
            const descriptionModule = parseInt(500 / descriptionLength) + 1;
            const description = tag.description.repeat(descriptionModule).substring(0, 500);
            self.tagsPage.createTag(tag.name, description, tag.slug, tag.color.substring(1))
            cy.wait(1000);
        });
    });

    it("Test create tag no data", () => {
        self.tagsPage.clickCreateTagButton();
        cy.wait(1000);
        self.tagsPage.clickSaveTagButton();
        cy.wait(1000);
    });

    it("Test edit tag correctly", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[14];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name, tag.description, tag.slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag no name", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[15];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", " ", tag.description, tag.slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag no slug", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[16];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name, tag.description, " ", tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag no description", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[17];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name, " ", tag.slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test create tag name over the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[18];
            const nameLength = tag.name.length;
            const nameModule = parseInt(191 / nameLength) + 1;
            const name = tag.name.repeat(nameModule);
            self.tagsPage.createTag(name, tag.description, tag.slug, tag.color.substring(1))
            cy.wait(1000);
        });
    });

    it("Test edit tag strange name", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[19];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name + self.strangeString, tag.description, tag.slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag strange slug", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[20];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            self.tagsPage.editTag("slug", tag.name, tag.description, tag.slug + self.strangeString, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag slug over the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[21];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            const slugLength = tag.slug.length;
            const slugModule = parseInt(191 / slugLength) + 1;
            const slug = tag.slug.repeat(slugModule);
            self.tagsPage.editTag("slug", tag.name, tag.description, slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag description over the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[22];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            const descriptionLength = tag.description.length;
            const descriptionModule = parseInt(501 / descriptionLength) + 1;
            const description = tag.description.repeat(descriptionModule);
            self.tagsPage.editTag("slug", tag.name, description, tag.slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });


    it("Test edit tag name over the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[23];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            const nameLength = tag.name.length;
            const nameModule = parseInt(191 / nameLength) + 1;
            const name = tag.name.repeat(nameModule);
            self.tagsPage.editTag("slug", name, tag.description, tag.slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });

    it("Test edit tag slug on the limit", () => {
        cy.fixture("TAGS_MOCK_DATA_POSITIVE.json").then((data) => {
            const tag = data[24];
            self.tagsPage.createTag("Editable tag", "This is the description of a new tag created that will then be edited using cypress", "slug", "FFFFFF");
            cy.wait(1000);
            self.adminPage.navigateToTags();
            cy.wait(1000);
            const slugLength = tag.slug.length;
            const slugModule = parseInt(191 / slugLength) + 1;
            const slug = tag.slug.repeat(slugModule).substring(0, 191);
            self.tagsPage.editTag("slug", tag.name, tag.description, slug, tag.color.substring(1));
            cy.wait(5000);
        });
    });













});
