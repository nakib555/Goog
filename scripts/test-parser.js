import AppInfoParser from 'app-info-parser';
import fs from 'fs';

async function test() {
  const parser = new AppInfoParser('./public/updates/Lumina Notepad.apk');
  try {
    const result = await parser.parse();
    console.log('Version Name:', result.versionName);
    console.log('Version Code:', result.versionCode);
  } catch (err) {
    console.error(err);
  }
}
test();
