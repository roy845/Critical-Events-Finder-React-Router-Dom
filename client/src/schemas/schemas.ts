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

export const EventSchema = z.object({
  intersection: z.string(),
  event: z.string(),
});

export const DaySchemaFromApi = z.object({
  id: z.string(),
  events: z.array(EventSchema),
});

export const DaysListSchemaFromApi = z.array(DaySchemaFromApi);

export const FileUploadResponseSchema = z.object({
  message: z.string(),
});

export const FileSchema = z.object({
  file_name: z.string(),
  size: z.number(),
});

export const FetchAllFilesResponseSchema = z.object({
  message: z.string(),
  files: z.array(FileSchema),
});

export const FileProcessResponseSchema = z.object({
  message: z.string(),
  days_list: DaysListSchemaFromApi,
});
