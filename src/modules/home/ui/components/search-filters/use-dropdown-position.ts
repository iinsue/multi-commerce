import { RefObject } from "react";

const LEFT_PADDING = 16;

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // Width of dropdown (w-60 = 15rem = 240px)

    // Calculate the initial position
    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    // Check if dropdown would go off the right edge of the viewport
    if (left + dropdownWidth > window.innerWidth) {
      // Align to right edge of button instead
      left = rect.right + window.scrollX - dropdownWidth;

      // If still off-screen, align to the right edge of viewport
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - LEFT_PADDING;
      }
    }

    // Ensure dropdown doesn't go off left edge
    if (left < 0) {
      left = LEFT_PADDING;
    }

    return { top, left };
  };

  return { getDropdownPosition };
};
