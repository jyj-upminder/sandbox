import * as crypto from 'crypto';
import * as fs from 'fs';
import * as Path from 'path';

export function createRandomDataFile(numBytes: number): string {
  // https://stackoverflow.com/a/44078785
  const uniqueId = Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);

  const path = Path.join(process.cwd(), uniqueId);
  const buffer = crypto.randomBytes(numBytes);

  fs.writeFileSync(path, buffer);

  return path;
}