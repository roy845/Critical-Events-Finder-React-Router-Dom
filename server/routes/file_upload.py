from flask import request
from flask_restx import Namespace, Resource, fields
from services.FileUploadService import FileUploadService
from werkzeug.datastructures import FileStorage



file_upload_api = Namespace('file-upload', description='File Upload Operations')

# Define input/output models
file_upload_response = file_upload_api.model(
    'FileUploadResponse',
    {
        'message': fields.String(description='Response message'),
        
    },
)


# Define the error response model
error_response = file_upload_api.model(
    'ErrorResponse',
    {
        'message': fields.String(description='Error message describing what went wrong'),
    }
)

# Configure file upload parser
file_upload_parser = file_upload_api.parser()
file_upload_parser.add_argument(
    'file',
    location='files',
    type=FileStorage,
    required=True,
    help='Excel file to upload',
)

@file_upload_api.route('/uploadExcel')
class FileUpload(Resource):
    """
    Endpoint to upload an Excel file to S3 Storage.

    This endpoint allows users to upload an Excel file to S3 Storage containing day-indexed
    events and intersections. The file must meet the following criteria:
    
    - Be in `.xlsx` or `.xls` format.    

    **Responses**:
    - **200**: File uploaded successfully.
    - **400**: Missing file, invalid file type.
    - **500**: Server error occurred while processing the file.
    """
    @file_upload_api.expect(file_upload_parser)
    @file_upload_api.marshal_with(file_upload_response, code=200, description='File processed successfully')
    @file_upload_api.doc(
        responses={
            200: ('File processed successfully', file_upload_response),
            400: ('Invalid file type, missing file, or insufficient columns', error_response),
            500: ('An error occurred while processing the file', error_response),
        }
    )
    def post(self):
        """
        Upload an Excel file to S3 Storage.

        This method uploads an Excel file to S3 Storage. 
        Errors such as missing files, invalid file types. 
        are returned with appropriate status codes.
        """
        args = file_upload_parser.parse_args()
        uploaded_file = args['file']
        return FileUploadService.uploadExcelFile(uploaded_file)



# Configure file upload parser
file_upload_parser = file_upload_api.parser()
file_upload_parser.add_argument(
    'file',
    location='files',
    type=FileStorage,
    required=True,
    help='JSON file to upload',
)

@file_upload_api.route('/uploadJSON')
class JsonFileUpload(Resource):
    """
    Endpoint to upload a JSON file to S3 Storage.

    This endpoint allows users to upload a JSON file containing a list of days
    with their respective events. The JSON must adhere to the following schema:
    
    ```json
    [
        {
            "id": "day-1",
            "events": [
                {
                    "intersection": "Intersection A",
                    "event": "Event A"
                }
            ]
        }
    ]
    ```

    **Responses**:
    - **200**: File uploaded successfully.
    - **400**: Missing file, invalid file type, JSON decoding error, or schema validation failure.
    - **500**: Server error occurred while processing the file.
    """
    @file_upload_api.expect(file_upload_parser)
    @file_upload_api.marshal_with(file_upload_response, code=200, description='File processed successfully')
    @file_upload_api.doc(
        responses={
            200: ('File processed successfully', file_upload_response),
            400: ('Invalid file type, missing file, invalid JSON, or schema validation failure', error_response),
            500: ('An unexpected error occurred', error_response),
        }
    )
    def post(self):
        """
        Upload a JSON file to S3 Storage.

        This method validates the JSON structure and  Uploads a JSON file to S3 Storage if valid.
        Errors such as decoding issues or schema validation failures are
        returned with appropriate status codes.
        """
        args = file_upload_parser.parse_args()
        uploaded_file = args['file']
        return FileUploadService.uploadJSONFile(uploaded_file)

@file_upload_api.route('/listFiles')
class ListFiles(Resource):
    """
    List all files from S3.
    """
    @file_upload_api.doc(
        responses={
            200: 'List of files successfully retrieved.',
            500: 'An error occurred while retrieving the list of files.'
        }
    )
    def get(self):
        """
        List all files in the S3 bucket.
        """
        return FileUploadService.listFiles()


@file_upload_api.route('/deleteFile/<string:file_name>')
class DeleteFile(Resource):
    """
    Delete a single file from S3 bucket folder.
    """
    @file_upload_api.doc(
        responses={
            200: 'File deleted successfully.',
            404: 'File not found.',
            500: 'An error occurred while deleting the file.'
        }
    )
    def delete(self, file_name):
        """
        Delete a single file from S3 bucket folder by file name.
        """
        return FileUploadService.deleteFile(file_name)


@file_upload_api.route('/deleteAllFiles')
class DeleteAllFiles(Resource):
    """
    Delete all files from S3 bucket folder.
    """
    @file_upload_api.doc(
        responses={
            200: 'All files deleted successfully.',
            500: 'An error occurred while deleting all files.'
        }
    )
    def delete(self):
        """
        Delete all files from S3 bucket folder.
        """
        return FileUploadService.deleteAllFiles()

@file_upload_api.route('/downloadAndProcessFile/<string:file_name>')
class DownloadAndProcessFile(Resource):
    """
    Download and process a file from S3 without saving locally.
    """
    @file_upload_api.doc(
        params={'file_type': 'The file type (json, xlsx, xls) to process'},
        responses={
            200: 'File processed successfully.',
            404: 'File not found.',
            400: 'Invalid file type or unable to process the file.',
            500: 'An unexpected error occurred.'
        }
    )
    def get(self, file_name):
        """
        Download and process a file from S3 without saving it locally.
        """
        file_type = request.args.get('file_type', 'json')
        return FileUploadService.downloadAndProcessFile(file_name, file_type)