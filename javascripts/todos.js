$(function(){
  window.Todo = Backbone.Model.extend({	
	initialize: function(){
		console.log("This is called when I initialize the model");
	},
	
	toggle: function(){
		this.save();
	},
	clear: function(){
	  this.destroy();
	  $(this.view.el).dispose();
	}
  });
})