'use strict';

var React       = require('react'),
    Request     = require('superagent'),
    Router      = require('react-router');

var Route        = Router.Route,
    RouteHandler = Router.RouteHandler,
    DefaultRoute = Router.DefaultRoute,
    Link         = Router.Link;
    
    //request = require("superagent");
var Avatar = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    initialLike: React.PropTypes.bool.isRequired,
    // Thêm Interface onDelete()
    onDelete: React.PropTypes.func.isRequired,
  },
  getDefaultProps() {
    return {id: 1, name: "Avatar 1", height: 100, width: 100, liked: false, src: "http://canime.files.wordpress.com/2010/05/mask-dtb.jpg"};
  },
  getInitialState() {
    return {
      liked: this.props.initialLike
    };
  },
  onClick() {
    this.setState({liked: !this.state.liked});
  },
  // Ủy quyền cho Component cha xử lý.
  _onDelete() {
    this.props.onDelete(this.props.id);
  },
  render() {
    var textLike = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <li key={this.props.id}>
        <span>{this.props.id}</span>
        <img  src={this.props.src} width={this.props.width} height={this.props.height} alt="alt" />
        <Link to="avatar"><span>{this.props.name}</span></Link>
        <button onClick={this.onClick}>{textLike}</button>
        <button onClick={this._onDelete}>Delete</button>
      </li>
    );
  }
});
//var request = window.superagent;
var Avatars = React.createClass({

  getInitialState() {
    return {
      avatars: [
        {id: 1, name: "Avatar 1", height: 100, width: 100, like: false, src: "http://canime.files.wordpress.com/2010/05/mask-dtb.jpg"},
        {id: 2, name: "Avatar 2", height: 100, width: 100, like: true, src: "http://z4.ifrm.com/30544/116/0/a3359905/avatar-3359905.jpg"},
        {id: 3, name: "Avatar 3", height: 100, width: 100, like: false, src: "http://www.dodaj.rs/f/O/IM/OxPONIh/134.jpg"}
      ]
    }
  },
  // Thêm method deleteItem() set lại State (chứa các Component con) cho Component cha này
  deleteItem(id) {
    this.setState({
      avatars: this.state.avatars.filter(function(avatar){
        return avatar.id !== id;
      })
    });
  },
  componentDidMount: function() {
    var self = this;
    Request.get('http://localhost:3000/api/employees', function(res) {
    //console.log(res);
      if(res.body != undefined) self.setState({avatars: res.body});
    });
  },

  render() {  
    var avatars = this.state.avatars.map(function(avatar){
    // use below solution
    // map(function(){},this) 
    // or map(function(){}.bind(this)) 
    // or var that = this; onDelete = {that.deleteUser}
    // to pass this value to map function.
    // bind onDelete (event) to deleteUser.
      return <Avatar onDelete={this.deleteItem} id={avatar.id} name={avatar.name} width={avatar.width} height={avatar.height} src={avatar.src} initialLike={avatar.like} />;
    }, this);
    return (
      <ul>
        {avatars}
      </ul>
    );
  }
});

var routes  = (
  <Route path="/"  handler={App}>
    <DefaultRoute handler={Avatars} />
    <Route name="avatars" handler={Avatars} />
    <Route name="avatar" handler={Avatar} />
  </Route>
);

var App = React.createClass({
  render(){
    return(
      <div>
        <RouteHandler />
      </div>
    )
  }
});
////Finally we need to listen to the url and render the application.
//Router.run(routes, Router.HashLocation, function(Root) {
//  React.render(<Root/>, document.body);
//});
App.routes = routes;
module.exports = App;