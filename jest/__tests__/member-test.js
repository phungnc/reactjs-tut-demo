jest.dontMock('../member.jsx');

var React = require('react/addons');
var Member= require('../member.jsx');
var TestUtils = React.addons.TestUtils;

describe('Member', function() {
  var memberFoo;
  beforeEach(function() {
    memberFoo = TestUtils.renderIntoDocument(
      <Member id={1} name="Foo" initialLike={true} src="http://canime.files.wordpress.com/2010/05/mask-dtb.jpg" />
    )
  });
  // Verify that component exists
  it('should exists', function() {
    expect(TestUtils.isCompositeComponent(memberFoo)).toBeTruthy;
  });
  // Verify that it's name is Foo
  it("set member like is false", function() {
    expect(memberFoo.state.liked).toBe(true);
  });
    // Verify that it's name is Foo
  it("check member name is Foo", function() {
    var memberName = TestUtils.findRenderedComponentWithType(memberFoo, Member);
    expect(memberName.getDOMNode().textContent).toEqual('Foo');
  });

});

describe('Like member', function() {
  var memberFoo;
  var IconButton = require('material-ui').IconButton;
  var ToggleStar = require('../toggle-star.jsx');
  var likeButton;
  beforeEach(function() {
    memberFoo = TestUtils.renderIntoDocument(
      <Member id={1} name="Foo" initialLike={true} src="http://canime.files.wordpress.com/2010/05/mask-dtb.jpg" />
    )
    likeButton = TestUtils.scryRenderedComponentsWithType(memberFoo, IconButton);
  });
  //
  it('should toggle state of member when click on it', function() {
    TestUtils.Simulate.click(likeButton[0].getDOMNode());
    expect(memberFoo.state.liked).toBe(false);
  });
  //
  it('should toggle color of button when click on it', function() {
    var ToggleStarIcon = TestUtils.findRenderedComponentWithType(memberFoo, ToggleStar);
    var beforeToggleColor = ToggleStarIcon.props.color;
    TestUtils.Simulate.click(likeButton[0].getDOMNode());
    expect(ToggleStarIcon.props.color).not.toEqual(beforeToggleColor);
  });
  //
});
