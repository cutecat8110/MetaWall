// moment
import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const date = (time) => moment(time).format('YYYY/MM/DD hh:mm');
