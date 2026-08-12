---
name: ITAPS
description: IT Asset & Provisioning System
colors:
  primary: "#4F46E5"
  secondary: "#7C3AED"
  background: "#F8FAFC"
  surface: "#FFFFFF"
  text-main: "#0F172A"
  text-muted: "#475569"
  outline: "#94A3B8"
  error: "#EF4444"
  success: "#10B981"
  warning: "#F59E0B"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "44px"
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: "36px"
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.06em"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  full: "9999px"
spacing:
  unit: "0.25rem"
  stack-gap: "1.5rem"
  grid-gutter: "1.5rem"
  container-padding: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  button-primary-hover:
    backgroundColor: "#4338CA"
---

# Design System: ITAPS

## Overview

**Creative North Star: "The Summer Engine"**

Stark, functional, and deeply operational. Design gets out of the way to prioritize data density and speed. We use glassmorphism and subtle animations to make repetitive tasks feel effortless, maintaining a high-throughput, energetic workflow for the intensive summer device turnaround.

**Key Characteristics:**
- High-contrast, unambiguous statuses.
- Glassmorphic layers over a bright slate background.
- Tactile, bold interactions tailored for high-speed scanning and triage.

## Colors

The palette is anchored by vibrant tech accents over a clean, icy slate foundation to prioritize readability and rapid scanning.

### Primary
- **Electric Indigo** (#4F46E5): Drives primary actions, active navigation states, and the heaviest interactive elements.

### Secondary
- **Vibrant Violet** (#7C3AED): Used in gradients and secondary accents to add a premium touch to the interface without overwhelming the data.

### Neutral
- **Background** (#F8FAFC): The foundational canvas; a very light slate that prevents stark-white eye strain during long shifts.
- **Surface** (#FFFFFF): Pure white for cards and floating containers, ensuring maximum contrast for data grids.
- **Text Main** (#0F172A): Deep slate for primary typography.
- **Text Muted** (#475569): Secondary slate for metadata, asset tags, and table headers.
- **Outline** (#94A3B8): Structural borders and dividers.

### Named Rules
**The Unambiguous Status Rule.** Status colors (error, success, warning, etc.) must always be used with high-contrast text on a heavily tinted container (e.g., `#065F46` text on `#D1FAE5` background) to ensure instant recognition on a busy floor.

## Typography

**Display Font:** Outfit (with sans-serif)
**Body Font:** Inter (with sans-serif)
**Label/Mono Font:** JetBrains Mono (with monospace)

**Character:** A highly legible, modern pairing. Outfit provides a geometric, confident structure for headings, while Inter and JetBrains Mono prioritize maximum readability for dense data and asset tags.

### Hierarchy
- **Display** (700, 36px, 44px): Page headers and primary dashboard metrics.
- **Headline** (600, 28px, 36px): Section headers and major card titles.
- **Title** (600, 20px, 28px): Sub-section headers and modal titles.
- **Body** (400, 16px, 24px): Primary table data, form inputs, and descriptive text.
- **Label** (600, 12px, 16px, uppercase): Table headers, status pills, and small UI hints.
- **Mono** (500, 13px, 20px): Asset tags, serial numbers, and logs.

## Layout

The system utilizes a comfortable but dense spatial model. We use a baseline `0.25rem` unit, with a standard `1.5rem` stack gap between components and a `2rem` padding for major containers. Data tables prioritize density with a compact `1rem` vertical padding.

## Elevation & Depth

Lifted and Layered. We use soft shadows and glassmorphic depth for high interactivity and clear visual hierarchy, ensuring the active task is always physically closest to the user.

### Shadow Vocabulary
- **Soft Small** (`0 2px 4px rgba(148,163,184,0.1)`): Standard card elevation and floating inputs.
- **Soft Medium** (`0 4px 6px rgba(148,163,184,0.1)`): Active hovered states and dropdowns.
- **Glow** (`0 0 20px rgba(79,70,229,0.3)`): Critical action focal points, like the 'Execute Engine' button.

## Shapes

Bold and friendly. The interface relies on generous corner radii (default `0.5rem`, up to `1rem` for large containers) to soften the dense data presentation, creating a modern, app-like feel rather than a rigid spreadsheet.

## Components

Bold, chunky, and unmistakable.

### Buttons
- **Shape:** Softly rounded (`0.5rem`).
- **Primary:** Electric Indigo background with pure white text. Employs a distinct transform micro-animation on hover (`hover-lift`).
- **Hover / Focus:** Lifts slightly (`-2px`) and intensifies the shadow to invite interaction.

### Cards / Containers
- **Corner Style:** Rounded (`0.75rem` to `1rem`).
- **Background:** Pure white (`#FFFFFF`) or a frosted glassmorphic treatment (`rgba(255, 255, 255, 0.7)` with blur).
- **Shadow Strategy:** Resting at Soft Small, lifting to Soft Medium on interaction.

### Status Badges (Chips)
- **Style:** Fully rounded (`9999px`) pill shapes.
- **State:** Vivid background container with a deeply saturated text color and a subtle 20% opacity border for crisp edges.

## Do's and Don'ts

### Do:
- **Do** use the `hover-lift` utility for any element that invites a click or scan.
- **Do** use JetBrains Mono for any hardware identifiers (Asset Tags, Serial Numbers) to prevent character confusion.
- **Do** rely on glassmorphic panels for navigation to maintain context without crowding the viewport.

### Don't:
- **Don't** use standard HTML tables without the Soft Small shadow container; data must always feel lifted from the canvas.
- **Don't** mix status colors. A red element (`#EF4444`) must exclusively mean error, unrepairable, or awaiting parts.
