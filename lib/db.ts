import { promises as fs } from 'fs';
import path from 'path';

// const DB_PATH = path.join(process.cwd(), 'lib', 'data', 'visitors.json');
const DB_PATH = path.join(__dirname, 'data', 'visitors.json');

interface VisitorData {
  totalVisits: number;
  lastVisit: string;
}

async function readDb(): Promise<VisitorData> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return default data
    return {
      totalVisits: 0,
      lastVisit: new Date().toISOString()
    };
  }
}

export async function incrementVisitorCount() {
  const data = await readDb();
  const updatedData = {
    totalVisits: data.totalVisits + 1,
    lastVisit: new Date().toISOString()
  };
  
  // Ensure directory exists
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(updatedData, null, 2));
  
  return updatedData;
}

export async function getVisitorStats() {
  return await readDb();
}
