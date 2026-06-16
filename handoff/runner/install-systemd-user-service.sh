#!/usr/bin/env bash
# Install the handoff watcher as a systemd user service.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HANDOFF_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
FRAMEWORK_ROOT="$(cd "$HANDOFF_ROOT/.." && pwd)"
TEMPLATE_FILE="$HANDOFF_ROOT/systemd/agentic-sdlc-handoff.service.template"
ENV_EXAMPLE="$HANDOFF_ROOT/systemd/handoff.env.example"

SERVICE_NAME="${HANDOFF_SYSTEMD_SERVICE_NAME:-agentic-sdlc-handoff.service}"
CONFIG_HOME="${XDG_CONFIG_HOME:-$HOME/.config}"
SYSTEMD_USER_DIR="$CONFIG_HOME/systemd/user"
ENV_DIR="$CONFIG_HOME/agentic-sdlc-framework"
ENV_FILE="$ENV_DIR/handoff.env"
UNIT_FILE="$SYSTEMD_USER_DIR/$SERVICE_NAME"

usage() {
  echo "Usage: $0 [--service-name name.service] [--no-daemon-reload]" >&2
  echo "Environment: HANDOFF_SYSTEMD_SERVICE_NAME=agentic-sdlc-handoff.service" >&2
}

sed_escape_replacement() {
  local value="$1"
  value="${value//\\/\\\\}"
  value="${value//&/\\&}"
  value="${value//|/\\|}"
  printf '%s' "$value"
}

NO_DAEMON_RELOAD=0
while [ "$#" -gt 0 ]; do
  case "$1" in
    --service-name)
      [ "$#" -ge 2 ] || {
        usage
        exit 2
      }
      SERVICE_NAME="$2"
      UNIT_FILE="$SYSTEMD_USER_DIR/$SERVICE_NAME"
      shift 2
      ;;
    --no-daemon-reload)
      NO_DAEMON_RELOAD=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage
      exit 2
      ;;
  esac
done

case "$SERVICE_NAME" in
  *.service) ;;
  *)
    echo "ERROR: service name must end with .service" >&2
    exit 2
    ;;
esac

[ -f "$TEMPLATE_FILE" ] || {
  echo "ERROR: missing service template: $TEMPLATE_FILE" >&2
  exit 2
}
[ -f "$ENV_EXAMPLE" ] || {
  echo "ERROR: missing environment example: $ENV_EXAMPLE" >&2
  exit 2
}
[ -x "$HANDOFF_ROOT/runner/watch-queue.sh" ] || {
  echo "ERROR: watch-queue.sh is missing or not executable" >&2
  exit 2
}

mkdir -p "$SYSTEMD_USER_DIR" "$ENV_DIR"

FRAMEWORK_ROOT_ESCAPED="$(sed_escape_replacement "$FRAMEWORK_ROOT")"
sed "s|__FRAMEWORK_ROOT__|$FRAMEWORK_ROOT_ESCAPED|g" "$TEMPLATE_FILE" > "$UNIT_FILE.tmp.$$"
mv "$UNIT_FILE.tmp.$$" "$UNIT_FILE"

if [ ! -e "$ENV_FILE" ]; then
  install -m 600 "$ENV_EXAMPLE" "$ENV_FILE"
else
  chmod 600 "$ENV_FILE"
fi

if [ "$NO_DAEMON_RELOAD" -eq 0 ]; then
  if command -v systemctl >/dev/null 2>&1; then
    systemctl --user daemon-reload
  else
    echo "WARN: systemctl not found; skipped daemon-reload" >&2
  fi
fi

cat <<EOF
Installed systemd user service:
  $UNIT_FILE

Environment file:
  $ENV_FILE

Review the environment file, then run:
  systemctl --user enable --now $SERVICE_NAME

Useful commands:
  systemctl --user status $SERVICE_NAME
  journalctl --user -u $SERVICE_NAME -f
  systemctl --user stop $SERVICE_NAME
EOF
