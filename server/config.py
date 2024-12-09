from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    s3_bucket_name: str
    s3_region_name:str
    aws_access_key_id:str
    aws_secret_access_key:str

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings()