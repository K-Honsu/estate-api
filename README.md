# Real Estate Platform API

A comprehensive NestJS backend API for real estate management with multi-role authentication (Admin, Business, Investor).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [API Documentation](https://documenter.getpostman.com/view/25856069/2sB2j3BXX6n)

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v8+)
- MySQL (v8.0+)
- Redis (optional, for caching)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/K-Honsu/estate-assessment.git
   cd real-estate-platform-api
   ```

2. Install Dependecy

```bash
pnpm install
```

3. Create a .env file based on .env.example:

```
cp .env.example .env
```

4. Running the App

```bash

pnpm run start:dev
```

### API Documentation

- Kindly headover to for documentation with swagger

```bash
http://localhost:{port}/api
```

or

- [Postman](https://documenter.getpostman.com/view/25856069/2sB2j3BXX6)
