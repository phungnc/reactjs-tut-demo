jest.dontMock('../member.jsx');

var React = require('react/addons');
var Member= require('../member.jsx');
var TestUtils = React.addons.TestUtils;

describe('Member component', function() {
  
  it('set name for member', function() {
    
    // Render a member with name is Foo
    var memberFoo = TestUtils.renderIntoDocument(
      <Member name="Foo" />
    );
    // Verify that it's name is Foo
    var memberName = TestUtils.findRenderedComponentWithType(memberFoo, Member);
    expect(memberName.getDOMNode().textContent).toEqual('Foo');
    
  });

});