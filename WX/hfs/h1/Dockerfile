# Use the latest Python image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies and uv
RUN apt-get update && apt-get install -y \
    curl build-essential libssl-dev \
    && curl -LsSf https://astral.sh/uv/install.sh | bash \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add uv to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy your entire app, including runz.sh
COPY . .

# Make the script executable
RUN chmod +x runz.sh

# Run the script
CMD ["./runz.sh"]
