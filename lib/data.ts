import fs from 'fs/promises';
import path from 'path';

const mantrasFilePath = path.join(process.cwd(), 'data', 'mantras.json');
const videosFilePath = path.join(process.cwd(), 'data', 'videos.json');

export async function getMantras() {
  try {
    const fileContents = await fs.readFile(mantrasFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading mantras data:', error);
    return [];
  }
}

export async function saveMantras(mantras: any[]) {
  try {
    await fs.writeFile(mantrasFilePath, JSON.stringify(mantras, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing mantras data:', error);
    return false;
  }
}

export async function getVideos() {
  try {
    const fileContents = await fs.readFile(videosFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading videos data:', error);
    return [];
  }
}

export async function saveVideos(videos: any[]) {
  try {
    await fs.writeFile(videosFilePath, JSON.stringify(videos, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing videos data:', error);
    return false;
  }
} 