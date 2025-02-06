from pydantic_settings import BaseSettings

class EmailSettings(BaseSettings):
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str
    SMTP_PASSWORD: str
    START_TLS: bool = True

    class Config:
        env_file = ".env"
        extra = "allow"


settings = EmailSettings()