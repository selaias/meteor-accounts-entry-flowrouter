var renderToDiv;

renderToDiv = function(comp) {
  var div;
  div = document.createElement("DIV");
  Blaze.render(comp, div);
  return div;
};

FlowRouter.route("/", {
  name: 'test_helper_home',
  action: function() {
    renderToDiv('test_helper_home');
  }
});