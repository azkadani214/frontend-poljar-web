# Frontend Implementation Planning: Organization & User Management

## 1. Overview

This document outlines the comprehensive planning for the Frontend implementation of the Organization and User Management modules in the Poljar Web Application. The goal is to ensure full functionality, data consistency, and a premium "Wow" user experience consistent with the Shadcn Vue design system.

## 2. Current Status

- **Organization**: Division, Position, and Membership management are implemented with CRUD operations and filtering.
- **Users**: User list, Details, Create/Edit (with Roles), and Password management are functional.
- **Roles**: Backend supports `administrator`, `admin`, `penulis`. Frontend allows assigning these roles to users.

## 3. Detailed Implementation Plan

### 3.1. Organization Module (`/admin/organization`)

**Goal**: A central hub for managing the company structure.

#### A. Divisions & Positions (Completed ✅)

- [x] List View with Counts (Positions/Members).
- [x] Create/Edit/Delete Modals.
- [x] Data Validation & Error Handling.

#### B. Memberships (Refined ✅)

- [x] Filter by Division & Search by Name/Position.
- [x] Status Toggle (Active/Inactive).
- [x] Direct User Linkage.

#### C. Organizational Chart (Pending 🚧)

- **Objective**: Visual representation of the hierarchy.
- **Tech**: D3.js or Vue Flow.
- **Features**:
  - Interactive tree view.
  - Zoom/Pan capabilities.
  - Click to view member details.
  - Export to Image/PDF.

### 3.2. User Management (`/admin/users`)

**Goal**: Comprehensive user administration with role-based access control.

#### A. User List & Actions (Completed ✅)

- [x] DataTable with Avatar, Name, Email, Roles, Status.
- [x] Advanced Filters (Status, Division, Role).
- [x] Bulk Actions (Activate/Deactivate).

#### B. User Details & Editing (Completed ✅)

- [x] Profile Photo Upload with localized preview.
- [x] Role Assignment (Multiple roles).
- [x] Membership History View (integrated in Detail Modal).
- [x] Password Reset functionality.

#### C. Activity Logs (Planned 📅)

- **Objective**: Track user actions for security.
- **Features**:
  - Log login/logout events.
  - Log data modification events (Create/Update/Delete).
  - Viewable in User Detail modal.

### 3.3. Role & Permission Management (Planned 📅)

**Goal**: Granular control over system access.

#### A. Dedicated Role Page (`/admin/roles`)

- **Objective**: Manage creating custom roles beyond the defaults.
- **Features**:
  - List of all roles.
  - Create/Edit Role with Label and Description.

#### B. Permission Matrix

- **Objective**: Assign specific granular permissions to roles.
- **Interface**:
  - Grid view: Rows (Resources: News, Users, etc.) x Columns (Actions: Create, Read, Update, Delete).
  - Checkbox toggles for each permission.
  - "Select All" helpers.

### 3.4. UI/UX & Theming Strategy

**Goal**: Consistent, Premium, and Responsive design.

- **Component Library**: Strict adherence to Shadcn Vue components (Card, Button, Dialog, Dropdown, Table, Badge).
- **Color Palette**:
  - Primary: Navy (`bg-primary-navy`) for main actions and headers.
  - Secondary: Orange (`text-primary-orange`) for highlights and calls to action.
  - Status Colors: Green (Active), Red (Inactive/Error), Blue (Info).
- **Interactions**:
  - **Micro-animations**: Hover effects on cards and table rows.
  - **Loading States**: Skeletons or Spinners for all async actions.
  - **Feedback**: Toast notifications for all success/error events.
- **Responsive**:
  - Tables: Horizontal scroll on mobile or Card view on very small screens.
  - Modals: Full screen on mobile, centered dialog on desktop.

## 4. Technical Architecture Consistency

### Service Layer Pattern

All API calls must go through `src/services/*.service.js`.

- `organization.service.js`: Handles Divisions, Positions, Memberships.
- `user.service.js`: Handles Users, Roles, Profile.

### State Management

- Use Vue `ref`/`reactive` for local component state.
- Use explicit `isLoading` and `isSaving` flags for UI feedback.
- Use `computed` for client-side filtering and sorting where appropriate.

## 5. Next Steps Execution

1.  **Verification**: Test the "Role" assignment flow in User Create/Edit.
2.  **Role Page**: Create `src/views/admin/roles/Index.vue` if custom role creation is needed.
3.  **Org Chart**: Research and select a light Vue-compatible charting library for the "Visual Chart" tab.
