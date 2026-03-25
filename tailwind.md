# Tailwind setup as of 4.2.2 @ 25 March 2026

this is for personal notes as i have trouble after applying steps by documentation

1. follow along from offical docs **but skip step 3** (https://tailwindcss.com/docs/installation/using-vite)

2. create a "postcss.config.mjs" and paste following content:

```
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

3. npm run dev
