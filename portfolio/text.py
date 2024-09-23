import os
from dotenv import load_dotenv
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'Base/.env')
load_dotenv(dotenv_path=dotenv_path)

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
print(SECRET_KEY)