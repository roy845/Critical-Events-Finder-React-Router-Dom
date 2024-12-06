export interface DayEvent {
  intersection: string;
  event: string;
}

export interface Day {
  id: string;
  events: DayEvent[];
}

export interface DaysList {
  days_list: Day[];
}

export interface CriticalEventsResponse {
  critical_events: string[];
}

export interface FileUploadResponse {
  message: string;
  days_list: Day[];
}

export type SortOrder = "asc" | "desc" | null;

export type AllowedFieldType = "intersection" | "event";

export type AllowedActiveTabString = "table" | "graphs";

export type DurationUnit = "ms" | "s" | "none";

export interface CriticalEventsState {
  daysList: DaysList;
  criticalEvents: string[];
  loading: boolean;
  daysInput: string;
  searchCriticalEvents: string;
  isTyping: boolean;
  sortOrder: SortOrder;
  currentPage: number;
  itemsPerPage: number;
  currentPageDaysList: number;
  itemsPerPageDaysList: number;
  fileProperties: FileProperties | null;
  isGlowing: boolean;
  requestDuration: number;
}

export type FileProperties = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
};

export interface TabsState {
  activeTab: AllowedActiveTabString;
}
