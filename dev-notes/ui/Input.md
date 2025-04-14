# Overview
-------------------
This is a custom Input component you can use anywhere in your Next.js app (like in a login form, search bar, etc.), with:

- Tailwind CSS for styling
- TypeScript for type safety
- forwardRef for better accessibility and form handling
- cn() to help merge class names nicely
- Easy to reuse and consistent styling across your app

# The Code Breakdown
-------------------
```tsx
// utils.ts
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
```
Useful when you want to conditionally apply Tailwind CSS classes!

# The Component Itself
```tsx
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
```
You’re creating a forwardRef component. This means the parent component can attach a ref to this <input> to programmatically do things like focus it.

🧠 Why care in Next.js?

Useful in forms: e.g., automatically focus the email input field when a login page loads.

Helps with accessibility.

```tsx
({ className, type, ...props }, ref) => {
```
You’re unpacking props passed to the <Input> component.
className: If the developer wants to pass custom styles.
type: For things like "text", "email", "password", etc.
...props: Everything else (like onChange, value, etc.)
ref: The forwarded reference (used for DOM access)

# Inside the return:
```tsx
<input
  type={type}
  className={cn('...default styles...', className)}
  ref={ref}
  {...props}
/>
```
You apply default Tailwind styles.
Merge any className passed in using cn().
Attach ref for things like autofocus or validation.
Spread props to include any other HTML input attributes.

```Input.displayName = 'Input'```
This just helps with debugging in React DevTools (so you don’t see ForwardRef but instead Input in the tree).
