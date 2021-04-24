import { makeStyles } from '@material-ui/core';

const useHeaderStyles = makeStyles({
  header: {
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
    verticalAlign: 'bottom',
    marginRight: 10,
  },
});

export default useHeaderStyles;
