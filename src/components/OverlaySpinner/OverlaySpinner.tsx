import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// styles
import useOverlaySpinnerStyles from './overlaySpinner.style';

export default function SimpleBackdrop({ isOpen }: { isOpen: boolean }) {
  const classes = useOverlaySpinnerStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
