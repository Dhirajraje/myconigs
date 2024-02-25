#
# ************************************************************************
# Name          : BaseTool/Settings.py
# Version       : 1.00
# Description   : App configurations and settings are declared here.
# Date Created  : 14/08/2023 11:18
# ************************************************************************


# Global imports
from datetime import timedelta
from pathlib import Path
import os
# from dotenv import load_dotenv

# Load variables from .env file
# load_dotenv()

_ENVIRONMENT = os.environ.get('ENVIRONMENT', 'PROD')
_SECRET_KEY = os.environ.get(
    'SECRET_KEY', '0vg2l5(m-2=thg_(e8k-k4@&!@q17pl9pwqpt)so)m60_b9!-p')
# _DB_NAME = os.environ.get('DB_NAME')
# _DB_HOST = os.environ.get('DB_HOST')
# _DB_USER = os.environ.get('DB_USER')
# _DB_PASSWORD = os.environ.get('DB_PASSWORD')
# _DB_PORT = os.environ.get('DB_PORT')


# DATASTORE_DB_NAME = os.environ.get('DATASTORE_DB_NAME')
# DATASTORE_DB_DRIVER = os.environ.get('DATASTORE_DB_DRIVER')
# DATASTORE_DB_HOST = os.environ.get('DATASTORE_DB_HOST')
# DATASTORE_DB_USER = os.environ.get('DATASTORE_DB_USER')
# DATASTORE_DB_PASSWORD = os.environ.get('DATASTORE_DB_PASSWORD')
# DATASTORE_DB_PORT = os.environ.get('DATASTORE_DB_PORT')

_ALLOWED_ORIGINS = os.environ.get('ALLOWED_ORIGINS','*')
JWT_ACCESS_EXPIRY = 15
JWT_REFRESH_EXPIRY = 15

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

AUTH_USER_MODEL = 'custom_auth.UserModel'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = _SECRET_KEY
REFRESH_SECRET_KEY = '0vg2l5(m-2=thg_'+_SECRET_KEY+'pt)so)m60_b9!-p'


# LDAP Cred

# LDAP_HOSTNAME = ""

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = _ENVIRONMENT == 'DEV'

ALLOWED_HOSTS = ['*']


LOGGING_CONFIG = None

MEDIA_URL =  '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Dependencies
    'rest_framework',
    'drf_spectacular',
    'drf_spectacular_sidecar',
    'corsheaders',
    # Apps
    'masters',
    'custom_auth',
    'react'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'shared.middlewares.LoggingMiddleware'
]

ROOT_URLCONF = 'BaseTool.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'BaseTool.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases


ANGULAR_BUILD_PATH = 'static_build'
STATIC_URL = 'django_static/'


DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': _DB_NAME,
    #     'HOST': _DB_HOST,
    #     'USER': _DB_USER,
    #     'PASSWORD': _DB_PASSWORD,
    #     'PORT': _DB_PORT
    #  }
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'sqlite3.db',      
    }
}

# Swagger Configuration
SPECTACULAR_SETTINGS = {
    'TITLE': 'Assessment',
    'DESCRIPTION': 'Assesment backend',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SWAGGER_UI_DIST': 'SIDECAR',
    'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    'REDOC_DIST': 'SIDECAR',
    'COMPONENT_SPLIT_REQUEST': True
}
# Rest API Schema
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'masters.pagination.CustomPagination',
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'custom_auth.authentication.SafeJWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

# CORS
CORS_ALLOWED_ORIGINS = ['http://localhost:5432'] #list(set(['http://localhost:4200'] + [origin.strip() for origin in _ALLOWED_ORIGINS.split(',')]))

CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = CORS_ALLOWED_ORIGINS

CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS
CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_METHODS = (
    'GET', 'OPTIONS', 'POST','PATCH','PUT','DELETE'
)




AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend',)


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = ""
EMAIL_PORT = ""
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
DEFAULT_FROM_EMAIL = ""



# Minio Configs
# MINIO_ENDPOINT = '127.0.0.1:9000'
# MINIO_ACCESS_KEY = 'zk0sZamNtXEaKfWMiAdF'
# MINIO_SECRET_KEY = '9ibVLpBaAXvrN2VrmlAk6oCykXfHJs9F27D2083v'
# MINIO_USE_HTTPS = False

# DEFAULT_FILE_STORAGE = 'django_minio_backend.models.MinioBackend'


# MINIO_PRIVATE_BUCKETS = [
#     'django-backend-dev-private',
# ]
# MINIO_PUBLIC_BUCKETS = [
#     'django-backend-dev-public',
# ]
