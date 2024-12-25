FROM python:3.11

# Устанавливаем Node.js и PostgreSQL клиент
RUN apt-get update && apt-get install -y \
    curl \
    postgresql-client \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Настройка рабочего каталога для Django
WORKDIR /usr/src/app

# Копируем зависимости Python
COPY requirements.txt ./requirements.txt
RUN python3 -m pip install --upgrade pip
RUN pip install -r requirements.txt

# Настройка рабочего каталога для React
WORKDIR /app

# Копируем package.json и устанавливаем зависимости Node.js
COPY film/package.json ./film/package-lock.json ./
RUN npm install

# Копируем React-приложение и строим его
COPY ./film/src ./film/src
COPY ./film/public ./film/public
RUN npm run build

# Экспонируем порты
EXPOSE 8000
EXPOSE 3000

# Запуск Django-приложения
WORKDIR /usr/src/app
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
