import pandas as pd
import requests
# sheets1 1UWVjtxKIGpNmTirsn7mFVdwSE5-uZWwOImsCGTAblzk
# sheets2 1rTArBRU19_7k9SPWw1BlIylpO5eTrrH7ChUhvILp1UU

def sheet_to_df(sheet_id="1rTArBRU19_7k9SPWw1BlIylpO5eTrrH7ChUhvILp1UU",
                skiprows=1, header=None, file_name = "events.txt"):
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv"
    df = pd.read_csv(url, skiprows=1, header=None)
    
    with open(file_name,"w") as f:
        f.write(requests.get(url).text)
    return df