import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToAscii(inputString: string) {
  // remove non ascii characters
  let asciiString = inputString.replace(/[^\x00-\x7F]+/g, "");

  // remove all whitespace
  asciiString = asciiString.replace(/\s/g, "");

  // remove all punctuation
  asciiString = asciiString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  return asciiString;
}