#
# Each running environment have to create it's own env.py
# This is the example of a env.py
#
import os
import sys


# set project home path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)
os.environ["BASE_DIR"] = BASE_DIR

# env for django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "earth_trash.settings")

# path for project config
# Note:
#   conf/dev is ignore by git, you can create your own dev config under conf/dev
_MODE = os.environ.get('MODE_ENV', 'dev')
os.environ["CONF"] = _CONF = os.path.join(BASE_DIR, 'conf', _MODE)

# SECURITY WARNING: keep the secret key used in production secret!
os.environ["SECRET_KEY"] = '^x((h-4k0_&j7tzyjvdy28+o5ehmjxkcp^_6wo=9vyzxyvu%b)'
