FROM python:3.13-slim
WORKDIR /app

# Install system deps and uv
RUN apt-get update && apt-get install -y \
    curl build-essential libssl-dev \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Make uv available to CMD using absolute path
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy your app files
COPY . .

# Run with uv using absolute path
CMD ["/root/.cargo/bin/uv", "run", "buty.py"]
