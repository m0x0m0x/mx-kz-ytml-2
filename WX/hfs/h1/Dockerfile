FROM python:3.13-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl build-essential libssl-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install uv and check its location
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
RUN ls -la /root/.cargo/bin  # List contents to verify uv installation
RUN which uv  # Check where uv is installed

# Make uv available to CMD using absolute path
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy your app files
COPY . .

# Run with uv using absolute path
CMD ["/root/.cargo/bin/uv", "run", "buty.py"]
