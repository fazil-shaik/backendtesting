#!/usr/bin/env python
# src/ezexample/main.py
import sys
from ezexample.crew import LatestAiDevelopmentCrew # pyright: ignore[reportMissingImports]

def run():
  """
  Run the crew.
  """
  inputs = {
    'topic': 'AI Agents'
  }
  LatestAiDevelopmentCrew().crew().kickoff(inputs=inputs)