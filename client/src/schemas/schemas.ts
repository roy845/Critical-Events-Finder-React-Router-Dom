import { z } from "zod";

export const DaySchema = z.array(
  z.object({
    intersection: z.string(),
    event: z.string(),
  })
);

export const DaysListSchema = z.array(DaySchema);

export const CriticalEventsResponseSchema = z.object({
  critical_events: z.array(z.string()),
});

// Define the schema for individual events within a day
export const EventSchema = z.object({
  intersection: z.string(),
  event: z.string(),
});

// Define the schema for a single day
export const DaySchemaFromApi = z.object({
  id: z.string(),
  events: z.array(EventSchema),
});

// Define the schema for the days list
export const DaysListSchemaFromApi = z.array(DaySchemaFromApi);

// Define the schema for the file upload response
export const FileUploadResponseSchema = z.object({
  message: z.string(),
  days_list: DaysListSchemaFromApi,
});
