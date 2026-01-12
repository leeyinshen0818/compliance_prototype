## Application Details

|                                                                                                |
| ---------------------------------------------------------------------------------------------- |
| **Generation Date and Time**<br>Mon Jan 05 2026 13:51:57 GMT+0000 (Coordinated Universal Time) |
| **App Generator**<br>SAP Fiori Application Generator                                           |
| **App Generator Version**<br>1.20.0                                                            |
| **Generation Platform**<br>SAP Business Application Studio                                     |
| **Template Used**<br>Basic                                                                     |
| **Service Type**<br>None                                                                       |
| **Service URL**<br>N/A                                                                         |
| **Module Name**<br>compliance_prototype                                                        |
| **Application Title**<br>ComplyHR                                                              |
| **Namespace**<br>uthm.compliance                                                               |
| **UI5 Theme**<br>sap_horizon                                                                   |
| **UI5 Version**<br>1.143.2                                                                     |
| **Enable Code Assist Libraries**<br>False                                                      |
| **Enable TypeScript**<br>False                                                                 |
| **Add Eslint configuration**<br>False                                                          |

## compliance_prototype

ComplyHR is a Compliance & Reporting subsystem prototype for a University Human Resource (HR) system.

It is designed as a “Digital Watchdog” that helps HR teams:

- Monitor employee-related compliance (e.g., Malaysian Employment Act 1955 rules such as overtime limits, minimum wage).
- Detect and highlight issues early (alerts/violations) so HR can act before audits or penalties.
- Automate statutory reporting preparation (e.g., EPF, SOCSO, Income Tax) and keep a generation history.
- Maintain transparency with an audit trail of sensitive actions (who did what, when).

This repository contains a UI prototype built with SAPUI5 and local mock data (no backend service).

## What you will see in the prototype

The app is organized into 4 main tabs:

### 1) Executive Dashboard (Health Monitor)

The dashboard gives a quick “health status” of HR compliance.

- KPI tiles show high-level numbers (compliance score, active violations, reports generated, pending audits).
- A monthly trend helps HR see whether compliance is improving or declining over time.
- A critical alerts list highlights the most important issues.
- A “Run Compliance Scan” action simulates checking HR/payroll data and produces updated alerts.

### 2) Statutory Reporting (Automation Engine)

This section helps HR generate monthly statutory submissions.

- Choose a reporting month and report type (EPF/SOCSO/Tax).
- Generate a report (prototype simulates calculations and produces a downloadable CSV).
- A “Generation History” table keeps a record of reports created, period, and status.

### 3) Compliance Rules Configuration (Rulebook)

This section stores adjustable legal parameters used by the compliance scan.

- View current rule values (e.g., minimum wage, max overtime, EPF rates).
- Edit rule values through a simple dialog.
- Changes are recorded in the audit log and can immediately affect scan results.

### 4) System Audit Logs (Security Trail)

This section provides accountability and traceability.

- Shows a chronological list of important actions (scan executed, report generated, rule updated).
- Supports filtering/searching by actor/user so HR can quickly find relevant records.

## Data source (prototype)

This prototype uses a local JSON model (mock data) to simulate:

- HR inputs such as payroll, attendance/overtime, and employee profiles.
- Subsystem-owned records such as rules, violations, report history, and audit logs.

In a full implementation, these would be replaced by backend APIs / database tables.

### Starting the generated app

- This app was generated using SAP Fiori tools (Basic template). To launch the application locally, run the following from the project root folder:

```
    npm start
```

If you want to start without FLP preview (direct index.html):

```
    npm run start-noflp
```

#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version. (See https://nodejs.org)

   - Recommendation: Node 20 LTS.
   - Some environments (e.g., Node 22+) may cause UI5 CLI preview issues.

2. Install dependencies once:

```
    npm install
```

## SAP Business Application Studio (BAS) note (GitHub sync)

If you develop locally in VS Code and push to GitHub, you can keep BAS updated by pulling:

```
    git pull origin main
```

Tip: To avoid merge conflicts, it’s best to code in one environment (e.g., VS Code) and use BAS mainly for preview/deploy.

## Project structure (high level)

- `webapp/view/` – UI pages (XML views)
- `webapp/controller/` – Page logic (controllers)
- `webapp/model/` – Model helpers
- `webapp/i18n/` – Text resources

## Disclaimer

This is a prototype for demonstration and academic proposal purposes. Business rules, calculations, and report formats are simplified and use mock data.
