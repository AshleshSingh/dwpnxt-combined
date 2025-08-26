import sys
from pathlib import Path
import pandas as pd

# add backend module to path for imports
sys.path.append(str(Path(__file__).resolve().parents[1]))
from analytics.report import driver_kpis

def test_driver_kpis_all_columns_present():
    df = pd.DataFrame({
        'driver': ['A', 'A', 'B'],
        'aht_min': [5, None, 7],
        'sla_breached_bool': [True, False, True],
        'reopen_count_num': [1, 0, None]
    })
    result = driver_kpis(df)
    expected = pd.DataFrame({
        'driver': ['A', 'B'],
        'Tickets': [2, 1],
        'With_AHT': [1, 1],
        'Median_AHT': [5.0, 7.0],
        'SLA_Breach_%': [50.0, 100.0],
        'Reopen_Rate_%': [50.0, 0.0]
    })
    pd.testing.assert_frame_equal(result.reset_index(drop=True), expected, check_dtype=False)

def test_driver_kpis_missing_optional_columns():
    df = pd.DataFrame({'driver': ['A', 'B', 'A']})
    result = driver_kpis(df)
    expected = pd.DataFrame({
        'driver': ['A', 'B'],
        'Tickets': [2, 1],
        'With_AHT': [0, 0],
        'Median_AHT': [0.0, 0.0],
        'SLA_Breach_%': [0.0, 0.0],
        'Reopen_Rate_%': [0.0, 0.0]
    })
    pd.testing.assert_frame_equal(result.reset_index(drop=True), expected, check_dtype=False)
