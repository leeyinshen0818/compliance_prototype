sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
    "sap/ui/core/util/File",
    "sap/ui/core/format/DateFormat"
],
    function (Controller, MessageToast, JSONModel, Filter, FilterOperator, Dialog, Button, Input, Label, FileUtil, DateFormat) {
        "use strict";

        return Controller.extend("uthm.compliance.complianceprototype.controller.MainView", {

            onInit: function () {
                // Initialize the ComplyHR in-memory model (prototype of the subsystem-owned tables + external inputs)
                var aRules = [
                    { id: "R001", parameter: "Minimum Wage", value: 1500, unit: "MYR" },
                    { id: "R002", parameter: "Max Overtime", value: 104, unit: "Hours" },
                    { id: "R003", parameter: "EPF Employee Rate", value: 11, unit: "%" },
                    { id: "R004", parameter: "EPF Employer Rate", value: 13, unit: "%" }
                ];

                var aAuditLogs = [
                    {
                        timestamp: "2025-10-05 09:30",
                        actorId: "User Ali",
                        actionType: "UPDATE_RULE",
                        details: "Updated EPF Employee Rate",
                        previousValue: "10%",
                        newValue: "11%"
                    },
                    {
                        timestamp: "2025-10-04 14:15",
                        actorId: "System",
                        actionType: "GENERATE_REPORT",
                        details: "Generated SOCSO report",
                        previousValue: "-",
                        newValue: "SOCSO Form 8A (Sep 2025)"
                    }
                ];

                var oData = {
                    entities: {
                        Compliance_Rule: aRules,
                        Compliance_Violation: [],
                        Statutory_Report_History: [],
                        Audit_Log: aAuditLogs
                    },

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
                            { key: "TAX", text: "Income Tax CP39" },
                            { key: "WORKFORCE", text: "Workforce Demographics" },
                            { key: "ATTRITION", text: "Attrition Analysis" }
                        ],
                        history: [
                            { id: "H001", type: "EPF Borang A", period: "Sep 2025", status: "Success", state: "Success", fileName: "EPF_Borang_A_Sep_2025.csv", mimeType: "text/csv", fileContent: "" },
                            { id: "H002", type: "SOCSO Form 8A", period: "Sep 2025", status: "Success", state: "Success", fileName: "SOCSO_Form_8A_Sep_2025.csv", mimeType: "text/csv", fileContent: "" },
                            { id: "H003", type: "Income Tax CP39", period: "Sep 2025", status: "Failed", state: "Error", fileName: "Income_Tax_CP39_Sep_2025.csv", mimeType: "text/csv", fileContent: "" }
                        ]
                    },

                    // 3. Compliance Rules Config Data
                    rules: aRules,

                    // 4. Audit Logs Data
                    auditLogs: aAuditLogs,

                    // External module inputs (simulated)
                    external: {
                        payroll: [
                            { employeeId: "E001", grossSalary: 1400, allowance: 50 },
                            { employeeId: "E002", grossSalary: 1800, allowance: 200 },
                            { employeeId: "E003", grossSalary: 1550, allowance: 0 }
                        ],
                        attendance: [
                            { employeeId: "E001", overtimeHours: 112 },
                            { employeeId: "E002", overtimeHours: 30 },
                            { employeeId: "E003", overtimeHours: 98 }
                        ],
                        employeeProfile: [
                            { employeeId: "E001", age: 24, gender: "F", licenseExpiry: "2025-09-20" },
                            { employeeId: "E002", age: 38, gender: "M", licenseExpiry: "2026-06-01" },
                            { employeeId: "E003", age: 45, gender: "F", licenseExpiry: "2025-10-15" }
                        ]
                    }
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                // Configure the chart visuals (sap.viz)
                var oTrendChart = this.byId("trendChart");
                if (oTrendChart) {
                    oTrendChart.setVizProperties({
                        plotArea: {
                            dataLabel: { visible: true },
                            marker: { visible: true }
                        },
                        valueAxis: {
                            title: { visible: false },
                            visible: true
                        },
                        categoryAxis: {
                            title: { visible: false }
                        },
                        legend: { visible: false },
                        title: { visible: false }
                    });
                }
            },

            _getRuleNumber: function (sParameter) {
                var oModel = this.getView().getModel();
                var aAllRules = oModel.getProperty("/rules") || [];
                var oRule = aAllRules.find(function (r) { return r.parameter === sParameter; });
                var n = oRule ? Number(oRule.value) : NaN;
                return Number.isFinite(n) ? n : NaN;
            },

            _nowTimestamp: function () {
                var oFormatter = DateFormat.getDateTimeInstance({ pattern: "yyyy-MM-dd HH:mm" });
                return oFormatter.format(new Date());
            },

            _appendAuditLog: function (oEntry) {
                var oModel = this.getView().getModel();
                var aLogs = oModel.getProperty("/auditLogs") || [];
                aLogs.unshift({
                    timestamp: oEntry.timestamp || this._nowTimestamp(),
                    actorId: oEntry.actorId || "System",
                    actionType: oEntry.actionType || "UNKNOWN",
                    details: oEntry.details || "",
                    previousValue: oEntry.previousValue == null ? "-" : String(oEntry.previousValue),
                    newValue: oEntry.newValue == null ? "-" : String(oEntry.newValue)
                });
                oModel.setProperty("/auditLogs", aLogs);
                oModel.setProperty("/entities/Audit_Log", aLogs);
            },

            _setDashboardFromViolations: function (aViolations) {
                var oModel = this.getView().getModel();
                var nViolationCount = (aViolations || []).filter(function (v) { return !v.resolved; }).length;
                oModel.setProperty("/dashboard/kpi/activeViolations", nViolationCount);

                // Simple score heuristic for prototype: 100 - (violations * 5), clamped
                var nScore = Math.max(0, Math.min(100, 100 - (nViolationCount * 5)));
                oModel.setProperty("/dashboard/kpi/complianceScore", nScore);

                // Update the current month datapoint in the 2025 trend array
                var aTrend = oModel.getProperty("/dashboard/trend") || [];
                var aMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var sNowMonth = aMonths[new Date().getMonth()];
                var iIdx = aTrend.findIndex(function (t) { return t.month === sNowMonth; });
                if (iIdx >= 0) {
                    aTrend[iIdx].score = nScore;
                    oModel.setProperty("/dashboard/trend", aTrend);
                }

                // Critical Alerts panel mirrors unresolved violations (top 10)
                var aAlerts = (aViolations || [])
                    .filter(function (v) { return !v.resolved; })
                    .slice(0, 10)
                    .map(function (v) {
                        return {
                            type: v.severity,
                            message: v.message,
                            date: v.detectedAt
                        };
                    });
                oModel.setProperty("/dashboard/alerts", aAlerts);
            },

            _runComplianceScan: function () {
                var oModel = this.getView().getModel();

                var nMinWage = this._getRuleNumber("Minimum Wage");
                var nMaxOvertime = this._getRuleNumber("Max Overtime");

                var aPayroll = oModel.getProperty("/external/payroll") || [];
                var aAttendance = oModel.getProperty("/external/attendance") || [];
                var aProfiles = oModel.getProperty("/external/employeeProfile") || [];

                var oAttendanceByEmp = aAttendance.reduce(function (acc, row) {
                    acc[row.employeeId] = row;
                    return acc;
                }, {});

                var oProfileByEmp = aProfiles.reduce(function (acc, row) {
                    acc[row.employeeId] = row;
                    return acc;
                }, {});

                var aViolations = [];
                var sDetectedAt = DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }).format(new Date());

                aPayroll.forEach(function (p) {
                    var oAtt = oAttendanceByEmp[p.employeeId] || { overtimeHours: 0 };
                    if (Number.isFinite(nMaxOvertime) && oAtt.overtimeHours > nMaxOvertime) {
                        aViolations.push({
                            id: "V_" + p.employeeId + "_OT",
                            employeeId: p.employeeId,
                            type: "OVERTIME_LIMIT",
                            severity: "Critical",
                            message: "Overtime Breach: " + p.employeeId + " exceeded " + nMaxOvertime + " hours (" + oAtt.overtimeHours + ")",
                            detectedAt: sDetectedAt,
                            resolved: false
                        });
                    }

                    if (Number.isFinite(nMinWage) && p.grossSalary < nMinWage) {
                        aViolations.push({
                            id: "V_" + p.employeeId + "_WAGE",
                            employeeId: p.employeeId,
                            type: "MIN_WAGE",
                            severity: "Critical",
                            message: "Below Minimum Wage: " + p.employeeId + " salary RM " + p.grossSalary + " < RM " + nMinWage,
                            detectedAt: sDetectedAt,
                            resolved: false
                        });
                    }

                    var oProfile = oProfileByEmp[p.employeeId];
                    if (oProfile && oProfile.licenseExpiry) {
                        var dExpiry = new Date(oProfile.licenseExpiry);
                        var dNow = new Date();
                        if (!Number.isNaN(dExpiry.getTime()) && dExpiry < dNow) {
                            aViolations.push({
                                id: "V_" + p.employeeId + "_CERT",
                                employeeId: p.employeeId,
                                type: "CERT_EXPIRED",
                                severity: "Warning",
                                message: "Expired Certification: " + p.employeeId + " license expired on " + oProfile.licenseExpiry,
                                detectedAt: sDetectedAt,
                                resolved: false
                            });
                        }
                    }
                });

                oModel.setProperty("/entities/Compliance_Violation", aViolations);
                this._setDashboardFromViolations(aViolations);
                return aViolations;
            },

            // --- 1. Dashboard Actions ---
            onRunScan: function () {
                MessageToast.show("Running compliance scan...");
                var aViolations = this._runComplianceScan();

                this._appendAuditLog({
                    actorId: "System",
                    actionType: "RUN_COMPLIANCE_SCAN",
                    details: "Labor law validation executed",
                    previousValue: "-",
                    newValue: aViolations.length + " violation(s) detected"
                });
            },

            // --- 2. Reporting Actions ---
            onGenerateReport: function () {
                var oView = this.getView();
                var oSelected = oView.byId("reportTypeSelect").getSelectedItem();
                var sType = oSelected ? oSelected.getText() : "Report";
                var sTypeKey = oSelected ? oSelected.getKey() : "UNKNOWN";
                var sDate = oView.byId("reportDate").getValue();

                if (!sDate) {
                    MessageToast.show("Please select a month first!");
                    return;
                }

                MessageToast.show("Generating " + sType + "...");

                var oModel = this.getView().getModel();
                var aPayroll = oModel.getProperty("/external/payroll") || [];
                var nEpfEmp = this._getRuleNumber("EPF Employee Rate");
                var nEpfEr = this._getRuleNumber("EPF Employer Rate");

                // Prototype output: CSV "Excel" with rule-driven calculations
                var aLines = [
                    "EmployeeId,GrossSalary,Allowance,EPF_Employee,EPF_Employer"
                ];
                aPayroll.forEach(function (p) {
                    var nGross = Number(p.grossSalary) || 0;
                    var nAllow = Number(p.allowance) || 0;
                    var nEpfEmployee = Number.isFinite(nEpfEmp) ? (nGross * (nEpfEmp / 100)) : 0;
                    var nEpfEmployer = Number.isFinite(nEpfEr) ? (nGross * (nEpfEr / 100)) : 0;
                    aLines.push([
                        p.employeeId,
                        nGross.toFixed(2),
                        nAllow.toFixed(2),
                        nEpfEmployee.toFixed(2),
                        nEpfEmployer.toFixed(2)
                    ].join(","));
                });

                var sCsv = aLines.join("\n");
                var sSafeType = sType.replace(/[^a-z0-9]+/gi, "_");
                var sSafePeriod = sDate.replace(/[^a-z0-9]+/gi, "_");
                var sFileName = sSafeType + "_" + sSafePeriod + ".csv";

                // Download now (client-side), then persist history as Statutory_Report_History
                FileUtil.save(sCsv, sFileName, "csv", "text/csv", "utf-8");

                var aHistory = oModel.getProperty("/reporting/history") || [];
                var sId = "H" + String(Date.now());
                var oHistoryEntry = {
                    id: sId,
                    type: sType,
                    typeKey: sTypeKey,
                    period: sDate,
                    status: "Success",
                    state: "Success",
                    fileName: sFileName,
                    mimeType: "text/csv",
                    fileContent: sCsv
                };
                aHistory.unshift(oHistoryEntry);
                oModel.setProperty("/reporting/history", aHistory);

                var aTable = oModel.getProperty("/entities/Statutory_Report_History") || [];
                aTable.unshift(oHistoryEntry);
                oModel.setProperty("/entities/Statutory_Report_History", aTable);

                // KPI: reports generated (simple count for prototype)
                oModel.setProperty("/dashboard/kpi/reportsGenerated", aHistory.length);

                this._appendAuditLog({
                    actorId: "System",
                    actionType: "GENERATE_REPORT",
                    details: "Generated " + sType,
                    previousValue: "-",
                    newValue: sFileName
                });

                MessageToast.show(sType + " generated successfully!");
            },

            onDownloadHistory: function (oEvent) {
                var oCtx = oEvent.getSource().getBindingContext();
                if (!oCtx) {
                    MessageToast.show("No file available.");
                    return;
                }
                var oRow = oCtx.getObject();
                if (!oRow || !oRow.fileName || !oRow.fileContent) {
                    MessageToast.show("No file content stored for this record.");
                    return;
                }
                FileUtil.save(oRow.fileContent, oRow.fileName, "", oRow.mimeType || "text/plain", "utf-8");
            },

            // --- 3. Rules Config Actions ---
            onEditRule: function (oEvent) {
                var oCtx = oEvent.getSource().getBindingContext();
                if (!oCtx) {
                    return;
                }
                var oRule = oCtx.getObject();
                if (!oRule) {
                    return;
                }

                if (this._ruleDialog) {
                    this._ruleDialog.destroy();
                    this._ruleDialog = null;
                }

                var oInput = new Input({
                    width: "100%",
                    value: String(oRule.value),
                    type: "Number"
                });

                var oDialog = new Dialog({
                    title: "Edit Rule",
                    contentWidth: "420px",
                    content: [
                        new Label({ text: oRule.parameter + " (" + oRule.unit + ")" }),
                        oInput
                    ],
                    beginButton: new Button({
                        text: "Save",
                        type: "Emphasized",
                        press: function () {
                            var sNewVal = oInput.getValue();
                            var nNewVal = Number(sNewVal);
                            if (!Number.isFinite(nNewVal)) {
                                MessageToast.show("Please enter a valid number.");
                                return;
                            }

                            var oModel = this.getView().getModel();
                            var aRules = oModel.getProperty("/rules") || [];
                            var iIdx = aRules.findIndex(function (r) { return r.id === oRule.id; });
                            if (iIdx < 0) {
                                oDialog.close();
                                return;
                            }

                            var vPrev = aRules[iIdx].value;
                            aRules[iIdx].value = nNewVal;
                            oModel.setProperty("/rules", aRules);
                            oModel.setProperty("/entities/Compliance_Rule", aRules);

                            this._appendAuditLog({
                                actorId: "Compliance Officer",
                                actionType: "UPDATE_RULE",
                                details: "Updated " + oRule.parameter,
                                previousValue: vPrev + (oRule.unit ? " " + oRule.unit : ""),
                                newValue: nNewVal + (oRule.unit ? " " + oRule.unit : "")
                            });

                            // Immediate impact: re-run scan using updated rule thresholds
                            this._runComplianceScan();

                            MessageToast.show("Rule updated.");
                            oDialog.close();
                        }.bind(this)
                    }),
                    endButton: new Button({
                        text: "Cancel",
                        press: function () { oDialog.close(); }
                    }),
                    afterClose: function () { oDialog.destroy(); }
                });

                this._ruleDialog = oDialog;
                oDialog.open();
            },

            onSaveRule: function () {
                MessageToast.show("Rule saved successfully.");
            },

            // --- 4. Audit Log Actions ---
            onFilterLogs: function (oEvent) {
                var sQuery = (oEvent && oEvent.getParameter) ? oEvent.getParameter("query") : "";
                var oTable = this.byId("auditTable");
                if (!oTable) {
                    return;
                }
                var oBinding = oTable.getBinding("items");
                if (!oBinding) {
                    return;
                }

                if (sQuery) {
                    oBinding.filter([
                        new Filter("actorId", FilterOperator.Contains, sQuery)
                    ]);
                } else {
                    oBinding.filter([]);
                }
            },

            onPressAlerts: function () {
                MessageToast.show("Opening Alerts View...");
            },
            
            onPressTile: function() {
                MessageToast.show("Drilldown feature coming soon.");
            }
        });
    });