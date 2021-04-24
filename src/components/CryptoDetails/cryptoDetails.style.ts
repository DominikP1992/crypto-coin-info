import { makeStyles } from '@material-ui/core';

const useCryptoDetailsStyles = makeStyles({
  avatar: {
    width: 60,
    height: 60,
    display: 'inline-flex',
    marginRight: 10,
  },
  upVote: {
    color: 'green',
  },
  downVote: {
    color: 'red',
  },
  githubLink: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default useCryptoDetailsStyles;
