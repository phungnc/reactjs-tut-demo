// MemberActionCreators.js

var AppDispatcher = require('../AppDispatcher');
var MemberConstants = require('../MemberConstants');

module.exports = {
  
  destroy: id => {
    AppDispatcher.dispatch({
      type: MemberConstants.MEMBER_DESTROY, 
      id: id
    });
  }

};