---
description: Read this before implementing any user-interface components. It describes the use of shadcn/ui, Base Nova styling, Tailwind CSS variables, and Lucide icons in Shortline.
---

# UI Components

Use shadcn/ui for every user-interface element in Shortline.

## Rules

- Use the existing components in `components/ui/` before creating anything new.
- Do not create custom UI primitives or custom replacements for shadcn components.
- When a needed primitive is missing, add the appropriate shadcn/ui component through the project's configured shadcn workflow, then compose it in the feature.
- Keep feature composition in the route or feature component; keep reusable primitives in `components/ui/`.
- Follow the configuration in `components.json`, including Base Nova styling, Tailwind CSS variables, and Lucide icons.
- Use shadcn components for controls, forms, dialogs, menus, feedback, layout primitives, and other interactive UI.
- Preserve accessibility, keyboard behavior, and responsive states provided by the shadcn component patterns.
