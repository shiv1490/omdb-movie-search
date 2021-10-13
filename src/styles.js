import { makeStyles } from '@material-ui/core/styles';

const movieDetailsStyles = makeStyles(() => ({
  chip: {
    margin: '0 5px 0 5px',
  },
  boxwrapper: {
    border: '0.5px lightgrey',
    borderStyle: 'solid none',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
}));

export default movieDetailsStyles;
