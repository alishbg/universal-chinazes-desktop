# Universal Chinazes for Windows

Windows desktop wrapper for the shared Universal Chinazes web application.

## Release

Every push to `main` builds `Universal-Chinazes-Setup-1.0.0.exe` and the update metadata as a GitHub Actions artifact.

The generated files are published under the web application's `/downloads/` path. Installed copies check that path for updates and install downloaded updates when the app closes.
