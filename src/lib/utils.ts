import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// URL에 민감한 특수문자가 포함되어 경로가 깨지는 것 방지를 위해 encodeURIComponent 추가
export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${encodeURIComponent(tenantSlug)}`;
}

// 금액 단위
export function formatCurrency(value: number | string) {
  const amount = Number(value);
  if (Number.isNaN(amount)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
