## visible-content-manager

A React component for managing the visibility of child elements within a specified width.

This package provides a flexible and efficient way to display a limited number of child components based on the available width of a container. It dynamically calculates which children are visible and which are hidden, allowing for better management of layout in responsive designs. Ideal for scenarios where space is limited, such as tags, buttons, or any other elements where overflow can occur.

### Features:
- **Dynamic Visibility Management**: Automatically calculates visible and hidden children based on container width.
- **Customizable Gap Width**: Easily adjust the space between children with a configurable gap.
- **Custom Hidden Children Container**: Optionally provide your own JSX for displaying hidden children, enhancing the component's flexibility.
- **Responsive Design**: Integrates seamlessly with responsive layouts by adjusting visibility based on the container's size.

### Installation
```bash
npm install visible-content-manager


## Usage

Here’s how you can use the `visible-content-manager` component in your React application:

```tsx
import { VisibleContentManager } from 'visible-content-manager';

// Example of a component using VisibleContentManager
const MyComponent = () => {
  return (
    <VisibleContentManager gapWidth={10} HiddenChildrenContainer={<CustomHidden />}>
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
      {/* Add more children as needed */}
    </VisibleContentManager>
  );
};
