// MemberActionCreators.js

var AppDispatcher = require('../AppDispatcher');
var MemberConstants = require('../MemberConstants');

module.exports = {
  
  destroy: id => {
    AppDispatcher.dispatch({
      type: MemberConstants.MEMBER_DESTROY, 
      id: id
    });
  },

  toggleLike: member => {
    let id = member.id;
    let ActionType = member.like ?
        MemberConstants.MEMBER_UNLIKE :
        MemberConstants.MEMBER_LIKE;
    AppDispatcher.dispatch({
      type: ActionType, 
      id: id
    });
  }
  
};