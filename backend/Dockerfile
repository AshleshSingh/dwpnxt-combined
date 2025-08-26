
FROM python:3.11-slim  # glibc-based image for pre-built wheels
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["bash","./run.sh"]
