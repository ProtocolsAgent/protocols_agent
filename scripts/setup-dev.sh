# scripts/setup-dev.sh
#!/bin/bash

echo "Setting up development environment..."

# Install dependencies
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file from example"
fi

# Setup git hooks
npx husky install
echo "Setup git hooks"

# Create necessary directories
mkdir -p logs
mkdir -p coverage

echo "Development environment setup complete!"

# scripts/run-tests.sh
#!/bin/bash

# Run different types of tests based on arguments
case "$1" in
    "unit")
        jest tests/unit --coverage
        ;;
    "integration")
        jest tests/integration --coverage
        ;;
    "e2e")
        jest tests/e2e --coverage
        ;;
    *)
        jest --coverage
        ;;
esac

# scripts/docker-setup.sh
#!/bin/bash

echo "Setting up Docker environment..."

# Build Docker image
docker build -t protocols-agent .

# Run container
docker run -d \
    --name protocols-agent \
    -p 3000:3000 \
    --env-file .env \
    protocols-agent

echo "Docker setup complete!"
