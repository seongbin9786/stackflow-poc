#!/usr/bin/env bash
set -euo pipefail

for f in \
  apps/stackflow-repro/index.html \
  apps/navigation-patterns/index.html \
  apps/famous-app-nav/index.html
  do
  test -f "$f"
  echo "OK: $f"
done

grep -q "Stack Navigation 검증 랩" apps/stackflow-repro/index.html
grep -q "다양한 화면 내비게이션 재현" apps/navigation-patterns/index.html
grep -q "유명 앱 스타일 내비게이션" apps/famous-app-nav/index.html

echo "HTML checks passed"
