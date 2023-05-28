import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
let app: admin.app.App = null;

@Injectable()
export class ConfigFirebase implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      try {
        const serviceAccount: admin.ServiceAccount = {
          projectId: 'protekzi360',
          privateKey:
            '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCqtAZ6KMsJpZ7E\nB5E7Tyy+UzhauI8XZUNNrr7AhLXnAw8JH0ywsQNV+rbYWkmAnmweFBga4VQ3v7iu\nkMK0qJKuQGyTQc4fsJClDJRlpulyCXaatefpcC+iRLtmUJHxMfbwZeeAsE7/dxMd\neYKztid8eopqVVNRy++njN5TLzI5vDRrADxOQfWXwvRaDPV2voY+THytRypkn+Xo\nvbjHPI201fRX8zJdWvX9XnFkwDKSD5k9JVItb1n3d2bb+OhEKahwPbpXW5008kyr\nuUKMgpEMblc9voq8kS2ne1lPqV+I09TcqmV/0hL2Epo9HQqcTtciQoyFyBrZFZUk\nMMAqdKKvAgMBAAECggEAG82/wlTzoSofPnmnD5x5QrTGWIx4Dgz51eTRAAV9pVdr\nswYslRj33KC9+GZYU4E6Rfnq5THvaDcriw9cD1XnskcfCCsvOh0lqiRu5VG281KU\nRWW8lNqnf4wnY+ZapwkG2igW+XB+JYENFX9tqPzR2KYS9nfYXtnTOpyot67XxOxd\nCdLkrSZRCLQN5vYf3RiaHDSwDepCsyrGktCWbrgM4GDVGtIoF4NuhKIZmFGYBRVR\nfwBbjDEIUBfpduGHR0UTyz6xtsp3PDuOK61A1CAncN/z0Ru+OjYLp6tXXtk1Lt3C\nIL3MCfx6E7YEXG1nWhc4+Z4pYxE3IRMoedajZHGbgQKBgQDaRHZMO12WiQtxNLAx\n8e/FebCvgDPd0sxkAVZCbR9OTqNr50Qxbo6I2n/6dbr9YsYee6ZcIOCJpQy8cBB5\nUBhLg5oT/tKM106au65Yx0oBzyWqBMxdnL5jcTlwbwmFCA/W0Mnd2inOCcl+gAMN\nAtCvPr9V0HdHUUE9P1fA++SRLwKBgQDINpWtWpBI35C68MrVyb7ugcxrZbz71axH\nSe6SulHsNL2ehjapgD06CkjC0/CQEt8s+SmeXkajfu9APpTWxyoNI6SlYwwghnBB\nUqLUWFROOPIVaZfEQBvwe5EQBi3RBzZXLUxfN847WXmijpfkNuAcPLMkc8HmBqpZ\nVT0FlU2mgQKBgH4WXIxPIxJKGs0L1dkUXSGj2biYg93Z327KAu2eoh4XeXpk/9Ta\nfAZ8yr+B8UJdI/wKDCFecLezG/djeXDLHy3IWWLBqxnnayYh02a/wXXoF2bvHKvb\nV3SUvMzBqCssbBH5TRQW6l128+pawuhqPultgxRst+r/+oMKK4R1PyXLAoGAHTxr\nSu8olpue5M14sRNOwEFP+nbWy+d9ysMvBVoT0Gw7LETpAoNpbWpHCbwtKry2vjh8\nLVYS9pj4kucQkPRwXY7Q4h2+jZlUFxXcFSn41ZtXLm1G7i92ZP2GR1K/qgBlnQFO\nX7EkemIscuJjp72jqDvs5OvKaq6afYUG7iPJPQECgYBg/xTgrX3PTKjoWTEOIgxH\npCcWcuLPyvMrRvYqkewW284Ovp7lq9R+HAzN1XwdTZ2Ygh6kF4hwCg42CikahP2u\nBwmbfyE8k5rAnd6SY4VP/0V7RkJN7SkZ/lfOrWrHhpbFUES9bo3FvyrWdN1JvrUG\nRUmROvrRCwHLInJI4ro62Q==\n-----END PRIVATE KEY-----\n',
          clientEmail:
            'firebase-adminsdk-mn1l9@protekzi360.iam.gserviceaccount.com',
        };
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
