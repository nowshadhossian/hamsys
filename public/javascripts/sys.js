

jsPlumb.ready(function () {


    let e0 = jsPlumb.addEndpoint("container0"),

        e1 = jsPlumb.addEndpoint("container1");



    jsPlumb.connect({ source: e0, target: e1 });



    ///-----------2----------------//
    let secondInstance = jsPlumb.getInstance({
        PaintStyle:{
            strokeWidth:6,
            stroke:"#567567",
            outlineStroke:"black",
            outlineWidth:2
        },
        Connector:[ "Bezier", { curviness: 30 } ],
        Endpoint:[ "Dot", { radius:5 } ],
        EndpointStyle : { fill: "#567567"  },
       // Anchor : [ 0.5, 0.5, 1, 1 ],
    });

    secondInstance.connect({
        source:"element4",
        target:"element3",
     //   scope:"someScope",
      //  endpoint:[ "Rectangle", { width:30, height:10 } ]
    });


    secondInstance.bind("click", function (c) {
        secondInstance.deleteConnection(c);
    });

    secondInstance.makeSource(jsPlumb.getSelector(".window"), {
        filter: ".ep",
        anchor: "Continuous",
        connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
        connectionType:"basic",
        extract:{
            "action":"the-action"
        },
        maxConnections: 2,
        onMaxConnections: function (info, e) {
            alert("Maximum connections (" + info.maxConnections + ") reached");
        }
    });

    secondInstance.makeTarget(jsPlumb.getSelector(".window"), {
        dropOptions: { hoverClass: "dragHover" },
        anchor: "Continuous",
        allowLoopback: true
    });

    ///-----------3----------------//
    var firstInstance = jsPlumb.getInstance();
    firstInstance.importDefaults({
        Connector : [ "Bezier", { curviness: 150 } ],
        Anchors : [ "TopCenter", "BottomCenter" ],

    });

    firstInstance.connect({
        source:"battle1",
        target:"battle2",
        scope:"someScope",
        endpointStyle:{ fill: "yellow" },
    });

    firstInstance.draggable("battle2");//make draggable
    secondInstance.draggable(jsPlumb.getSelector('#element6'));//make draggable
    secondInstance.draggable(jsPlumb.getSelector('#element7'));//make draggable

});
 