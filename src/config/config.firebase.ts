import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';
let app: admin.app.App = null;

@Injectable()
export class ConfigFirebase implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      const firebaseAccountKeyFile = await readFile(
        `${process.cwd()}/protekzi360-rest-api/protekzi360-firebase-adminsdk-mn1l9-91f71c53e5.json`,
        'utf-8',
      );
      const serviceAccount = JSON.parse(firebaseAccountKeyFile);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  setup() {
    return app;
  }
}
