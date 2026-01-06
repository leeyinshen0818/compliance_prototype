/*global QUnit*/

sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], function (XMLView) {
	"use strict";

	QUnit.module("MainView Controller");

	QUnit.test("MainView loads and sets a model", function (assert) {
		var done = assert.async();
		XMLView.create({
			viewName: "uthm.compliance.complianceprototype.view.MainView"
		}).then(function (oView) {
			assert.ok(oView, "View created");
			assert.ok(oView.getModel(), "Default model is set");
			oView.destroy();
			done();
		});
	});

});
