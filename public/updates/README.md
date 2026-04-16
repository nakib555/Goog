# Updates Directory

This folder is used to host your ZIP files and the `version.json` file.

Since this is a static site, any files placed in this directory will be served at `/updates/filename`.

## How to use:
1. Place your compiled ZIP files here (e.g., `app-v1.zip`, `app-v2.zip`).
2. Use the Admin Panel to generate a `version.json` file.
3. Place the generated `version.json` file in this directory.
4. Your app can now fetch `https://apkdistributionserver.nakibprince666.workers.dev/updates/version.json` to check for updates.
