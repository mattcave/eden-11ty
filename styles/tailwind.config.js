module.exports = {
    purge: {
      content: ['_site/**/*.html'],
      options: {
        safelist: [],
      },
    },
    theme: {
      extend: {
        colors: {
          change: 'transparent',
        },
        backgroundImage: theme => ({
          'noise': "url('/img/bgnoise_lg.png')"
        }),
      },
    },
    variants: {},
    plugins: [],
  }