/*
How this example varies from the previous example is that we now create a dedicated view for each and every Model
The class in this case is ItemView, 
we have a tagName assigned to every instance of ItemView
the model property of this View is set when we create a new instance of this View
also note that here render is called explicitly
*/
$(document).ready(function(){
	
	var Item = Backbone.Model.extend({
		defaults:{
			part1: "Hello",
			part2: "World"
		}
	});
	
	var List = Backbone.Collection.extend({
		model: Item
	});
	
	var ItemView = Backbone.View.extend({
		tagName: 'li',
		
		initialize: function(){
			_.bindAll(this,"render");
		},
		
		render: function(){
			$(this.el).html('<span>' + this.model.get("part1") + " " + this.model.get("part2") + "</span>");
			return this;
		}
		
	});
	
	
	var ListView = Backbone.View.extend({
		el: $("body"),
		
		events: {
			'click button#add': 'addItem'
		},
		
		initialize: function(){
			_.bindAll(this,'render','appendItem','addItem');
			this.counter = 0;
			this.collection = new List();
			this.collection.bind("add",this.appendItem);
			this.render();
		},
		
		render: function(){
			$(this.el).append("<button id='add'>Add list item</button>");
      $(this.el).append("<ul></ul>");
			_(this.collection.models).each(function(item){
				appendItem(this);
			},this);
		},
		
		appendItem: function(item){
			//This will be done a little differently
			var itemView = new ItemView({
				model: item
			});
			
			$("ul",this.el).append(itemView.render().el);
		},
		
		addItem: function(){
			this.counter++;
			var item = new Item();
			item.set({
				part2: item.get("part2") + this.counter
			});
			this.collection.add(item);
		}
		
	});

	var listView = new ListView()
});
