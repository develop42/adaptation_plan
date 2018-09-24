DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'test_project',
        'USER': 'postgres',
        'PASSWORD': 'qwerty12+',
        'HOST': 'localhost',
        'PORT': '5432',

    }
}

PRODUCTION = True