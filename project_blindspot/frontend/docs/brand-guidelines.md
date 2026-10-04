# PromptWars Brand Guidelines

## Design system foundation

This product uses a three-layer token model:

1. Primitive tokens define raw values.
2. Semantic tokens map purpose to those values.
3. Component tokens map semantic usage to reusable UI pieces.

## Core palette

- Primary: #CF4500
- Secondary: #F37338
- Background: #F3F0EE
- Surface: #FFFFFF
- Text: #141413
- Muted: #696969
- Border: #DAD7D5
- Success: #2E8B57
- Warning: #D97706
- Danger: #DC2626

## Usage principles

- Use CSS variables instead of hardcoded values in component styles.
- Keep the semantic layer stable across light and dark themes.
- Only build component-level tokens when a value is reused across multiple UI elements.
- Prefer accessible contrast and calm, premium surfaces over noisy decoration.
