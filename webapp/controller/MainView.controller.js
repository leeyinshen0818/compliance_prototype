sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("project1.controller.MainView", {
            
            onInit: function () {
                // 1. Create Fake Data for the Table
                var oData = {
                    history: [
                        { type: "EPF Borang A", date: "Sep 2025", status: "Success", state: "Success" },
                        { type: "SOCSO Form 8A", date: "Sep 2025", status: "Success", state: "Success" },
                        { type: "Tax CP39", date: "Sep 2025", status: "Failed", state: "Error" }
                    ]
                };

                // 2. Bind Data to View
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            },

            onGenerateReport: function () {
                // Get inputs using IDs
                var sType = this.getView().byId("reportTypeSelect").getSelectedItem().getText();
                var sDate = this.getView().byId("reportDate").getValue();

                if (!sDate) {
                    MessageToast.show("Please select a month first!");
                    return;
                }

                MessageToast.show("Generating " + sType + "...");

                // Simulate adding a new row
                var that = this;
                setTimeout(function () {
                    var oModel = that.getView().getModel();
                    var aHistory = oModel.getProperty("/history");

                    aHistory.unshift({
                        type: sType,
                        date: sDate,
                        status: "Success",
                        state: "Success"
                    });

                    oModel.setProperty("/history", aHistory);
                    MessageToast.show("Report Generated Successfully!");
                }, 1500);
            },

            onPressAlerts: function () {
                MessageToast.show("Opening Alerts View...");
            },
            
            onPressTile: function() {
                MessageToast.show("Drilldown feature coming soon.");
            }
        });
    });