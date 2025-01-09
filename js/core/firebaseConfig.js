// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

import { config } from './config.js';

const firebaseConfig = config.firebaseConfig;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
