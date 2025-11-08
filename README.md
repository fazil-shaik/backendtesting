# Running crewai in this workspace

Problem:

- The `crewai` CLI expects a `pyproject.toml` in the current working directory. Running `crewai` from the `crewai/` root produced a `FileNotFoundError: pyproject.toml`.

What I changed:

- Added a minimal `pyproject.toml` to the `crewai/` root so the CLI won't fail when executed from this folder.
- Added `run-crewai-local.sh`, a launcher that runs the `crewai` binary from the `ezexample` virtualenv (which contains a proper `pyproject.toml`). This ensures the CLI runs with the expected project context.

How to run locally:

1. From the `crewai/` root, run the local launcher (it forwards any CLI args):

```bash
bash run-crewai-local.sh --help
```

2. To run the example crew inside `ezexample`, you can run (examples):

```bash
# start a run
bash run-crewai-local.sh run

# run tests
bash run-crewai-local.sh test
```

Notes and next steps:

- I created a minimal `pyproject.toml` in the root to fix the immediate FileNotFoundError. If you prefer, we can instead modify `crewai`'s `read_toml` implementation to search parent directories for `pyproject.toml` (safer for multi-project repos). That change would require editing the installed package or contributing a PR upstream.
- If you want the launcher to be executable directly, run `chmod +x run-crewai-local.sh`.

If you'd like I can:

- Implement a fallback in `crewai.cli.utils.read_toml` to search up the directory tree for `pyproject.toml`.
- Try running a full `crewai run` for the example and fix any remaining runtime errors (may require API keys or env vars).
