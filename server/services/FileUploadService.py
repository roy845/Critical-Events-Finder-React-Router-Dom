import json
from jsonschema import validate, ValidationError
import pandas as pd
import boto3
from io import BytesIO
from scehmas.schemas import json_schema
from config import settings

class FileUploadService:
    S3_BUCKET_NAME = settings.s3_bucket_name
    S3_REGION_NAME = settings.s3_region_name  

    
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
        region_name=S3_REGION_NAME
    )
  

    @staticmethod
    def uploadExcelFile(uploaded_file):
        if not uploaded_file:
            return {
                'message': 'No file provided', 
                    
                    }, 400

        file_extension = uploaded_file.filename.split('.')[-1].lower()
        if file_extension not in ['xlsx', 'xls']:
            return {
                'message': 'Invalid file type. Only Excel files are allowed.', 
             
                }, 400

        try:
        
            file_name = uploaded_file.filename
            s3_key = f"royatali/{file_name}"
            FileUploadService.s3_client.upload_fileobj(uploaded_file, FileUploadService.S3_BUCKET_NAME, s3_key)

            return {
                'message': 'File Uploaded successfully',
            }, 200

        except Exception as e:
            return {
                'message': 'An error occurred while uploading the file',
                'error': str(e),
            }, 500

    @staticmethod
    def uploadJSONFile(uploaded_file):
        if not uploaded_file:
            return {
                'message': 'No file provided'
            }, 400

        file_extension = uploaded_file.filename.split('.')[-1].lower()
        if file_extension != 'json':
            return {
                'message': 'Invalid file type. Only JSON files are allowed.'
            }, 400

        try:
            # Step 1: Read the file and parse the JSON content
            file_content = uploaded_file.read().decode('utf-8')  # Read and decode the file content
            json_data = json.loads(file_content)  # Parse the JSON file

            # Step 2: Validate the JSON structure
            validate(instance=json_data, schema=json_schema)

            # Step 3: Reset the file pointer before uploading to S3
            uploaded_file.seek(0)

            # Step 4: Upload the file to S3
            file_name = uploaded_file.filename
            s3_key = f"royatali/{file_name}"
            FileUploadService.s3_client.upload_fileobj(uploaded_file, FileUploadService.S3_BUCKET_NAME, s3_key)

            # Step 5: Return success response
            return {
                'message': 'File uploaded successfully'
            }, 200

        except json.JSONDecodeError as e:
            return {
                'message': 'Invalid JSON file.',
                'error': str(e)
            }, 400
        except ValidationError as e:
            return {
                'message': 'JSON validation failed.',
                'error': str(e)
            }, 400
        except Exception as e:
            return {
                'message': 'An unexpected error occurred.',
                'error': str(e)
            }, 500
    
    @staticmethod
    def listFiles(page=1, limit=10, search=''):
        """List all files in the S3 bucket with pagination and search."""
        try:
            response = FileUploadService.s3_client.list_objects_v2(
                Bucket=FileUploadService.S3_BUCKET_NAME,
                Prefix='royatali/'
            )

            if 'Contents' in response:
                # Filter files (exclude directories and search by name)
                all_files = [
                    {'file_name': file['Key'], 'size': file['Size']} 
                    for file in response['Contents'] 
                    if not file['Key'].endswith('/')
                ]

                # Apply search filter
                if search:
                    all_files = [file for file in all_files if search.lower() in file['file_name'].lower()]

                # Calculate total files for pagination metadata
                total_files = len(all_files)

                # Apply pagination
                start_index = (page - 1) * limit
                end_index = start_index + limit
                paginated_files = all_files[start_index:end_index]

                return {
                    'message': 'Files listed successfully',
                    'total_files': total_files,
                    'page': page,
                    'limit': limit,
                    'total_pages': (total_files // limit) + (1 if total_files % limit != 0 else 0),
                    'files': paginated_files
                }, 200
            else:
                return {'message': 'No files found in the S3 bucket', 'files': []}, 200
        except Exception as e:
            return {'message': 'Failed to list files', 'error': str(e)}, 500
    
    @staticmethod
    def deleteFile(file_name):
        """Delete a single file from the S3 bucket."""
        try:
            s3_key = f"royatali/{file_name}"
            FileUploadService.s3_client.delete_object(Bucket=FileUploadService.S3_BUCKET_NAME, Key=s3_key)
            return {'message': f'File {file_name} deleted successfully'}, 200
        except Exception as e:
            return {'message': f'Failed to delete file {file_name}', 'error': str(e)}, 500

    @staticmethod
    def deleteAllFiles():
        """Delete all files from the S3 bucket."""
        try:
            response = FileUploadService.s3_client.list_objects_v2(
            Bucket=FileUploadService.S3_BUCKET_NAME, 
            Prefix='royatali/'
            )
            if 'Contents' in response:
                for file in response['Contents']:
                    FileUploadService.s3_client.delete_object(Bucket=FileUploadService.S3_BUCKET_NAME, Key=file['Key'])
            return {'message': 'All files deleted successfully'}, 200
        except Exception as e:
            return {'message': 'Failed to delete all files', 'error': str(e)}, 500
    
    @staticmethod
    def createFolder(folder_name):
        """
        Create a folder in the S3 bucket.

        Args:
            folder_name (str): The name of the folder to create.

        Returns:
            dict: Success or error message.
        """
        try:
            # Ensure the folder name ends with a slash
            if not folder_name.endswith('/'):
                folder_name += '/'

            # Use a zero-byte file to represent the folder
            FileUploadService.s3_client.put_object(
                Bucket=FileUploadService.S3_BUCKET_NAME,
                Key=folder_name
            )

            return {'message': f'Folder "{folder_name}" created successfully'}, 200

        except Exception as e:
            return {'message': f'Failed to create folder "{folder_name}"', 'error': str(e)}, 500

    
    @staticmethod
    def downloadAndProcessFile(file_name,file_type):
        """
        Download and process a file from S3 without saving it locally.

        Args:
            file_name (str): The name of the file in the S3 bucket.

        Returns:
            dict: Processed file data or an error message.
        """
        try:
            s3_key = f"royatali/{file_name}"
            # Get the file from S3
            response = FileUploadService.s3_client.get_object(
                Bucket=FileUploadService.S3_BUCKET_NAME,
                Key=s3_key
            )

            # Read the file's binary content into memory
            file_content = response['Body'].read()

            # Process the file according to its file type
            if file_type == 'json':
                if not file_content:
                    return {'message': 'The file is empty or could not be read'}, 400
                # Parse the JSON file
                json_data = json.loads(file_content)  # Use json.loads, not json.load for binary data
                # Validate the JSON structure
                validate(instance=json_data, schema=json_schema)
                
                return {'message': 'File processed successfully', 'days_list': json_data}, 200

            elif file_type in ['xlsx', 'xls']:
                # Load the binary content into a BytesIO object (file-like object in memory)
                excel_file = BytesIO(file_content)
                # Read the Excel file into a DataFrame
                df = pd.read_excel(excel_file, header=None)
                
                if df.shape[1] < 3:
                    return {'message': 'The file must contain at least three columns: day_index, intersection, and event.'}, 400

                # Rename columns for easier processing
                df.columns = ['day_index', 'intersection', 'event']

                # Group data into a structured format
                days_list = []
                grouped = df.groupby('day_index')
                for day_index, group in grouped:
                    day_id = f"day-{day_index}"
                    events = group[['intersection', 'event']].to_dict(orient='records')
                    days_list.append({'id': day_id, 'events': events})

                return {'message': 'File processed successfully', 'days_list': days_list}, 200

            else:
                return {'message': 'Unsupported file type'}, 400

        except FileNotFoundError as e:
            return {'message': 'File not found', 'error': str(e)}, 404

        except json.JSONDecodeError as e:
            return {'message': 'Error processing JSON file', 'error': str(e)}, 400

        except pd.errors.EmptyDataError as e:
            return {'message': 'Empty or invalid Excel/CSV file', 'error': str(e)}, 400

        except Exception as e:
            return {'message': 'An unexpected error occurred while processing the file', 'error': str(e)}, 500