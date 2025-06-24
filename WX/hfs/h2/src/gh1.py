# /////////////////////////////////////////
# gh1.py - Testing out gh modelo
# /////////////////////////////////////////

# --- Imports Zone ---

import os

from dotenv import load_dotenv
from rich import print as rpr
from openai import OpenAI

from .utz import he1

# --- Vars ---
load_dotenv("src/.azz")
gh_t = os.getenv("GHB")

# Models from github
modelz = [
    "openai/gpt-4.1",
]

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

    endpoint = "https://models.github.ai/inference"
    client = OpenAI(
        base_url=endpoint,
        api_key=token,
    )

    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant.",
            },
            {
                "role": "user",
                "content": "What is the capital of France?",
            }
        ],
        temperature=1.0,
        top_p=1.0,
        model=model
    )

    print(response.choices[0].message.content)
