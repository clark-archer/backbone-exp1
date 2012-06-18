$(function() {

    Point = Backbone.Model.extend({
        initialize: function() {
        },
        toString: function() {
            return "(" + this.get("x") + ", " + this.get("y") + ")";
        }
    });

    PointList = Backbone.Collection.extend({
        initialize: function(models, options) {
        }
    });

    ListView = Backbone.View.extend({
        initialize: function(options, points) { 
            this.points = points;
            this.points.on("add", this.render, this);
            this.render();
        },
        render: function() { 
            $(this.el).html(this.buildPointString());
            return this;
        },
        buildPointString: function() {
            var pointString = "";
            this.points.forEach(function(point) {
                pointString += point.toString();
                pointString += "</br>";
            });
            return pointString;
        }
    });

    SummaryView = Backbone.View.extend({
        initialize: function(options, points) {
            this.points = points;
            this.points.on("add", this.render, this);
            this.render();
        },
        render: function() {
            var total = this.points.length;
            $(this.el).html("You have a total of " + total + 
                " point" + (total == 1 ? "" : "s") + ".");
            return this;
        }
    });

    var points = new PointList();
    var listView = new ListView({ el: $("#points") }, points);
    var summaryView = new SummaryView({ el: $("#summary") }, points);

    $('#newPointButton').click(function() {
        var point = new Point({ 
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50 });
        points.add(point);
    });

});
