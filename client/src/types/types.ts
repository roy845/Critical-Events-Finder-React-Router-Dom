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
}

export interface FileProcessResponse {
  message: string;
  days_list: Day[];
}

export type FileType = {
  file_name: string;
  size: number;
};

export interface FetchAllFilesResponse {
  message: string;
  files: FileType[];
  total_files: number;
  page: number;
  limit: number | string;
  total_pages: number;
}

export type SortOrder = "asc" | "desc" | null;

export type AllowedFieldType = "intersection" | "event";

export type AllowedActiveTabString = "table" | "graphs" | "groupByLetter";

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
  currentPageGroupedCriticalEvents: number;
  itemsPerPageGroupedCriticalEvents: number;
  fileProperties: FileProperties | null;
  isGlowing: boolean;
  requestDuration: number;
  selectedLetter: string;
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
