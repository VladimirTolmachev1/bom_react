export default theme => ({
  columnWrapper: {
    width: '300px',
  },

  columnHeader: {
    padding: 15,
  },

  column: {
    backgroundColor: '#f4f7f9',
    borderRadius: 5,
    overflow: 'auto',
    height: 'calc(100vh - 350px)',
  },

  hoverForDrop: {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.75,
  },

  dropTarget: {
    backgroundColor: theme.palette.secondary.light,
    opacity: 0.5,
  },
});
