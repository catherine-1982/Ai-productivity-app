type IconName =
  | "analytics" | "arrowRight" | "bell" | "bot" | "calendar" | "check" | "chevronDown"
  | "clock" | "close" | "dashboard" | "edit" | "filter" | "layout" | "logout" | "menu"
  | "moon" | "plus" | "search" | "settings" | "sparkles" | "sun" | "trash" | "user";

const paths: Record<IconName, string[]> = {
  analytics: ["M4 19V5", "M4 19h16", "M8 16v-5", "M13 16V8", "M18 16v-9"],
  arrowRight: ["M5 12h14", "M13 6l6 6-6 6"],
  bell: ["M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  bot: ["M12 8V4", "M8 4h8", "M6 10h12v8H6z", "M9 14h.01", "M15 14h.01", "M3 13h3", "M18 13h3"],
  calendar: ["M8 2v4", "M16 2v4", "M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z"],
  check: ["M20 6 9 17l-5-5"],
  chevronDown: ["M6 9l6 6 6-6"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  close: ["M18 6 6 18", "M6 6l12 12"],
  dashboard: ["M3 13h8V3H3z", "M13 21h8V11h-8z", "M13 3v6h8V3z", "M3 21h8v-6H3z"],
  edit: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"],
  filter: ["M3 5h18", "M7 12h10", "M10 19h4"],
  layout: ["M3 5h18v14H3z", "M9 5v14", "M3 11h18"],
  logout: ["M10 17l5-5-5-5", "M15 12H3", "M21 3v18"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  moon: ["M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"],
  plus: ["M12 5v14", "M5 12h14"],
  search: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.35-4.35"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.05.06-1.8 3.12-2.06-.83a7.8 7.8 0 0 1-1.6.92L14 22h-4l-.32-1.85a7.8 7.8 0 0 1-1.6-.92l-2.06.83-1.8-3.12.05-.06A1.7 1.7 0 0 0 4.6 15a7.8 7.8 0 0 1 0-1.99 1.7 1.7 0 0 0-.34-1.88l-.05-.06 1.8-3.12 2.06.83a7.8 7.8 0 0 1 1.6-.92L10 6h4l.32 1.85a7.8 7.8 0 0 1 1.6.92l2.06-.83 1.8 3.12-.05.06A1.7 1.7 0 0 0 19.4 13a7.8 7.8 0 0 1 0 2z"],
  sparkles: ["M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z", "M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z", "M5 2l.8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8z"],
  sun: ["M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M12 2v2", "M12 20v2", "M4.93 4.93l1.41 1.41", "M17.66 17.66l1.41 1.41", "M2 12h2", "M20 12h2", "M6.34 17.66l-1.41 1.41", "M19.07 4.93l-1.41 1.41"],
  trash: ["M3 6h18", "M8 6V4h8v2", "M6 6l1 16h10l1-16"],
  user: ["M20 21a8 8 0 0 0-16 0", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
};

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg className={`size-5 shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name].map((path) => <path key={path} d={path} />)}
    </svg>
  );
}
