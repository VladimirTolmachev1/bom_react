import { matchPath } from 'react-router-dom';
import { HelperService } from '../services';

export const queryParamsFromPropsSelector = componentProps => {
  const {
    location: { search },
  } = componentProps;
  return HelperService.parseSearch(search);
};

export const matchParamsSelector = ({ router: { location } }, pathToMatch) => {
  const match = matchPath(location.pathname, {
    path: pathToMatch,
  });

  return match ? match.params : {};
};
