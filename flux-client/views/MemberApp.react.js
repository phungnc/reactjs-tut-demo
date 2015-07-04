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
    return {
      members: MemberStore.getMembers()
    }
  },
  componentDidMount() {
    MemberStore.on('change',this._onChange);
  },
  componentWillUnmount() {
    MemberStore.removeListener('change',this._onChange);
  },
  // Event hanlder for 'change' event comming from the MemberStore
  _onChange() {
    this.setState({members: MemberStore.getMembers()});
  },
  render() {
    var members = this.state.members.map(function(member){
      return (
        <div>
          <Member id={member.id} name={member.name} initialLike={member.like} src={member.src}/>
          <ListDivider inset={true}/>
        </div>
        );
    }, this);
    return (<List>{members}</List>);
  }
})

module.exports = MemberApp;