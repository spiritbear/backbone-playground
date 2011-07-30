/* 
This example uses a model to create an item, it then uses a collection which is nothing but a 
list of objects, and it uses a view. The abstraction works a little like this. The model
holds the data, the collection holds the list of model objects
and the view is responsible for rendering the collection

So this is how the flow works
1) you click the button which triggers addItem
2) addItem simply adds an item to a collection
3) however step2 also binds a function when add is triggered, and that is appendItem
4) appendItem actually creates and li and appends it to the list
*/
$(document).ready(function(){
	
	//Creating a Simple Model
	var Item = Backbone.Model.extend({
		defaults:{
			part1: "Hello",
			part2: "World"
		}
	});
	
	var List = Backbone.Collection.extend({
		model: Item
	});
	
	var ListView = Backbone.View.extend({
		el: $('body'),
		
		//when we click the button it will add an Item to a collection
		events: {
			'click button#add': 'addItem'
		},
		
		initialize:function(){
			_.bindAll(this,"render","addItem","appendItem")
			this.counter = 0;
			this.collection = new List();
			this.collection.bind("add",this.appendItem);
			this.render();
		},
		
		render: function(){
			$(this.el).append("<button id='add'>Add list item</button>");
			$(this.el).append("<ul></ul>");
			_(this.collection.models).each(function(item){
				appendItem(item);
			},this);
		},
		
		appendItem: function(item){
			$('ul', this.el).append("<li>"+item.get('part1')+" "+item.get('part2')+"</li>");
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
	
	var listView = new ListView();
});