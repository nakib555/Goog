import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AppInfoParser from 'app-info-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updatesDir = path.resolve(__dirname, '../public/updates');
const configPath = path.resolve(__dirname, '../functions/updates/apk-config.ts');

async function run() {
  try {
    // Ensure the directory exists
    if (!fs.existsSync(updatesDir)) {
      fs.mkdirSync(updatesDir, { recursive: true });
    }

    // Read the directory
    const files = fs.readdirSync(updatesDir);
    
    // Find the first .apk file
    const apkFile = files.find(f => f.endsWith('.apk'));

    if (apkFile) {
      console.log(`[Build] Found APK: ${apkFile}`);
      
      let version = "1.0.0";
      try {
        const parser = new AppInfoParser(path.join(updatesDir, apkFile));
        const result = await parser.parse();
        if (result && result.versionName) {
          version = result.versionName;
          console.log(`[Build] Extracted version: ${version}`);
        }
      } catch (err) {
        console.error('[Build] Failed to parse APK version, using default 1.0.0', err.message);
      }

      // Write the filename and version to a TypeScript file that the Cloudflare Function can import
      fs.writeFileSync(configPath, `export const apkName = "${apkFile}";\nexport const apkVersion = "${version}";\n`);
    } else {
      console.log('[Build] No .apk file found in public/updates/. Using default.');
      fs.writeFileSync(configPath, `export const apkName = "Lumina_Notepad.apk";\nexport const apkVersion = "1.0.0";\n`);
    }
  } catch (error) {
    console.error('[Build] Error finding APK:', error);
    fs.writeFileSync(configPath, `export const apkName = "Lumina_Notepad.apk";\nexport const apkVersion = "1.0.0";\n`);
  }
}

run();
