import type { MenuItem } from "./types";
import menuItems from "./menu-items.json";

export const completeMenu = menuItems as MenuItem[];

export function getMenuItemsByCategory(category: string): MenuItem[] {
  return completeMenu.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
}

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return completeMenu.find((item) => item.slug === slug);
}

export function getAllMenuSlugs(): string[] {
  return completeMenu.map((item) => item.slug);
}

/** Menu slugs excluding drinks (drinks has its own /drinks page). */
export function getMenuSlugsExcludingDrinks(): string[] {
  return completeMenu
    .filter((item) => item.slug !== "drinks")
    .map((item) => item.slug);
}

export const MENU_CATEGORIES = [
  "Pizzas",
  "Specialty Pizzas",
  "Pasta",
  "Chicken",
  "Sandwiches",
  "Sides & Bread",
  "Desserts",
  "Drinks",
] as const;
