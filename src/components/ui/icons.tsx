import type { SVGProps } from "react";

export function ArrowRight({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowLeft({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M20 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}

export function Instagram({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsApp({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...props}>
      <path d="M12.04 2.5a9.4 9.4 0 0 0-8 14.3L2.5 21.5l4.85-1.5a9.4 9.4 0 1 0 4.69-17.5Zm0 1.72a7.68 7.68 0 1 1-3.9 14.27l-.35-.2-2.7.83.85-2.63-.22-.36A7.68 7.68 0 0 1 12.04 4.22Zm-3.1 3.6c-.2 0-.5.07-.72.34-.24.28-.9 1-.9 2.18 0 1.17.84 2.3.96 2.46.12.16 1.63 2.6 4.02 3.55 1.99.79 2.4.63 2.83.59.43-.04 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.47-.28-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.3-.73-1.77-.18-.44-.37-.44-.5-.45h-.45Z" />
    </svg>
  );
}

export function Menu({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </svg>
  );
}

export function Close({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function Plus({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Star({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className} {...props}>
      <path d="m12 3.6 2.55 5.4 5.9.8-4.3 4.1 1.05 5.9L12 17l-5.2 2.8 1.05-5.9-4.3-4.1 5.9-.8Z" />
    </svg>
  );
}
