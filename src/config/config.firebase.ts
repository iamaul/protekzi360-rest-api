import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
let app: admin.app.App = null;

@Injectable()
export class ConfigFirebase implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      try {
        const filePath = `${process.cwd()}/protekzi360-firebase-adminsdk-mn1l9-91f71c53e5.json`;
        console.log('File path:', filePath);
        const firebaseAccountKeyFile = await readFile(filePath, 'utf-8');
        console.log('File content:', firebaseAccountKeyFile);
        const serviceAccount = JSON.parse(firebaseAccountKeyFile);
        app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }
  setup() {
    return app;
  }
}
