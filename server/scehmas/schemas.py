# JSON Schema for validation
json_schema = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": {"type": "string"},
            "events": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "intersection": {"type": "string"},
                        "event": {"type": "string"},
                    },
                    "required": ["intersection", "event"],
                },
            },
        },
        "required": ["id", "events"],
    },
}