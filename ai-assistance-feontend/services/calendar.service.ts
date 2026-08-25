import { initialEvents } from "@/data/events";
import { CalendarEvent } from "@/types";
import { mockDelay } from "./api";

export const calendarService = {
  list: () => mockDelay(initialEvents),
  create: (event: CalendarEvent) => mockDelay(event),
};
