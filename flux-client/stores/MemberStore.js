//MemberStore.js
var AppDispatcher = require('../AppDispatcher');
var MemberConstants = require('../MemberConstants');

var EventEmitter = require('events').EventEmitter;

var _dispatchToken;
// Member Collections
var _members = [
  {id:1, name: "Avatar 1", like: false, src: "http://canime.files.wordpress.com/2010/05/mask-dtb.jpg"},
  {id:2, name: "Avatar 2", like: true, src: "http://z4.ifrm.com/30544/116/0/a3359905/avatar-3359905.jpg"},
  {id:3, name: "Avatar 3", like: false, src: "http://www.dodaj.rs/f/O/IM/OxPONIh/134.jpg"}
];
require('array.prototype.findindex');

function destroy(id) {
  let memberIndex = _members.findIndex(member => member.id == id);
  delete _members[memberIndex];
};

class MemberStore extends EventEmitter {
  constructor() {
    super();
    _dispatchToken = AppDispatcher.register(action => {
      switch(action.type) {
        case MemberConstants.MEMBER_DESTROY:
          destroy(action.id);
          this.emit('change');
          break;
      }
    });
  }
  
  getDispatchToken() {
    return _dispatchToken;
  }
  
  getMembers() {
    return _members;
  }
}

module.exports = new MemberStore();