#!/bin/bash
set -e

REPO="Agions/PlotCraft"
APP_NAME="PlotCraft"

darwin_install() {
  if command -v brew &> /dev/null; then
    echo "Installing PlotCraft via Homebrew..."
    brew install --cask $REPO
  else
    echo "Homebrew not found. Installing PlotCraft directly..."
    LATEST=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | grep -o '"tag_name":.*' | cut -d'"' -f4)
    DMG_URL=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | python3 -c "import sys,json; print([a['browser_download_url'] for a in json.load(sys.stdin)['assets'] if '.dmg' in a['name']][0])")
    TMPFILE="/tmp/PlotCraft.dmg"
    curl -sL "$DMG_URL" -o "$TMPFILE"
    VOLUME=$(hdiutil attach "$TMPFILE" | grep -o '/Volumes/[^ ]*')
    cp -r "$VOLUME/$APP_NAME.app" /Applications/
    hdiutil detach "$VOLUME" -quiet
    rm "$TMPFILE"
  fi
  echo "PlotCraft installed successfully!"
}

linux_install() {
  LATEST=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | grep -o '"tag_name":.*' | cut -d'"' -f4)
  DEB_URL=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | python3 -c "import sys,json; print([a['browser_download_url'] for a in json.load(sys.stdin)['assets'] if '.deb' in a['name']][0])")
  curl -sL "$DEB_URL" -o /tmp/plotcraft.deb
  sudo dpkg -i /tmp/plotcraft.deb || sudo apt-get install -f -y
  rm /tmp/plotcraft.deb
  echo "PlotCraft installed successfully!"
}

windows_install() {
  LATEST=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | grep -o '"tag_name":.*' | cut -d'"' -f4)
  EXE_URL=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | python3 -c "import sys,json; print([a['browser_download_url'] for a in json.load(sys.stdin)['assets'] if '.exe' in a['name']][0])")
  curl -sL "$EXE_URL" -o $TEMP/PlotCraft-Setup.exe
  Start-Process -Wait $TEMP/PlotCraft-Setup.exe
  rm $TEMP/PlotCraft-Setup.exe
  echo "PlotCraft installed successfully!"
}

case "$(uname -s)" in
  Darwin*)  darwin_install ;;
  Linux*)   linux_install ;;
  MINGW*|MSYS*|CYGWIN*) windows_install ;;
  *)        echo "Unsupported OS" && exit 1 ;;
esac
