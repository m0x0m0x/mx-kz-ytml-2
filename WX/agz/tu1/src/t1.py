# ?????????????????????????????????????????????????????????????????
# ty1- Tutorial 1 of smolagens
# ?????????????????????????????????????????????????????????????????

# --- Impors ---

import os

from dotenv import load_dotenv
from rich import print as rpr
from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel, tool

from .utz import header1

# --- Vars ---

load_dotenv("src/.azz")
GQ_T = os.getenv("GRQ")
HF_T = os.getenv("HF1")


# --- Main Function ---
def t1_main():
    # brint_env()
    # func1()
    func2()

# --- Sub Function---

# /// Brint env ///


def brint_env():
    header1("env brint")
    rpr(f"[green] GQ1: {GQ_T} [/green]")

# /// Fn1 ///


def func1():
    header1("F1 - Testing examples from docs")

    model = HfApiModel(
        model="meta-llama/Llama-3.1-8B-Instruct",
        provider="hf-inference",
        token=HF_T,
    )

    agent = CodeAgent(
        tools=[DuckDuckGoSearchTool()],
        model=model,
        add_base_tools=True,
    )

    agent.run("Compare and Contrast Booty Dancing and Booty Candy")

# /// Fn2 - Following the tutorial ///


def func2():
    header1("F2 - Following the tutorial")

    # Custom tool
    @tool
    def get_weather_date(city: str) -> str:
        """Get the weather date for a given city."""
        return f"The weather in {city} is sunny with a high of 75°F."

    model = HfApiModel(
        model="meta-llama/Llama-3.1-8B-Instruct",
        provider="hf-inference",
        token=HF_T,
    )
    agent = CodeAgent(
        tools=[DuckDuckGoSearchTool()],
        model=model,
        add_base_tools=True,
    )
    agent.run(
        " Talk about safe booty dancing  "
    )
