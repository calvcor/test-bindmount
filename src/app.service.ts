import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private readonly bindMountPath = '/app/data';

  getHello(): string {
    return 'Hello World!';
  }

  getBindMountFiles(): string[] {
    try {
      if (fs.existsSync(this.bindMountPath)) {
        return fs.readdirSync(this.bindMountPath);
      }
      return ['Directory not found. Please check your bind mount.'];
    } catch (error: any) {
      return [`Error reading directory: ${error.message}`];
    }
  }

  getBindMountFileContent(filename: string): string {
    const filePath = path.join(this.bindMountPath, filename);
    try {
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
      throw new NotFoundException('File not found in bind mount.');
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      return `Error reading file: ${error.message}`;
    }
  }
}
