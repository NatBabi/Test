import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function capture() {
  const browser = await puppeteer.launch({ 
    defaultViewport: { width: 1440, height: 900 },
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();
  
  // Base output path
  const outDir = join(__dirname, '..', 'app', 'public', 'assets');

  console.log('Navigating to Dashboard...');
  await page.goto('http://localhost:3000/dashboard', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: join(outDir, 'hero.png') });
  
  console.log('Navigating to Intake...');
  await page.goto('http://localhost:3000/intake', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: join(outDir, 'triage.png') });
  
  console.log('Navigating to Assignments...');
  await page.goto('http://localhost:3000/assignments', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: join(outDir, 'assignments.png') });
  
  await browser.close();
  console.log('Done!');
}

capture().catch(console.error);
