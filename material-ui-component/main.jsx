var React   = require('react'),
    request = require('superagent'),
    Router  = require('react-router'),
    mui     = require('material-ui')
    ;

var Route         = Router.Route;
var RouteHandler  = Router.RouteHandler;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var ThemeManager = new mui.Styles.ThemeManager();

var ListItem     = mui.ListItem;
var Avatar       = mui.Avatar;
var IconButton   = mui.IconButton;
var ToggleStar   = require('./toggle-star.jsx');
var Delete       = require('./delete.jsx');
var Colors       = mui.Styles.Colors ;

var List     = mui.List;
var ListDivider  = mui.ListDivider;
    
var Member = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getInitialState() {
    return {
      liked: this.props.initialLike
    };
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  onClick() {
    this.setState({liked: !this.state.liked});
  },
  _onDelete() {
    this.props.onDelete(this.props.id);
  },
  render() {
    var starColor = this.state.liked ? Colors.yellow800 : Colors.grey400; 
    return (
        <ListItem 
          leftAvatar={<Avatar src={this.props.src} />}
          rightIconButton={
            <div>
              <IconButton onClick={this.onClick}><ToggleStar color={starColor} /></IconButton>
              <IconButton onClick={this._onDelete}><Delete color={Colors.red800} /></IconButton>
            </div>}
          secondaryTextLines={2}> 
          {this.props.name} 
        </ListItem>
      );
  }
});

var Members = React.createClass({
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
      members: [
        {id:1, name: "Avatar 1", like: false, src: "http://canime.files.wordpress.com/2010/05/mask-dtb.jpg"},
        {id:2, name: "Avatar 2", like: true, src: "http://z4.ifrm.com/30544/116/0/a3359905/avatar-3359905.jpg"},
        {id:3, name: "Avatar 3", like: false, src: "http://www.dodaj.rs/f/O/IM/OxPONIh/134.jpg"}
      ]
    }
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


React.render(<Members />,document.body);