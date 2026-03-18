import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pli: {
          teal: '#0E6B6B',
          gold: '#B68C2A',
          ink: '#16323A',
          slate: '#64748B',
          bg: '#F8FAFC',
          border: '#D9E2EC'
        }
      }
    }
  },
  plugins: []
};

export default config;
