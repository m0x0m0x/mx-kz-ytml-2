FROM python:3.13-slim

WORKDIR /app

# Install system deps and uv
RUN apt-get update && apt-get install -y \
    curl build-essential libssl-dev \
    && curl -LsSf https://astral.sh/uv/install.sh | bash \
    && ln -s /root/.cargo/bin/uv /usr/local/bin/uv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Make uv available to CMD
ENV PATH="/usr/local/bin:${PATH}"

# Copy your app files
COPY . .

# Run with uv
CMD ["uv", "run", "buty.py"]
