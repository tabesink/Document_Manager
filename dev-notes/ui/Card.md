# Overview
This code defines a modular and reusable card component system in React using forwardRef, Tailwind CSS classes, and a utility function cn() for managing class names.

Component		| Purpose		                        | Styling Highlights
Card		    | Main container	                    | Background, border, shadow, rounded corners
CardHeader		| Top section (usually for title)		| Flex column, spacing, padding
CardTitle		| Main title		                    | Bold, compact spacing
CardDescription	| Subtitle or metadata		            | Muted color, smaller text
CardContent	    | Main body		                        | Standard padding
CardFooter		| Bottom actions/info		            | Flex row, aligned items
This is a common pattern in design systems (like ShadCN, Radix, or Tailwind UI) where you build flexible building blocks with minimal assumptions, allowing for high reusability and consistency.


# Component Pattern Overview
Each card subcomponent (Card, CardHeader, etc.) is:
 - A functional React component using forwardRef (enabling ref support).
 - Typed with TypeScript for <div> elements.
 - Accepts custom className and other HTML props.
 - Merges default styling with className using cn().

# Card
```tsx
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bg-card text-card-foreground rounded-xl border shadow', className)}
      {...props}
    />
  )
);
```
Card.displayName = 'Card';
Acts as the main container for the card.
Has background, text color, border, shadow, and rounded corners.
forwardRef allows parent components to get a ref to the underlying <div>.
displayName is set for better debugging in DevTools.

# CardHeader
```tsx
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
```
CardHeader.displayName = 'CardHeader';
A top section for the card.
Applies vertical spacing (space-y-1.5), padding (p-6), and flex layout.

# CardTitle
```tsx
const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
);
```
CardTitle.displayName = 'CardTitle';
For card titles or headings.
Tight line-height, bold font, and tight letter spacing.

# CardDescription
```tsx
const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  )
);
```
CardDescription.displayName = 'CardDescription';
Optional subtext or metadata for the card.
Smaller font size, muted text color.

# CardContent
```tsx
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
```
CardContent.displayName = 'CardContent';
Main body section of the card.
Padding all around (p-6) but no top padding (pt-0), probably to align with CardHeader.

# CardFooter
```tsx
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
);
```
CardFooter.displayName = 'CardFooter';
Bottom section of the card.
Flex layout, centered items, same padding as content.

# Exports
```tsx
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```
Makes all components available for import elsewhere.
Modular: You can use only the parts you need (Card, CardHeader, etc.).


