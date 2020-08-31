export default theme => ({
  mainSectionWrapper: {
    margin: 0,
    width: 'auto',
  },
  commentSection: {
    padding: 8,
  },

  editIconButton: {
    padding: 6,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },

  editingItem: {
    width: 300,
  },

  editCommentField: {
    width: '100%',
  },

  saveButton: {
    marginLeft: '1rem',
  },
});
