#!/usr/bin/env bash
# Runs the visual tests inside a pinned Linux container, so everyone's
# screenshots match pixel-for-pixel whatever laptop they use. Fonts render
# differently on macOS and Windows, so screenshots taken directly on them
# would never match each other.
#
# Usage:
#   scripts/visual-tests-docker.sh                       # compare against baselines
#   scripts/visual-tests-docker.sh --update-snapshots    # accept new baselines
set -euo pipefail

PLAYWRIGHT_IMAGE="mcr.microsoft.com/playwright:v1.65.0-noble"
PNPM_VERSION="12.10.1"

# The anonymous volume on /work/node_modules keeps the container's Linux
# packages from overwriting your Mac's node_modules folder.
docker run --rm --ipc=host \
  -v "$PWD":/work \
  -v /work/node_modules \
  -w /work \
  "$PLAYWRIGHT_IMAGE" \
  bash -c "npm install -g pnpm@${PNPM_VERSION} --silent \
    && pnpm install --frozen-lockfile \
    && pnpm build-storybook --quiet \
    && pnpm exec playwright test $*"
