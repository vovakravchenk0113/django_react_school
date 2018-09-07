import { layoutConstants } from '../constants/layout.constants';

export function layout(state = {}, action) {
  switch (action.type) {
    case layoutConstants.LEFT_SIDEBAR_SHOW:
      return {
        ...state,
        left_sidebar_visible: true,
      };
    case layoutConstants.LEFT_SIDEBAR_HIDE:
      return {
        ...state,
        left_sidebar_visible: false,
      };
    case layoutConstants.RIGHT_SIDEBAR_SHOW:
      return {
        ...state,
        right_sidebar_visible: true,
      };
    case layoutConstants.RIGHT_SIDEBAR_HIDE:
      return {
        ...state,
        right_sidebar_visible: false,
      };
    default:
      return state
  }
}