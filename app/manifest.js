export default function manifest() {
    return {
      name: 'Todo',
      short_name: 'Todo',
      description: 'A simple todo app',
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000',
      icons: [
        {
          src: '/public/favicon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/public/favicon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    }
  }