import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { layout } from './layout.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  layout
});

export default rootReducer;