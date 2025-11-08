# Inventory Management System (IMS)

A web-based inventory management system built with **React** and **Firebase**. This application allows businesses to track product inventory, manage stock levels, and get dashboard insights into their operations.

# Web and Mobile Application Development Project

This project was developed as a **final group project** for the **Bachelor of Science in Information Technology (BSIT)** program at **Bulacan State University**.  
It demonstrates the application of both **web and mobile development skills**, including **UI/UX design, database management, and full-stack programming**, showcasing the team’s technical proficiency and collaborative efforts throughout the course.
---

## About This Project

This project is a serverless, web-based application designed to solve common inventory challenges. It provides a clean, responsive interface for users to manage products, track stock, and visualize inventory health in real-time.

The system is built on modern web technologies, prioritizing **secure authentication**, a **reliable database backend**, and a **reactive, component-based frontend**.

---

## Core Features

- **Authentication**: Secure user registration and login (Email/Password & Social providers), including email verification and protected routes.
- **Onboarding**: Multi-step user onboarding flow, capturing personal profile information.
- **Inventory Management**: Full CRUD (Create, Read, Update, Delete) functionality for products.
- **Product Fields**:
  - Product Type: Single Product or Product with Variations
  - Stock Tracking: Quantity, Price, and Minimum Level
- **Dashboard**: Displays key inventory metrics:
  - Total Inventory Value
  - Total Units in Stock
  - Low Stock Item Count
- **Visualizations**: Responsive bar/area charts (via **Recharts**) visualizing stock levels against minimum required levels.
- **Responsive Design**: Fully responsive layout using **Bootstrap** and custom CSS.

---

## Key Components

- **AuthenticationLayout**: Protects routes and redirects logged-in users away from auth pages.
- **VerificationForm**: Handles email verification and status polling.
- **PersonalInfoForm**: Captures user details post-registration and checks if a profile exists.
- **InventoryDashboard**: Calculates and displays KPIs and renders stock level charts.
- **Sidebar**: Collapsible navigation component.

---

## Accessibility

This project follows **Web Content Accessibility Guidelines (WCAG)** and **ADA standards**, including semantic HTML, keyboard navigation, and appropriate color contrast.

---

## Technology Stack

This project uses a modern, serverless-first tech stack.

| **Category** | **Technology** | **Purpose** |
| :--- | :--- | :--- |
| **Frontend** | React | Core UI library for building components. |
| **Backend & DB** | Firebase | Used for Authentication, Realtime Database, and Hosting. |
| **Styling** | Bootstrap | For the responsive grid system and base components. |
| **Styling** | Vanilla CSS | For custom styling and easy team collaboration. |
| **Charting** | Recharts | To create the responsive inventory dashboard charts. |
| **DevOps** | Git & GitHub | For version control and (optional) CI/CD pipelines. |

---

## Authors

- **Charles Justine Mantes** - Main Developer
- **Allen Esguerra** - Assistant Developer
- **Clark Kent Mojados** - UI/UX Designer
- **John Iverson Relampagos** - Quality Assurance
- **Lenard Isidro** - Quality Assurance
