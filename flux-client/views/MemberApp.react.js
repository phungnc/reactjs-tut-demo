var React   = require('react/addons'),
    request = require('superagent'),
    Router  = require('react-router'),
    mui     = require('material-ui'),
    Member  = require('./Member.react')
    ;

var Route         = Router.Route;
var RouteHandler  = Router.RouteHandler;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var ThemeManager = new mui.Styles.ThemeManager();

var List     = mui.List;
var ListDivider  = mui.ListDivider;

var MemberStore = require('../stores/MemberStore');
   

var MemberApp = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState() {
    return MemberStore.getMembers();
  },
  deleteItem(id){
    this.setState({
      members: this.state.members.filter(function(member){
        return member.id !== id;
      })
    });
  },
  render() {
    var members = this.state.members.map(function(member){
      return (
        <div>
          <Member id={member.id} onDelete={this.deleteItem} name={member.name} initialLike={member.like} src={member.src}/>
          <ListDivider inset={true}/>
        </div>
        );
    }, this);
    return (<List>{members}</List>);
  }
})

module.exports = MemberApp;