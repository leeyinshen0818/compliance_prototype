# 🛡️ ComplyHR

**University HR Compliance & Statutory Reporting Subsystem (Prototype)**

**Client:** Universiti Tun Hussein Onn Malaysia (UTHM)  
**Tech Stack:** SAPUI5 • SAP Business Application Studio • VS Code

---

## 📌 About the Project

**ComplyHR** is a Compliance & Reporting subsystem prototype for a university Human Resource (HR) system.

It acts as a **“Digital Watchdog”** to help HR teams:

- Monitor employee compliance with Malaysian labour laws  
  _(e.g. minimum wage, overtime limits, EPF rules)_
- Detect issues early through alerts and violations
- Automate statutory report preparation  
  _(EPF, SOCSO, Income Tax)_
- Maintain transparency using a full audit trail  
  _(who did what, and when)_

This repository contains a **UI-only prototype** built with **SAPUI5** using **local mock data** (no backend).

---

## 🧭 Application Overview

The prototype is organized into **4 main modules**:

| Module                  | Purpose                             |
| ----------------------- | ----------------------------------- |
| **Executive Dashboard** | Shows the overall compliance health |
| **Statutory Reporting** | Generates EPF, SOCSO & Tax reports  |
| **Rulebook**            | Manages legal & HR compliance rules |
| **Audit Logs**          | Tracks all sensitive system actions |

---

## 🖥️ 1) Executive Dashboard

**(Health Monitor)**

Provides a quick overview of HR compliance status.

Features:

- KPI tiles (compliance score, violations, reports, audits)
- Monthly compliance trend
- Critical alerts list
- **Run Compliance Scan** (simulates checking payroll & HR data)

---

## 📄 2) Statutory Reporting

**(Automation Engine)**

Used to prepare government reports.

Features:

- Select reporting month & type (EPF / SOCSO / Income Tax)
- Generate reports (CSV – simulated)
- Generation History (period, report type, status)

---

## 📚 3) Compliance Rules

**(Rulebook)**

Stores all legal parameters used by the system.

Features:

- View rules (minimum wage, overtime limit, EPF rate, etc.)
- Edit rules via dialog
- Changes are:
  - Applied immediately to compliance scans
  - Logged in the audit trail

---

## 🔐 4) System Audit Logs

**(Security Trail)**

Ensures accountability and traceability.

Features:

- Time-ordered list of system actions  
  _(scan run, report generated, rule updated, etc.)_
- Filter by user or keyword to quickly find records

---

## 🗃️ Data Source (Prototype)

This app uses **local JSON (mock data)** to simulate:

- Employee profiles
- Payroll & overtime
- Compliance rules
- Violations
- Report history
- Audit logs

In a real system, these would come from backend APIs and databases.

---

## 🚀 Running the App

This project was generated using **SAP Fiori Tools (Basic Template)**.

### Install dependencies (once)

```bash
npm install
```
