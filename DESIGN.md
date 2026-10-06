---
name: FoodCycle NC
description: A local-first field guide for keeping pantry food in circulation.
colors:
  forest: "#173e32"
  forest-deep: "#12352b"
  leaf: "#426e51"
  moss: "#78905f"
  citrus: "#f1c75b"
  tomato: "#df7656"
  paper: "#f5f7f1"
  white: "#fffefa"
  line: "#e5e9de"
  muted: "#6a786c"
  ink: "#24352b"
  soft-green: "#eaf0e3"
typography:
  display:
    fontFamily: "Segoe UI, Aptos, Helvetica Neue, sans-serif"
    fontSize: "clamp(38px, 4.1vw, 56px)"
    fontWeight: 760
    lineHeight: 0.99
    letterSpacing: "-2.5px"
  title:
    fontFamily: "Segoe UI, Aptos, Helvetica Neue, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.55px"
  body:
    fontFamily: "Segoe UI, Aptos, Helvetica Neue, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Segoe UI, Aptos, Helvetica Neue, sans-serif"
    fontSize: "9px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.35px"
rounded:
  xs: "3px"
  sm: "5px"
  md: "7px"
  lg: "13px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "39px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "39px"
---

# Design System: FoodCycle NC

## Overview

**Creative North Star: "The Neighborhood Field Ledger"**

The system pairs the practical clarity of a pantry ledger with the lively marks of a local harvest board. A dark forest rail anchors a pale working field; yellow, leaf green, and tomato red make the high-priority actions and expiry states easy to scan. System sans-serif lettering keeps the work legible on a shared device or small kitchen screen.

Lists stay flat and readable, with slim rules and honest sample-data labels doing more work than ornamental containers. The North Carolina produce illustration gives the expiry page an authored, recognizably food-centered opening without implying a live photograph or verified partnership.

**Key Characteristics:**
- Forest-green navigation and harvest-yellow primary actions.
- A date-first pantry ledger with plain-language expiry labels.
- Compact crop illustrations and lightly ruled community boards.
- Sample listings and local-only actions clearly identified as demonstrations.

## Colors

The palette uses named produce roles across a light field: deep forest for structure, leaf and moss for community stock, citrus for emphasis, and tomato for urgency.

### Primary
- **Forest** (#173e32): Navigation rail and primary actions; the stable anchor for the workspace.
- **Citrus** (#f1c75b): Active navigation and key add/harvest accents.
- **Tomato** (#df7656): Time-sensitive expiry state and produce accents.

### Secondary
- **Leaf** (#426e51): Community and available-stock accents.
- **Moss** (#78905f): Secondary harvest details and fresh status.

### Neutral
- **Paper** (#f5f7f1): Application background.
- **White** (#fffefa): Dialog and produce-listing surfaces.
- **Ink** (#24352b): Main copy.
- **Muted** (#6a786c): Supporting copy.
- **Line** (#e5e9de): List rules and dividers.
- **Soft Green** (#eaf0e3): Selected and supportive states.

**The Named-Status Rule.** Color reinforces the pantry state but never replaces its written label.

## Typography

**Display Font:** Segoe UI (with Aptos, Helvetica Neue, sans-serif fallbacks)
**Body Font:** Segoe UI (with Aptos, Helvetica Neue, sans-serif fallbacks)
**Label Font:** The same platform sans-serif stack

**Character:** Clear and sturdy, with close display tracking and compact, direct controls. The restrained type system keeps dates, amounts, and food names at the center.

### Hierarchy
- **Display** (760, `clamp(38px, 4.1vw, 56px)`, `.99` line-height): Primary workspace and board headings.
- **Title** (700, `21px`, `1.2` line-height): Main section titles and dialog headings.
- **Body** (400, `12px`, `1.65` line-height): Introductory and explanatory copy.
- **Label** (700, `9px`, `.35px` tracking): Compact metadata and action detail.

**The Plain-Label Rule.** Use sentence case for controls and human-readable dates; reserve uppercase labels for compact location and status metadata.

## Layout

The workspace uses a fixed 255px desktop navigation rail and a fluid main area capped at 1210px. The expiry list is the leading surface: food name, quantity, storage, expiry, and row actions share a ruled ledger. Tablet layouts hide nonessential columns and wrap actions. At 640px and below, navigation moves behind a menu, board controls stack, and inventory rows simplify for narrow screens. Spacing is deliberately compact around list details, with larger gaps before major sections.

## Elevation & Depth

The interface is flat by default; tonal surfaces and fine rules define the working areas. The modal alone uses a soft offset shadow (`0 18px 46px rgb(33 56 39 / 12%)`) above a darkened backdrop. The harvest illustration stays matte and vector-drawn.

## Shapes

Controls use practical 3–7px radii. The leaf mark and food-category markers carry the rounded silhouettes; inventory stays a ruled ledger rather than a stack of generic cards. Status labels are compact rectangles and dialog corners remain square-edged.

## Components

### Buttons
- **Shape:** Small, practical corners (5px).
- **Primary:** Forest green with white text, a citrus action detail, `0 14px` padding, and 39px minimum height.
- **Hover / Focus:** Shift to a lighter forest with a small lift; focus uses a visible 3px citrus outline.
- **Outline:** Transparent at rest with a fine gray-green border; gains a soft-green surface on hover.

### Chips
- **Style:** Compact, lightly rounded labels with tonal fills.
- **State:** Use Soon/expired is tomato-tinted; fresh is leaf-tinted; both include explicit text.

### Cards / Containers
- **Corner Style:** Small radii, generally 3–5px for listing and pantry surfaces.
- **Background:** White for sample listings; soft, named color fields for the hero and destination band.
- **Shadow Strategy:** Flat at rest; use the modal shadow only for dialog elevation.
- **Border:** One-pixel pale green-gray rules around discrete listings and fine dividers within ledgers.
- **Internal Padding:** Common compact intervals of 12–18px.

### Inputs / Fields
- **Style:** White input surfaces with a one-pixel green-gray stroke and small corners.
- **Focus:** A clear 3px citrus outline.
- **Error / Disabled:** Error copy is explicit; unavailable listing and transfer actions are disabled with muted styling and a text label.

### Navigation

Use the deep-green vertical rail with clear icon-and-label buttons. Hover states use a forest tint; the active item uses a citrus fill and dark text. At 640px, slide the rail in from the left behind the menu button.

### Pantry Expiry Ledger

Keep the food name and date visible together, quantity and storage aligned as secondary columns, and the use/share/remove actions at the row end. On small screens, retain the expiry label next to the food name and place actions directly beneath the item.

## Do's and Don'ts

### Do:
- **Do** keep expiry dates and next actions visible together.
- **Do** label sample farms, pantry partners, destinations, and transactions as demo data.
- **Do** show the chosen pickup or delivery destination before recording a claim.
- **Do** make stock changes and notifications explicit local-demo events.
- **Do** preserve keyboard focus and readable actions at every breakpoint.

### Don't:
- **Don't** imply live availability, verified partners, confirmed pickups, food transfers, or measured impact.
- **Don't** use gradients or decorative metric rings in place of actual pantry content.
- **Don't** hide the expiry workflow behind a board or modal.
