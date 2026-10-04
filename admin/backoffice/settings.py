from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
import os

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'change-this-in-production')

DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party
    'rest_framework',
    'corsheaders',
    # our apps
    'loans',
    'users',
    'reports',
    'compliance',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # ← must be before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backoffice.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backoffice.wsgi.application'

# ── Database ──────────────────────────────────────────────
# Connecting to the SAME PostgreSQL database that Prisma manages.
# Django will NEVER run migrations on this database.
# All schema changes go through Prisma only.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'loan_db'),
        'USER': os.environ.get('DB_USER', 'user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'password'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5438'),
        'OPTIONS': {
            'options': '-c search_path=public'
        },
    }
}




# ── CORS ──────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # Vite frontend
    'http://localhost:3200',  # NestJS API
]

# ── Django REST Framework ─────────────────────────────────
REST_FRAMEWORK = {
     'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 25,
}

# ── Auth ──────────────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ── Internationalisation ──────────────────────────────────
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Blantyre'
USE_I18N = True
USE_TZ = True

# ── Static files ──────────────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# ── Media files (profile pictures etc) ───────────────────
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ── Primary key ───────────────────────────────────────────
# Prisma uses UUIDs — tell Django not to auto-create integer PKs
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── Admin customisation ───────────────────────────────────
ADMIN_SITE_HEADER = 'LoanFlow Backoffice'
ADMIN_SITE_TITLE = 'LoanFlow Admin'
ADMIN_INDEX_TITLE = 'Internal Operations Dashboard'




SIMPLE_JWT = {
    'SIGNING_KEY': os.environ.get('JWT_SECRET', 'change-this'),
    'ALGORITHM': 'HS256',
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'sub',  # NestJS uses 'sub' for user ID
}