# Loan Management System

A modular monolith loan management platform built with NestJS, Prisma, and PostgreSQL. Designed to scale from a single deployable API into domain-based microservices as load grows.

## Tech stack

- **API**: NestJS (TypeScript)
- **ORM**: Prisma
- **Database**: PostgreSQL 15
- **Cache / sessions**: Redis 7
- **Auth**: Passport (JWT + Local strategy)
- **Docs**: Swagger / OpenAPI
- **Containerization**: Docker Compose

## Project status

Currently in **Phase 1 — Modular Monolith**. See [Roadmap](#roadmap) for what's next.

| Module | Status |
|---|---|
| Users |  Registration, profile, admin search |
| Auth |  Login, JWT guard, role guard |
| Loans |  In progress |
| Payments |  Not started |
| Notifications |  Not started |
| Audit |  Logging on user creation |

## Getting started

### Prerequisites
- Node.js 22+
- Docker & Docker Compose
- npm

### Setup

```bash
# Clone and install
git clone <repo-url>
cd api
npm install

# Start Postgres + Redis
docker compose up -d

# Copy env template and fill in values
cp .env.example .env

# Run migrations
npx prisma generate
npx prisma migrate dev

# Start the dev server
npm run start:dev
```

API runs at `http://localhost:3200/api/v1`
Swagger docs at `http://localhost:3200/docs`

### Environment variables

```env
PORT=3200
NODE_ENV=development

DATABASE_URL="postgresql://user:password@localhost:5438/loan_db?schema=public"
REDIS_URL="redis://localhost:6379"

JWT_SECRET=
JWT_EXPIRES_IN=7d

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

## Architecture overview

```mermaid
flowchart TB
    subgraph Clients
        WEB[Next.js Web]
        MOB[Flutter Mobile]
    end

    subgraph Gateway
        GW[NestJS API Gateway<br/>Auth · Rate limiting · Routing]
    end

    subgraph Core["Core Services - NestJS"]
        AUTH[Auth]
        USERS[Users]
        LOANS[Loans]
        PAY[Payments]
        NOTIF[Notifications]
        AUDIT[Audit]
    end

    subgraph Backoffice["Phase 2+"]
        DJANGO[Django Admin]
        FASTAPI[FastAPI Risk Engine]
    end

    subgraph Infra
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

## Database schema (current)

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

## Loan lifecycle

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

    note right of PENDING : Borrower applies
    note right of UNDER_REVIEW : Officer opens application
    note right of APPROVED : Officer approves
    note right of REJECTED : Officer rejects
    note right of DISBURSED : Funds sent to borrower
    note right of ACTIVE : Repayment schedule generated
    note right of CLOSED : Fully repaid
    note right of DEFAULTED : Missed payments threshold
```

## Auth flow

```mermaid
sequenceDiagram
    participant C as Client
    participant API as NestJS API
    participant DB as PostgreSQL

    C->>API: POST /auth/login
    API->>DB: findUnique by phone
    DB->>API: user record
    API->>API: compare password hash
    API->>API: sign JWT
    API->>C: access_token + user data

    C->>API: GET /users/profile
    API->>API: validate JWT payload
    API->>DB: findUnique by id
    DB->>API: user record
    API->>C: user profile
```

---

## API endpoints (current)

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/users/register` | Public | Register new user |
| GET | `/users/profile` | Authenticated | Get own profile |
| GET | `/users/search?email=` | Admin / Officer | Find user by email |
| GET | `/users/:id` | Admin / Officer | Get user by ID |
| POST | `/auth/login` | Public | Login, returns JWT |
| GET | `/auth/me` | Authenticated | Get current user from token |

## Roles

| Role | Description |
|---|---|
| `BORROWER` | Applies for loans, views own data |
| `LOAN_OFFICER` | Reviews and approves/rejects loans |
| `ACCOUNTANT` | Read-only access to financial reports |
| `COMPLIANCE_OFFICER` | Views KYC and audit data |
| `SUPER_ADMIN` | Full system access |

---

## Roadmap

### Phase 1 — Modular Monolith (current)
- [x] User registration + auth
- [x] JWT + role-based guards
- [x] Audit logging foundation
- [ ] Loans module (apply, approve, disburse)
- [ ] Repayment schedule generation
- [ ] Payments module + mobile money integration
- [ ] Notifications (SMS/email)

### Phase 2 — Admin Backoffice
- [ ] Django admin dashboard
- [ ] Reporting & reconciliation
- [ ] KYC/compliance views

### Phase 3 — Risk & Scale
- [ ] FastAPI credit scoring / fraud detection
- [ ] Extract hot services into true microservices over Kafka
- [ ] Kubernetes deployment

---

## Engineering principles

- **Decimal arithmetic only** for money — never plain JS floats
- **Soft deletes** on all financial records — never hard delete
- **Audit log everything** — every state change has a before/after snapshot
- **Optimistic locking** on loan records via `version` column
- **Explicit Prisma `select`** on every query — never leak sensitive fields by default

## License

UNLICENSED — Evan chimwaza