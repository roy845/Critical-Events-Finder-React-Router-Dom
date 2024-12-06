from flask_restx import Namespace, Resource, fields
from services.FileUploadService import FileUploadService
from werkzeug.datastructures import FileStorage



file_upload_api = Namespace('file-upload', description='File Upload Operations')

# Define input/output models
file_upload_response = file_upload_api.model(
    'FileUploadResponse',
    {
        'message': fields.String(description='Response message'),
        'days_list': fields.List(
            fields.Nested(
                file_upload_api.model(
                    'Day',
                    {
                        'id': fields.String(description='Day ID'),
                        'events': fields.List(
                            fields.Nested(
                                file_upload_api.model(
                                    'Event',
                                    {
                                        'intersection': fields.String(description='Intersection'),
                                        'event': fields.String(description='Event description'),
                                    }
                                )
                            )
                        ),
                    }
                )
            )
        ),
    },
)


# Define the error response model
error_response = file_upload_api.model(
    'ErrorResponse',
    {
        'message': fields.String(description='Error message describing what went wrong'),
        'days_list': fields.List(fields.Raw, description='List of days, empty in case of an error'),
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
    Endpoint to upload and process an Excel file without headers.

    This endpoint allows users to upload an Excel file containing day-indexed
    events and intersections. The file must meet the following criteria:
    
    - Be in `.xlsx` or `.xls` format.
    - Contain at least three columns: `day_index`, `intersection`, and `event`.
    
    The data is grouped by `day_index` and returned as a structured list.

    **Responses**:
    - **200**: File processed successfully. Returns a structured list of days and events.
    - **400**: Missing file, invalid file type, or insufficient columns.
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
        Upload and process an Excel file.

        This method processes the uploaded file and extracts day-indexed events. 
        Errors such as missing files, invalid file types, or insufficient columns 
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
    Endpoint to upload and process a JSON file.

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
    - **200**: File processed successfully. Returns the validated list of days and events.
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
        Upload and process a JSON file.

        This method validates the JSON structure and returns the data if valid.
        Errors such as decoding issues or schema validation failures are
        returned with appropriate status codes.
        """
        args = file_upload_parser.parse_args()
        uploaded_file = args['file']
        return FileUploadService.uploadJSONFile(uploaded_file)