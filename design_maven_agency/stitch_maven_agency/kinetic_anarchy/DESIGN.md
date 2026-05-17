---
name: Kinetic Anarchy
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5e3f3a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#926e69'
  outline-variant: '#e8bdb6'
  surface-tint: '#c00000'
  primary: '#9e0000'
  on-primary: '#ffffff'
  primary-container: '#cc0000'
  on-primary-container: '#ffdad4'
  inverse-primary: '#ffb4a8'
  secondary: '#a04100'
  on-secondary: '#ffffff'
  secondary-container: '#fe6b00'
  on-secondary-container: '#572000'
  tertiary: '#003ec2'
  on-tertiary: '#ffffff'
  tertiary-container: '#0052f9'
  on-tertiary-container: '#dce1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930000'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#dce1ff'
  tertiary-fixed-dim: '#b7c4ff'
  on-tertiary-fixed: '#001551'
  on-tertiary-fixed-variant: '#0039b4'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  deep-black: '#0A0A0A'
  true-black: '#000000'
  paper-white: '#FFFFFF'
typography:
  display-2xl:
    fontFamily: Bebas Neue
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
spacing:
  border-width: 3px
  shadow-offset: 6px
  gutter: 24px
  section-padding: 80px
  container-max: 1440px
---

## Brand & Style

The design system is rooted in **Neo-Brutalism**, an aesthetic that rejects the polished, safe conventions of modern SaaS in favor of raw energy, high contrast, and editorial impact. It is designed for MAVEN Forge to feel like a "Digital Industrial Plant"—loud, confident, and unapologetically functional.

The style is characterized by:
- **High-Contrast Geometry:** Every element is defined by thick, pure black borders.
- **Asymmetrical Tension:** Layouts should feel slightly off-balance, utilizing staggered grids and overlapping elements to create movement.
- **Editorial Loudness:** Large-scale, all-caps typography mimics the urgency of a front-page newspaper headline.
- **Hard Shadows:** Depth is not achieved through blurs, but through solid, offset black blocks that give components a physical, "sticker-like" appearance.

## Colors

The palette is aggressive and high-contrast. **Primary Red** and **Accent Orange** are used to draw the eye to critical actions and numerical data. 

To maintain the "Editorial Newspaper" vibe, the design system alternates between "Day Mode" (White background with black text) and "Impact Mode" (Black background with white/red text) across sections. 

**Rules for Color Usage:**
- Use `#000000` exclusively for borders and hard shadows.
- Avoid any transparency or blurs; all colors must be 100% opaque.
- **Strictly no purple or gradients.** Colors are flat and solid to maintain the brutalist aesthetic.

## Typography

The typography strategy relies on the tension between the condensed, towering **Bebas Neue** and the technical, rhythmic **JetBrains Mono** (substituted for IBM Plex Mono for enhanced "techy" legibility).

- **Headlines:** Must always be uppercase. For maximum impact, use `display-2xl` for hero sections, ensuring the line height is tight to create a "wall of text" effect.
- **Body:** Use mono-spaced fonts for all paragraphs. This reinforces the "Forge/Industrial" theme.
- **Micro-copy:** Use labels with heavy weights and uppercase styling for buttons, tags, and table headers.

## Layout & Spacing

The layout utilizes a **12-column rigid grid** with visible or implied "gutters" that act as structural tracks for elements. 

- **Asymmetry:** On desktop, stagger columns (e.g., a 7-column image block next to a 4-column text block with a 1-column gap).
- **Hard Breaks:** Use `border-width` (3px) horizontal lines to separate website sections instead of standard whitespace.
- **Mobile Reflow:** On mobile, all elements stack into a single column. Maintain the 3px border on all card elements to keep the "boxed" feel.
- **Margins:** Use aggressive, consistent margins. Elements should never feel like they are floating; they should feel "locked" into their grid positions.

## Elevation & Depth

This design system rejects traditional Z-axis elevation (shadows and blurs). Instead, it uses **Tactile Layering**:

- **Hard Block Shadows:** Components (cards, buttons, inputs) feature a solid black offset shadow. The shadow does not have a blur radius. It is a literal copy of the element's shape, offset by `6px` to the bottom-right.
- **Overlapping Elements:** Depth is created by physically overlapping elements. A red badge might sit half-on and half-off a white card, with its own black border cutting through the card’s surface.
- **Inverted States:** For interaction, "elevation" is simulated by removing the shadow and shifting the element position by 6px, making it look "pressed" into the page.

## Shapes

The shape language is strictly **Sharp (0)**. There are no rounded corners in this design system. Every box, button, and image container must have 90-degree angles. This reinforces the "Brutalist" architectural influence and ensures the thick black borders meet at clean, aggressive points.

## Components

### Buttons
- **Primary:** Background `#CC0000`, Text `#FFFFFF`, 3px black border, 6px black hard shadow. All-caps Bebas Neue.
- **Hover/Active:** On hover, the shadow remains but the background shifts to `#FF6B00`. On click, the button translates 6px down/right and the shadow disappears to simulate a physical press.

### Cards & Service Blocks
- Every card must have a 3px black border.
- For the **Services** section, use alternating background blocks (Red, Orange, White, Black). 
- Use large "Index Numbers" (01, 02, etc.) in the top right corner of cards in Bebas Neue.

### Input Fields
- White background, 3px black border. No rounded corners.
- Placeholder text in JetBrains Mono, 50% opacity black.
- On focus, the border remains black but the field gains a 4px solid Orange "glow" (a second border) or a solid Orange hard shadow.

### Chips & Labels
- Small rectangular boxes with solid background colors (`#FF6B00` or `#CC0000`).
- Text is JetBrains Mono, Bold, Uppercase, White.

### Portfolio Masonry
- Images should have a 3px black border. 
- Captions should appear in a high-contrast black bar at the bottom of the image or as an overlapping "sticker" tag in a corner.