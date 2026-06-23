# Smart Tourist Guide - Django Backend

Quick start:

1. Create virtualenv and install:

```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

2. Run migrations and seed data:

```bash
python manage.py migrate
python manage.py seed_data
python manage.py runserver
```

3. Admin:

```bash
python manage.py createsuperuser
```

Notes:
- Static assets are served from the project root (existing frontend files). Templates are in `templates/` and integrate those assets.
- Render deployment files (`render.yaml`, `Procfile`, `build.sh`) included.
