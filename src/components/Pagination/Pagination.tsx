// external components
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

// icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';

export default function Pagination({
  currentPage,
  handleChange,
}: {
  currentPage: number;
  handleChange: (val: number) => void;
}) {
  return (
    <Box>
      <IconButton
        color="inherit"
        disabled={currentPage <= 1}
        onClick={() => handleChange(1)}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        color="inherit"
        disabled={currentPage <= 1}
        onClick={() => handleChange(currentPage - 1)}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton color="inherit" onClick={() => handleChange(currentPage + 1)}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}
