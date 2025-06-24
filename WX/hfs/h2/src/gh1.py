# /////////////////////////////////////////
# gh1.py - Testing out gh modelo
# /////////////////////////////////////////

# --- Imports Zone ---

import os

from dotenv import load_dotenv
from rich import print as rpr

from .utz import he1

# --- Vars ---
load_dotenv("src/.azz")
gh_t = os.getenv("GHB")

# --- Main Function ---


def gh1_main():
    fn1()

# --- Sub Function ---

# Brintaz envaz
def fn1():
    he1("Function 1")
    rpr(f"[green] GHB: {gh_t} [/green]")

#
# Calling function from doco 
#

def fn2():
    