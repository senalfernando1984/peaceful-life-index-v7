import type { Config } from 'tailwindcss';
export default {
  content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./data/**/*.{ts,tsx}','./lib/**/*.{ts,tsx}'],
  theme:{extend:{colors:{pli:{bg:'#F7F5EF',surface:'#FFFFFF',ink:'#18333A',teal:'#195A63',tealSoft:'#2E7A83',gold:'#C5A564',slate:'#667885',border:'#DEE5E2'}},boxShadow:{soft:'0 12px 30px rgba(24,51,58,0.08)'}}},
  plugins:[]
} satisfies Config;
