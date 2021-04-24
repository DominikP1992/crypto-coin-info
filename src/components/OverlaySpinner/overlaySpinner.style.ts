import { makeStyles } from '@material-ui/core/styles';

const useOverlaySpinnerStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default useOverlaySpinnerStyles;
