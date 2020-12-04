
let canvas = document.getElementById("canvas");

const SystemChart = {
    addNode: function(x, y, instance) {
        var d = document.createElement("div");
        var id = jsPlumbUtil.uuid();
        d.className = "w";
        d.id = id;
        d.innerHTML = id.substring(0, 7) + "<div class=\"ep\"></div>";
        d.style.left = x + "px";
        d.style.top = y + "px";
        instance.getContainer().appendChild(d);
        this.initNode(d, instance);
        return d;
    },
    addComponent: function(x, y, component, instance) {
        var d = document.createElement("div");
        var id = jsPlumbUtil.uuid();
        d.className = "w";
        d.id = id;
        d.innerHTML = component + "<div class=\"ep\"></div>";
        d.style.left = x + "px";
        d.style.top = y + "px";
        instance.getContainer().appendChild(d);
        this.initNode(d, instance);
        return d;
    },
    initNode: function(el, instance) {
        // initialise draggable elements.
        instance.draggable(el);

        instance.makeSource(el, {
            filter: ".ep",
            anchor: "Continuous",
            connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
            connectionType:"basic",
            //  extract:{
            //      "action":"the-action"
            //  },
            maxConnections: 2,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        instance.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true
        });

        // this is not part of the core demo functionality; it is a means for the Toolkit edition's wrapped
        // version of this demo to find out about new nodes being added.
        //
        instance.fire("jsPlumbDemoNodeAdded", el);
    },
    onConnection: (instance, callback) => {
        instance.bind("connection", function (info) {
            let isCorrect = callback();
            info.connection.getOverlay("label").setLabel("" + isCorrect);

            //info.connection.getOverlay("label").setLabel(info.connection.id + "DONEm");
        });
    },
    onCanvasDoubleClick: (instance, callback) => {
        jsPlumb.on(canvas, "dblclick", function(e) {

            SystemChart.addNode(e.offsetX, e.offsetY, instance);
            callback();

        });
    },
    onConnectionClick: (instance, callback) => {
        instance.bind("click", function (c) {
            instance.deleteConnection(c);
            callback();
        });
    }
};


const Controls = {
    addComponent: function(componentStr) {
        SystemChart.addComponent(0, 0, this.buildComponent(componentStr), window.chartInstance);
    },
    buildComponent: function (componentStr) {
        if(componentStr === "DNS"){
            return "<i class=\"component fa fa-cog\"></i>";
        } else if(componentStr === "CACHE") {
            return "<i class=\"component fa fa-btc\"></i>";
        } else if(componentStr === "SERVER") {
            return "<i class=\"component fa fa-list\"></i>";
        }
        alert("component not found");
    }
};

jsPlumb.ready(function () {

    // setup some defaults for jsPlumb.
    var instance = jsPlumb.getInstance({
        Endpoint: ["Dot", {radius: 2}], //circle ta
        Connector:"StateMachine",
        HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
        ConnectionOverlays: [
            [ "Arrow", {
                location: 1,
                id: "arrow",
                length: 14,
                foldback: 0.8
            } ],
            [ "Label", { label: "", id: "label", cssClass: "aLabel" }] //connection label.
        ],
        Container: "canvas"
    });

    instance.registerConnectionType("basic", { anchor:"Continuous", connector:"StateMachine" }); //This is like basic method created. Other areas uses basic as a method call

    window.chartInstance = instance;


    var windows = jsPlumb.getSelector(".statemachine-demo .w");

    // suspend drawing and initialise.
    instance.batch(function () {
       /* for (var i = 0; i < windows.length; i++) {
            SystemChart.initNode(windows[i], instance);
        }
        // and finally, make a few connections
        instance.connect({ source: "opened", target: "phone1", type:"basic" });
        instance.connect({ source: "phone1", target: "phone1", type:"basic" });
        instance.connect({ source: "phone1", target: "inperson", type:"basic" });

        instance.connect({
            source:"phone2",
            target:"rejected",
            type:"basic"
        });*/
    });

    //SystemChart.onCanvasDoubleClick(instance, () => alert("New node"));
    SystemChart.onConnectionClick(instance, () => {});

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

    SystemChart.onConnection(instance, () => {
        return Math.random() < 0.5;
    });

});