# Task Management API

## 1. Project Setup
```bash
# Install dependencies
$ npm install

# Docker setup for Database
$ docker-compose up -d

# Database migration (if applicable)
$ npx sequelize-cli db:migrate

# development
$ npm run start:dev

# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## 2.Explanation of key architectural decisions.
```bash
task-management-app/
├── 📁 config/              # Configuration files (DB, JWT, Environment settings)
├── 📁 coverage/            # Test coverage reports (Auto-generated)
├── 📁 dist/                # Compiled output (JavaScript files ready for production)
├── 📁 migrations/          # Database migrations (Version control for DB schema)
├── 📁 models/              # Sequelize model definitions (Database table structures)
├── 📁 node_modules/        # Third-party libraries and dependencies
├── 📁 seeders/             # Initial data seeds (Mock data for DB initialization)
├── 📁 src/                 # Main source code
│   ├── 📁 auth/            # Authentication logic (Login, Signup, JWT strategy)
│   ├── 📁 common/          # Shared resources used across the project
│   │   ├── 📁 enums/       # Constant value sets (e.g., TaskStatus, UserRole)
│   │   ├── 📁 security/    # Security utilities (e.g., passwordHashing,verifyPassword)
│   │   └── 📁 types/       # Global TypeScript interfaces and types
│   ├── 📁 task/            # Task management module (Controller, Service, Entity)
│   ├── 📁 user/            # User management module (Profile, Data management)
│   ├── 📄 app.controller.ts
│   ├── 📄 app.module.ts    # Root module of the application
│   ├── 📄 app.service.ts
│   └── 📄 main.ts          # Application entry point (Bootstrap logic)
├── 📁 test/                # End-to-End (E2E) test suites
├── 📄 .env                 # Environment variables 
├── 📄 .env.example         # Template for required environment variables
├── 📄 .gitignore           # Specifies files and folders for Git to ignore
├── 📄 .prettierrc          # Code formatting rules (Prettier)
└── 📄 docker-compose.yaml  # Docker services configuration (e.g., PostgreSQL container)
```
```bash
1. Global Type Management
Custom Request Handling: Implemented in common/types/request.d.ts to extend standard requests with custom properties

2. Enhanced Security Strategy
Modern Hashing: Utilized Argon2 via a dedicated SecurityService instead of the legacy Bcrypt. 

Security Encapsulation: Security logic (hashing/verification) is isolated within a SecurityModule to be reused safely by other modules like Auth.

3. Repository Pattern Implementation
Data Isolation: Each module implements its own Repository, separating database access logic from the core Business Logic (Services).

Maintainability: This decoupling makes the application easier to test and allows for swapping database logic without affecting the service layer.

4. Zero-Trust Security & Resource Ownership
Strict Access Control: Beyond UseGuards for authentication, we implement Zero-Trust principles at the service layer.

Ownership Validation: Every request is validated to ensure the authenticated user is the actual owner of the resource (e.g., a user can only edit their own tasks), preventing IDOR (Insecure Direct Object Reference) vulnerabilities.
```

## Example requests for each API endpoint.

Authentication Endpoint
```bash
#register
POST /auth/register
{
  "username": "anuwat_d",
  "password": "securePassword123"
}

#login
POST /auth/login
{
  "username": "anuwat_d",
  "password": "securePassword123"
}
```

Task Management Endpoint 
```bash
#create task
POST /tasks
Authorization: Bearer <your_token>
{
  "title": "Fix Database Issue",
  "description": "Remove sync force:true from production config"
  "userId": "8c77147b-b507-4c86-b735-509bc8598885" // owner
}

#findAllTaskOfAuthenticatedUser
GET /tasks
Authorization: Bearer <your_token>

findSpecificTaskIdForAuthenticatedUser
GET /tasks/:id
Authorization: Bearer <your_token>

#updateSpecificTaskIdForAuthenticatedUser
PATCH /tasks/:id
Authorization: Bearer <your_token>
{
  "title": "Fix Database Issue",
  "description": "Remove sync force:true from production config"
  "status":"in_progress"
}

#deleteSpecificTaskIdForAuthenticatedUser
DELETE /tasks/:id
Authorization: Bearer <your_token>

```

