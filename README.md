# Loan Management System

![NestJS](https://img.shields.io/badge/NestJS-11-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Redis](https://img.shields.io/badge/Redis-7-red)
![License](https://img.shields.io/badge/license-UNLICENSED-lightgrey)

A production-oriented loan management platform built with **NestJS**, **Prisma**, **PostgreSQL**, and **Redis**.

The system is designed as a **modular monolith** with a clear migration path toward **domain-based microservices** as system demand and complexity increase.

---

## Features

* JWT Authentication
* Role-Based Access Control (RBAC)
* User Management
* Loan Application Workflow
* Loan Approval & Disbursement
* Repayment Scheduling
* Audit Logging
* Redis Caching
* Swagger/OpenAPI Documentation
* Dockerized Development Environment
* Microservice-Ready Architecture

---

## Tech Stack

| Layer            | Technology                      |
| ---------------- | ------------------------------- |
| API              | NestJS                          |
| Language         | TypeScript                      |
| Database         | PostgreSQL 15                   |
| ORM              | Prisma                          |
| Cache            | Redis 7                         |
| Authentication   | Passport (JWT + Local Strategy) |
| Documentation    | Swagger/OpenAPI                 |
| Containerization | Docker Compose                  |
| Testing          | Jest                            |

---

## Project Status

Current phase: **Phase 1 — Modular Monolith**

| Module        | Status                                 |
| ------------- | -------------------------------------- |
| Users         | Registration, profile, admin search    |
| Auth          | Login, JWT authentication, role guards |
| Loans         | In Progress                            |
| Payments      | Planned                                |
| Notifications | Planned                                |
| Audit         | User creation logging implemented      |

---

## Getting Started

### Prerequisites

* Node.js 22+
* Docker
* Docker Compose
* npm

---

### Installation

```bash
# Clone repository
git clone <repository-url>

# Enter project
cd api

# Install dependencies
npm install
```

### Start Infrastructure

```bash
docker compose up -d
```

### Configure Environment

```bash
cp .env.example .env
```

Update values inside `.env`.

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Database Migrations

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run start:dev
```

---

## Application URLs

| Service      | URL                          |
| ------------ | ---------------------------- |
| API          | http://localhost:3200/api/v1 |
| Swagger Docs | http://localhost:3200/docs   |

---

## Environment Variables

```env
PORT=3200
NODE_ENV=development

DATABASE_URL="postgresql://user:password@localhost:5438/loan_db?schema=public"

REDIS_URL="redis://localhost:6379"

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

## Architecture Overview

```mermaid
flowchart TB

    subgraph Clients
        WEB[Next.js Web]
        MOB[Flutter Mobile]
    end

    subgraph Gateway
        GW[NestJS API Gateway]
    end

    subgraph CoreServices["Core Services"]
        AUTH[Auth]
        USERS[Users]
        LOANS[Loans]
        PAY[Payments]
        NOTIF[Notifications]
        AUDIT[Audit]
    end

    subgraph Backoffice["Future Services"]
        DJANGO[Django Admin]
        FASTAPI[FastAPI Risk Engine]
    end

    subgraph Infrastructure
        PG[(PostgreSQL)]
        REDIS[(Redis)]
        S3[(MinIO / S3)]
    end

    WEB --> GW
    MOB --> GW

    GW --> AUTH
    GW --> USERS
    GW --> LOANS
    GW --> PAY

    LOANS --> NOTIF

    AUTH --> AUDIT
    LOANS --> AUDIT
    PAY --> AUDIT

    USERS --> PG
    LOANS --> PG
    PAY --> PG

    AUTH --> REDIS

    DJANGO --> PG
    FASTAPI --> PG

    LOANS --> S3
```

---

## Folder Structure

```text
src/
├── auth/
├── users/
├── loans/
├── payments/
├── notifications/
├── audit/
├── prisma/
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   └── pipes/
├── app.module.ts
└── main.ts
```

---

## Database Schema

```mermaid
erDiagram

    USERS ||--o{ LOANS : applies_for
    USERS ||--o{ AUDIT_LOGS : performs

    LOANS ||--o{ REPAYMENT_SCHEDULES : has
    LOANS ||--o{ TRANSACTIONS : has

    USERS {
        uuid id PK
        string name
        string address
        string occupation
        string phone
        string email
        string password_hash
        string role
        string kyc_status
        timestamp created_at
    }

    LOANS {
        uuid id PK
        uuid user_id FK
        decimal amount
        string purpose
        string status
        decimal interest_rate
        int term_months
        int version
        timestamp disbursed_at
        timestamp created_at
    }

    REPAYMENT_SCHEDULES {
        uuid id PK
        uuid loan_id FK
        date due_date
        decimal amount_due
        decimal amount_paid
        decimal penalty
        string status
    }

    TRANSACTIONS {
        uuid id PK
        uuid loan_id FK
        string type
        decimal amount
        string reference
        string provider_ref
    }

    AUDIT_LOGS {
        uuid id PK
        uuid actor_id FK
        string action
        string entity_type
        uuid entity_id
        json before_state
        json after_state
        timestamp timestamp
    }
```

---

## Loan Lifecycle

```mermaid
stateDiagram-v2

    [*] --> PENDING

    PENDING --> UNDER_REVIEW
    UNDER_REVIEW --> APPROVED
    UNDER_REVIEW --> REJECTED

    APPROVED --> DISBURSED
    DISBURSED --> ACTIVE

    ACTIVE --> CLOSED
    ACTIVE --> DEFAULTED

    REJECTED --> [*]
    CLOSED --> [*]
    DEFAULTED --> [*]

    note right of PENDING
        Borrower submits application
    end note

    note right of UNDER_REVIEW
        Loan officer reviews
    end note

    note right of APPROVED
        Application approved
    end note

    note right of DISBURSED
        Funds sent to borrower
    end note

    note right of ACTIVE
        Repayment schedule active
    end note

    note right of CLOSED
        Loan fully repaid
    end note

    note right of DEFAULTED
        Loan delinquent
    end note
```

---

## Authentication Flow

```mermaid
sequenceDiagram

    participant User
    participant API
    participant Database

    User->>API: POST /auth/login
    API->>Database: Validate credentials
    Database-->>API: User record

    API-->>User: JWT Access Token

    User->>API: Request protected resource
    API->>API: Verify JWT

    API-->>User: Authorized Response
```

---

## API Endpoints

### Authentication

| Method | Endpoint      | Access        | Description                    |
| ------ | ------------- | ------------- | ------------------------------ |
| POST   | `/auth/login` | Public        | Login and receive JWT          |
| GET    | `/auth/me`    | Authenticated | Get current authenticated user |

### Users

| Method | Endpoint               | Access          | Description          |
| ------ | ---------------------- | --------------- | -------------------- |
| POST   | `/users/register`      | Public          | Register user        |
| GET    | `/users/profile`       | Authenticated   | Get own profile      |
| GET    | `/users/search?email=` | Admin / Officer | Search user by email |
| GET    | `/users/:id`           | Admin / Officer | Get user by ID       |

---

## Login Example

### Request

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## User Roles

| Role               | Description                           |
| ------------------ | ------------------------------------- |
| BORROWER           | Applies for loans and views own data  |
| LOAN_OFFICER       | Reviews and approves/rejects loans    |
| ACCOUNTANT         | Read-only access to financial reports |
| COMPLIANCE_OFFICER | Views KYC and audit data              |
| SUPER_ADMIN        | Full system access                    |

---

## Roadmap

### Phase 1 — Modular Monolith (Current)

* [x] User Registration
* [x] JWT Authentication
* [x] Role-Based Authorization
* [x] Audit Logging Foundation
* [ ] Loan Application Workflow
* [ ] Loan Approval Workflow
* [ ] Loan Disbursement
* [ ] Repayment Schedule Generation
* [ ] Payments Module
* [ ] Mobile Money Integration
* [ ] Email/SMS Notifications

### Phase 2 — Backoffice Platform

* [ ] Django Admin Dashboard
* [ ] Financial Reporting
* [ ] Reconciliation Tools
* [ ] KYC Review Portal
* [ ] Compliance Monitoring

### Phase 3 — Risk & Scale

* [ ] FastAPI Credit Scoring Engine
* [ ] Fraud Detection
* [ ] Kafka Event Streaming
* [ ] Domain Microservices
* [ ] Kubernetes Deployment
* [ ] Horizontal Scaling

---

## Engineering Principles

### Financial Integrity

* Use decimal arithmetic only for money calculations
* Never use JavaScript floating-point values for monetary operations

### Data Safety

* Soft-delete financial records
* Never hard-delete transactional data

### Auditing

* Every state change must generate an audit log
* Store before and after snapshots

### Concurrency

* Use optimistic locking through the `version` column

### Security

* Explicit Prisma `select` statements on all queries
* Never expose sensitive fields by default

### Scalability

* Domain-driven module boundaries
* Infrastructure prepared for service extraction

---

## License

UNLICENSED

Copyright © 2026 Evan Chimwaza
