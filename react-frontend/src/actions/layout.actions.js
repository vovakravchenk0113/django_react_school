import { layoutConstants } from '../constants/layout.constants';

export const layoutActions = {
  leftSidebarShow,
  leftSidebarHide,
  rightSidebarShow,
  rightSidebarHide,
};

function leftSidebarShow() {
  return { type: layoutConstants.LEFT_SIDEBAR_SHOW };
}

function leftSidebarHide() {
  return { type: layoutConstants.LEFT_SIDEBAR_HIDE };
}

function rightSidebarShow() {
  return { type: layoutConstants.RIGHT_SIDEBAR_SHOW };
}

function rightSidebarHide() {
  return { type: layoutConstants.RIGHT_SIDEBAR_HIDE };
}
