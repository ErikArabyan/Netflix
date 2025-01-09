FROM python:3.13

WORKDIR /app

COPY . /app/
RUN apt-get update && apt-get install -y curl && apt-get clean
RUN pip install -r requirements.txt


CMD ["sh", "-c", \
"python manage.py makemigrations && \
python manage.py migrate && \
python manage.py collectstatic --no-input && \
python manage.py loaddata data.json && \
uvicorn Film.asgi:application --host 0.0.0.0 --port 8000 --ssl-keyfile localhost+2-key.pem --ssl-certfile localhost+2.pem \
# uvicorn Film.asgi:application --host 127.0.0.1 --port 8000 \
"]
