#!/usr/bin/env bash
# One-time setup: clones SearXNG (open-source metasearch engine) and configures it
# to run locally for this project, with no API key, account, or credit card required.
set -e

cd "$(dirname "$0")/.."
TARGET="searxng-instance"

if [ -d "$TARGET" ]; then
  echo "$TARGET already exists, skipping clone."
else
  echo "Cloning SearXNG..."
  git clone --depth 1 https://github.com/searxng/searxng.git "$TARGET"
fi

cd "$TARGET"

echo "Creating Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "Installing dependencies (this can take a few minutes)..."
pip install --upgrade pip -q
pip install -r requirements.txt -q

echo "Enabling JSON output format..."
python3 - <<'PYEOF'
import re
path = "searx/settings.yml"
with open(path) as f:
    content = f.read()
if "- json" not in content:
    content = content.replace("formats:\n    - html", "formats:\n    - html\n    - json")
    with open(path, "w") as f:
        f.write(content)
PYEOF

echo "Setting a random secret key..."
SECRET=$(python3 -c "import secrets; print(secrets.token_hex(32))")
python3 - "$SECRET" <<'PYEOF'
import sys, re
secret = sys.argv[1]
path = "searx/settings.yml"
with open(path) as f:
    content = f.read()
content = re.sub(r'secret_key: ".*?"', f'secret_key: "{secret}"', content, count=1)
with open(path, "w") as f:
    f.write(content)
PYEOF

cat > run.sh <<'EOF'
#!/usr/bin/env bash
# Starts the self-hosted SearXNG instance used by the Skill Mastery Scheduler backend.
set -e
cd "$(dirname "$0")"
source venv/bin/activate
export SEARXNG_SETTINGS_PATH="$(pwd)/searx/settings.yml"
python -m searx.webapp
EOF
chmod +x run.sh

echo "Done. Start it with: ./searxng-instance/run.sh"
