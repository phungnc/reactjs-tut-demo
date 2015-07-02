// MemberMemberStore.jsjs
var EventEmitter = require('events').EventEmitter;

var _dispatchToken;
//var _memberId;

//var _members = {}; // colletion of member items
var _members = {
      members: [
        {id:1, name: "Avatar 1", like: false, src: "http://canime.files.wordpress.com/2010/05/mask-dtb.jpg"},
        {id:2, name: "Avatar 2", like: true, src: "http://z4.ifrm.com/30544/116/0/a3359905/avatar-3359905.jpg"},
        {id:3, name: "Avatar 3", like: false, src: "http://www.dodaj.rs/f/O/IM/OxPONIh/134.jpg"}
      ]
};

//function update(id, updates){
//  _members[id] = Object.assign(_members[id], updates);
//};

class MemberStore extends EventEmitter {
  constructor() {
    super();
//    _dispatchToken = AppDispacher.register(action => {
//      switch(action.type) {
//          
//        case ActionTypes.MEMBER_UNDO_LIKE:
//          update(action.id, {initialLike: false});
//          this.emit('change');
//          break;
//          
//        case ActionTypes.MEMBER_LIKE:
//          update(action.id, {initialLike: true});
//          this.emit('change');
//          break;
//          
//        default: 
//          
//      }
//    });
  }
  getDispatchToken() {
    return _dispatchToken;
  }
  
  getMembers() {
    return _members;
  }
}

module.exports = new MemberStore();