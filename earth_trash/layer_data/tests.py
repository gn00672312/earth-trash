import os
import sys
import unittest
from datetime import datetime

HOME = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if HOME not in sys.path:
    sys.path.append(HOME)

from earth_trash.layer_data.views import _fetch_buoys_data


class OSMCTestCase(unittest.TestCase):
    def test_fetch_buoys_data(self):

        dt_from = datetime(2019, 10, 1, 0, 0, 0)
        dt_to = datetime(2019, 10, 1, 23, 59, 0)

        data = _fetch_buoys_data(dt_from, dt_to)
        print(data)


if __name__ == "__main__":
    unittest.main()
