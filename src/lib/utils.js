import { clsx } from "clsx";
import { twMerge } from "-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
