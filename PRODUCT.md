# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (`/app`), React, Tailwind CSS 4, Node.js, Express (`/server`), SQLite.

## Users

- **IT Support Interns:** Process high-speed intakes, triage devices, log repairs, and cannibalize donor devices. Operating via mobile/tablet or barcode scanners during the summer turnaround.
- **IT Store Manager:** Manages overall inventory, tracks repair throughput, and oversees device availability.
- **Sysadmin:** Executes batch device assignments and oversees allocation rules.

## Product Purpose

The IT Asset & Provisioning System (ITAPS) eliminates spreadsheet bottlenecks and manual errors during the intensive summer device turnaround. It manages the entire lifecycle of student devices (Chromebooks and iPads)—from collection and triage to automated reassignment for the upcoming academic year.

## Operating Context

- Used primarily during the intensive summer device turnaround period.
- Operations involve high-speed barcode scanning, physical device handling, and moving hardware through intake, triage, and repair stations.
- Relies heavily on visual scanning of asset tags and real-time inventory counts.

## Capabilities and Constraints

- Decoupled full-stack architecture (frontend in Next.js, API in Express).
- Role-based access control based on active IT department roles.
- Needs to support high-throughput operations with clear, unambiguous visual feedback for success/error states (e.g., Hydration mismatch constraints mean avoiding dynamic time components like `Date.now()` without mounted state).

## Brand Commitments

- **Name:** ITAPS (IT Asset & Provisioning System).
- **Theme:** "Modern Premium Light" featuring glassmorphism, Indigo/Violet gradients, and micro-animations to create a delightful, beautiful, and easy-to-use interface.
- **Typography:** Outfit (headings/primary) and JetBrains Mono (asset tags/data).
