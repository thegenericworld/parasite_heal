'use client';
import { useEffect } from 'react';

export default function SecurityShield() {
  useEffect(() => {

    // BYPASS FOR LOCAL DEVELOPMENT
    // This ensures you don't accidentally ban yourself while coding.
    const isLocal = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1'  
                    // || window.location.hostname.startsWith('192.168.'); // Optional: bypass local network IPs

    if (isLocal) return;

    // Blocked country codes (India, Pakistan, Bangladesh, China, Taiwan, Philippines, Bhutan, Sri Lanka)
    const blockedCountries = ['IN', 'PK', 'BD', 'CN', 'TW', 'PH', 'BT', 'LK'];

    // Fetch IP geolocation data
    const checkIpLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const userCountry = data.country_code;

        if (blockedCountries.includes(userCountry)) {
          blockAccess();
        }
      } catch (error) {
        // If geolocation fails, allow access (fail-open approach)
        console.log('IP geolocation check failed: ' + error);
      }
    };

    const blockAccess = () => {
      // Wipe the site instantly
      document.documentElement.innerHTML = `
        <html>
            <head><title>502 Bad Gateway</title></head>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h1>502 Bad Gateway</h1>
                <hr>
                <p>nginx/1.18.0 (Ubuntu)</p>
            </body>
        </html>
      `;

      // Set a persistent cookie so our server-side Middleware can block them instantly next time
      document.cookie = "x-shield-id=banned; path=/; max-age=31536000; SameSite=Strict";

      // Clear the console so they can't even see error logs
      console.clear();

      // Stop everything
      window.stop();
    };

    checkIpLocation();
  }, []);

  return null;
}