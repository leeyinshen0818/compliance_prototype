sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("project1.controller.MainView", {

            onInit: function () {
                // Initialize the ComplyHR Mock Data Model
                var oData = {
                    // 1. Executive Dashboard Data
                    dashboard: {
                        kpi: {
                            complianceScore: 98.5,
                            activeViolations: 3,
                            reportsGenerated: 12,
                            pendingAudits: 5
                        },
                        trend: [
                            { month: "Jan", score: 92 },
                            { month: "Feb", score: 94 },
                            { month: "Mar", score: 95 },
                            { month: "Apr", score: 93 },
                            { month: "May", score: 96 },
                            { month: "Jun", score: 97 },
                            { month: "Jul", score: 98 },
                            { month: "Aug", score: 96 },
                            { month: "Sep", score: 99 },
                            { month: "Oct", score: 98 },
                            { month: "Nov", score: 99 },
                            { month: "Dec", score: 98 }
                        ],
                        alerts: [
                            { type: "Critical", message: "Overtime Breach: Staff #123 exceeded 104 hours", date: "2025-10-05" },
                            { type: "Warning", message: "EPF Contribution mismatch for Staff #456", date: "2025-10-04" },
                            { type: "Info", message: "New labor law amendment detected", date: "2025-10-01" }
                        ]
                    },

                    // 2. Statutory Reporting Data
                    reporting: {
                        types: [
                            { key: "EPF", text: "EPF Borang A" },
                            { key: "SOCSO", text: "SOCSO Form 8A" },
                            { key: "TAX", text: "Income Tax CP39" }
                        ],
                        history: [
                            { type: "EPF Borang A", period: "Sep 2025", status: "Success", state: "Success" },
                            { type: "SOCSO Form 8A", period: "Sep 2025", status: "Success", state: "Success" },
                            { type: "Income Tax CP39", period: "Sep 2025", status: "Failed", state: "Error" }
                        ]
                    },

                    // 3. Compliance Rules Config Data
                    rules: [
                        { id: "R001", parameter: "Minimum Wage", value: 1500, unit: "MYR" },
                        { id: "R002", parameter: "Max Overtime", value: 104, unit: "Hours" },
                        { id: "R003", parameter: "EPF Employee Rate", value: 11, unit: "%" },
                        { id: "R004", parameter: "EPF Employer Rate", value: 13, unit: "%" },
                        { id: "R005", parameter: "Retirement Age", value: 60, unit: "Years" }
                    ],

                    // 4. Audit Logs Data
                    auditLogs: [
                        { date: "2025-10-05 09:30", user: "User Ali", action: "Updated EPF Rate to 11%" },
                        { date: "2025-10-04 14:15", user: "System", action: "Generated SOCSO Report" },
                        { date: "2025-10-03 11:00", user: "User Siti", action: "Acknowledged Overtime Alert" },
                        { date: "2025-10-01 08:45", user: "Admin", action: "System Backup Completed" }
                    ]
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            },

            // --- 1. Dashboard Actions ---
            onRunScan: function () {
                MessageToast.show("Scanning payroll data for violations...");
                // Simulation logic to be added
            },

            // --- 2. Reporting Actions ---
            onGenerateReport: function () {
                var oView = this.getView();
                var sType = oView.byId("reportTypeSelect").getSelectedItem().getText();
                var sDate = oView.byId("reportDate").getValue();

                if (!sDate) {
                    MessageToast.show("Please select a month first!");
                    return;
                }

                MessageToast.show("Generating " + sType + "...");

                // Simulate delay and update history
                var that = this;
                setTimeout(function () {
                    var oModel = that.getView().getModel();
                    var aHistory = oModel.getProperty("/reporting/history");
                    
                    aHistory.unshift({
                        type: sType,
                        period: sDate,
                        status: "Success",
                        state: "Success"
                    });
                    oModel.setProperty("/reporting/history", aHistory);
                    MessageToast.show(sType + " generated successfully!");
                }, 1500);
            },

            // --- 3. Rules Config Actions ---
            onEditRule: function (oEvent) {
                var oItem = oEvent.getSource().getBindingContext().getObject();
                MessageToast.show("Edit rule: " + oItem.parameter);
            },

            onSaveRule: function () {
                MessageToast.show("Rule saved successfully.");
            },

            // --- 4. Audit Log Actions ---
            onFilterLogs: function () {
                MessageToast.show("Filtering logs...");
            },

            onPressAlerts: function () {
                MessageToast.show("Opening Alerts View...");
            },
            
            onPressTile: function() {
                MessageToast.show("Drilldown feature coming soon.");
            }
        });
    });