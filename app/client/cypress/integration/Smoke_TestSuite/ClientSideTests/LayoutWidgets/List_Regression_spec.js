const dsl = require("../../../../fixtures/listRegressionDsl.json");
const publish = require("../../../../locators/publishWidgetspage.json");
const testdata = require("../../../../fixtures/testdata.json");
const viewWidgetsPage = require("../../../../locators/ViewWidgets.json");
const commonlocators = require("../../../../locators/commonlocators.json");

describe("Binding the list widget with text widget", function() {
  const modifierKey = Cypress.platform === "darwin" ? "meta" : "ctrl";

  before(() => {
    cy.addDsl(dsl);
  });

  it("Validate text widget data based on changes in list widget Data1", function() {
    cy.PublishtheApp();
    cy.wait(5000);
    cy.get(".t--widget-textwidget span:contains('Vivek')").should(
      "have.length",
      1,
    );
    cy.get(".t--widget-textwidget span:contains('Pawan')").should(
      "have.length",
      1,
    );
    cy.get(publish.backToEditor).click({ force: true });
  });

  it.skip("Validate text widget data based on changes in list widget Data2", function() {
    cy.SearchEntityandOpen("List1");
    cy.updateComputedValue(
      '[[{ "name": "pawan"}, { "name": "Vivek" }], [{ "name": "Ashok"}, {"name": "rahul"}]]',
    );
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.SearchEntityandOpen("Text3");
    cy.wait(3000);
    cy.updateComputedValue("{{currentItem.map(item => item.name).join(", ")}}");
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.PublishtheApp();
    cy.wait(5000);
    cy.get(".t--widget-textwidget span:contains('pawan,Vivek')").should(
      "have.length",
      1,
    );
    cy.get(".t--widget-textwidget span:contains('Ashok,rahul')").should(
      "have.length",
      1,
    );
    cy.get(publish.backToEditor).click({ force: true });
  });

  it.skip("Validate text widget data based on changes in list widget Data3", function() {
    cy.SearchEntityandOpen("List1");
    cy.updateComputedValue('[{ "name": "pawan"}, { "name": "Vivek" }]');
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.SearchEntityandOpen("Text3");
    cy.wait(3000);
    cy.updateComputedValue("{{currentItem.name}}");
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    cy.PublishtheApp();
    cy.wait(5000);
    cy.get(".t--widget-textwidget span:contains('Vivek')").should(
      "have.length",
      2,
    );
    cy.get(".t--widget-textwidget span:contains('pawan')").should(
      "have.length",
      2,
    );
    cy.get(publish.backToEditor).click({ force: true });
  });

  it("Validate delete widget action from sidebar", function() {
    //cy.SearchEntityandOpen("List1");
    cy.openPropertyPane("listwidget");
    cy.widgetText(
      "Test",
      viewWidgetsPage.listWidget,
      commonlocators.containerInnerText,
    );

    cy.get(".t--delete-widget").click({ force: true });
    cy.get(".t--toast-action span")
      .eq(0)
      .contains("List1 is removed");
    cy.wait("@updateLayout").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
  });
});
