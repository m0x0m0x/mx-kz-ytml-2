FROM python:3.13-slim

WORKDIR /app

# Install system dependencies and uv
RUN apt-get update && apt-get install -y \
    curl build-essential libssl-dev \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.cargo/bin/uv /usr/local/bin/uv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Ensure PATH includes /usr/local/bin
ENV PATH="/usr/local/bin:${PATH}"

# Verify uv is installed
RUN uv --version || { echo "uv not found"; exit 1; }

# Copy application files
COPY . .

# Run with uv
CMD ["uv", "run", "buty.py"]