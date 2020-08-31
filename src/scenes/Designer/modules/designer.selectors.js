import { resource } from './designer.modules';

export const _pageDesignerSlice = state => state[resource];
export const loadingsSelector = state => _pageDesignerSlice(state).loading;
export const initialValuesSelector = state =>
  _pageDesignerSlice(state).initialValues;

export const formFieldNamesSelector = () => [
  'url',
  'menu_page_name',
  'menu_navigation_color',
  'menu_background_color',
  'restaurant_name',
  'logo',
  'background_picture',
];
