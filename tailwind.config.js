// tailwind.config.js (extend -> keyframes & animation)

module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        fadeInUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        zoomIn: { '0%': { opacity: 0, transform: 'scale(0.95)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        
      },
      animation: {
        fadeIn: 'fadeIn 0.9s ease-out',
        fadeInUp: 'fadeInUp 0.9s ease-out',
        slideUp: 'slideUp 0.9s ease-out',
        zoomIn: 'zoomIn 0.6s ease-out',
      },

    

    },
  },
  plugins: [],
}
