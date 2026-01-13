# Style Guide: Retro iOS Skeuomorphic Aesthetic

This guide outlines the visual language for a web application inspired by the classic iOS 6-era texting interface.

## 1. Color Palette

| Element                  | Hex Code  | Usage                                     |
| :----------------------- | :-------- | :---------------------------------------- |
| **Header Blue**          | `#738aba` | Top navigation bar base color.            |
| **Background Grey**      | `#cbd2d9` | Main application/conversation background. |
| **Sender Bubble (Grey)** | `#e5e5e5` | Incoming message bubbles.                 |
| **User Bubble (Green)**  | `#60db35` | Outgoing message bubbles (vibrant green). |
| **Text Primary**         | `#000000` | High-contrast black for readability.      |
| **Border Dark**          | `#999999` | Subtle strokes around UI elements.        |

## 2. Typography

- **Font Family:** `Helvetica Neue`, `Arial`, sans-serif.
- **Sizing:** \* Header: 20px, Bold (White text with subtle dark drop shadow).
  - Body: 16px, Regular (Black text).
- **Shadows:** Text in headers should have a `text-shadow: 0px -1px 0px rgba(0,0,0,0.5);` to appear etched.

## 3. Visual Effects (The "Gloss")

The signature look is achieved through layered gradients rather than flat colors.

### Header Gradient

A linear gradient from a lighter blue to a darker blue, often with a "highlight" line at the top.
`background: linear-gradient(to bottom, #b2bed7 0%, #738aba 50%, #5e77aa 50%, #526da4 100%);`

### Message Bubbles

- **Border Radius:** 15px - 20px for a soft, rounded look.
- **Gloss Overlay:** Use a top-down linear gradient that lightens the top half of the bubble significantly.
- **Drop Shadow:** `box-shadow: 0 1px 2px rgba(0,0,0,0.3);`
- **Stroke:** A 1px solid border slightly darker than the fill color.

## 4. UI Components

### Navigation Bar

- **Height:** 44px (Standard iOS height).
- **Buttons:** Rectangular with rounded corners (approx 5px). Use a "bezel" effect with a darker border and a glossy gradient fill.

### Text Input Field

- **Style:** White background with an inner shadow (`box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);`).
- **Border:** Solid light grey with rounded edges (15px-20px radius).

### The "Tail"

Message bubbles should include a small triangular "tail" at the bottom-left (incoming) or bottom-right (outgoing) to point toward the contact or user.

## 5. CSS Reference Snippet (Tailwind Concept)

If using Tailwind CSS, you can approximate the Green Bubble with:
`bg-gradient-to-b from-[#8ef26b] via-[#60db35] to-[#45b524] border-[#4fa331] rounded-2xl shadow-sm text-black px-4 py-2`
