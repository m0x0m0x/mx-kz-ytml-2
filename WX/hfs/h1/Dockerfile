FROM python:3.13-slim

WORKDIR /app

# Install system deps and uv
RUN apt-get update && apt-get install -y \
    curl build-essential libssl-dev \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.cargo/bin/uv /usr/local/bin/ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy your app files
COPY . .

# Run with uv (use full path to avoid PATH issues)
CMD ["/usr/local/bin/uv", "run", "buty.py"]