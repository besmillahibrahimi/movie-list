import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetUrl(url: string): string {
  return `${process.env.NEXT_PUBLIC_SB_PROJECT_URL}/storage/v1/object/public/${url}`;
}
