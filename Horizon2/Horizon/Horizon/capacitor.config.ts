import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
appName: 'Horizon',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
    // Permite conexões HTTP não seguras durante o desenvolvimento
  }
};



export default config;
