import json
from jsonschema import validate, ValidationError
import pandas as pd
from scehmas.schemas import json_schema


class FileUploadService:
    @staticmethod
    def uploadExcelFile(uploaded_file):
        if not uploaded_file:
            return {'message': 'No file provided', 'days_list': []}, 400

        file_extension = uploaded_file.filename.split('.')[-1].lower()
        if file_extension not in ['xlsx', 'xls']:
            return {'message': 'Invalid file type. Only Excel files are allowed.', 'days_list': []}, 400

        try:
            # Read the Excel file into a pandas DataFrame without headers
            df = pd.read_excel(uploaded_file, header=None)

            # Ensure there are at least three columns
            if df.shape[1] < 3:
                return {
                    'message': 'The file must contain at least three columns: day_index, intersection, and event.',
                    'days_list': []
                }, 400

            # Rename columns for easier processing
            df.columns = ['day_index', 'intersection', 'event']

            # Group data into a structured format
            days_list = []
            grouped = df.groupby('day_index')
            for day_index, group in grouped:
                day_id = f"day-{day_index}"
                events = group[['intersection', 'event']].to_dict(orient='records')
                days_list.append({'id': day_id, 'events': events})

            return {
                'message': 'File processed successfully',
                'days_list': days_list
            }, 200

        except Exception as e:
            return {
                'message': 'An error occurred while processing the file',
                'days_list': [],
                'error': str(e),
            }, 500

    @staticmethod
    def uploadJSONFile(uploaded_file):
        if not uploaded_file:
            return {'message': 'No file provided', 'days_list': []}, 400

        file_extension = uploaded_file.filename.split('.')[-1].lower()
        if file_extension != 'json':
            return {'message': 'Invalid file type. Only JSON files are allowed.', 'days_list': []}, 400

        try:
            # Parse the JSON file
            json_data = json.load(uploaded_file)

            # Validate the JSON structure
            validate(instance=json_data, schema=json_schema)

            # Extract and return the validated data
            return {
                'message': 'File processed successfully',
                'days_list': json_data,
            }, 200

        except json.JSONDecodeError as e:
            return {'message': 'Invalid JSON file.', 'error': str(e), 'days_list': []}, 400
        except ValidationError as e:
            return {'message': 'JSON validation failed.', 'error': str(e), 'days_list': []}, 400
        except Exception as e:
            return {'message': 'An unexpected error occurred.', 'error': str(e), 'days_list': []}, 500