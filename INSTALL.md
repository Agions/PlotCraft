# Install PlotCraft

## macOS

### Option 1: Homebrew (Recommended)
```bash
# First, tap the PlotCraft repository
brew tap Agions/tap https://github.com/Agions/homebrew-tap

# Then install PlotCraft
brew install --cask plotcraft
```

### Option 2: Download DMG
Download the latest `.dmg` from [GitHub Releases](https://github.com/Agions/PlotCraft/releases/latest) and drag `PlotCraft.app` to `/Applications`.

### Option 3: Install Script
```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Agions/PlotCraft/main/scripts/install.sh)"
```

---

## Windows

Download the latest `.exe` (NSIS installer) or `.msi` from [GitHub Releases](https://github.com/Agions/PlotCraft/releases/latest) and run it.

---

## Linux

### Debian/Ubuntu
```bash
curl -sL https://raw.githubusercontent.com/Agions/PlotCraft/main/scripts/install.sh | bash
```
Or download the `.deb` from [GitHub Releases](https://github.com/Agions/PlotCraft/releases/latest) and run:
```bash
sudo dpkg -i PlotCraft_*.deb
```

### Arch Linux (AUR)
```bash
yay -S plotcraft
```

---

## Build from Source
```bash
git clone https://github.com/Agions/PlotCraft.git
cd PlotCraft
npm install && npm run tauri build
```
