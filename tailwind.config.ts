import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    width: {
      'full':'100%',
      '60':'240px',
      '1hundred': '100px',
      '2hundred': '200px',
      '3hundred': '300px',
      '4hundred': '400px',
      '5hundred': '500px',
      '6hundred': '600px',
      '7hundred': '700px',
    },
    height: {
      'full':'100%',
      '1hundred': '100px',
      '2hundred': '200px',
      '3hundred': '300px',
      '4hundred': '400px',
      '5hundred': '500px',
      '6hundred': '600px',
      '7hundred': '700px',
    },
  },
  plugins: [],
}
export default config
