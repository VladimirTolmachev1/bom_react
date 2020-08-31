export default () => ({
  formWrapper: {
    '@media screen and (max-width: 700px)': {
      flexDirection: 'column',
    },
  },

  infoSecrion: {
    width: '55%',
    '@media screen and (max-width: 700px)': {
      width: '100%',
    },
  },

  imageSection: {
    width: '45%',
    minHeight: 200,
    '@media screen and (max-width: 700px)': {
      width: '100%',
    },
  },

  dropZoneWrapper: {
    height: '100%',
  },
});
