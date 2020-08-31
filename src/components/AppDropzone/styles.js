export default () => ({
  dropzone: {
    width: '100%',
  },

  dropzoneWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  dropzoneArea: {
    height: '100%',
    borderRadius: 3,
    cursor: 'pointer',
    border: '1px #333333 dashed',
  },

  dropzoneContent: {
    paddingTop: '20%',
    paddingBottom: '20%',
    backgroundColor: '#f3f3f3',
    color: '#555',
    height: '100%',
    position: 'relative',
  },

  showOnlyOnHower: {
    opacity: 0,
    '&:hover': {
      opacity: 0.8,
    },
  },

  imgagePreview: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  description: {
    textAlign: 'center',
  },

  logoPreview: {
    width: 206,
    height: 206,
    objectFit: 'contain !important',
  },
});
