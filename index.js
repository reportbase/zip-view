//top 

function ios()
{
    return 
    [
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform) ||
	(navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

var url = new URL(window.location.href);
url.param = function(key, def)
{
    if (url.searchParams.has(key))
        return url.searchParams.get(key);
    return def;
}

const HIDE = url.searchParams.get("hide");
const THEME = url.param("theme","light");
const BEAV = url.param("beav", 0.645);
const ADMIN = url.param("admin", 0);
const DELTA = url.param("delta", 2.5);
const PRECIS = url.param("precis", 3);
const NUBACK = "rgba(0,0,0,0.4)";
const GALLFILL = url.param("gfc","rgba(0,0,0,0.4)"); 
const MAXBUTTON = url.param("mbs",4000*3000); 
const CACHESIZE = url.param("cache",12);
const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*3;
const THUMBORDER = 5;
const BUTTONMARGIN = 30;
const IFRAME = window.self !== window.top;
const ALIEXTENT = 60;
const BEXTENT = 80;
const BOSSMIN = 4;
const FOOTSEP = 20;
const HEADTOP = 80;
const HEADBOT = 40;
const FIXEDTIME = 2;
const BUTTONRADIUS = 16;
const WRAPROWHEIGHT = 40;
const HEADHEIGHT = IFRAME ? 0 : HEADTOP+HEADBOT;
const FOOTHEIGHT = 80;
const MAXEXTENT = 10000;
const NUBHEIGHT = 10;
const NUBMARGIN = 4;
const NUBEXTENT = 15;
const NUBDELAY = 3000;
const MAXIMAGESIZE = MAXEXTENT*MAXEXTENT;
const MENUSELECT = "rgba(0,0,80,0.85)";
const MENUTAP = "rgba(255,125,0,0.75)";
const SCROLLNAB = "rgba(0,0,0,0.65)";
const FOOTBTNCOLOR = "rgba(0,0,0,0.5)";
const OPTIONFILL = "white";
const THUMBTRANSPARENT = "rgba(0,0,0,0.2)";
const LIGHTHUMBFILLL = "rgba(255,125,0,0.25)";
const HEAVYFILL = "rgba(0,0,0,0.6)";
const THUMBFILL = "rgba(255,125,0,0.40)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const BUTTONFILL = "rgba(255,255,255,0.75)";
const TRANSPARENT = "rgba(0,0,0,0)";
const FILLBAR = "rgba(0,0,0,0.75)";
const NUBAR = "rgba(255,255,255,0.8)";
const FILLMENU = "rgba(0,0,0,0.75)";
const ARROWFILL = "white";
const SCROLLEXTENT = 16;
const BUTTONBORDER = 4;
const BUTTONSMALLBORDER = 3;
const SCROLLMARGIN = 6;
const DISPLAYMARGIN = 12;
const SMALLFONT = "bold 16px Archivo";
const DEFAULTFONT = "bold 17px Archivo";
const MEDIUMFONT = "bold 18px Archivo";
const LARGEFONT = "bold 19px Archivo";
const HUGEFONT = "bold 21px Archivo";
const SLICEWIDTH = 16;
const BOSS = 0;
const GALLERY = 1;
const MENU = 2;
const BOSSMAIN = 9;
const MENUMAIN = 9;
const GALLERYMAIN = 9;
const CIRCLEIN = 19;
const CIRCLEOUT = 15;
const MULTITEXTROWHEIGHT = 30;
const BOOKMARKED = "rgba(0,0,255,0.75)";
const EXPANDRECT = 60;
const CORNEREXT = 0.05;

var NUBCOLOR = "rgba(255,255,255,0.75)";
if (THEME == "dark")
{
	var NUBCOLOR = "rgba(0,0,0,0.5)";
}

function setjson(key, value)
{
    try {localStorage.setItem(key, JSON.stringify(value));} catch(e) {}
}

function removejson(key)
{
    try {localStorage.removeItem(key);} catch(e) {}
}

function getjson(key)
{
    try {var k = localStorage.getItem(key); if (k) return JSON.parse(k);} catch(e){}
}

document.addEventListener('visibilitychange', function() 
{
    if (document.visibilityState == 'hidden') 
    { 
    }
    else if (document.visibilityState == 'visible') 
    {
    }
});
                          
var panel = {};
var global = {};
let photo = {};
let util = {};
global.bars = Number(url.param("bars", 0));

var login = {id: 0};
var k = getjson("login");
if (k)
    login = k;

photo.image = 0;
util.random_color = function()
{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

util.numbersonly = function(str)
{
    return str.split('').filter(char => !isNaN(char)).join('');
}

util.initialize_array_range = function(start, end)
{
    const length = end - start + 1;
    return Array.from(
    {
        length
    }, (_, index) => start + index);
}

util.generate_uid = function()
{
    let timestamp = Date.now().toString(36);
    let randomPart = Math.random().toString(36).substr(2, 5);
    return timestamp + randomPart;
}

util.random_value = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

util.clamp = function(min, max, val)
{
    if (typeof val === "undefined" || Number.isNaN(val) || val == null)
        val = max;
    if (max < min)
        return min;
    return (val < min) ? min : (val > max) ? max : val;
};

//sleep(2000).then(() => console.log('world!'))
function pause(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sleep(milliseconds)
{
    const date = Date.now();
    let currentDate = null;
    do 
    {
        currentDate = Date.now();
    } 
    while (currentDate - date < milliseconds);
}

util.istouch = function()
{
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

util.rotated_list = function(lst, start, width)
{
    var size = lst.length/3;
    var v = lst[start]
    width = Math.min(size, width);
    start += size - width;
    var k = lst.slice(start, start + width * 2.0);
    var j = k.findIndex(function(a)
    {
        return a == v;
    });
    
    var e = k.slice(j).concat(k.slice(0, j));
    var unique = e.filter(function(value, index, array)
    {
        return array.indexOf(value) === index;
    });

    return unique.sort(function(a, b)
    {
        return a - b;
    });
}

let circular_array = function(title, data)
{
    this.title = title;
    this.ANCHOR = 0;
    this.CURRENT = 0;
    this.data = data;

    this.length = function()
    {
        return Array.isArray(this.data) ?
            this.data.length : Number(this.data);
    };

    this.value = function()
    {
        if (this.CURRENT < this.length() && Array.isArray(this.data))
            return this.data[this.CURRENT];
        return this.CURRENT;
    };

    this.anchor = function()
    {
        return this.ANCHOR;
    };

    this.current = function()
    {
        return this.CURRENT;
    };

    this.makerange = function(j, size)
    {
        let s = j.split("-");
        let begin = Number(s[0]);
        let end = Number(s[1]);
        let mn = begin;
        let mx = end;
        let ad = (mx - mn) / size;
        if (mx == mn)
            size = 1;
        let lst = [];
        for (let n = 0; n < size; ++n, mn += ad)
            lst.push(mn.toFixed(4));
        this.data = lst;
        this.begin = begin;
        this.end = end;
    }

    this.berp = function()
    {
        if (Array.isArray(this.data))
            return Math.berp(0, this.length() - 1, this.current());
        else
            return Math.berp(0, this.length(), this.current());
    };

    this.lerp = function(berp)
    {
        if (Array.isArray(this.data))
            return Math.floor(Math.lerp(0, this.length() - 1, berp));
        else
            return Math.floor(Math.lerp(0, this.length(), berp));
    };

    this.rotateanchored = function(index)
    {
        this.CURRENT = this.ANCHOR - index;
        this.wrap();
    };

    this.wrap = function()
    {
        if (this.CURRENT >= this.length())
            this.CURRENT = this.CURRENT - this.length();
        else if (this.CURRENT < 0)
            this.CURRENT = this.length() + this.CURRENT;
    };

    this.add = function(index)
    {
        var k = this.current() + index;
        this.set(k);
    };
    
    this.rotate = function(index)
    {
        this.CURRENT += index;
        this.wrap();
    };

    this.setanchor = function(index)
    {
        if (typeof index === "undefined" ||
            Number.isNaN(index) || index == null)
            index = 0;
        if (Array.isArray(this.data))
            this.ANCHOR = util.clamp(0, this.length() - 1, Math.floor(index));
        else
            this.ANCHOR = util.clamp(0, this.length(), index);
    };

    this.setcurrent = function(index)
    {
        if (typeof index === "undefined" ||
            Number.isNaN(index) || index == null)
            index = 0;
        if (Array.isArray(this.data))
            this.CURRENT = util.clamp(0, this.length() - 1, Math.floor(index));
        else
            this.CURRENT = util.clamp(0, this.length(), index);
    };

    this.setdata = function(data)
    {
        this.data = data;
        if (this.current() >= this.length())
            this.setcurrent(this.length() - 1);
    };

    this.set = function(index)
    {
        this.setcurrent(index);
        this.setanchor(index);
    };

    this.addperc = function(g)
    {
        var k = this.length() * g;
        this.add(k);
    };

    this.setperc = function(p)
    {
        p = util.clamp(0, 1, p);
        var len = this.length();
        var k = Math.lerp(0, len - 1, p);
        this.set(k);
    };

    this.findindex = function(k)
    {
        return this.data.findIndex(function(a)
        {
            return a == k;
        })
    }

    this.setindex = function(k)
    {
        var k = this.data.findIndex(function(a)
        {
            return a == k;
        })
        this.set(k);
    }
};

panel.yoll = function()
{
    this.draw = function(context, rect, user, time) {};

    this.tap = function(context, rect, x, y, shift, ctrl)
    {
        if (context.canvas.tap_)
            context.canvas.tap_(context, rect, x, y, shift, ctrl);
    };

    this.wheel = function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        if (context.canvas.wheel_)
            context.canvas.wheel_(context, x, y);
    };

    this.wheeleftright = function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        if (context.canvas.wheeleftright_)
            context.canvas.wheeleftright_(context, x, y, delta, ctrl, shift, alt, type, trackpad);
    };

    this.wheelupdown = function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        if (context.canvas.wheelupdown_)
            context.canvas.wheelupdown_(context, x, y, delta, ctrl, shift, alt, type, trackpad);
    };

    this.drop = function(context, evt)
    {
        if (context.canvas.drop)
            context.canvas.drop(context, evt);
    };

    this.mouseout = function(context, evt)
    {
        var canvas = context.canvas;
        if (canvas.mouse && canvas.mouse.out)
            canvas.mouse.out(context, evt);
    };

    this.mouseenter = function(context, evt)
    {
        var canvas = context.canvas;
        if (canvas.mouse && canvas.mouse.enter)
            canvas.mouse.enter(evt);
    };

    this.mousemove = function(context, rect, x, y)
    {
        var canvas = context.canvas;
        if (canvas.mouse && canvas.mouse.move)
            canvas.mouse.move(context, rect, x, y);
    };

    this.pan = function(context, rect, x, y, type)
    {
        context.canvas.pan_(context, rect, x, y, type);
    };

    this.panend = function(context, rect, x, y)
    {
        context.canvas.panend_(context, rect, x, y);
    };

    this.panleftright = function(context, rect, x, y, type)
    {
        context.canvas.panleftright_(context, rect, x, y, type);
    };

    this.panupdown = function(context, rect, x, y, type)
    {
        context.canvas.panupdown_(context, rect, x, y, type);
    };

    this.panstart = function(context, rect, x, y)
    {
        context.canvas.panstart_(context, rect, x, y);
    };

    this.swipeleftright = function(context, rect, x, y, type)
    {
        if (context.canvas.swipeleftright_)
            context.canvas.swipeleftright_(context, rect, x, y, type);
    };

    this.swipeupdown = function(context, rect, x, y, type)
    {
        if (context.canvas.swipeupdown_)
            context.canvas.swipeupdown_(context, rect, x, y, type);
    };

    this.pinch = function(context, x, y, scale)
    {
        if (context.canvas.pinch_)
            context.canvas.pinch_(context, x, y, scale);
    };

    this.pinchend = function(context)
    {
        if (context.canvas.pinchend_)
            context.canvas.pinchend_(context);
    }

    this.pinchstart = function(context, rect, x, y)
    {
        if (context.canvas.pinchstart_)
            context.canvas.pinchstart_(context, rect, x, y);
    }

    this.pressup = function(context, rect, x, y, shift, ctrl)
    {
        if (context.canvas.pressup_)
            context.canvas.pressup_(context, rect, x, y, shift, ctrl);
    }

    this.press = function(context, rect, x, y, shift, ctrl)
    {
        if (context.canvas.press_)
            context.canvas.press_(context, rect, x, y, shift, ctrl);
    }
};

const opts = {
    synchronized: true,
    alpha: true,
    antialias: false,
    depth: false,
};

const opts4 = {
    synchronized: true,
    antialias: false,
    depth: false,
};

let _1cnv = document.getElementById("_1");
let _1cnvctx = _1cnv.getContext("2d", opts);
let _2cnv = document.getElementById("_2");
let _2cnvctx = _2cnv.getContext("2d", opts);
let _3cnv = document.getElementById("_3");
let _3cnvctx = _3cnv.getContext("2d", opts);
let _4cnv = document.getElementById("_4");
let _4cnvctx = _4cnv.getContext("2d", opts4);
let _5cnv = document.getElementById("_5");
let _5cnvctx = _5cnv.getContext("2d", opts);
let _6cnv = document.getElementById("_6");
let _6cnvctx = _6cnv.getContext("2d");
let _7cnv = document.getElementById("_7");
let _7cnvctx = _7cnv.getContext("2d", opts);
let _8cnv = document.getElementById("_8");
let _8cnvctx = _8cnv.getContext("2d", opts);
let _9cnv = document.getElementById("_9");
let _9cnvctx = _9cnv.getContext("2d", opts);
let _10cnv = document.getElementById("_10");
let _10cnvctx = _10cnv.getContext("2d", opts);
let _11cnv = document.getElementById("_11");
let _11cnvctx = _11cnv.getContext("2d", opts);
let _12cnv = document.getElementById("_12");
let _12cnvctx = _12cnv.getContext("2d", opts);
let _13cnv = document.getElementById("_13");
let _13cnvctx = _13cnv.getContext("2d", opts);
let _14cnv = document.getElementById("_14");
let _14cnvctx = _14cnv.getContext("2d", opts);
let _15cnv = document.getElementById("_15");
let _15cnvctx = _15cnv.getContext("2d", opts);
let headcnv = document.getElementById("head");
let headcnvctx = headcnv.getContext("2d", opts);

var canvas = document.createElement("canvas");
var offscreenCanvas = canvas.transferControlToOffscreen();
var offscreenCtx = offscreenCanvas.getContext('2d');
               
_8cnvctx.font = DEFAULTFONT;
_8cnv.width = 100;
_8cnv.height = 100;
_8cnvctx.fillText(" ", 0, 0);

let canvaslst = [];
for (var n = 0; n < 6; ++n)
    canvaslst[n] = document.createElement("canvas");

let slicelst = [];
const SLICERADIUS = 131000;
for (let n = 499; n >= 1; n = n - 1)
    slicelst.push(
    {
        slices: n * 3,
        delay: SLICERADIUS / n
    });

panel.empty = function()
{
    this.draw = function(context, rect, user, time) {}
};    

var footlst = 
[
{
    name: "DEFAULT",
    draw: function(context, rect, user, time)
    {
    }
},
{
    name: "FOLDERS",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.closerect = new rectangle();
        canvas.homeresetrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.text(),
				new panel.rectangle(canvas.closerect),
			]),
            0,
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.colsA([0,0,0],
				[
					0,
					new panel.layers(
					[
						new panel.rectangle(canvas.homeresetrect),
						new panel.text(),
					]),
					0
				])                            
			])
		]);

        a.draw(context, rect, 
	   	[
		   `\u{25C0}   Folders`,
            0,
	        [
			    0,
			   `Home`,
			   0,
		    ],
        ], 0);
        
        context.restore();
    }
},
{
    name: "IMAGE",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.closerect = new rectangle();
        canvas.homeresetrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.rectangle(canvas.closerect),
				new panel.text(),
			]),
            0,
			0
		]);
        
        a.draw(context, rect, 
	   	[
		    `\u{25C0}   Images`,
            0,
		    0, 
		]);
        
        context.restore();    
    }
}, 	
{
    name: "KEYBOARD",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.homerect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.text(),
				new panel.rectangle(canvas.homerect),
			]),
			0
		]);

        a.draw(context, rect, 
	   	[
		   `\u{25C0}   Help - Keyboard`,
			0,
		], 0);
        
        context.restore();
    }
},  
{
    name: "IMAGES",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.closerect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.text(),
				new panel.rectangle(canvas.closerect),
			]),
			0
		]);

        var k = galleryobj.title?galleryobj.title:"Images";
        a.draw(context, rect, 
	   	[
		   `\u{25C0}   ${k}`,
			0,
		], 0);
        
        context.restore();
    }
},    
{
    name: "USERS",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.homerect = new rectangle();
        canvas.userdeleterect = new rectangle();
        canvas.useraddrect = new rectangle();
        canvas.userpatchrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.rectangle(canvas.homerect),
				new panel.text(),
			]),
			0,
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
   			    new panel.colsA([0,0,0],
				[
					new panel.layers(
					[
						new panel.rectangle(canvas.useraddrect),
						new panel.text(),
					]),
					new panel.layers(
					[
						new panel.rectangle(canvas.userpatchrect),
						new panel.text(),
					]),
					new panel.layers(
					[
						new panel.rectangle(canvas.userdeleterect),
						new panel.text(),
					]),
				])                 
			])
		]);
        
        a.draw(context, rect, 
	   	[
		   `\u{25C0}   Users`,
		    0,
            [
                "Add",
                "Edit",
		        "Delete"
            ]
		]);
        
        context.restore();    
    }
},
{
    name: "GALLERIES",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.closerect = new rectangle();
        canvas.galleryaddrect = new rectangle();
        canvas.gallerypatchrect = new rectangle();
        canvas.gallerydeleterect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.rectangle(canvas.closerect),
				new panel.text(),
			]),
			0,
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.colsA([0,0,0],
				[
					new panel.layers(
					[
                        new panel.rectangle(canvas.galleryaddrect),
						new panel.text(),
					]),
					new panel.layers(
					[
                        canvas.gallerypatchtoggle?
                            new panel.shrink(new panel.rounded("red", 0, 0, 12, 12),10,10):0,
						new panel.rectangle(canvas.gallerypatchrect),
						new panel.text(),
					]),
					new panel.layers(
					[
						canvas.gallerydeletetoggle?
                            new panel.shrink(new panel.rounded("red", 0, 0, 12, 12),10,10):0,
						new panel.rectangle(canvas.gallerydeleterect),
						new panel.text(),
					]),
				])                            
			])
		]);
        
        a.draw(context, rect, 
	   	[
		   `\u{25C0}   Galleries`,
		   0,
		   [
			   `Add`,
			   `Edit`,
			   `Delete`,
			], 
		]);
        
        context.restore();    
    }
},
{
    name: "OPTIONS",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.homerect = new rectangle();
        var a = new panel.rows([ALIEXTENT,0],
        [
            new panel.layers(
            [
                new panel.fill(FOOTBTNCOLOR),
                new panel.text(),
                new panel.rectangle(canvas.homerect),
            ]),
            0
        ]);
        
        a.draw(context, rect, `\u{25C0}   Options`, 0);
        context.restore();
    }
},
{
    name: "USER",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.homerect = new rectangle();
        canvas.loginrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
        [
            new panel.layers(
            [
                new panel.fill(FOOTBTNCOLOR),
                new panel.rectangle(canvas.homerect),
                new panel.text(),
            ]),
            0,
            new panel.layers(
            [
                new panel.fill(FOOTBTNCOLOR),
                new panel.rectangle(canvas.loginrect),
                new panel.text(),
            ])
        ]);
        
        a.draw(context, rect, 
        [
            `\u{25C0}   Account`,
            0,
            "Logout",
        ], 0);
        
        context.restore();
    }
},
{
    name: "HOME",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.closerect = new rectangle();
        canvas.loginrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
		[
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.text(),
				new panel.rectangle(canvas.closerect),
			]),
			0,
			new panel.layers(
			[
				new panel.fill(FOOTBTNCOLOR),
				new panel.rectangle(canvas.loginrect),
				new panel.text(),             
			])
		]);

	    var str = login.email ? "Logout" : "Login";
        a.draw(context, rect, 
	   	[
		   `\u{25C0}   Home`,
			0,
			str,
		], 0);
		
        context.restore();
    }
},
]

var headlst = 
[
{
    name: "DEFAULT",
    draw: function(context, rect, user, time)
    {
    }
},
{
    name: "BOSS",
    draw: function(context, rect, user, time)
    {
    }
},
{
    name: "GALLERY",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.clear();
        context.save();
        var ctx = menuobj.value();
        var g = ctx == _8cnvctx;
        delete context.zoomrect;
        delete context.homerect;
        delete context.fullscreenrect;
        delete context.homemenurect;
        delete context.galleryrect;
	    var b = ALIEXTENT+10;
        var s = SAFARI ? -1 : b;
        var e = rect.width>=360 ? b:-1;
        var a = new panel.rows([BEXTENT, 0],
        [
            new panel.cols([5, ALIEXTENT, 0, s, e, b, 0, ALIEXTENT, 5],
            [
                0,
                new panel.homemenu(),
                0,
                0 ? new panel.fullscreen() : 0,
                0 ? new panel.home() : 0,
                0 ? new panel.zoom() : 0,
                0,
                new panel.gallerymenu(),
                0,
            ]),
            0
        ]);
        
        a.draw(context, rect, 0, 0);
        context.restore();        
    }
},
]

var headobj = new circular_array("HEAD", headlst);
headobj.draw = function()
{
	headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
}

var positxobj = new circular_array("POSITIONX", 100);
var posityobj = new circular_array("POSITIONY", 100);
positxobj.set(50);
posityobj.set(50);

var bossdisplaylst =
[
{
    name: "BOSS",
    title: "Thumbnail",
    draw: function(context, r, user, time)
    {

    }
},
{
    name: "ZOOM",
    title: "Zoom",
    draw: function(context, rect, user, time)
    {
            var canvas = context.canvas;
            context.pagerect = new rectangle();
            context.zoomrect = new rectangle();
            context.stretchrect = new rectangle();
            const rainstep = Math.min(420,window.innerWidth-60);
        
            if (
                !photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var a = new panel.rowsA([HEADHEIGHT, 12, SCROLLEXTENT, 12, SCROLLEXTENT, 0],
            [
                0,
		        0,
                new panel.cols([0,rainstep,0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, BUTTONBORDER, BUTTONFILL, 8, 8),
                        new panel.expand(new panel.rectangle(context.zoomrect), 10, 1),
                        new panel.shrink(new panel.currentH(new panel.rounded("white", 
                                0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3),
                    ]),
                    0,
                ]),
                0,
                1?0:new panel.cols([0, rainstep, 0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, BUTTONBORDER, BUTTONFILL, 8, 8),
                        new panel.expand(new panel.rectangle(context.stretchrect), 10, 0),
                        new panel.shrink(new panel.currentH(new panel.rounded("white", 0, 
                                TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3)
                    ]),
                    0,
                ]),
                0
            ]);

            if (headcnv.height)
            a.draw(context, rect,
            [
                0,
		        0,
                zoomobj,
                0,
                stretchobj,
                0,
            ]);

            var data = [];
            var index = galleryobj.current();
            data.push(`\u{25C0}   ${index}  of  ${galleryobj.length()}   \u{25B6}`);
        
            var a = new panel.rowsA([HEADTOP, HEADBOT, 0, 
                                 (data.length*WRAPROWHEIGHT), 
                                 20],
            [
                0,
                0,
                0,
                0,
                0,
            ]);
        
            if (headcnv.height)
            a.draw(context, rect,
            [
                0,
                0,
                0,
                data,
                0,
            ]);
        
            context.restore();   
    }
},
{
    name: "STRETCH",
    title: "Stretch",
    draw: function(context, rect, user, time)
    {
            var canvas = context.canvas;
            context.pagerect = new rectangle();
            context.zoomrect = new rectangle();
            context.stretchrect = new rectangle();
            const rainstep = Math.min(420,window.innerWidth-60);
        
            if (
                !photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var a = new panel.rowsA([HEADHEIGHT, 12, SCROLLEXTENT, 12, SCROLLEXTENT, 0],
            [
                0,
		        0,
                1?0:new panel.cols([0,rainstep,0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, BUTTONBORDER, BUTTONFILL, 8, 8),
                        new panel.expand(new panel.rectangle(context.zoomrect), 10, 1),
                        new panel.shrink(new panel.currentH(new panel.rounded("white", 
                                0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3),
                    ]),
                    0,
                ]),
                0,
                new panel.cols([0, rainstep, 0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, BUTTONBORDER, BUTTONFILL, 8, 8),
                        new panel.expand(new panel.rectangle(context.stretchrect), 10, 0),
                        new panel.shrink(new panel.currentH(new panel.rounded("white", 0, 
                                TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3)
                    ]),
                    0,
                ]),
                0
            ]);

            if (headcnv.height)
            a.draw(context, rect,
            [
                0,
		        0,
                zoomobj,
                0,
                stretchobj,
                0,
            ]);

            var data = [];
            var index = galleryobj.current();
            data.push(`\u{25C0}   ${index} of ${galleryobj.length()}   \u{25B6}`);
        
            var a = new panel.rowsA([HEADTOP, HEADBOT, 0, 
                                 (data.length*WRAPROWHEIGHT), 
                                 20],
            [
                0,
                0,
                0,
                0,
                0,
            ]);
        
            if (headcnv.height)
            a.draw(context, rect,
            [
                0,
                0,
                0,
                data,
                0,
            ]);
        
            context.restore();   
    }
}	
];

var bossdisplayobj = new circular_array("", bossdisplaylst);

function cliptext(context, str, width)
{
   var fstr = str;
    var n = 0;
    var metrics;	
    do 
    {
        str = fstr.substr(n, fstr.length-n);
        metrics = context.measureText(str);
        n++;
    }
    while (n < fstr.length && metrics.width > width);
    return str;
}

var displaylst = 
[
{
    name: "DEFAULT",
    draw: function(context, rect, user, time)
    {
    }
},
{
    name: "GALLERY",
    draw: function(context, rect, user, time)
    {    
        var canvas = context.canvas;
        context.save();
        canvas.hollyrect = new rectangle();
        context.prevrect = new rectangle();
        context.nextrect = new rectangle();
        canvas.holly2rect = new rectangle();
        context.folderect = new rectangle();
        context.topmoverect = new rectangle();
        context.bottomoverect = new rectangle();
        context.cursorect = new rectangle();
        context.bookmarkrect = new rectangle();
        context.aligntoprect = new rectangle();
        context.alignbottomrect = new rectangle();
        context.buttonrect = new rectangle();
        context.button2rect = new rectangle();
        canvas.timerect = new rectangle();
        context.pirect = new rectangle();
        context.tabrect = new rectangle();
        var index = 1 - canvas.timeobj.berp();
        index *= galleryobj.length();
        var k = Math.floor(index);
        var slice = canvas.sliceobj.data[k];
        var value = galleryobj.data[k];
	    if (!value)
            return;
	    if (IFRAME)
		    return;
	    
        if (!headcnv.height)
    	{        
            var a = new panel.rowsA([0,48,20,NUBHEIGHT,-1],
            [
                0,
                0,
                0,
                new panel.layers(
                [
                    
                    new panel.cols([CORNEREXT,0,CORNEREXT],
                    [
                        0,
                        new panel.layers(
                        [
                            //new panel.rounded(GALLFILL, 3, "rgba(255,255,255,0.75)", 6, 6),    
                            new panel.expand(new panel.rectangle(canvas.holly2rect), 3,3),
                            new panel.shrink(new panel.currentH(
                                new panel.fill(NUBCOLOR), 90, 0), 2, 2),
                        ]),
                        0,
                    ]),
                ]),
            ])
            a.draw(context, rect, 
            [
                0,
                index.toFixed(2),
		        0,
                _8cnv.hollyobj, 
            ], 0);

            var a = new panel.rows([CORNEREXT,0,CORNEREXT],
            [
                0,                      
                new panel.colsA([-1,NUBHEIGHT, 0, NUBHEIGHT, -1],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.expand(new panel.rectangle(context.button2rect),3,3),
                        new panel.shrink(new panel.currentV(
                            new panel.fill(NUBCOLOR), 90, 0), 2, 2),
                    ]),
                    0,
                    new panel.layers(
                    [
                        new panel.expand(new panel.rectangle(canvas.timerect), 3,3),
                        new panel.shrink(new panel.currentV(
                            new panel.fill(NUBCOLOR), 90, 1), 2, 2),
                    ]),
                    0,
                ]),
                0, 
            ]);
    
        	a.draw(context, rect, [0,buttonobj,0,canvas.timeobj,0], 0);                
            return;
    	}
	    
        var space = rect.width < 400 ? "  " : rect.widt < 600 ? "   " : "    ";
        var folders = [];
        if (value && value.folder)
            folders = value.folder.split("/");
        var data = `${index.toFixed(FIXEDTIME)} of ${galleryobj.length()}`;
        var time = canvas.timeobj.current().toFixed(8);
        var w = (galleryobj.width / galleryobj.height) * buttonobj.value();
        if (!w)
            w = buttonobj.value();
	    var bt = `${w.toFixed(0)} x ${buttonobj.value()}`;    	
        var name = value.name?value.name:value.url;    
    	if (value.blob && value.blob.name)
    		name = value.blob.name;
        var bh = rect.height * 0.4;
        const rainstep = Math.min(420,window.innerWidth-60);
        var a = new panel.rows([0, SCROLLEXTENT, 6],
        [
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, BUTTONSMALLBORDER, BUTTONFILL, 8, 8),
                    new panel.expand(new panel.rectangle(canvas.hollyrect), EXPANDRECT, EXPANDRECT),
                    new panel.shrink(new panel.currentH(
                    new panel.rounded("white", 0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3)
                ]),
                0,
            ])
        ])

        //a.draw(context, rect, context.canvas.hollyobj, 0);
        
        var a = new panel.rowsA(
        [
            -1,//HEADTOP, 
            -1,//HEADBOT,  
            0,
            folders.length?folders.length*50:-1, 
            (folders.length&&window.innerHeight>400)?DISPLAYMARGIN:-1, 
            WRAPROWHEIGHT, 
            DISPLAYMARGIN,                 
            WRAPROWHEIGHT,                  
            DISPLAYMARGIN,                 
            WRAPROWHEIGHT,                  
            -1, 
            -1, 
            SCROLLMARGIN
        ],
        [
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, BUTTONSMALLBORDER, BUTTONFILL, 12, 12),
                    new panel.rectangle(context.buttonrect), 
                    new panel.colsA([0,0.6,0],[new panel.text(),new panel.text(),new panel.text()]),
                ]),
                0,
            ]),
	        0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, BUTTONSMALLBORDER, BUTTONFILL, 12, 12),
                    new panel.rectangle(context.folderect), 
			        new panel.multitext(0, new panel.text()),
  		        ]),
                0,
            ]),
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(value.marked?BOOKMARKED:HEAVYFILL, 
                        BUTTONSMALLBORDER, BUTTONFILL, 12, 12),
                    new panel.rectangle(context.bookmarkrect), 
                    new panel.colsA([0,0.6,0],[new panel.text(),new panel.text(),new panel.text()]),
                ]),
                0,
            ]),
	        0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, BUTTONSMALLBORDER, BUTTONFILL, 12, 12),
                    new panel.rectangle(context.cursorect),
                    new panel.colsA([0,0.6,0],[new panel.text(),new panel.text(),new panel.text()]),
                ]),
                0,
            ]),
	        0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded("rgba(255,255,255,0.80)", BUTTONSMALLBORDER, "black", 12, 12),
                    new panel.rectangle(context.pirect),
                    new panel.shrink(new panel.text("black"), 10, 10),
                ]),
                0,
            ]),
            0,
            0,
            0
        ]);
     
        a.draw(context, rect, 
        [
            0,
    	    [`\u{25C0}`,bt,`\u{25B6}`],
            0,
            folders,
            0,
            [`\u{25C0}`,name,`\u{25B6}`],
            0,
            [`\u{25C0}`,data,`\u{25B6}`],
            0,
            login.email?login.email:"Login \u{25B6}",
            0,
            0,
            0,
        ], 0);

        context.restore();     
    }
},
{
    name: "MENU",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();
        canvas.timerect = new rectangle();
	    var a = new panel.cols([9, 9, 0, 14, 6],
	    [
    		0,
    		0,
    		0,
            new panel.rows([ALIEXTENT+10,0,ALIEXTENT+10],
            [
                0,
                new panel.layers(
                [
 			        new panel.expand(new panel.rectangle(canvas.timerect), 10, 0),
                    new panel.currentV(new panel.rounded("rgba(0,0,0,0.5)",BUTTONBORDER,
                            "rgba(255,255,255,0.5)",6,6), 90, 1),
                ]),
                0,
            ]),
    		0,
	    ]);

        a.draw(context, rect, canvas.timeobj, 0);
        context.restore();    
    }
},
];    

var displayobj = new circular_array("", displaylst);
var buttonobj = new circular_array("", []);

buttonobj.init = function()
{
    var b = Number(local.button);
    if (!b)
        return;
    var n = 1;
    for (; n < buttonobj.length(); ++n)
    {
        var k = buttonobj.data[n-1];
        var j = buttonobj.data[n];
        if (b >= k && b < j)
            break;
    }

    if (n != buttonobj.length())
        buttonobj.set(n);
}

//buttonobj reset
buttonobj.reset = function()
{
    var w = galleryobj.width;
    var h = galleryobj.height;
    if (!w)
        return;
    if (!h)
        return;
    var a = w / h;
    buttonobj.data = [];
    var k = window.innerWidth / a;
    var j = k;//Math.max(Math.min(k*0.5,window.innerHeight/2),180);
    var dheight = Math.floor(j);
    var eheight = Math.floor(k);
    var bheight = h*5;
    var bwidth = bheight*a;
    while (bheight*bwidth > MAXBUTTON)
    {
        bheight--;
        bwidth = bheight*a;
    }
    
    for (var n = Math.floor(dheight); n <= Math.floor(bheight); ++n)
        buttonobj.data.push(n);
    
    buttonobj.set(eheight-dheight);
}

function calculateAspectRatioFit(imgwidth, imgheight, rectwidth, rectheight)
{
    let ratio = Math.min(rectwidth / imgwidth, rectheight / imgheight);
    let imgaspectratio = imgwidth / imgheight;
    let rectaspectratio = rectwidth / rectheight;
    let xstart = 0;
    let ystart = 0;
    let width = imgwidth * ratio;
    let height = imgheight * ratio;
    if (imgaspectratio < rectaspectratio)
    {
        xstart = (rectwidth - width) / 2;
        ytart = 0;
    }
    else if (imgaspectratio > rectaspectratio)
    {
        xstart = 0;
        ystart = (rectheight - height) / 2;
    }

    return new rectangle(xstart, ystart, width, height);
}

Math.berp = function(v0, v1, t)
{
    return (t - v0) / (v1 - v0);
};

Math.lerp = function(v0, v1, t)
{
    return (1 - t) * v0 + t * v1;
};

String.prototype.ext = function()
{
    return this.replace(/^.*\./, '');
}

String.prototype.istext = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['txt'];
    var k = lst.findIndex(function(a){return a == ext.toLowerCase();})
    return k >= 0;
}

String.prototype.isjson = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['json'];
    var k = lst.findIndex(function(a){return a == ext.toLowerCase();})
    return k >= 0;
}

String.prototype.iszip = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['zip', 'cbz'];
    var k = lst.findIndex(function(a){return a == ext.toLowerCase();})
    return k >= 0;
}

String.prototype.isimage = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif'];
    var k = lst.findIndex(function(a){return a == ext.toLowerCase();})
    return k >= 0;
}

String.prototype.proper = function()
{
    if (!this.length)
        return this;
    return this.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

String.prototype.clean = function()
{
    let _trimLeft = /^\s+/,
        _trimRight = /\s+$/,
        _multiple = /\s+/g;
    return this.replace(_trimLeft, '').replace(_trimRight, '').replace(_multiple, ' ');
};

Array.prototype.sum = function()
{
    return this.reduce(function(a, b)
    {
        return a + b;
    });
};

Array.prototype.move = function(from, to)
{
    this.splice(to, 0, this.splice(from, 1)[0]);
};

String.prototype.wild = function(e)
{
    let re = new RegExp("^" + e.split("*").join(".*") + "$");
    return re.test(this);
};

panel.pattern = function()
{
    this.draw = function(context, rect, user, time)
    {
        const cnv = document.createElement('canvas');
        const ctx = cnv.getContext('2d');
        cnv.width = 50;
        cnv.height = 50;
        ctx.fillStyle = '#fec';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.arc(0, 0, 50, 0, .5 * Math.PI);
        ctx.stroke();
        const pattern = context.createPattern(cnv, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    };
};

panel.multitext = function(e, panel)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.font = DEFAULTFONT;
        var lst = [];
        for (var n = 0; n < user.length; n++)
        {
            var str = user[n];
            lst = lst.concat(wraptext(context, str, rect.width));
        }

        var maxlines = Math.floor(rect.height/MULTITEXTROWHEIGHT);
        var len = Math.min(lst.length, maxlines);
        var hh = len * MULTITEXTROWHEIGHT;     
        rect.y -= hh / 2;
        rect.y += MULTITEXTROWHEIGHT/2;
        
        if (lst.length > maxlines)
        {
            var j = Math.round(Math.lerp(0, lst.length - 1, e));
            lst = lst.slice(j);
        }

        var N = Math.min(len, lst.length);
        for (var n = 0; n < N; n++)
        {
            var lines = wraptext(context, lst[n], rect.width);
            for (var m = 0; m < 1; m++)
            {
                var str = lines[m].clean();
                panel.draw(context, rect, str, 0);
                rect.y += MULTITEXTROWHEIGHT;
            }
        }
        context.restore();
    };
};

panel.fill = function(color)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.fillStyle = color ? color : user;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    };
};

panel.randomfill = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.fillStyle = util.random_color();
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    };
};

panel.fullscreen = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.fullscreenrect = new rectangle()
        var a = new panel.layers(
            [
                new panel.rectangle(context.fullscreenrect),
                new panel.shrink(new panel.circle(SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
            ]);

        a.draw(context, rect, user, time);
        context.strokeStyle = "white";
        context.shadowColor = "black";

        var e = 5.5;
        var x = rect.width / 2 - 8;
        var y = rect.height / 2 - 8;
        var r = new rectangle(rect.x + x, rect.y + y, rect.width, rect.height);
        context.lineWidth = 3;
        var x = r.x;
        var y = r.y;
        var path = new Path2D();
        y += e
        path.moveTo(x, y);
        y -= e;
        path.lineTo(x, y);
        x += e;
        path.lineTo(x, y);
        context.stroke(path);

        var x = r.x + e * 3;
        var y = r.y;
        var path = new Path2D();
        y += e;
        path.moveTo(x, y);
        y -= e;
        path.lineTo(x, y);
        x -= e + 1;
        path.lineTo(x, y);
        context.stroke(path);

        var x = r.x + e * 3;
        var y = r.y;
        var path = new Path2D();
        y += e * 2;
        path.moveTo(x, y);
        y += e;
        path.lineTo(x, y);
        x -= e + 1;
        path.lineTo(x, y);
        context.stroke(path);

        var x = r.x;
        var y = r.y;
        var path = new Path2D();
        y += e * 2;
        path.moveTo(x, y);
        y += e;
        path.lineTo(x, y);
        x += e;
        path.lineTo(x, y);
        context.stroke(path);
        context.restore();
    }
};

panel.home = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.homerect = new rectangle()
	    var index = 1 - _8cnv.timeobj.berp();
	    index *= galleryobj.length();
	    index = Math.floor(index);
        var a = new panel.layers(
            [
                new panel.rectangle(context.homerect),
                new panel.shrink(new panel.circle(
                    SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
                
                new panel.cols([18,0,18],
                [
                    0,
                    new panel.rows([25,20,0],
                    [
                        0,
                        new panel.arrow( ARROWFILL, 0),
                        0
                    ])
                ]),
                new panel.cols([25,0,25],
                [
                    0,
                    new panel.rows([0,18,28],
                    [
                        0,
                        new panel.fill(ARROWFILL),
                        0
                    ])
                ]),
            ]);
	    
        a.draw(context, rect, user, time);
		    
        context.restore();
    }
};

function leftmenu(context)
{
    context.canvas.timeobj.set(2.259798334532977);
    var k = displaylst.findIndex(function(a){return a.name == "DEFAULT"});
    displayobj.set(k);
	menuobj.draw()

	if (galleryobj.rightctx)
        galleryobj.rightctx.hide()
    
    if (menuobj.value() == context)
    {
        var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
        displayobj.set(k);
        galleryobj.leftctx.hide();
        menuobj.setindex(_8cnvctx);
    }
    else if (menuobj.value() && menuobj.value() != _8cnvctx)
    {
	    galleryobj.leftctx.hide();
        galleryobj.leftctx = context;
        menuobj.setindex(context);
        menuobj.show();
    }
    else
    {
        galleryobj.leftctx = context;
        menuobj.setindex(context);
        menuobj.show();
    }

    headobj.draw();
    menuobj.draw()
}

function rightmenu(context, force)
{
    var k = displaylst.findIndex(function(a){return a.name == "DEFAULT"});
    displayobj.set(k);
    menuobj.draw()
    
	if (galleryobj.leftctx)
        galleryobj.leftctx.hide()
    if (galleryobj.rightctx)
        galleryobj.rightctx.hide()
    
    if (!force && menuobj.value() && menuobj.value() != _8cnvctx)
    {
        var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
        displayobj.set(k);
   	    menuobj.setindex(_8cnvctx);
    }
    else
    {
   	    menuobj.setindex(_8cnvctx);
	    galleryobj.rightctx = context;
    	menuobj.setindex(context);
        menuobj.show();
    }

    headobj.draw();
    menuobj.draw()
}

panel.gallerymenu = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        if (menuobj.value() == _8cnvctx ||
            menuobj.value() == galleryobj.rightctx)
        {
		    context.galleryrect = new rectangle();
            var s = menuobj.value() == galleryobj.rightctx;
            var j = 5;
            var k = j / 2;
            var e = new panel.fill(OPTIONFILL);
            var a = new panel.layers(
            [
                new panel.rectangle(context.galleryrect),  
                s ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(s ? TRANSPARENT : SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
                new panel.rows([0, rect.height * 0.20, 0],
                [
                    0,
                    new panel.cols([0, j, k, j, k, j, 0], [0, e, 0, e, 0, e, 0, ]),
                    0,
                ]),
            ])

            a.draw(context, rect, user, time);
        }

        context.restore();
    }
};

panel.moveprev = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.moveprev = new rectangle()
        context.fillStyle = "white";
        context.strokeStyle = "white";

        var a = new panel.layers(
            [
                new panel.rectangle(context.moveprev),
                _4cnv.movingpage == -1 ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(_4cnv.movingpage == -1 ? TRANSPARENT : SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
                new panel.shrink(new panel.arrow(ARROWFILL, 270), 20, 30),
            ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.movenext = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.movenext = new rectangle()
        var a = new panel.layers(
            [
                new panel.rectangle(context.movenext),
                _4cnv.movingpage == 1 ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(_4cnv.movingpage == 1 ? TRANSPARENT : SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
                new panel.shrink(new panel.arrow(ARROWFILL, 90), 20, 30),
            ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.zoom = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.strokeStyle = "white";
        context.shadowColor = "black";
        context.zoomrect = new rectangle();
        var Panel = function()
        {
            this.draw = function(context, rect, user, time)
            {
                rect.x += 7;
                rect.y += 7;
                rect.width = 19;
                rect.height = 19;
                var a = new panel.circle(TRANSPARENT, "white", 4, 1);
                a.draw(context, rect, user, time);
                context.lineWidth = 8;
                context.beginPath();
                context.moveTo(rect.x + 14, rect.y + 16);
                context.lineTo(rect.x + 22, rect.y + 27);
                context.stroke();
            }
        };

        var s = menuobj.value() != _8cnvctx;
        var a = new panel.layers(
            [
                new panel.rectangle(context.zoomrect),
                //s ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), 16, 16) : 0,
                new panel.shrink(new panel.circle(SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
                new panel.shrink(new Panel(), 15, 20),
            ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.stroke = function(color, width)
{
    this.draw = function(context, rect, user, time)
    {
        context.save()
        context.lineWidth = width;
        context.strokeStyle = color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    }
}

panel.sides = function(color, radius, sides)
{
    this.draw = function(context, rect, user, time)
    {
        context.save()
	context.translate(rect.x+rect.width/2, rect.y+rect.height/2);
        context.beginPath()
    	for (let i = 0; i < sides; i++) 
    	{
        	const rotation = ((Math.PI * 2) / sides) * i;
        	if (i === 0) 
              context.moveTo(radius * Math.cos(rotation), radius * Math.sin(rotation));
            else
              context.lineTo(radius * Math.cos(rotation), radius * Math.sin(rotation));
        }
  
        context.closePath();
        context.fill();
        //context.resetTransform();
        context.restore();
    }
}

panel.arrow = function(color, degrees)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        var w = rect.width
        var h = rect.height
        var x = rect.x
        var y = rect.y
        var k = degrees == 270 ? 0 : 0;
        context.translate(x + w / 2 - k, y + h / 2);
        context.rotate(degrees * Math.PI / 180.0);
        context.translate(-x - w / 2, -y - h / 2);
        var path = new Path2D();
        path.moveTo(rect.x + rect.width / 2, rect.y);
        path.lineTo(rect.x + rect.width, rect.y + rect.height - 3);
        path.lineTo(rect.x, rect.y + rect.height - 3);
        path.lineTo(rect.x + rect.width / 2, rect.y);
        context.lineWidth = 2;
        context.fillStyle = color;
        context.strokeStyle = color;
        context.fill(path);
        context.restore();
    };
};

function rectangle(x, y, w, h, func)
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.right = x + w;
    this.left = x;
    this.top = y;
    this.bottom = y + h;
}

rectangle.prototype.hitest = function(x, y)
{
    var xx = x >= this.x;
    var yy = y >= this.y;
    var w = x < (this.x + this.width);
    var h = y < (this.y + this.height);
    return xx && yy && w && h;
};

rectangle.prototype.get = function(x, y, w, h)
{
    return new rectangle(this.x + x, this.y + y, w, h);
};

rectangle.prototype.shrink = function(x, y)
{
    this.x += x;
    this.y += y;
    this.width -= x * 2;
    this.height -= y * 2;
    return this;
};

rectangle.prototype.expand = function(x, y)
{
    this.x -= x;
    this.y -= y;
    this.width += x * 2;
    this.height += y * 2;
    return this;
};

CanvasRenderingContext2D.prototype.movepage = function(j)
{
    var context = this;
    if (galleryobj.length() <= 1)
        return;

    var e = galleryobj.current();
    galleryobj.rotate(j);
    var k = galleryobj.value();
    galleryobj.set(e);
    if (!k.entry && (_4cnv.movingpage || !k.loaded || galleryobj.length() == 1))
    {
        _4cnv.movingpage = 0;
        this.refresh();
        return;
    }

    var k = _8cnv.timeobj.length() / galleryobj.length();
    _8cnv.timeobj.rotate(-j*k);
    _4cnv.slidestop = 0;
    _4cnv.movingpage = j;
    galleryobj.rotate(j);
    headobj.draw();
    delete photo.image;
    contextobj.reset();
}

CanvasRenderingContext2D.prototype.hide = function()
{
    if (this.canvas.height == 0)
        return;
    this.canvas.height = 0;
};

CanvasRenderingContext2D.prototype.show = function(x, y, width, height)
{
    if (this.canvas.style.left != x + "px")
        this.canvas.style.left = x + "px";
    if (this.canvas.style.top != y + "px")
        this.canvas.style.top = y + "px";
    if (this.canvas.width != width)
        this.canvas.width = width;
    if (this.canvas.height != height)
        this.canvas.height = height;
};

CanvasRenderingContext2D.prototype.rect = function()
{
    return new rectangle(0, 0, this.canvas.width, this.canvas.height);
};

CanvasRenderingContext2D.prototype.clear =
    CanvasRenderingContext2D.prototype.clear || function()
    {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };


var makehammer = function(context, v, t)
{
    var canvas = context.canvas;
    var ham = new Hammer(canvas,{domEvents: true});
    ham.get("pan").set({direction: Hammer.DIRECTION_ALL});
    ham.get("swipe").set({direction: Hammer.DIRECTION_ALL});
    ham.get('swipe').set({velocity: 0.6}); //0.40
    ham.get('swipe').set({threshold: 20}); //10
    ham.get('press').set({time: 440}); //251

    ham.on("pinch", function(evt)
    {
        evt.preventDefault();
        var x = evt.center.x;
        var y = evt.center.y;
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof(ham.panel.pinch) == "function")
            ham.panel.pinch(context, x, y, evt.scale);
    });

    ham.on("pinchend", function(evt)
    {
        evt.preventDefault();
        if (typeof(ham.panel.pinchend) == "function")
            ham.panel.pinchend(context);
    });

    ham.on("pinchstart", function(evt)
    {
        evt.preventDefault();
        var x = evt.center.x;
        var y = evt.center.y;
        if (typeof(ham.panel.pinchstart) == "function")
            ham.panel.pinchstart(context,
                new rectangle(0, 0, ham.element.width, ham.element.height), x, y);
    });

    ham.on("swipeleft swiperight", function(evt)
    {
        if ((new Date() - ham.panstart) > 200)
            return;
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof(ham.panel.swipeleftright) == "function")
            ham.panel.swipeleftright(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt);
    });

    ham.on("swipeup swipedown", function(evt)
    {
        if ((new Date() - ham.panstart) > 200)
            return;
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof(ham.panel.swipeupdown) == "function")
            ham.panel.swipeupdown(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt);
    });

    ham.element.addEventListener("touchstart", function(evt) {}, false);

    ham.element.addEventListener("touchend", function(evt) {}, false);

    ham.element.addEventListener("dragleave", function(evt)
    {
        evt.preventDefault();
    }, false);

    ham.element.addEventListener("dragenter", function(evt)
    {
        evt.preventDefault();
    }, false);

    ham.element.addEventListener("dragover", function(evt)
    {
        evt.preventDefault();
    }, false);

    ham.element.addEventListener("drop", function(evt)
    {
        evt.preventDefault();
        if (typeof(ham.panel.drop) !== "function")
            return;
        ham.panel.drop(context, evt);
    }, false);

    ham.element.addEventListener("mouseout", function(evt)
    {
        if (typeof(ham.panel.mouseout) !== "function")
            return;
        ham.panel.mouseout(context, evt);
    });

    ham.element.addEventListener("mouseenter", function(evt)
    {
        if (typeof(ham.panel.mouseenter) !== "function")
            return;
        ham.panel.mouseenter(context, evt);
    });

    ham.element.addEventListener("mousemove", function(evt)
    {
        var x = evt.offsetX;
        var y = evt.offsetY;
        if (typeof(ham.panel.mousemove) !== "function")
            return;
        ham.panel.mousemove(context, context.rect(), x, y);
    });

    ham.element.addEventListener("wheel", function(evt)
    {
        evt.preventDefault();
        var trackpad = evt.wheelDeltaY ? evt.wheelDeltaY === -3 * evt.deltaY : evt.deltaMode === 0
        var x = evt.offsetX;
        var y = evt.offsetY;
        var deltax = evt.deltaX;
        var deltay = evt.deltaY;
        if (typeof(ham.panel.wheel) == "function")
            ham.panel.wheel(context, x, y); 
        if (typeof(ham.panel.wheeleftright) == "function")
            ham.panel.wheeleftright(context, x, y, deltax, 
                    evt.ctrlKey, evt.shiftKey, evt.altKey, 
                    evt.deltaX < 0 ? "wheeleft" : "wheelright", trackpad);
        if (typeof(ham.panel.wheelupdown) == "function")
            ham.panel.wheelupdown(context, x, y, deltay, 
                    evt.ctrlKey, evt.shiftKey, evt.altKey, 
                    evt.deltaY < 0 ? "wheelup" : "wheeldown", trackpad);
    });

    ham.on("press", function(evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof(ham.panel.press) !== "function")
            return;
        var k = evt.srcEvent;
        ham.panel.press(context,
            new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.on("pressup", function(evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof(ham.panel.pressup) !== "function")
            return;
        var k = evt.srcEvent;
        ham.panel.pressup(context,
            new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.on("panmove", function(evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof(ham.panel.panmove) == "function")
            ham.panel.panmove(context, rect, x, y);
    });

    ham.on("panend", function(evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof(ham.panel.panend) == "function")
            ham.panel.panend(context, rect, x, y);
    });

    ham.on("panstart", function(evt)
    {
        evt.preventDefault();
        ham.x = evt.center.x;
        ham.y = evt.center.y;
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof(ham.panel.panstart) == "function")
            ham.panel.panstart(context, rect, x, y);
    });

    ham.on("panleft panright", function(evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof(ham.panel.panleftright) == "function")
            ham.panel.panleftright(context, rect, x, y, evt.type);
        else if (evt.type == "panleft" && typeof(ham.panel.panleft) == "function")
            ham.panel.panleft(context, rect, x, y);
        else if (evt.type == "panright" && typeof(ham.panel.panright) == "function")
            ham.panel.panright(context, rect, x, y);
    });

    ham.on("pandown panup", function(evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, ham.element.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, ham.element.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof(ham.panel.panupdown) == "function")
            ham.panel.panupdown(context, rect, x, y, evt.type);
        else if (evt.type == "panup" && typeof(ham.panel.panup) == "function")
            ham.panel.panup(context, rect, x, y);
        else if (evt.type == "pandown" && typeof(ham.panel.pandown) == "function")
            ham.panel.pandown(context, rect, x, y);
    });

    ham.on("pan", function(evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (x < 0 || x >= ham.element.width)
            return;
        if (y < 0 || y >= ham.element.height)
            return;
        if (typeof(ham.panel.pan) == "function")
            ham.panel.pan(context,
                new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt.additionalEvent);
    });

    ham.on("tap", function(evt)
    {
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (x < 0 || x >= ham.element.width)
            return;
        if (y < 0 || y >= ham.element.height)
            return;
        if (typeof(ham.panel.tap) != "function")
            return;
        var k = evt.srcEvent;
        ham.panel.tap(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.panel = new function()
    {
        this.draw = function() {};
    }();
    return ham;
};

function toggleFullScreen() 
{
  if (!document.fullscreenElement)
    document.documentElement.requestFullscreen();
  else if (document.exitFullscreen)
    document.exitFullscreen();
}

var _1ham = makehammer(_1cnvctx, 0.5, 15);
var _2ham = makehammer(_2cnvctx, 0.5, 15);
var _3ham = makehammer(_3cnvctx, 0.5, 15);
var _4ham = makehammer(_4cnvctx, 0.5, 15);
var _5ham = makehammer(_5cnvctx, 0.5, 15);
var _6ham = makehammer(_6cnvctx, 0.5, 15);
var _7ham = makehammer(_7cnvctx, 0.5, 15);
var _8ham = makehammer(_8cnvctx, 0.5, 15);
var _9ham = makehammer(_9cnvctx, 0.5, 15);
var _10ham = makehammer(_10cnvctx, 0.5, 15);
var _11ham = makehammer(_11cnvctx, 0.5, 15);
var _12ham = makehammer(_12cnvctx, 0.5, 15);
var _13ham = makehammer(_13cnvctx, 0.5, 15);
var _14ham = makehammer(_14cnvctx, 0.5, 15);
var _15ham = makehammer(_15cnvctx, 0.5, 15);
var headham = makehammer(headcnvctx, 0.5, 15);
_4ham.get('pinch').set({enable: true});
_8ham.get('pinch').set({enable: true});

function setpinching(context)
{
    context.canvas.pinching = 1;
    clearTimeout(context.pinchingtime)
    context.pinchingtime = setTimeout(function()
    {
        context.canvas.pinching = 0;
        menuobj.draw()
    }, 12);            
}

var galleryobj = new circular_array("", 0);
var wheelst = 
[
{
    name: "DEFAULT",
    wheel: function(context, x, y) {},
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad) {},
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad) {},
},
{
    name: "GALLERY",
    wheel: function(context, x, y)
    {
    },
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        var canvas = context.canvas;
        context.canvas.slideshow = 0;
	    if (ctrl)
        {
		    context.showmovebuttons = 0;
            var k = delta/100;
            buttonobj.addperc(-k);
            menuobj.draw();
            setpinching(context);
        }
        else
        {
	       if (Math.abs(delta) < DELTA)
	            return;
		    context.showmovebuttons = 0;
	 	    menuobj.updown(context, delta, 60)
        	if (!clearInterval(context.swipetimeout))
            {
                 context.swipetimeout = setInterval(
                   function(){menuobj.draw();}, GALLERYMAIN);
            }

            menuobj.draw()
        }
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
       if (Math.abs(delta) < DELTA)
            return;
		context.showmovebuttons = 0;
        context.canvas.hollyobj.addperc(delta / 2000);
        menuobj.draw();
    },
},
{
    name: "MENU",
    wheel: function(context, x, y)
    {
    },
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
       if (Math.abs(delta) < DELTA)
            return;
        menuobj.updown(context, delta, 30);
        if (!context.swipetimeout)
            context.swipetimeout = setInterval(function(){
                menuobj.draw();}, MENUMAIN);
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, trackpad)
    {
       if (Math.abs(delta) < DELTA)
            return;
        delta = Math.floor(delta);
        context.canvas.hollyobj.addperc(delta / 1000);
        menuobj.draw();
    },
},
{
    name: "BOSS",
    wheel: function(context, x, y)
    {
    },
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        var canvas = context.canvas;
        if (ctrl)
        {
            var isthumb = context.canvas.thumbrect &&
                context.canvas.thumbrect.hitest(x, y);
            if (isthumb)
            {
            	var e = -delta/100;
                heightobj.addperc(e);
                bossobj.draw();
            }
            else
            {
                var e = delta/50;
                zoomobj.addperc(e);
                contextobj.reset()
            }
        }
        else
        {
            var e = delta/1000;
            rowobj.addperc(e);
            bossobj.reset()
	        bossobj.draw();
        }
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    { 
        delta = Math.floor(delta);
        var e = delta/1000;
        if (context.hollyrect &&
            context.hollyrect.hitest(x, y))
        {
            var hollyobj = context.canvas.hollyobj;
            hollyobj.addperc(e);
            bossobj.draw();
        }
        else if (context.zoomrect &&
            context.zoomrect.hitest(x, y))
        {
            var e = delta/200;
            zoomobj.addperc(e);
            bossobj.reset()
	        bossobj.draw();
        }
        else if (context.stretchrect &&
            context.stretchrect.hitest(x, y))
        {
            var e = delta/200;
            stretchobj.addperc(e);
            bossobj.draw();
        }
        else
        {
            var k = _4cnv.timeobj.length();
            var j = k*e;
            _4cnv.timeobj.CURRENT -= j;
            bossobj.draw()
        }
    },
}, 
];

var pinchlst = 
[
{
    name: "DEFAULT",
    pinch: function(context, x, y, scale) {},
    pinchend: function(context) {},
    pinchstart: function(context, rect, x, y) {},
},
{
    name: "GALLERY",
    pinch: function(context, x, y, scale)
    {
	    if (!context.buttonanchor)
            context.buttonanchor = buttonobj.value();
        if (!context.scaleanchor)
            context.scaleanchor = scale;
        context.scale = scale;
        var k = context.scale / context.scaleanchor;
        var j = context.buttonanchor * k;
        var n = 1;
        for (; n < buttonobj.length(); ++n)
        {
            var b = buttonobj.data[n-1];
            var b2 = buttonobj.data[n];
            if (j < b || j > b2)
                continue;
            buttonobj.setcurrent(n);
            menuobj.draw();
            break;
        }

        setpinching(context);
    },
    pinchstart: function(context, rect, x, y)
    {
 		context.showmovebuttons = 0;
       	delete context.scaleanchor;
        delete context.buttonanchor;
        context.canvas.slideshow = 0;
    },
    pinchend: function(context)
    {
        delete context.scaleanchor;
    },
},
{
    name: "BOSS",
    pinch: function(context, x, y, scale)
    {
        if (!context.buttonachor)
            context.buttonachor = zoomobj.value();
        if (!context.scaleanchor)
            context.scaleanchor = scale;
        context.scale = scale;
        var k = context.scale / context.scaleanchor;
        var j = context.buttonachor * k;
        var n = 1;
        for (; n < zoomobj.length(); ++n)
        {
            var b = zoomobj.data[n-1];
            var b2 = zoomobj.data[n];
            if (j < b || j > b2)
                continue;
            zoomobj.setcurrent(n);
            contextobj.reset();
            break;
        }
    },
    pinchstart: function(context, rect, x, y)
    {
        context.canvas.pinching = 1;
        context.canvas.isthumb = context.canvas.thumbrect &&
            context.canvas.thumbrect.expand &&
            context.canvas.thumbrect.expand(40, 40).hitest(x, y);
        context.scale = 0;
    },
    pinchend: function(context)
    {
        setTimeout(function()
        {
            delete context.scaleanchor;
            delete context.buttonachor;
            clearTimeout(context.pinchtime);
            context.canvas.pinching = 0;
            context.canvas.isthumb = 0;
        }, 12);
    },
},
{
    name: "MENU",
    pinch: function(context, x, y, scale) {},
    pinchstart: function(context, rect, x, y) {},
    pinchend: function(context) {},
}, 
];

var rowobj = new circular_array("ROW", window.innerHeight);
rowobj.set(Math.floor((50 / 100) * window.innerHeight));

var stretchobj = new circular_array("STRETCH", 100);

var slicewidthobj = new circular_array("SLICEWIDTH", SLICEWIDTH * 20);
var zoomobj = new circular_array("ZOOM", 100);
zoomobj.set(25);
var heightobj = new circular_array("HEIGHT", 100);
heightobj.set(50);

var userobj = {}

async function loadzip(file)
{
    const {entries} = await unzipit.unzip(file);
    let keys = Object.keys(entries);
    keys.sort();
    delete galleryobj.title;
    var lst = [];
    for (var n = 0; n < keys.length; ++n)
    {
        var key = keys[n];
        if (SAFARI && key.charAt(0) == '_')
            continue;
        if (!key.isimage())
            continue;
        lst.push(key);
    }

    if (!lst.length)
        return;

    galleryobj.data = [];
    galleryobj.width = 0;
    galleryobj.height = 0;
    galleryobj.set(0);
    for (var n = 0; n < lst.length; ++n)
    {
        var key = lst[n];
        var k = Array.from(key);
        var entry = entries[key];
        if (entry.isDirectory)
            continue;
        if (!key.isimage())
            continue;
        var k = {}
        k.ext = key.ext();
        k.entry = entry;
        //var blob = await k.entry.blob(`image/${k.ext}`);
        //k.blob = URL.createObjectURL(blob);

        var e = key.split("/");
        k.name = e.pop();
        k.folder = e.join("/");
        galleryobj.data.push(k);
    }

    local.button = 0;
    _8cnv.hollyobj.set(0);
    galleryobj.init(galleryobj)
    menuobj.draw();
}

async function loadimages(blobs)
{
    var count = 0;
    for (var i = 0; i < blobs.length; i++)
    {
        var name = blobs[i].name.toLowerCase();
        if (name.isimage())
            count += 1;
    }

    if (!count)
        return;

    galleryobj.data = [];
    delete galleryobj.title;
    delete galleryobj.width;
    delete galleryobj.height;
    galleryobj.set(0);

    for (var i = 0; i < blobs.length; i++)
    {
        var blob = blobs[i];
        var name = blob.name;
        if (name.isimage())
        {
            var k = {}
            k.blob = blob;
            galleryobj.data.push(k);
        }
        else if (name.isjson())
        {
            var text = await blob.text();
            Object.assign(galleryobj, JSON.parse(text));
        }
    }
    
    local.button = 0;
    galleryobj.init(galleryobj)
    _8cnv.hollyobj.set(0);
    menuobj.updown(_8cnvctx, 5, 100)
    _8cnvctx.swipetimeout = 
        setInterval(function(){menuobj.draw()}, GALLERYMAIN);
}

function loadfiles(files)
{
    if (files.length == 1 && files[0].name)
    {
        if (files[0].name.isimage())
            loadimages(files);
        else if (files[0].name.iszip())
            loadzip(files[0]);
        else if (files[0].name.isjson())
            loadjson(files[0]);
    }
    else
    {
        loadimages(files);
    }
}

var droplst = 
[
{
    name: "DEFAULT",
    drop: function(context, evt)
    {
        closemenu()
	    loadfiles(evt.dataTransfer.files);
    },
}, 
];

var panlst = 
[
{
    name: "DEFAULT",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},
    pan: function(context, rect, x, y, type) {},
    panstart: function(context, rect, x, y) {},
    panend: function(context, rect, x, y) {}
},
{
    name: "GALLERY",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},

    pan: function(context, rect, x, y, type)
    {
        var canvas = context.canvas;
        var obj = canvas.hollyobj;
        if (canvas.pinching)
            return;
        context.canvas.panning = 1;
        clearTimeout(context.panningtime)
        context.panningtime = setTimeout(function()
        {
            context.canvas.panning = 0;
            menuobj.draw()
        }, NUBDELAY);
        
        if (type == "panleft" || type == "panright")
        {
	        if (canvas.ishollyrect)
	        {
	            var k = (x - canvas.hollyrect.x) / canvas.hollyrect.width;
	            context.canvas.hollyobj.setperc(k);
	        }
            else
            {
                var obj = context.canvas.hollyobj;
                var e = (canvas.startx - x)/6;
                var k = panhorz(obj, e);
                if (k == -1)
                    return;
                if (k == obj.anchor())
                    return;
                obj.set(k);
            }
            
            menuobj.draw();
        }
        else if (type == "panup" || type == "pandown")
        {
        	var e = canvas.starty - y;
        	var k = Math.PI / canvas.virtualheight
        	k *= e;
        	canvas.timeobj.rotateanchored(k);    
            menuobj.draw()
        }
    },
    panstart: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        delete canvas.slideshow;
        clearInterval(context.canvas.leftright)
        clearInterval(global.timeauto);
        global.timeauto = 0;
        canvas.startx = x;
        canvas.starty = y;
        canvas.timeobj.ANCHOR = canvas.timeobj.CURRENT;
        canvas.ishollyrect = canvas.hollyrect && canvas.hollyrect.hitest(x, y);
        context.showmovebuttons = 0;
    },
    panend: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        delete context.canvas.type;
        delete context.canvas.starty;
        delete context.startt;
        delete context.canvas.timeobj.offset;
        delete buttonobj.offset;
        delete context.canvas.isvbarect;
        delete context.canvas.hollyobj.offset;
	    local.set()    
        menuobj.draw();
    }
},
{
    name: "MENU",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},

    pan: function(context, rect, x, y, type)
    {
        var canvas = context.canvas;
        var hollyobj = context.canvas.hollyobj;
        if (hollyobj && (type == "panleft" || type == "panright"))
        {
            var k = panhorz(hollyobj, rect.width - x);
            if (k == -1)
                return;
            if (k == hollyobj.anchor())
                return;
            hollyobj.set(k);
            menuobj.draw();
        }
        else if (type == "panup" || type == "pandown")
        {
            if (canvas.istimerect)
            {
	            var k = (y - canvas.timerect.y) / canvas.timerect.height;
                var j = canvas.timeobj.length()*(1-k);
                canvas.timeobj.set(j);
            }
            else
            {
                var e = canvas.starty - y;
                var jvalue = Math.PI / canvas.virtualheight
                jvalue *= e;
                canvas.timeobj.rotateanchored(jvalue);
            }
                
            menuobj.draw();
        }
    },
    panstart: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        delete canvas.slideshow;
        clearInterval(global.timeauto);
        global.timeauto = 0;
        canvas.starty = y;
        canvas.timeobj.ANCHOR = canvas.timeobj.CURRENT;
        canvas.istimerect = canvas.timerect && canvas.timerect.hitest(x, y);
    },
    panend: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        delete canvas.starty;
        delete context.startt;
        delete canvas.timeobj.offset;
        var obj = context.canvas.timeobj;
        delete obj.offset;
    }
},
{
    name: "BOSS",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},
    pan: function(context, rect, x, y, type)
    {
    },
    panstart: function(context, rect, x, y)
    {
    },
    panend: function(context, rect, x, y)
    {
    }
}, 
];

var mouselst = 
[
{
    name: "DEFAULT",
    down: function(evt) {},
    out: function(evt) {},
    enter: function(evt) {},
    up: function(evt) {},
    move: function(context, rect, x, y) {},
},
{
    name: "BOSS",
    down: function(evt) {},
    out: function(evt) {},
    enter: function(evt) {},
    up: function(evt) {},
    move: function(context, rect, x, y) {},
},
{
    name: "GALLERY",
    down: function(evt) {},
    out: function(evt) {},
    enter: function(evt) {},
    up: function(evt) {},
    move: function(context, rect, x, y) 
    {
        var k = global.mousebars; 
        global.mousebars = x < 15 || x > rect.width-15 || y > rect.height-15;
        if (k || global.mousebars)
            menuobj.draw();
    },
}, 
];

var mouseobj = new circular_array("MOUSE", mouselst);

function bookmark(context)
{
    headobj.show();
    var timeobj = context.canvas.timeobj;
    var index = 1 - timeobj.berp();
    index *= galleryobj.length();
    index = Math.floor(index);
    var k = galleryobj.data[index];    
    k.marked = k.marked ? 0 : timeobj.current();
    menuobj.draw();
    local.set();
}

var presslst = 
[
{
    name: "DEFAULT",
    pressup: function(context, rect, x, y) {},
    press: function(context, rect, x, y) {}
},
{
    name: "GALLERY",
    pressup: function(context, rect, x, y)
    {
    },
    press: function(context, rect, x, y) 
    {
        if (menuobj.value() != _8cnvctx)
            return;
	    global.bars = 0;
        if (!IFRAME)
            headobj.toggle();
        menuobj.draw()
    }
},
{
    name: "MENU",
    pressup: function(context, rect, x, y) 
    {
        
    },
    press: function(context, rect, x, y) 
    {
    }
},
{
    name: "BOSS",
    pressup: function(context, rect, x, y)
    {
    },
    press: function(context, rect, x, y) 
    {
    }
}, 
];

var pressobj = new circular_array("PRESS", presslst);
pressobj.set(3);

var swipelst = 
[
{
    name: "BOSS",
    swipeleftright: function(context, rect, x, y, evt)
    {
    },

    swipeupdown: function(context, rect, x, y, evt)
    {
    },
},
{
    name: "GALLERY",
    swipeleftright: function(context, rect, x, y, evt)
    {
        var k = evt.type == "swipeleft" ? 1 : -1;
        context.canvas.hollyobj.addperc((k*50) / 2000);
        menuobj.draw();
    },
    swipeupdown: function(context, rect, x, y, evt)
    {
        if (evt.type == context.lastswipe)
            return;

        headcnvctx.show(0, 0, window.innerWidth, 0);
        headobj.draw();
        
        var k = evt.type == "swipeup" ? 1 : -1;
        menuobj.updown(context, k * 120, 90);
        if (!context.swipetimeout)
            context.swipetimeout = setInterval(
                function(){menuobj.draw();}, GALLERYMAIN);
    },
},
{
    name: "MENU",
    swipeleftright: function(context, rect, x, y, evt) {},
    swipeupdown: function(context, rect, x, y, evt)
    {
        var k = evt.type == "swipeup" ? 1 : -1;
        menuobj.updown(context, k * 210, 120);
	    if (!context.swipetimeout)
            context.swipetimeout = setInterval(
                function(){menuobj.draw();}, MENUMAIN);
    },
}, 
];

var swipeobj = new circular_array("SWIPE", swipelst);
swipeobj.set(3);

var keylst = 
[
    {
        name: "DEFAULT",
        keyup: function(evt) {},
        keydown: function(evt) {}
    },
    {
        name: "GALLERY",
        keyup: function(evt)
        {
            var context = menuobj.value()
            var canvas = context.canvas;
            canvas.shiftKey = 0;
            canvas.ctrlKey = 0;
	        canvas.keypressed = 0;
        },
        keydown: function(evt)
        {
            var context = menuobj.value()
            var canvas = context.canvas;
            var key = evt.key.toLowerCase();
            var keycode = evt.keyCode || evt.which;
            canvas.shiftKey = evt.shiftKey;
            canvas.ctrlKey = evt.ctrlKey;
            canvas.slideshow = 0;
            canvas.keypressed = 1;

            clearInterval(context.canvas.leftright);
            if (key == "pageup" || key == "backspace" ||
                (canvas.shiftKey && key == "enter"))
            {
                var k = _8cnv.timeobj.length() / galleryobj.length();
                _8cnv.timeobj.rotate(k);
               	menuobj.draw()
                setpinching(context);
            }
            else if (key == "pagedown" || key == "enter" || key == "home")
            {
		        if (canvas.ctrlKey)    
        		{
                    aligncenter(0)
                    if (buttonobj.value() > window.innerHeight)
                        aligntop();
                }
                else
                {
                    var k = _8cnv.timeobj.length() / galleryobj.length();
                    _8cnv.timeobj.rotate(-k);
                }

                menuobj.draw()
                setpinching(context);
            }
            else if (
                key == "arrowup" ||
                key == "k")
            {
                if (canvas.shiftKey)
                {
        		    menuobj.updown(context, -90, 240)
                    if (!context.swipetimeout)
                        context.swipetimeout = 
                            setInterval(function(){menuobj.draw();}, GALLERYMAIN);
                }
                else if (canvas.ctrlKey)
                {
                    if (buttonobj.value() < window.innerHeight)
                    {
                        aligncenter()
                        var k = _8cnv.timeobj.length() / galleryobj.length();
                        _8cnv.timeobj.rotate(k);
                        menuobj.draw();
                    }
                    else
                    {
                        var time = _8cnv.timeobj.current();
                        aligncenter()
                        aligntop(time);
                    }
    					
                    menuobj.draw();
                }
                else
                {
                        menuobj.updown(context, -90, 90)
                    	if (!context.swipetimeout)
                            context.swipetimeout = 
                                setInterval(function(){menuobj.draw()}, GALLERYMAIN);
                }
                
                context.canvas.panning = 1;
                menuobj.draw()
                clearTimeout(context.wheeltime)
                context.wheeltime = setTimeout(function()
                {
                    context.canvas.panning = 0;
                    menuobj.draw()
                }, NUBDELAY);
                evt.preventDefault();
            }
            else if (
                key == "arrowdown" ||
                key == "j")
            {
                if (canvas.shiftKey)
                {
        		    menuobj.updown(context, 90, 240)
                    if (!context.swipetimeout)
                        context.swipetimeout = 
                            setInterval(function(){menuobj.draw();}, GALLERYMAIN);
                }
                else if (canvas.ctrlKey)
                {
                    if (buttonobj.value() < window.innerHeight)
                    {
                        aligncenter()
                        var k = _8cnv.timeobj.length() / galleryobj.length();
                        _8cnv.timeobj.rotate(-k);
                        menuobj.draw();
                    }
                    else
                    {
                        var time = _8cnv.timeobj.current();
                        aligncenter();
                        alignbottom(time);
                    }
                    menuobj.draw();
                }
                else
                {
                    menuobj.updown(context, 90, 90)
                    if (!context.swipetimeout)
                        context.swipetimeout = 
                            setInterval(function(){menuobj.draw();}, GALLERYMAIN);
                }
                
                context.canvas.panning = 1;
                menuobj.draw()
                clearTimeout(context.wheeltime)
                context.wheeltime = setTimeout(function()
                {
                    context.canvas.panning = 0;
                    menuobj.draw()
                }, NUBDELAY);
                evt.preventDefault();
            }
            else if (key == " ")
            {
                headobj.toggle();
                menuobj.draw()
                evt.preventDefault();
            }                
            else if (key == "\\" || key == "/")
            {
                var h = headcnv.height ? 0 : HEADHEIGHT;
                headcnvctx.show(0, 0, window.innerWidth, h);
                headobj.draw();
                menuobj.draw()
                evt.preventDefault();
            }
            else if (key == "-" || key == "[")
            {
                setpinching(context);
                buttonobj.addperc(-1.0 / 100);
                menuobj.draw()               
                evt.preventDefault();
            }
            else if (key == "+" || key == "]" || key == "=")
            {
                setpinching(context);
                buttonobj.addperc(1.0 / 100);
                menuobj.draw()
                evt.preventDefault();
            }
            else if (
                key == "arrowleft" ||
                key == "h")
            {
                if (canvas.ctrlKey)
                    context.canvas.hollyobj.set(0);
                else
                    context.canvas.hollyobj.addperc(-25/250);    
                context.canvas.panning = 1;
                menuobj.draw();
                clearTimeout(context.panningtime)
                context.panningtime = setTimeout(function()
                {
                    context.canvas.panning = 0;
                    menuobj.draw()
                }, NUBDELAY);
                evt.preventDefault();
            }
            else if (
                key == "arrowright" ||
                key == "l")
            {
                if (canvas.ctrlKey)
                    context.canvas.hollyobj.set(context.canvas.hollyobj.length()-1);
                else
                    context.canvas.hollyobj.addperc(25/250);    
                context.canvas.panning = 1;
                menuobj.draw();
                clearTimeout(context.panningtime)
                context.panningtime = setTimeout(function()
                {
                    context.canvas.panning = 0;
                    menuobj.draw()
                }, NUBDELAY);
                evt.preventDefault();
            }
            else if (key == "0")
            {
                evt.preventDefault();
                buttonobj.reset();
                setpinching(context);
		        menuobj.draw();    
            }
            else if (key == "f")
            {
                evt.preventDefault();
                toggleFullScreen();
            }
            else if (key == "g")
            {
                  goto();  
            }
            else if (key == "c")
            {
                aligncenter();
				menuobj.draw();
            }
            else if (key == "tab")
            {
                if (menuobj.value() == _2cnvctx)
                {
                    closemenu();
                    return;
                }
                
                if (!login.id)
                {
                   googlelogin();
                   return;
                }
                
                gallerylist();
                evt.preventDefault();
           }
            else if (key == "a")
            {
                galleryadd();
            }
        }
    },
    {
        name: "MENU",
        keyup: function(evt)
        {
            var context = menuobj.value()
            var canvas = context.canvas;
        },
        keydown: function(evt)
        {
            var context = menuobj.value()
            var canvas = context.canvas;

            canvas.shiftKey = evt.shiftKey;
            canvas.ctrlKey = evt.ctrlKey;
            canvas.slideshow = 0;

            var key = evt.key.toLowerCase();
            if (key == "pageup" ||
                key == "arrowup" ||
                (canvas.shiftKey && key == "enter") ||
                (canvas.shiftKey && key == " ") ||
                key == "j")
            {
                menuobj.updown(context, -60, 30)
                if (!context.swipetimeout)
                    context.swipetimeout = setInterval(function(){
                        menuobj.draw();}, GALLERYMAIN);
                evt.preventDefault();
            }
            else if (
                key == "pagedown" ||
                key == "arrowdown" ||
                key == "enter" ||
                key == " " ||
                key == "k")
            {
                menuobj.updown(context, 60, 30)
                if (!context.swipetimeout)
                    context.swipetimeout = setInterval(function(){
                        menuobj.draw();}, GALLERYMAIN);
                evt.preventDefault();
             }
            else if (key == "arrowleft")
            {
                context.canvas.hollyobj.addperc(-60 / 1000);
                menuobj.draw()
            }
            else if (key == "tab")
            {
                menuobj.hide();
                menuobj.setindex(_8cnvctx);
                menuobj.show();
                evt.preventDefault();
            }
            else if (key == "arrowright")
            {
                context.canvas.hollyobj.addperc(60 / 1000);
                menuobj.draw()
            }
        }
    },
    {
        name: "BOSS",
        keyup: function(evt)
        {
            var canvas = _4cnv;
            var context = _4cnvctx;
            var key = evt.key.toLowerCase();
            if (
                (canvas.ctrlKey && key == "arrowleft") ||
                (canvas.ctrlKey && key == "h") ||
                (canvas.shiftKey && key == "enter") ||
                key == "pageup")
            {
                context.movepage(-1);
                evt.preventDefault();
            }
            else if (
                (canvas.ctrlKey && key == "arrowright") ||
                (canvas.ctrlKey && key == "l") ||
                key == "enter" ||
                key == "pagedown")
            {
                context.movepage(1);
                evt.preventDefault();
            }
        },
        keydown: function(evt)
        {
            var canvas = _4cnv;
            var context = _4cnvctx;
            var rect = context.rect();
            canvas.ctrlKey = evt.ctrlKey;
            canvas.shiftKey = evt.shiftKey;
            var key = evt.key.toLowerCase();

            if (key == "f")
            {
                toggleFullScreen()
                bossobj.draw();
                evt.preventDefault();
            }
            else if (
                key == "arrowleft" ||
                key == "h")
            {
                bossobj.leftright(50);
            }
            else if (
                key == "arrowright" ||
                key == "l")
            {
                bossobj.leftright(-50);
            }
            else if (key == "/" || key == "\\" || key == "tab")
            {
                var h = headcnv.height ? 0 : HEADHEIGHT;
                headcnvctx.show(0, 0, window.innerWidth, h);
                headobj.draw();
                evt.preventDefault();
            }
            else if (
                key == "arrowup" ||
                key == "k")
            {
                rowobj.addperc(-0.05);
                contextobj.reset()
                evt.preventDefault();
            }
            else if (key == "arrowdown" || key == "j")
            {
                rowobj.addperc(0.05);
                contextobj.reset()
                evt.preventDefault();
            }
            else if (key == "-" || key == "{")
            {
                zoomobj.add(-1);
                contextobj.reset()
            }
            else if (key == "+" || key == "}" || key == "=")
            {
                zoomobj.add(1);
                contextobj.reset()
            }
            else if (key == "[")
            {
                stretchobj.add(-1);
                bossobj.draw();
            }
            else if (key == "]")
            {
                stretchobj.add(1);
                bossobj.draw();
            }
        }
    },
];

function aligncenter(b=-1)
{
    if (b == -1)
    {
        b = 1 - _8cnv.timeobj.berp();
        b *= galleryobj.length();
    }
    
 	var image = Math.floor(b);
    galleryobj.set(image);
    var e = Math.berp(0, galleryobj.length(), image);
    var j = (1-e)*Math.PI
    var k = _8cnv.timeobj.length() / galleryobj.length() / 2;
    var e = j-k;
    _8cnv.timeobj.set(e);
}

function gotoimage(n)
{
    var e = Math.berp(0, galleryobj.length()-1, n);
    var k = 1-e;
    var j = k*Math.PI
    _8cnv.timeobj.set(j);    
    _8cnv.hollyobj.CURRENT = 0;
    menuobj.draw();
    return true;
}

function aligntop(time) 
{
    var k = 1-(window.innerHeight/buttonobj.value());
    var j = Math.PI/galleryobj.length();
    var e = j * k;
    _8cnv.timeobj.rotate(e/2)
    if (time && 
        time.toFixed(3) == _8cnv.timeobj.current().toFixed(3))
    {
        var k = _8cnv.timeobj.length() / galleryobj.length();
        _8cnv.timeobj.rotate(k);
        aligncenter();
        alignbottom();
    }
}

function alignbottom(time)
{
	var current = _8cnv.timeobj.current();
    var k = 1-(window.innerHeight/buttonobj.value());
    var j = Math.PI/galleryobj.length();
    var e = j * k;
    _8cnv.timeobj.rotate(-e/2)
    if (time && 
        time.toFixed(3) == _8cnv.timeobj.current().toFixed(3))
    {
        var k = _8cnv.timeobj.length() / galleryobj.length();
        _8cnv.timeobj.rotate(-k);
        aligncenter();
        aligntop();
    }
}

var taplst = 
[
{
    name: "BOSS",
    tap: function(context, rect, x, y, shift, ctrl)
    {
    }
},
{
    name: "GALLERY",
    tap: function(context, rect, x, y)
    {
        clearInterval(context.canvas.leftright)
        var canvas = context.canvas;
        canvas.slideshow = 0;
        var timeauto = global.timeauto;
        clearInterval(global.timeauto);
        global.timeauto = 0;
        var obj = canvas.hollyobj;
        
        if (headcnv.height && 
            headcnvctx.homemenurect && 
            headcnvctx.homemenurect.hitest(x, y))
        {
            leftmenu(_7cnvctx)
        }
        else if (context.aligntoprect &&
            context.aligntoprect.hitest(x, y))
        {
            headobj.toggle();
            menuobj.draw()
        }
        else if (context.button2rect &&
            context.button2rect.hitest(x, y))
        {
            global.bars = 1;
            var k = (y - context.button2rect.y) / context.button2rect.height;
            var j = buttonobj.length()*k;
            buttonobj.set(j);
            menuobj.draw();
        }            
        else if (canvas.timerect &&
            canvas.timerect.hitest(x, y))
        {
            global.bars = 1;
            var obj = canvas.timeobj;
            var k = (y - canvas.timerect.y) / canvas.timerect.height;
            var j = obj.length()*(1-k);
            obj.set(j);
            menuobj.draw();
        } 
        else if (context.pirect &&
            context.pirect.hitest(x, y))
        {
            if (login.email)
                patchuser();
            else
                googlelogin();
        }            
        else if (
            headcnv.height &&
            (headcnvctx.galleryrect &&
            headcnvctx.galleryrect.hitest(x, y)))
        {
            if (menuobj.value() == _2cnvctx)
            {
                closemenu();
                return;
            }
            
            if (!login.id)
            {
               googlelogin();
               return;
            }

            gallerylist()
        }
        else if (
            context.folderect &&
            context.folderect.hitest(x, y))
        {
            if (_5cnv.sliceobj.length() <= 1)
                return;
		    leftmenu(_5cnvctx);
        }
        else if (canvas.holly2rect &&
            canvas.holly2rect.hitest(x, y))
        {
            global.bars = 1;
            var k = (x - canvas.holly2rect.x) / canvas.holly2rect.width;
            var j = canvas.hollyobj.length()*k;
            canvas.hollyobj.set(j);
            menuobj.draw();
        }            
        else if (
            context.bookmarkrect &&
            context.bookmarkrect.hitest(x, y))
        {
            var index = 1 - canvas.timeobj.berp();
            index *= galleryobj.length(); 
	        index = Math.floor(index);
            var b = -1;
            var k = (x - context.bookmarkrect.x) / context.bookmarkrect.width;
        	if (k < 0.26)
        	{
        	    var lst = _8cnv.rotated.slice(index,index+galleryobj.length());
        	    for (var m = lst.length-2; m >= 0; --m)
        	    {
        		var b = lst[m];
        		if (!galleryobj.data[b].marked)
        		    continue;
        		_8cnv.timeobj.set(galleryobj.data[b].marked); 
        		menuobj.draw();
        		break;
        	    } 
        	}
        	else 
        	{
        	    var lst = _8cnv.rotated.slice(galleryobj.length()+index,galleryobj.length()*2+index);
        	    for (var m = 1; m < lst.length; ++m)
        	    {
        		var b = lst[m];
        		if (!galleryobj.data[b].marked)
        		    continue;
        		_8cnv.timeobj.set(galleryobj.data[b].marked); 
        		menuobj.draw();
        		break;
        	    }
        	}
        }
        else if (
            context.cursorect &&
            context.cursorect.hitest(x, y))
        {
            var k = (x - context.cursorect.x) / context.cursorect.width;
            if (k < 0.20 || k > 0.80)
            {
                var k = k < 0.20;
                var j = canvas.timeobj.length() / galleryobj.length();
                canvas.timeobj.rotate(k ? j :-j);  
                menuobj.draw();
            }
            else
            {
                rightmenu(_6cnvctx);
            }
        }
        else if (
            context.buttonrect &&
            context.buttonrect.hitest(x, y))
        {
            var k = (x - context.buttonrect.x) / context.buttonrect.width;
            var j = k < 0.25 || k > 0.75;
            if (j)
                buttonobj.addperc(k < 0.25 ? -0.05 : 0.05);  
            else
                buttonobj.reset();
            menuobj.draw();
        }
        else if (
            headcnv.height &&
            headcnvctx.homerect &&
            headcnvctx.homerect.hitest(x, y))
        {
	        buttonobj.reset();	
            aligncenter(0)
            aligntop();
            menuobj.draw();
        }
        else if (
            headcnv.height &&
            headcnvctx.zoomrect &&
            headcnvctx.zoomrect.hitest(x, y))
        {
            goto();
        }
        else if (
            headcnv.height &&
            headcnvctx.fullscreenrect &&
            headcnvctx.fullscreenrect.hitest(x, y))
        {
            toggleFullScreen()
        }
        else if (canvas.hollyrect && canvas.hollyrect.hitest(x, y))
        {
            var k = (x - canvas.hollyrect.x) / canvas.hollyrect.width;
            context.canvas.hollyobj.setperc(k);
            menuobj.draw()
        }
        else if (context.homerect && context.homerect.hitest(x, y))
        {
	        leftmenu(_7cnvctx);
        }       
        else if (menuobj.value() && 
		     menuobj.value() != _8cnvctx)
        {
            closemenu()
        }
        else 
        {
            if (headcnv.height)
            {
                bookmark(context);
                menuobj.draw();
            }
            else if (canvas.ctrlKey)
            {
                var k = _8cnv.timeobj.length() / galleryobj.length();
                _8cnv.timeobj.rotate(y < rect.height/2 ? k : -k);
                menuobj.draw();
            }
            else
            {
                menuobj.updown(context, y < rect.height/2 ? -90 : 90, 180)
                if (!context.swipetimeout)
                    context.swipetimeout = 
                        setInterval(function(){menuobj.draw();}, GALLERYMAIN);
            }
        }
    },
},
{
    name: "MENU",
    tap: function(context, rect, x, y)
    {
        var canvas = context.canvas;   
        if (canvas.gallerypatchrect && canvas.gallerypatchrect.hitest(x, y))
        {
            canvas.gallerydeletetoggle = 0;
            canvas.gallerypatchtoggle = canvas.gallerypatchtoggle?0:1;
            menuobj.draw();
        }
        else if (canvas.gallerydeleterect && canvas.gallerydeleterect.hitest(x, y))
        {
            canvas.gallerypatchtoggle = 0;
            canvas.gallerydeletetoggle = canvas.gallerydeletetoggle?0:1;
            menuobj.draw();
        }    
        else if (canvas.homeresetrect && 
                 canvas.homeresetrect.hitest(x, y))
        {
            buttonobj.reset();
            closemenu()
            aligncenter(0)
            aligntop();
		    menuobj.draw()
        }
        else if (canvas.timerect &&
            canvas.timerect.hitest(x, y))
        {
            var obj = canvas.timeobj;
            var k = (y - canvas.timerect.y) / canvas.timerect.height;
            var j = obj.length()*(1-k);
            obj.set(j);
            menuobj.draw();
            return true;
        }            
        else if (canvas.galleryaddrect && canvas.galleryaddrect.hitest(x, y))
        {
            galleryadd();
        }
        else if (canvas.showuserrect && canvas.showuserrect.hitest(x, y))
        {  
            patchuser();
	    }
        else if (canvas.loginrect && 
                 canvas.loginrect.hitest(x, y))
        {  
    		if (login.id && login.credential)
    		{
                login = {id: 0};
                removejson("login");
                google.accounts.id.revoke(login.credential, function(){})
			    menuobj.draw();
    		}
    		else
    		{
    			googlelogin();
    		}
            
            return true;
        }
        else if (canvas.closerect && 
                 canvas.closerect.hitest(x, y))
        {
            closemenu();
            return false;
        }
        else if (canvas.userdeleterect && canvas.userdeleterect.hitest(x, y))
        {
            return false;
        }
        else if (canvas.homerect && canvas.homerect.hitest(x, y))
        {
	        leftmenu(_7cnvctx);
            return false;
        }
        else
        {
            var canvas = context.canvas;
            var visibles = canvas.visibles;
            var k;
            for (k = 0; k < visibles.length; k++)
            {
                var slice = visibles[k];
                if (slice.rect.hitest(x, y))
                    break;
            }

            if (k == visibles.length)
                return;

            var n = visibles[k].index;
            var slice = canvas.sliceobj.data[n];
            if (!slice.func)
                return;
            slice.tap = 1;
	        menuobj.draw();
                
            setTimeout(function()
            {
                delete slice.tap;
                menuobj.draw();
                if (!slice.func(n, x, y))
                    return;
                closemenu();
            }, 200);
        }
    },
}, 
];

var tapobj = new circular_array("TAP", taplst);

function goto()
{
    headobj.hide();
    menuobj.draw();
    var index = 1 - _8cnv.timeobj.berp();
    index *= galleryobj.length();
    var input = document.getElementById("goto-input");
    input.value = index.toFixed(4);
    showdialog("goto", function(image)
    {
        var image = input.value.clean();
        var e = Math.berp(0, galleryobj.length(), image);
        var j = (1-e)*Math.PI
        _8cnv.timeobj.set(j);
        headobj.show();
        menuobj.draw();
    })
}

function galleryadd()
{
    var id = document.getElementById("gallery-add-id");
    var title = document.getElementById("gallery-add-title");
    var prefix = document.getElementById("gallery-add-prefix");
    var json = document.getElementById("gallery-add-json");
    id.value = Math.floor(Date.now() / 1000).toString(36);
    title.value = "";
    json.value = getfilenames();
    prefix.value = "";
    showdialog("gallery-add", function(image)
    {
        const form = new FormData();
        form.append('title', title.value);
        form.append('prefix', prefix.value);
        form.append('json', json.value);
        form.append('gallery_id', id.value);
        form.append('user_id', login.id);
        fetch(`https://atlanticc.reportbase5836.workers.dev`,
        {
            method: 'POST',
            body: form
        })
        .then((response) => jsonhandler(response))
        .then(function(obj)
        {
            var j = _2cnv.sliceobj.data[0];
            var k = {};
            k = Object.assign(k, j);
            k.title = obj.title;
            k.json = obj.json;
            k.prefix = obj.prefix;
            k.id = obj.gallery_id;   
            var e = _2cnv.sliceobj.data.unshift(k);
            _2cnv.sliceobj.set(0);
            var j = Math.PI/_2cnv.sliceobj.length();
            _2cnv.timeobj.set(0)
            var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
            _2cnv.rotated = [...a, ...a, ...a];
            menuobj.draw();
            dialog.close();
        })
    })
}

function gallerylist()
{ 
    fetch(`https://atlanticc.reportbase5836.workers.dev/list/${login.id}`)
        .then((response) => jsonhandler(response))
        .then(function(results)
        {            
            for (var n = 0; n < results.length; ++n)
            {
                var result = results[n];
                result.func = function(n, x, y)
                {
                    _2cnv.sliceobj.set(n);
                    if (_2cnv.gallerypatchtoggle)
                    {
                        gallerypatch();
                    }
                    else if (_2cnv.gallerydeletetoggle)
                    {
                        var gallery = _2cnv.sliceobj.value();
                        var label = document.getElementById("confirm-label");
                        var input = document.getElementById("confirm-input");
                        label.innerHTML = `Confirm delete '${gallery.title}'?`
                        showdialog("confirm", function(image)
                        {
                            if (input.value != gallery.title)
                                return true;
                            fetch(`https://atlanticc.reportbase5836.workers.dev/${gallery.id}`,
                            {
                                method: 'delete'
                            })
                            .then(res =>
                            {
                                var n = _2cnv.sliceobj.current()
                                _2cnv.sliceobj.data.splice(n,1);
                                delete _2cnv.normal;
                                _2cnv.sliceobj.set(0);
                                var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
                                _2cnv.rotated = [...a, ...a, ...a];
                                menuobj.draw();
                            })
                        });
                    }
                    else
                    {
                        url = new URL(url.origin);
                        var gallery = _2cnv.sliceobj.value();
                        window.open(`${url.href}${gallery.id}`,"_self")
                    }
                    
                    return false;
                }
            }

            results.sort((a, b) => 
            {
                if(a.title < b.title) 
                    return -1;
                if(a.title > b.title) 
                    return 1; 
                return 0;
            });
                            
            _2cnv.sliceobj.data = results
            
            var k = _2cnv.sliceobj.data.findIndex(
                function(a){return a.id == url.path;});
            _2cnv.sliceobj.set(k);
            var j = (Math.PI/_2cnv.sliceobj.length());
            var e = j*k;
            var f = Math.PI-e;
            var g = j/2;
            var h = f-g;
            _2cnv.timeobj.set(h);
            
            var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
            _2cnv.rotated = [...a, ...a, ...a];
            rightmenu(_2cnvctx, true)
        })        
}

function gallerypatch()
{
    var gallery = _2cnv.sliceobj.value();
    if (!gallery)
        return;
    var id = document.getElementById("gallery-patch-id");
    var title = document.getElementById("gallery-patch-title");
    var prefix = document.getElementById("gallery-patch-prefix");
    var json = document.getElementById("gallery-patch-json");
    id.value = gallery.id;
    title.value = gallery.title;
    prefix.value = gallery.prefix;
    json.value = gallery.json;
    showdialog("gallery-patch", function(image)
    {
        const form = new FormData();
        form.append('id', id.value);
        form.append('title', title.value);
        form.append('prefix', prefix.value);
        form.append('json', json.value);
        fetch(`https://atlanticc.reportbase5836.workers.dev`,
        {
            method: 'PATCH',
            body: form
        })
        .then(function(response)
        {
            gallery.title = title.value;
            gallery.json = json.value;
            gallery.prefix = prefix.value;
            menuobj.draw();
        })
    })
}

function getvisible(x, y)
{
    var visibles = _8cnv.visibles;
    
    var k;
    for (k = 0; k < visibles.length; k++)
    {
        var slice = visibles[k];
        if (!slice || !slice.rect)
            continue;
        if (slice.rect.hitest(x, y))
            break;
    }

    return visibles[k].index;
}
            
Number.prototype.inrange = function(a, b)
{
    var min = Math.min(a, b),
        max = Math.max(a, b);
    return this >= min && this < max;
}

Number.prototype.pad = function(size)
{
    var s = String(this);
    while (s.length < (size || 2))
    {
        s = "0" + s;
    }
    return s;
}

var bossobj = new circular_array("", []);

bossobj.leftright = function(e)
{
}

window.landscape = function()
{
    return window.innerWidth > window.innerHeight;
}

window.portrait = function()
{
    return window.innerHeight > window.innerWidth;
}

//bossobj draw
bossobj.draw = function()
{
}

//bossobj reset
bossobj.reset = function()
{
}

var buttonlst = 
[
{
    name: "DEFAULT",
    draw: function(context, rect, user, time) {}
},
{
    name: "GALLERY",
    draw: function(context, rect, user, time)
    {
        var slice = user;
        var thumbimg = slice.thumbimg;
        var thumbfitted = slice.thumbfitted;

        if (thumbimg &&
            thumbimg.complete &&
            thumbimg.naturalHeight &&
            !slice.pad &&
            !HIDE)
        {
            var obj = _8cnv.hollyobj;
            var b = thumbimg.width / thumbimg.height;
            var b2 = rect.width / rect.height;
            var hh = Math.floor(rect.height);
            var ww = Math.floor(rect.width);
            var hhh = hh;
            var yyy = 0;

            if (slice.rect.y < 0)
            {
                yyy = -slice.rect.y;
                hhh = slice.rect.height+slice.rect.y;
            }

            if (slice.rect.y+slice.rect.height > window.innerHeight)
            {
                hhh = window.innerHeight-slice.rect.y;
            }

            if (b > b2)
            {
                if (Math.abs(thumbfitted.height - hh) > 1)
                {
                    if (!slice.isvisible && context.canvas.pinching)
                        return;
                    var thumbfittedctx = thumbfitted.getContext("2d");
                    thumbfitted.height = hh;
                    thumbfitted.width = Math.floor(hh * b);
                    thumbfittedctx.drawImage(
                        thumbimg, 0, 0, thumbimg.width, thumbimg.height,
                        0, 0, thumbfitted.width, thumbfitted.height);
                }

                if (slice.isvisible)
                {
                    var x = Math.nub(obj.value(), obj.length(),
                        ww, thumbfitted.width);
                    context.drawImage(thumbfitted,
                        Math.floor(x), yyy, ww, hhh,
                        0, yyy, ww, hhh); 
                }
            }
            else
            {
                if (Math.abs(thumbfitted.width - ww) > 1)
                {
                    if (!slice.isvisible && context.canvas.pinching)
                        return;
                    var thumbfittedctx = thumbfitted.getContext("2d");
                    thumbfitted.width = ww
                    thumbfitted.height = Math.floor(ww / b);
                    thumbfittedctx.drawImage(
                        thumbimg, 0, 0, thumbimg.width, thumbimg.height,
                        0, 0, thumbfitted.width, thumbfitted.height);
                }

		        if (slice.isvisible)
                {
                    var y = Math.nub(obj.value(), obj.length(),
                        hh, thumbfitted.height);
                    context.drawImage(thumbfitted,
                        0, Math.floor(y) + yyy, ww, hhh,
                        0, yyy, ww, hhh);
                }
            }
           
            if (slice.tap)
            {
                var a = new panel.fill("rgba(0,0,0,0.5)");
                a.draw(context, rect, 0, 0);
            }
        }
        else
        {
            var lst = [];
            lst.push(slice.name);
            lst.push(`${time+1} of ${galleryobj.length()}`)
            var g = Math.min(buttonobj.value()-20*6,lst.length*40);
            var a = new panel.shrink(new panel.layers(
            [
                new panel.rounded("rgba(100,100,100)", 0, 0, 20, 20),    
                new panel.shrink(new panel.rows([g+40,0],
                [
                    new panel.layers(
                    [
                        new panel.rounded(FILLMENU, 0, 0, 20, 20), 
                        new panel.shrink(new panel.multitext(0, new panel.text()), 20, 10),
                    ]),
                    0,
                ]), 20, 20),
            ]), 20, 20);

            a.draw(context, rect, lst, 0);
	    }
    }
},	
{
    name: "TEMPLATE",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (user.enabled && user.enabled())
            clr = MENUSELECT;
        else if (canvas.sliceobj.current() == time)
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var lst = user.title.split("\n");
        a.draw(context, rect, lst, time);
        context.restore();
    }
},   
{
    name: "IMAGES",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (user.marked)
            clr = BOOKMARKED;
        else if (user.enabled && user.enabled())
            clr = MENUSELECT;
        else if (galleryobj.current() == time)
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var lst = [];
        var n = user.index+1;
        var len = galleryobj.length()
        lst.push(`${n} of ${len}`);
        var name = user.name;
    	if (user.blob && user.blob.name)
            name = user.blob.name;
        lst.push(name);
        if (user.id)
 		    lst.push(user.id);
        a.draw(context, rect, lst, time);
        context.restore();
    }
},   	
{
    name: "USER",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (user.enabled && user.enabled())
            clr = MENUSELECT;
        else if (canvas.sliceobj.current() == time)
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = 
	    [    
    		user.name,
    		user.email,
    		user.id,
        ];
        
        a.draw(context, rect, k, time);
        context.restore();
    }
},    
{
    name: "OPTION",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (user.enabled && user.enabled())
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = typeof(user.title) == "function" ? user.title() : user.title;
        a.draw(context, rect, k ? k.split("\n") : "", time);
        context.restore();
    }
},
{
    name: "FOLDERS",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (user.enabled && user.enabled())
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        a.draw(context, rect, user.folder ? user.folder.split("/") : "", time);
        context.restore();
    }
},    
{
    name: "MENU",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (user.enabled && user.enabled())
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = typeof(user.title) == "function" ? user.title() : 
		(user.title ? user.title : user);
        a.draw(context, rect, k.split("\n"), time);
        context.restore();
    }
},
{
    name: "GALLERIES",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save()
        var clr = FILLBAR;
        if (user.tap)
            clr = MENUTAP;
        else if (canvas.sliceobj.current() == time)
            clr = MENUSELECT;

        var e = context.canvas.hollyobj.berp();
        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
        [
            0,
            new panel.layers(
            [
                new panel.rounded(clr, BUTTONBORDER, BUTTONFILL, BUTTONRADIUS, BUTTONRADIUS),
                new panel.shrink(new panel.multitext(e, 
                    new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var lst = user.title?user.title.split("\n"):[];
        lst.push(user.id)
        a.draw(context, rect, lst, time);
        context.restore();
    }
},    
{
    name: "BOSS",
    draw: function(unused, rect, user, time) {}
}, 
];

_1ham.panel = new panel.yoll();
_2ham.panel = new panel.yoll();
_3ham.panel = new panel.yoll();
_4ham.panel = new panel.yoll();
_5ham.panel = new panel.yoll();
_6ham.panel = new panel.yoll();
_7ham.panel = new panel.yoll();
_8ham.panel = new panel.yoll();
_9ham.panel = new panel.yoll();
_10ham.panel = new panel.yoll();
_11ham.panel = new panel.yoll();
_12ham.panel = new panel.yoll();
_13ham.panel = new panel.yoll();
_14ham.panel = new panel.yoll();
_15ham.panel = new panel.yoll();

let contextlst = [_1cnvctx, _2cnvctx, _3cnvctx, _4cnvctx, _5cnvctx, _6cnvctx, _7cnvctx, _8cnvctx, _9cnvctx, _10cnvctx, _11cnvctx, _12cnvctx, _13cnvctx, _14cnvctx, _15cnvctx];
let menulst = [0, _1cnvctx, _2cnvctx, _3cnvctx, _5cnvctx, _6cnvctx, _7cnvctx, _8cnvctx, _9cnvctx, _10cnvctx, _11cnvctx, _12cnvctx, _13cnvctx, _14cnvctx, _15cnvctx];
var menuobj = new circular_array("MENU", menulst);
menuobj.toggle = function(context)
{
    if (menuobj.value() == context)
    {
        context.hide();
        menuobj.set(0);
    }
    else
    {
        menuobj.setindex(context);
        menuobj.show();
    }

    headobj.draw();
}

//menuobj hide
menuobj.hide = function()
{
    var context = this.value();
    if (!context)
        return;

    context.hide();
    _4cnv.height = window.innerHeight;
    this.setindex(0);
}

window.history.pushState(null, null, window.location.href);
window.onpopstate = function () 
{
	if (dialog && dialog.open)
    {
        dialog.close()
        window.history.go(1);
        window.history.pushState(null, null, window.location.href);
    }
    else if (menuobj.value() && menuobj.value() != _8cnvctx)
    {
        closemenu();
        window.history.go(1);
        window.history.pushState(null, null, window.location.href);
    }
};

//menuobj show
menuobj.show = function()
{
    var context = this.value();
    if (!context)
        return;
    var canvas = context.canvas;
	var display = canvas.display;
    var k = displaylst.findIndex(function(a){return a.name == display});
    displayobj.set(k);
    
    if (canvas.width_ > window.innerWidth)
    {
        context.show(0, 0, window.innerWidth, window.innerHeight);
    }
    else if (window.innerWidth - canvas.width_ < 180)
    {
        var w = window.innerWidth - 180;
        var l = Math.floor((window.innerWidth - w) / 2);
        context.show(l, 0, w, window.innerHeight);
    }
    else
    {
        var w = canvas.width_;
        var l = Math.floor((window.innerWidth - w) / 2);
        context.show(l, 0, w, window.innerHeight);
    }

    local.set()	
    menuobj.draw();    
}

//menuobj draw
menuobj.draw = function()
{
    var context = this.value();
    if (!context)
    	return;
    	
    const canvas = context.canvas;
    var time = canvas.timeobj.value();
    const slices = canvas.sliceobj.data;
    const len = slices.length;
    const rect = context.rect();
    
    context.clear();    
    if (context.canvas.slideshow > 0)
    {
        var k = canvas.autodirect;
        context.canvas.timeobj.rotate(k * context.canvas.slideshow);
	    if (!canvas.keypress)
            context.canvas.slideshow -= context.canvas.slidereduce
    }
    else if (context.swipetimeout)
    {
        clearInterval(context.swipetimeout)
        context.swipetimeout = 0;
        context.canvas.slideshow = 0;
        resetview();
        local.set();
    }

    var buttonheight = canvas.buttonheight-canvas.buttonheight%2;
    context.canvas.virtualheight = len * buttonheight; 
    if (context.canvas.virtualheight < window.innerHeight && len)
    {
        buttonheight = Math.floor(window.innerHeight / len);
	    if (buttonheight > window.innerHeight/2)
            buttonheight = window.innerHeight/2;
        buttonheight = buttonheight-buttonheight%2;
        context.canvas.virtualheight = len * buttonheight;
    }
    else if (context == _8cnvctx)
    {
        buttonheight = buttonobj.value();
        buttonheight = buttonheight-buttonheight%2;
        canvas.virtualheight = len * buttonheight * BEAV;
    }
    
    canvas.virtualheight = Math.floor(canvas.virtualheight)
    canvas.virtualheight = canvas.virtualheight - canvas.virtualheight%2;
    
    var current = context.canvas.sliceobj.lerp(
        1 - context.canvas.timeobj.berp());
    if (canvas.lastcurrent != current || !canvas.normal)
    {
        canvas.lastcurrent = current;
        canvas.lastnormal = canvas.normal;
        canvas.normal = util.rotated_list(
            canvas.rotated, current, CACHESIZE);
        
    	if (canvas.lastnormal)
    	{
    		for (var n = 0; n < canvas.lastnormal.length; ++n)
    		{
    		    var e = canvas.lastnormal[n];
                var k = canvas.normal.findIndex(function(a){return a == e});
    		    if (k >= 0)
    			    continue;
    		    var slice = slices[e];
    		    delete slice.thumbimg
    		    delete slice.thumbfitted;
    		}
    	}
    }

    context.canvas.visibles = [];
    context.canvas.invisibles = [];
    context.centered = 0;
    var r = new rectangle(0, 0, rect.width, buttonheight);

    function func(m)
    {
        var n = canvas.normal[m];
	    var slice = slices[n];
        if ((context == _8cnvctx && 
            (slice.thumbimg || slice.pad)) || 
		     context != _8cnvctx)
        {
            slice.base = time;
            slice.time = time + (n * (Math.PI / len));
            var b = Math.tan(slice.time);
            var j = Math.berp(-1, 1, b);
            slice.py = slice.y;
            slice.y = j * canvas.virtualheight;
            var e = (canvas.virtualheight - rect.height) / 2;
            slice.y -= e;
            slice.index = n;
            slice.rect = new rectangle(0, slice.y, rect.width, buttonheight);
            slice.isvisible = slice.y > -buttonheight && slice.y < window.innerHeight;
            
            if (context == _8cnvctx &&
		        slice.rect.hitest(window.innerWidth / 2, window.innerHeight / 2))
            {
            	galleryobj.width = slice.thumbimg?slice.thumbimg.width:0;
            	galleryobj.height = slice.thumbimg?slice.thumbimg.height:0;
            	context.centered = slice.index;
            }

            if (slice.isvisible)
                context.canvas.visibles.push(slice);  
            else
                context.canvas.invisibles.push(slice);  
        }
    }

    for (var m = 0; m < canvas.normal.length; ++m)
    {
        func(m);
    }

	var allslices = [...context.canvas.visibles, ...context.canvas.invisibles];
    for (var m = 0; m < allslices.length; ++m)
    {
        var n = allslices[m];
        var slice = slices[n];
        if (context == _8cnvctx && 
            !slice.thumbimg &&
            !slice.pad) 
        {
            slice.thumbfitted = document.createElement("canvas");
            slice.thumbimg = new Image();
            slice.thumbimg.onload = function()
            {
                menuobj.draw();
            }
            
            if (slice.entry)
                getblobpath(slice.thumbimg, slice);
            else if (slice.blob)
                slice.thumbimg.src = URL.createObjectURL(slice.blob);
            else
                slice.thumbimg.src = slice.url;
        }
    }
    
    var visibles = context.canvas.visibles;
    if (context == _8cnvctx && visibles.length)
    {
	    for (var n = 0; n < visibles.length; ++n)
        {
        	var slice = visibles[n];
        	var y = slice.y;
        	context.translate(0, y);
        	context.canvas.draw(context, r, slice, slice.index);
        	context.translate(0, -y);
        }
    }
    else
    {
        for (var n = 0; n < visibles.length; ++n)
        {
            var slice = visibles[n];
            context.translate(0, slice.y);
            context.canvas.draw(context, r, slice, slice.index);
            context.translate(0, -slice.y);
        }
    }
    
    displayobj.value().draw(context, rect, 0, 0);
    context.canvas.footer.draw(context, rect, 0, 0);
}

function resetview()
{
    if (menuobj.value() != _8cnvctx)
        return;
    var k = displayobj.current();    
    _8cnvctx.hide();
    menuobj.show();
    displayobj.set(k);
    menuobj.draw();
}

var eventlst = 
[
{ // _1cnvctx users
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "USER",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "USERS",
    buttonheight: 240,
    buttonmargin: 20,
    holly: 0,
    width: 640
},
{ // _2cnvctx galleries
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "GALLERIES",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "GALLERIES",
    buttonheight: 180,
    buttonmargin: 20,
    holly: 0,
    width: 640
},
{ // _3cnvctx options
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "OPTION",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "OPTIONS",
    buttonheight: 90,
    buttonmargin: 10,
    holly: 0,
    width: 640
},
{ // _4cnvctx boss
    speed: 40,
    reduce: 2.5,
    updownmax: 60,
    mouse: "BOSS",
    thumb: "BOSS",
    tap: "BOSS",
    pan: "BOSS",
    swipe: "BOSS",
    button: "BOSS",
    wheel: "BOSS",
    drop: "DEFAULT",
    key: "BOSS",
    press: "BOSS",
    pinch: "BOSS",
    display: "BOSS",
    footer: "DEFAULT",
    buttonheight: 30,
    buttonmargin: 10,
    holly: 0,
    width: 640
},
{ // _5cnvctx folders
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "FOLDERS",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "FOLDERS",
    buttonheight: 150,
    buttonmargin: 10,
    holly: 0,
    width: 640
},
{ // _6cnvctx images
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "IMAGES",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "IMAGE",
    buttonheight: 180,
    buttonmargin: 15,
    holly: 0,
    width: 640
},
{ // _7cnvctx home
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "OPTION",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "HOME",
    buttonheight: 180,
    buttonmargin: 20,
    holly: 0,
    width: 640
},
{ // _8cnvctx gallery
    speed: 50,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "GALLERY",
    pan: "GALLERY",
    swipe: "GALLERY",
    button: "GALLERY",
    wheel: "GALLERY",
    drop: "DEFAULT",
    key: "GALLERY",
    press: "GALLERY",
    pinch: "GALLERY",
    display: "GALLERY",
    footer: "DEFAULT",
    buttonheight: 1080,
    buttonmargin: 10,
    holly: 50,
    width: 5160
},
{ // _9cnvctx template
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "MENU",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "KEYBOARD",
    buttonheight: 120,
    buttonmargin: 30,
    holly: 0,
    width: 640
},
{ // _10cnvctx User
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "MENU",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "USER",
    buttonheight: 120,
    buttonmargin: 30,
    holly: 0,
    width: 640
},
{ // _11cnvctx unused
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "IMAGES",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "IMAGE",
    buttonheight: 160,
    buttonmargin: 15,
    holly: 0,
    width: 640
},
{ // _12cnvctx
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "MENU",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "DEFAULT",
    buttonheight: 50,
    buttonmargin: 10,
    holly: 0,
    width: 640
},
{ // _13cnvctx
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "MENU",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "DEFAULT",
    buttonheight: 50,
    buttonmargin: 10,
    holly: 0,
    width: 640
},
{ // _14cnvctx
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "MENU",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "DEFAULT",
    buttonheight: 50,
    buttonmargin: 10,
    holly: 0,
    width: 640
},
{ // _15cnvctx
    speed: 60,
    reduce: 2,
    updownmax: 60,
    mouse: "GALLERY",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "MENU",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "DEFAULT",
    buttonheight: 50,
    buttonmargin: 10,
    holly: 0,
    width: 640
}, 
];

var contextobj = new circular_array("", contextlst);

contextobj.init = function()
{
    contextlst.forEach(function(context, n)
    {
        var obj = eventlst[n];
        var canvas = context.canvas;
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "medium";
        context.font = DEFAULTFONT;
        context.fillText("  ", 0, 0);
        canvas.slideshow = 0;
        canvas.slidereduce = 0;
        canvas.slidestop = 0;
        context.deltalst = [];
        context.infobj = new circular_array("", 3);
        canvas.sliceobj = new circular_array("", []);
        canvas.timeobj = new circular_array("", Math.PI);
        canvas.timeobj.set(Math.PI / 2);

        canvas.hollyobj = new circular_array("TEXTSCROLL", 100);
        canvas.hollyobj.set(obj.holly);

        canvas.speed = obj.speed;
        canvas.reduce = obj.reduce;
        canvas.autodirect = -1;
        canvas.width_ = obj.width;
        canvas.footer = obj.footer;
        canvas.buttonheight = obj.buttonheight;
        canvas.buttonmargin = obj.buttonmargin;
        canvas.display = obj.display;
	    
        var k = footlst.findIndex(function(a){return a.name == obj.footer});
        canvas.footer = footlst[k]; 
	    
        var k = pinchlst.findIndex(function(a){return a.name == obj.pinch});
        k = pinchlst[k];
	    
        canvas.pinch_ = k.pinch;
        canvas.pinchstart_ = k.pinchstart;
        canvas.pinchend_ = k.pinchend;
    
        var k = droplst.findIndex(function(a){return a.name == obj.drop});
        k = droplst[k];
        canvas.drop = k.drop;
    
        var k = keylst.findIndex(function(a){return a.name == obj.key});
        k = keylst[k];  
        canvas.keyup_ = k.keyup;
        canvas.keydown_ = k.keydown;
    
        var k = wheelst.findIndex(function(a){return a.name == obj.wheel});
        k = wheelst[k];
        canvas.wheelupdown_ = k.updown;
        canvas.wheeleftright_ = k.leftright;
        canvas.wheel_ = k.wheel;
    
        var k = mouselst.findIndex(function(a){return a.name == obj.mouse});
        k = mouselst[k];
        canvas.mouse = k;
    
        var k = presslst.findIndex(function(a){
            return a.name == obj.press});
        k = presslst[k];
		canvas.pressup_ = k.pressup;
		canvas.press_ = k.press;
    
        var k = swipelst.findIndex(function(a){
            return a.name == obj.swipe});
        k = swipelst[k];
        canvas.swipeleftright_ = k.swipeleftright;
        canvas.swipeupdown_ = k.swipeupdown;
    
        var k = buttonlst.findIndex(function(a){
            return a.name == obj.button});    
        k = buttonlst[k];
        canvas.draw = k.draw;
    
        var k = taplst.findIndex(function(a){
            return a.name.toLowerCase() == obj.tap.toLowerCase()});  
        k = taplst[k];
        canvas.tap_ = k.tap;
    
        var k = panlst.findIndex(function(a) {return a.name == obj.pan});
        k = panlst[k];   
	    
        context.canvas.panstart_ = k.panstart;
        context.canvas.pan_ = k.pan;
        context.canvas.panupdown_ = k.updown;
        context.canvas.panleftright_ = k.leftright;
        context.canvas.panend_ = k.panend;
        context.swipetimeout = 0;
    });
}

contextobj.init();

contextobj.reset = function()
{
}

function gridToRect(cols, rows, margin, width, height)
{
    var rects = [];
    var iheight = height + margin;
    var rwidth = width + margin;
    var ww = parseInt(rwidth / cols);
    var hh = parseInt(iheight / rows);
    var xadj = rwidth - (cols * ww);
    var yadj = iheight - (rows * hh);
    var y = 0;

    var n = 0;
    for (var row = 0; row < rows; ++row)
    {
        var h = hh - margin;
        if (yadj-- >= 1)
            h++;
        var x = 0;
        for (var col = 0; col < cols; ++col, ++n)
        {
            var w = ww - margin;
            if (col >= (cols - xadj))
                w++;
            rects[n] = new rectangle(x, y, w, h);
            rects[n].row = row;
            rects[n].col = col;
            x += w + margin;
        }

        y += h + margin;
    }

    return rects;
}

function gridToGridB(k, extent)
{
    var e = k.slice(0);
    var empty_slots = 0;
    var aextent = 0;
    for (var n = 0; n < e.length; ++n)
    {
        if (e[n] == -1)
            continue;
        if (e[n] < 1)
            e[n] = extent * Math.abs(e[n]);
        aextent += e[n];
        empty_slots += e[n] == 0 ? 1 : 0;
    }

    if (empty_slots == 0)
        return e;

    var balance = extent - aextent;
    if (balance <= 0)
        return e;

    var slot_extent = Math.floor(balance / empty_slots);
    var remainder = balance - (empty_slots * slot_extent);

    for (n = e.length - 1; n >= 0; --n)
    {
        if (e[n])
            continue;

        var d = slot_extent;
        if (remainder-- >= 1)
            d++;
        e[n] = d;
    }

    return e;
}

Array.prototype.sum = function()
{
    return this.reduce(function(a, b)
    {
        return a + b;
    });
};

Array.prototype.hitest = function(x, y)
{
    var n = 0;
    for (; n < this.length; ++n)
    {
        var rect = this[n];
        if (!rect || !rect.hitest || !rect.hitest(x, y))
            continue;
        break;
    }

    return n == this.length ? -1 : n;
};

Math.getPans = function(size, extent, factor)
{
    var j = size < extent ? 1 : Math.lerp(0.01, size / extent, factor);
    if (size > 200)
        size = size / 2;
    size = util.clamp(0, Math.max(size, 10), extent);
    var lst = [];
    for (var n = 0; n < extent; ++n)
    {
        var k = Math.lerp(0, size * j, n / extent);
        lst.push(Math.floor(k));
    }

    return lst;
};

var panhorz = function(obj, x)
{
    if (typeof obj.offset === "undefined")
    {
        obj.offset = obj.anchor() - x;
        return -1;
    }
    else
    {
        return x + obj.offset;
    }
};

var panvert = function(obj, y)
{
    if (typeof obj.offset === "undefined")
    {
        obj.offset = obj.anchor() - y;
        return -1;
    }
    else
    {
        return y + obj.offset;
    }
};

panel.rectangle = function(r)
{
    this.draw = function(context, rect, user, time)
    {
        Object.assign(r, rect);    
    }
}

panel.circle = function(color, scolor, width = 0)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        var radius = rect.height / 2;
        context.beginPath();
        context.arc(rect.x + rect.width / 2, rect.y + rect.height / 2, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        if (width)
        {
            context.strokeStyle = scolor;
            context.lineWidth = width;
            context.stroke();
        }

        context.closePath();
        context.restore();
    };
};

panel.rotated_text = function()
{
    this.draw = function(context, rect, user, time)
    {
        //https://erikonarheim.com/posts/canvas-text-metrics/
        const pos = [10, 100];
        const bounds = {
            top: pos[1] - metrics.actualBoundingBoxAscent,
            right: pos[0] + metrics.actualBoundingBoxRight,
            bottom: pos[1] + metrics.actualBoundingBoxDescent,
            left: pos[0] - metrics.actualBoundingBoxLeft
        };

        const center = [
            (bounds.left + bounds.right) / 2,
            (bounds.top + bounds.bottom) / 2
        ];

        context.save();
        context.translate(center[0], center[1]);
        context.scale(1, -1);
        context.rotate(Math.PI / 4);
        context.fillText(text, pos[0] - center[0], pos[1] - center[1]);
        context.restore();
    }
};

//panel text
panel.text = function(
    color = "white", 
    align = "center", 
    baseline = "middle",
    unused1 = 0, 
    unused2 = 0, 
    font = DEFAULTFONT)
{
    this.draw = function(context, rect, user, time)
    {
        if (typeof(user) !== "string")
            return;

        if (rect.width < 0)
            return;
        if (user.length <= 0)
            return;
        
        context.save();
        context.textAlign = align;
        context.textBaseline = baseline;
        context.fillStyle = color;
        context.font = font;
        
        var metrics;
        var str = cliptext(context, user, rect.width);
        var x = rect.x;
        if (align == "center")
            x = rect.x + rect.width / 2;
        else if (align == "right")
            x = rect.x + rect.width - 1;
        var y = rect.y + rect.height / 2;

        context.fillText(str, x, y);
        context.restore();
    };
};

panel.rows = function(e, panel)
{
    this.draw = function(context, rect, user, time)
    {
        if (!e.length)
            e = new Array(panel.length).fill(0);
        var j = gridToGridB(e, rect.height);

        var y = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;

            var r = rect.get(0, y, rect.width, j[n]);
            y += j[n];
            if (typeof(panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user, time);
        }
    };
};

panel.cols = function(e, panel)
{
    this.draw = function(context, rect, user, time)
    {
        if (!e.length)
            e = new Array(panel.length).fill(0);
        var j = gridToGridB(e, rect.width);
        var x = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(x, 0, j[n], rect.height);
            x += j[n];
            if (typeof(panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user, time);
        }
    };
};

panel.rowsA = function(e, panel)
{
    this.draw = function(context, rect, user, time)
    {
        var j = gridToGridB(e, rect.height);
        var y = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(0, y, rect.width, j[n]);
            y += j[n];
            if (typeof(panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user[n], time);
        }
    };
};

panel.colsA = function(e, panel)
{
    this.draw = function(context, rect, user, time)
    {
        var j = gridToGridB(e, rect.width);
        var x = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(x, 0, j[n], rect.height);
            x += j[n];
            if (typeof(panel[n]) != "object")
                continue;
            panel[n].draw(context, r, user[n], time);
        }
    };
};

panel.grid = function(cols, rows, margin, panel)
{
    this.draw = function(context, rect, user, time)
    {
        var rects = new gridToRect(cols, rows, margin, rect.width, rect.height);
        for (var n = 0; n < cols * rows; ++n)
        {
            var r = rect.get(rects[n].x, rects[n].y,
                rects[n].width, rects[n].height);
            panel.draw(context, r, user, time);
        }
    };
};

panel.gridA = function(cols, rows, margin, panel)
{
    this.draw = function(context, rect, user, time)
    {
        var rects = new gridToRect(cols, rows, margin, rect.width, rect.height);
        for (var n = 0; n < cols * rows; ++n)
        {
            var r = rect.get(rects[n].x, rects[n].y,
                rects[n].width, rects[n].height);
            panel.draw(context, r, user[n], time);
        }
    };
};

panel.expand = function(p, extentw, extenth)
{
    this.draw = function(context, rect, user, time)
    {
        return p.draw(context, new rectangle(
                rect.x - extentw,
                rect.y - extenth,
                rect.width + extentw * 2,
                rect.height + extenth * 2),
            user, time);
    };
};

panel.shadow = function(p, x = 1, y = 1)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.shadowOffsetX = x;
        context.shadowOffsetY = y;
        context.shadowColor = x == 1 ? "black" : "white";
        p.draw(context, rect, user, time);
        context.restore();
    };
};

panel.shift = function(p, x, y)
{
    this.draw = function(context, rect, user, time)
    {
        p.draw(context, new rectangle(rect.x + x, rect.y + y, rect.width, rect.height), user, time);
    };
};

panel.shrink = function(p, extentw, extenth)
{
    this.draw = function(context, rect, user, time)
    {
        return p.draw(context, new rectangle(
                rect.x + extentw,
                rect.y + extenth,
                rect.width - extentw * 2,
                rect.height - extenth * 2),
            user, time);
    };
};

panel.rounded = function(color, linewidth, 
                strokecolor, radiustop, radiusbot)
{
    this.draw = function(context, rect, user, time)
    {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x, y + radiustop);
        context.lineTo(x, y + height - radiusbot);
        context.arcTo(x, y + height, x + radiusbot, y + height, radiusbot);
        context.lineTo(x + width - radiusbot, y + height);
        context.arcTo(x + width, y + height, x + width, y + height - radiusbot, radiusbot);
        context.lineTo(x + width, y + radiustop);
        context.arcTo(x + width, y, x + width - radiustop, y, radiustop);
        context.lineTo(x + radiustop, y);
        context.arcTo(x, y, x, y + radiustop, radiustop);
        context.fill();
        if (linewidth)
        {
            context.lineWidth = linewidth;
            context.strokeStyle = strokecolor;
            context.stroke();
        }
    };
};

panel.layers = function(panels)
{
    this.draw = function(context, rect, user, time)
    {
        for (var n = 0; n < panels.length; ++n)
        {
            if (typeof(panels[n]) == "object")
                panels[n].draw(context, rect, user, time);
        }
    };
};

panel.layerA = function(panels)
{
    this.draw = function(context, rect, user, time)
    {
        for (var n = 0; n < panels.length; ++n)
        {
            if (typeof(panels[n]) == "object")
                panels[n].draw(context, rect, user[n], time);
        }
    };
};

panel.image = function(shrink)
{
    this.draw = function(context, rect, user, time)
    {
        var w = user.width * (shrink ? shrink : 1)
        var h = user.height * (shrink ? shrink : 1);
        var x = Math.floor(rect.x + (rect.width - w) / 2);
        var y = Math.floor(rect.y + (rect.height - h) / 2);

        context.save();
        if (user.degrees)
        {
            context.translate(x + w / 2, y + h / 2);
            context.rotate(user.degrees * Math.PI / 180.0);
            context.translate(-x - w / 2, -y - h / 2);
        }

        context.drawImage(user, x, y, w, h);
        context.restore();
    };
};

panel.currentH = function(panel, extent, rev)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        var current = rev ? user.length() - user.current() : user.current();
        var length = user.length();
        var nub = Math.nub(current, length, extent, rect.width);
        var r = new rectangle(rect.x + nub, rect.y, extent, rect.height);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

panel.currentV = function(panel, extent, rev)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        var len = user.length();
	var current = user.current();
        var k = rev ? len - current : current;
        var nub = Math.nub(k, len, extent, rect.height);
	var y = rect.y
        var r = new rectangle(rect.x, y + nub, rect.width, extent);
        panel.draw(context, r, user, time);
        context.restore();
    };
};

//Math.nub(99,100,100,1000) = 900
//Math.nub(0,100,100,1000) = 0
Math.nub = function(n, size, nub, extent)
{
    var b = n/size;//Math.berp
    var e = b * nub;
    var f = b * extent;
    return f - e;
};

function rotate(pointX, pointY, originX, originY, angle)
{
    angle = angle * Math.PI / 180.0;
    var k = {
        x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
        y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
    };

    return k;
}

function resize()
{
	headcnv.width = window.innerWidth;
    buttonobj.reset();
    if (menuobj.value())
    {
        if (menuobj.value() != _8cnvctx)
        {
            menuobj.hide();
            menuobj.setindex(_8cnvctx);
        }
    
        menuobj.show();
        headobj.draw();
    }
    else
    {
        _4cnv.width = window.innerWidth;
        _4cnv.height = window.innerHeight;
	    //contextobj.reset();
        headobj.draw();
    }
}

window.addEventListener("focus", (evt) =>{});
window.addEventListener("blur", (evt) =>{});
window.addEventListener("resize", (evt) =>
{
    resize();
});

window.addEventListener("screenorientation", (evt) =>
{
    resize();
});

panel.homemenu = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save()
        if (menuobj.value() == _8cnvctx ||
            menuobj.value() == galleryobj.leftctx)
        {
            context.homemenurect = new rectangle()
            var j = 5;
            var k = j / 2;
            var e = new panel.fill(OPTIONFILL);
            var s = menuobj.value() == galleryobj.leftctx;
            var a = new panel.layers(
                [
                    new panel.rectangle(context.homemenurect),
                    s ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                    new panel.shrink(new panel.circle(s ? TRANSPARENT : SCROLLNAB, BUTTONFILL, 4), CIRCLEOUT, CIRCLEOUT),
                    new panel.cols([0, rect.height * 0.20, 0],
                        [
                            0,
                            new panel.rows([0, j, k, j, k, j, 0], [0, e, 0, e, 0, e, 0]),
                            0,
                        ]),
                ]);

            a.draw(context, rect, user, time);
        }

        context.restore()
    }
};

var dialog = 0;
window.addEventListener("keyup", function(evt)
{
    var context = menuobj.value() ? menuobj.value() : _4cnvctx;
    return context.canvas.keyup_(evt);
});

window.addEventListener("keydown", function(evt)
{
    local.set();
    var key = evt.key.toLowerCase();
    if (key == "escape")
    {
        if (dialog && dialog.open)
        {
            dialog.close();
            return;
        }
    
        global.bars = 0;
        if (menuobj.value() == _8cnvctx)
        {
	        headobj.hide();
        }
        else
        {
            menuobj.hide();
            menuobj.setindex(_8cnvctx);
        	menuobj.show();
        }
        
        menuobj.draw();
        headobj.draw();
    }

    if (dialog.blocked)
    {
        dialog.blocked = 0;
        return;
    }
                        
    if (dialog && dialog.open)
        return;
    
    var context = menuobj.value() ? menuobj.value() : _4cnvctx;
    return context.canvas.keydown_(evt);
}, false);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function()
{
    setfavicon();
});

function setfavicon()
{
    var element = document.querySelector("link[rel='icon']");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        element.setAttribute("href", "light.svg");
    else
        element.setAttribute("href", "dark.svg");
}

window.addEventListener("visibilitychange", (evt) =>
{
    if (document.visibilityState === "visible") 
    {
        //menuobj.draw();
        //bossobj.draw();
    } 
});

function wraptext(ctx, text, maxWidth)
{
    if (!text)
        return [];
    let words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineArray = [];

    for (var n = 0; n < words.length; n++)
    {
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0)
        {
            lineArray.push(line);
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else
        {
            line += `${words[n]} `;
        }

        if (n === words.length - 1)
            lineArray.push(line);
    }

    return lineArray;
}

function imagepath(user, template)
{
    var src;
    if (user.id && user.id.length >= 5 &&
        ((user.id.charAt(user.id.length - 5) == '.') ||
            user.id.charAt(8) == '-'))
    {
        src = `https://image.reportbase5836.workers.dev/image/${user.id}/${template}`;
    }
    else if (user.id && user.id.length > 1 &&
        ((user.id.charAt(0) == 'Q' && user.id.charAt(1) == 'm') ||
            (user.id.charAt(0) == 'b')))
    {
        src = `https://cloudflare-ipfs.com/ipfs/${user.folder}/${user.name}`;
    }
    else if (user.full)
    {
        src = user.full;
    }
    else if (user.url)
    {
        src = user.url;
    }
    else if (user.blob)
    {
        src = URL.createObjectURL(user.blob);
    }

    return src;
}

galleryobj.getpath = function(index)
{
    var gallery = this.data[index];
    var id = gallery.id;
    var path = "";
    if (id && id.length >= 5 &&
        ((id.charAt(id.length - 5) == '.') ||
            id.charAt(8) == '-'))
    {
        path = `https://image.reportbase5836.workers.dev/image/${id}/blob`;
    }
    else if (id && id.length > 1 &&
        ((id.charAt(0) == 'Q' && id.charAt(1) == 'm') ||
            (id.charAt(0) == 'b')))
    {
        //path = `https://ipfs.io/ipfs/${id}`;
        path = `https://cloudflare-ipfs.com/ipfs/${id}`;
        // path = `https://ipfs.filebase.io/ipfs/${id}`;
        //path = `https://${url.path}.ipfs.dweb.link/`;
    }
    else if (gallery.full)
    {
        path = gallery.full;
    }
    else if (gallery.url)
    {
        path = gallery.url;
    }
    else if (gallery.blob)
    {
        path = URL.createObjectURL(gallery.blob);
    }
    
    return path;
}

async function loadjson(blob)
{
    try
    {
        var text = await blob.text();
        var json = JSON.parse(text);
        galleryobj.init(json)
		buttonobj.reset();
		menuobj.draw();
    }
    catch (_)
    {
    }
}

function closemenu()
{
    if (menuobj.value() == _8cnvctx)
        return;
    menuobj.hide();
    menuobj.setindex(_8cnvctx);
    var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
    headham.panel = headlst[k];
    var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
    displayobj.set(k);
    headobj.draw();
    menuobj.draw();
}

headobj.hide = function()
{
    if (!headcnv.height)
        return;
    headcnvctx.show(0, 0, window.innerWidth, 0);
    headobj.draw();	
    var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
    headham.panel = headlst[k];
    var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
    displayobj.set(k);
    headobj.draw();  
    menuobj.draw();
}

headobj.show = function()
{
    if (headcnv.height)
        return;
    headcnvctx.show(0, 0, window.innerWidth, HEADHEIGHT);
    headobj.draw();
    var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
    headham.panel = headlst[k];
    var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
    displayobj.set(k);
    headobj.draw();  
    menuobj.draw();
}

headobj.toggle = function()
{
    headcnvctx.show(0, 0, window.innerWidth, headcnv.height?0:HEADHEIGHT);
    var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
    headham.panel = headlst[k];
    var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
    displayobj.set(k);
    headobj.draw();  
    menuobj.draw();
}

function getfilenames()
{
    var lst = [];
    for (var n = 0; n < galleryobj.length(); ++n)
    {
        var k = galleryobj.data[n];
        if (k.pad)
            continue;
        var name = k.blob ? k.blob.name : k.name;
        if (!name || !name.isimage())
            continue;
        var folder = k.folder;
        if (folder)
        {
            folder = folder.split("/");
            folder.shift();
            folder = folder.join("/");
            lst.push(`\n${folder}/${name}`);
        }
        else
        {
            lst.push(name);
        }
    }

    lst.sort();
    var str = lst.join("\n");
    return str;
}

headobj.reset = function()
{
    if (menuobj.value())
    {
        var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
        headham.panel = headlst[k];
        var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
        displayobj.set(k);
        headcnvctx.show(0, 0, window.innerWidth, HEADHEIGHT);
        headobj.draw();  
        menuobj.draw();
    }
    else
    {
        var k = headlst.findIndex(function(a){return a.name == "BOSS"});
        headham.panel = headlst[k];
        var k = displaylst.findIndex(function(a){return a.name == "BOSS"});
        displayobj.set(k);
        headcnvctx.show(0, 0, window.innerWidth, HEADHEIGHT);
        headobj.draw();  
    }
}

function setupmenus()
{
    _3cnv.sliceobj.data =  
    [
        {
            title: "Export Gallery",
            func: function()
            {
                var data = _8cnv.sliceobj.data;
                var k = {};
                k.data = [];
                for (var n = 0; n < data.length; ++n)
                {
                    var j = data[n];
                    var e = {};
                    e.id = j.id;
                    e.name = j.name;
                    e.url = j.url;
                    e.folder = j.folder;
                    k.data.push(e);
                }
    
                savefile("gallery.json", JSON.stringify(k));            
	        }
	    },
        {
            title: "Export Galleries",
            func: function()
            {
                var data = _2cnv.sliceobj.data;
                var k = [];
                for (var n = 0; n < data.length; ++n)
                {
                    var j = data[n];
                    var e = {};
                    e.title = j.title;
                    e.json = j.json;
                    e.id = j.id;
                    k.push(e);
                }
    
                savefile("galleries.json", JSON.stringify(k));            
	        }
	    },
        {
            title: "Import Galleries",
            func: function()
            {
	        }
	    },
        {
            title: "Export Users",
            func: function()
            {
                var data = _1cnv.sliceobj.data;
                var k = [];
                for (var n = 0; n < data.length; ++n)
                {
                    var j = data[n];
                    var e = {};
                    e.name = j.name;
                    e.email = j.email;
                    e.id = j.id;
                    e.secret = e.secret;
                    k.push(e);
                }
    
                savefile("users.json", JSON.stringify(k));            		
	        }
	    },
        {
            title: "Import Users",
            func: function()
            {
	        }
	    },
        {
            title: "Export File Names",
            func: function()
            {
                savefile("files.txt", getfilenames());
            }
        },
        {
            title: "Delete Image",
            func: function()
            {
                var id = galleryobj.value().id;
                fetch(`https://ipfs-view.pages.dev/image/${id}`,
                {
                    method: 'delete'
                })
                .then(res =>
                {
                    location.reload();
                    return res.json()
                })
                .then(data => console.log(data))
                return true;
            }
          },
    
         {
            title: "Delete All",
            func: function()
            {
                    fetch(`https://images.reportbase5836.workers.dev`,
                    {
                        'method': 'DELETE',
                        'body': JSON.stringify(galleryobj)
                    })
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .catch(err => console.error(err));
                return true;
           }
        },    
        {
            title: "Insert All",
            func: function()
            {
                    fetch(`https://images.reportbase5836.workers.dev`,
                    {
                        'method': 'POST',
                        'body': JSON.stringify(galleryobj)
                    })
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .catch(err => console.error(err));     
                return true;
            }
        },	    
        {
            title: "sidney",
            func: function()
            {
                window.open("https://zip-view.pages.dev/?sidney");
                return true;
            }
        },	    
        {
            title: "search",
            func: function()
            {
                window.open("https://zip-view.pages.dev/?search=love");
                return true;
            }
        },	    
        {
            title: "secret",
            func: function()
            {
                    /*
                const res = await fetch("https://pokamax.com/apis/reseller/v1/orders", 
                {
                    method: "get",
                    headers: new Headers({
                      Authorization: 'Bearer mytoken',
                      email: 'my@email.com'
                })
              });
                  */
                
                return true;
            }
        },
    ];

    _7cnv.sliceobj.data = 
    [
    {
        title: `Share`,
        func: function()
        {
            var input = document.getElementById("share-input");
            var k = new URL(window.location.href);
            k.searchParams.set('rad', _8cnv.timeobj.value().toFixed(8));
            input.value = k.href;
            showdialog("share", function(image)
            {
                copytext(input.value.clean());
            })  
            
            return true;
        }
    },   
    {
        title: `Home`,
        func: function()
        {
	        buttonobj.reset();	
            aligncenter(0)
            aligntop();
            menuobj.draw();            
            return true;
        }
    },   
    {
        title: `Goto`,
        func: function()
        {
            goto()
            return true;
        }
    },   
    {
        title: `Full Screen`,
        enabled: function()
        {
             return document.fullscreenElement;
        },
        func: function()
        {
            toggleFullScreen() 
            return true;
        }
    },   
    {
        title: `File Explorer   \u{25B6}\nLocal file manager`,
        func: function()
        {
            importdialog();
            return true;
        }
    },   
    {
        title: `Images   \u{25B6}\nDisplay image list`,
        func: function()
        {
		    leftmenu(_6cnvctx)
        	return false;
        }
    },   
    {
        title: "Developer\nTom Brinkman\nimages@zip-view.com",
        func: function() 
        {
            return true;
        }
    },     
    {
        title: function()
        {
            var str = `Account   \u{25B6}`
            if (login.name)
                str += `\n${login.name}`;
	        if (login.email)
		        str += `\n${login.email}`;
            return str;
        },
        func: function()
        {
            if (!login.id)
            {
               googlelogin();
               return;
            }

            patchuser()
            //leftmenu(_10cnvctx);
            return false;
        },
    }
    ]

    if (ADMIN)
        _7cnv.sliceobj.data.push(
        {
            title: `Users   \u{25B6}`,
            func: function()
            {
                showusers();
            }
        })
    
    if (ADMIN)
        _7cnv.sliceobj.data.push(
        {
            title: "Options   \u{25B6}",
            func: function()
            {
                leftmenu(_3cnvctx);
                return false;
            }
        })

    if (ADMIN)
        _7cnv.sliceobj.data.push(
        {
            title: "Help   \u{25B6}\nKeyboard",
            func: function()
            {
                leftmenu(_9cnvctx);
                return false;
            }
        })

    _10cnv.sliceobj.data = 
    [
        {
            title: function(){return `ID\n${login.id?login.id:""}`},
            func: function()
            {
                patchuser();
            }
        },
        {
            title: function(){return `Email\n${login.email?login.email:""}`},
            func: function()
            {
                patchuser();
            }
        },
        {
            title: function(){return `Name\n${login.name?login.name:""}`},
            func: function()
            {
                patchuser();
            }
        },
        {
            title: function(){return `Secret\n${login.secret?login.secret:""}`},
            func: function()
            {
                patchuser();
            }
        },
        {
            title: function(){return `Delete\n${login.name?login.name:""}`},
            func: function()
            {
                var label = document.getElementById("confirm-label");
                var input = document.getElementById("confirm-input");
    			label.innerHTML = `Confirm delete '${login.email}'?`
                showdialog("confirm", function(image)
                {
                    if (input.value != login.email)
                        return true;
                    fetch(`https://usur.reportbase5836.workers.dev/${login.email}`,
                    {
                        'method': 'POST',
                    })
                    .then(function(response)
                    {
                        showusers();
                    })
                });                
            }
        },
    ]

    _5cnv.sliceobj.data = [];
    var j = 0;
    var folder = "";
    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var j = galleryobj.data[n];
        if (!j.folder)
        {
            j.folder = folder;
            continue;
        }
        
        var e = _5cnv.sliceobj.data.findIndex(function(a){
            return a.folder == j.folder;});
        if (e >= 0)
            continue;
        
        var k = {}
        k.name = j.name
        k.folder = j.folder;
        k.galleryindex = n;
        k.func = function()
        {
            var folder = this.folder;
            var n = this.galleryindex 
            gotoimage(n);
            headobj.hide();
		    buttonobj.reset();
		    aligncenter(n);
            aligntop();
			menuobj.draw();
            return true;
        }
        
        _5cnv.sliceobj.data.push(k);
    };
    
    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var j = galleryobj.data[n];
        j.index = n;
    	if (j.url && j.url.isimage())
            j.name = j.url.split("/").slice(-1)[0];
        j.func = function()
        {
            headobj.hide();
	        galleryobj.set(this.index);
            buttonobj.reset();
            aligncenter(this.index)
			aligntop();
			menuobj.draw();
            return true;
        };   
    };
	
    _6cnv.sliceobj.data = galleryobj.data;
    _8cnv.sliceobj.data = galleryobj.data;
           
    var lst = 
    [
        "Backspace\nPrevious Image",
        "Shift+Enter\nPrevious Image",
        "Enter\nNext Image",
        "Home\nFirst Image",
        "Pagedown\nNext Image",
        "Pageup\nPrevious Image",
        "Ctrl+Enter\nPrevious Image",
        "Arrow+Up (k)\nMove Up",
        "Arrow+Down (j)\nMove Down",
        "Arrow+Left (h)\nMove Left",
        "Arrow+Right (l)\nMove Right",
        "Space\nToggle UI",
        "Tab\nToggle UI",
        "Plus/Minus (+/-)\nZoom In/Out",
        "G\nCenter Image",
        "F\nFullscreen",
    ];

    for (var n = 0; n < lst.length; ++n)
    {
        var k = lst[n];
        var j = {}
        j.title = k;
        j.func = function()
        {
            return true;
        }

	    lst[n] = j;
    }
    
	_9cnv.sliceobj.data = lst	
    _11cnv.sliceobj.data = [];
    _2cnv.sliceobj.data = [];
    var lst = [_2cnv, _3cnv, _5cnv, _6cnv, _7cnv, _8cnv, _9cnv, _10cnv, _11cnv];
    for (var n = 0; n < lst.length; n++)
    {
        var cnv = lst[n];
        var a = Array(cnv.sliceobj.length()).fill().map((_, index) => index);
        cnv.lastcurrent = -1;
        cnv.rotated = [...a, ...a, ...a];
    }
}

function patchuser()
{
    var id = document.getElementById("user-id");
    var secret = document.getElementById("user-secret");
    var name = document.getElementById("user-name");
    var email = document.getElementById("user-email");
	id.value = login.id;
    name.value = login.name;
    email.value = login.email;
    secret.value = login.secret;
    showdialog("user", function(image)
    {
        const form = new FormData();
        form.append('id', id.value);
        form.append('name', name.value);
        form.append('email', email.value);
        form.append('secret', secret.value);
        fetch(`https://usur.reportbase5836.workers.dev`,
        {
            'method': 'PATCH',
            'body': form
        })
        .then(response => response.json())
        .then(function(k)
        {
            login.id = k.id;
            login.name = k.name;
            login.email = k.email;
            login.secret = k.secret;
            setjson("login", login);	
            menuobj.draw();
        })        
    })	
}

function showusers()
{
      fetch(`https://usur.reportbase5836.workers.dev/list`)
        .then((response) => jsonhandler(response))
        .then(function(results)
        {
            results.sort((a, b) => 
            {
                if (a.name < b.name) 
                    return -1;
                if (a.name > b.name) 
                    return 1; 
                return 0;
            });
        	for (var n = 0; n < results.length; ++n)
        	{
        	    var result = results[n];
        	    result.func = function(n, x, y)
        	    {
                    if (_1cnv.sliceobj.current() == n)
                    {
                        google.accounts.id.revoke(login.credential, function(){})
                        login = _1cnv.sliceobj.value();
                        setjson("login", login);	
                        leftmenu(_10cnvctx);
                    }
                    else
                    {
                        _1cnv.sliceobj.set(n);
                        menuobj.draw();
                    }
                }
        	}
        	
        	_1cnv.sliceobj.data = results
        	var a = Array(_1cnv.sliceobj.length()).fill().map((_, index) => index);
        	_1cnv.rotated = [...a, ...a, ...a];
        	
        	menuobj.hide();
        	galleryobj.leftctx = _1cnvctx;
        	menuobj.setindex(galleryobj.leftctx);
        	menuobj.show();
        	headobj.draw();
        })
}

//galleryobj reset
galleryobj.reset = function()
{ 
    setfavicon();
    stretchobj.makerange("40-90", stretchobj.length());  
    stretchobj.set(90);
    slicewidthobj.set(SLICEWIDTH);	
    headcnv.style.pointerEvents = "none";
    menuobj.draw();
    setupmenus();
	document.title = galleryobj.title?galleryobj.title:
        url.path?url.path:url.host;
        
    var image = new Image();
    image.onerror = function()
    {
        galleryobj.width = 1080;
        galleryobj.height = 1080;
        buttonobj.reset();
        buttonobj.init();
	    menuobj.set(_8cnvctx);
        menuobj.toggle(_8cnvctx);
        menuobj.show();
    }
            
    image.onload = function()
    {
        galleryobj.width = this.width;
        galleryobj.height = this.height;
        buttonobj.reset();
        buttonobj.init();
        menuobj.set(_8cnvctx);
        menuobj.toggle(_8cnvctx);
        
        if (local.marks)
        {
            menuobj.show();
        }
        else
        {
            aligncenter(0)
            if (buttonobj.value() > window.innerHeight)
                aligntop();
            menuobj.draw();
        }
 
        if (local.marks && Array.isArray(local.marks))
        for (var n = 0; n < local.marks.length; ++n)
        {
            var e = local.marks[n];
            var j = galleryobj.data.findIndex(function(a){return a.name == e.name;})
            if (j == -1)
                continue;
            galleryobj.data[j].marked = e.marked;
        }
    };    
   
    _8cnv.timeobj.set(0);
    var k = Number(local.rad);
    if (url.searchParams.has("rad"))
        k = Number(url.searchParams.get("rad"));
    if (galleryobj.length() <= 3)
    {
        var lst = [1.70591,0.98456,2.2311];
        var k = lst.length - galleryobj.length()
        _8cnv.timeobj.set(lst[k]);
    }
    else if (typeof k !== "undefined" && !Number.isNaN(k) && k != null)
    {
        _8cnv.timeobj.set(k);
    }

    var j = galleryobj.data[0];
    if (j.entry)
        getblobpath(image, j)
    else
        image.src = imagepath(j,"5760x5760");
}

function addpadding()
{
    var k = 
    [
        0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 0,0,0,0,0,0, 7,6,5,4,3,2, 1,
    ];

    var lst = []
    for (var n = 0; n < 100; ++n)
        lst = lst.concat(k);
    
    var len = lst[galleryobj.length()-1];
    for (var n = 0; n < len; ++n)
    {
        var k = {};
        k.pad = 1;
        galleryobj.data.push(k)
    }
}

//galleryobj init
galleryobj.init = function(obj)
{
    if (obj)
        Object.assign(galleryobj, obj);
    
    if (Array.isArray(galleryobj.data))
    {
        addpadding();
        galleryobj.reset();
    }
    else
    {
        fetch(obj.data)
            .then((response) => texthandler(response))
            .then(function(str)
            {
                var k = obj.data.split("/");
                k.pop();
                loadtext(str, k.join("/"));
            })
    }
}

if (url.pathname.length > 1)
{ 
    var id = url.pathname.split("/")[1];
	url.path = id;
	fetch(`https://atlanticc.reportbase5836.workers.dev/${id}`)
	.then((response) => jsonhandler(response))
	.then(function(obj)
	{
        loadgallery(obj.json, obj.prefix);
	})        
}
else if (url.searchParams.has("id"))
{
    var id = url.searchParams.get("id");
	url.path = id;
	fetch(`https://atlanticc.reportbase5836.workers.dev/${id}`)
	.then((response) => jsonhandler(response))
	.then(function(obj)
	{
        loadgallery(obj.json, obj.prefix); 
	})        
}
else
{
	loadgallery("res/chessboard.txt");
}

function loadgallery(path, origin)
{
    if (path.isjson())
    {
        fetch(path)
            .then((response) => jsonhandler(response))
            .then((json) => galleryobj.init(json)) 
    }
    else if (path.iszip())
    {
        path = `${origin}${path}`
        loadzip(path);
    }
    else if (path.istext())
    {
        var json = {};
        json.data = path;
        galleryobj.init(json)
    }
    else
    {
	    loadtext(path, origin);	  
    }
}

function loadtext(str, origin)
{
	var lst = str.split("\n");
    var k = {}
    galleryobj.data = [];
    for (var n = 0; n < lst.length; ++n)
    {
        var line = lst[n].clean();
        if (!line.length)
            continue;
        var json = {}
        if (line.substring(0,4) == "http")
            json.url = line;
        else
            json.url = `${origin}${line}`;
        galleryobj.data.push(json);
    }

    addpadding()
    galleryobj.reset();
}

var local = {}
local.init = function()
{
    local.rad = 0;
    local.button = "";
    var k = getjson(url.path);
    if (k)
    {
        local = k;
        _8cnv.hollyobj.set(local.holly);
    }
}

local.init();
local.set = function()
{
    clearTimeout(global.localtimout)
    global.localtimout = setTimeout(function()
    {
        if (!url.path)
            return;
	    var k = {};
        k.button = buttonobj.value();
        k.rad = _8cnv.timeobj.current()
        k.holly = _8cnv.hollyobj.current();
        k.marks = [];
        for (var n = 0; n < galleryobj.length(); ++n)
        {
            var b = galleryobj.data[n];
            if (!b.marked)
                continue;
            var e = {};
            e.marked = b.marked;
            e.name = b.name;
            k.marks.push(e);
        }
        
        setjson(url.path, k);
    }, 400);
}

async function getblobpath(img, slice)
{
    var blob = await slice.entry.blob(`image/${slice.ext}`);
    //img.src = slice.blob;
    img.src = URL.createObjectURL(blob);
}

async function download()
{
    var slice = galleryobj.value();
    if (slice.entry)
    {
        var blob = await slice.entry.blob(`image/${slice.ext}`);
        var k = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = k;
        a.download = slice.name;
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
    }
    else
    {
        var path = galleryobj.getpath(galleryobj.current());
        fetch(path)
            .then(response => response.blob())
            .then(blob => 
            {
                let k = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.download = path.replace(/^.*[\\\/]/, '');
                a.href = k;
                a.click();
                a.remove();
                URL.revokeObjectURL(a.href);
          })
    }
}

function savefile(name, text)
{
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function showdialog(str, func)
{
    var button = document.getElementById(`${str}-ok`);
    dialog = document.getElementById(str);

    dialog.addEventListener("keydown", function(evt)
    {
        if (evt.key == "Enter")
        {
		    if (document.activeElement.rows)
                return true;
            dialog.blocked = 1;
            if (func())
                return true;
            dialog.close();
            return true;
        }
    })
	
    dialog.addEventListener("click", function(evt)
    {
        evt.preventDefault();
        if (evt.target.id == `${str}-ok`)
        {
            if (func())
                return true; 
            dialog.close();
            return true;
        }
        else
        {
            var r = dialog.getBoundingClientRect();
            var rect = new rectangle(r.x,r.y,r.width,r.height);
            if (!rect.hitest(event.x, event.y) && !dialog.clickblocked)
            {
                dialog.close();
                closemenu();
            }
		
            return false;
        }
    });

    dialog.clickblocked = 1;
    setTimeout(function()
    {
        dialog.clickblocked = 0;
    }, 40);
    dialog.showModal();
}

async function copytext(text)
{
    if (navigator.clipboard)
        navigator.clipboard.writeText(text)
}

function blobhandler(response)
{
    if (response.ok)
        return response.blob()
    throw Error(response.statusText);
}

function jsonhandler(response)
{
    if (response.ok)
        return response.json()
    throw Error(response.statusText);
}

function texthandler(response)
{
    if (response.ok)
        return response.text()
    throw Error(response.statusText);
}

function MovingAverage()
{
    const windowSize = 10;
    const values = [];
    this.update = function(value)
    {
        values.push(value);
        if (values.length > windowSize)
            values.shift();
        let sum = 0;
        for (let i = 0; i < values.length; i++)
            sum += values[i];
        return sum / values.length;
    };
}

movingx = new MovingAverage();
movingy = new MovingAverage();

function importdialog()
{
    var input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".zip,.cbz,.json,.png,.jpeg,.jpg,.webp,.gif,.avif";
    return new Promise(function(resolve)
    {
        document.activeElement.onfocus = function()
        {
            document.activeElement.onfocus = null;
            setTimeout(resolve, 500);
        };

        input.onchange = function()
        {
		    headobj.hide();
            loadfiles(Array.from(input.files));
        };

        input.click();
    });
}

//menuobj updown
menuobj.updown = function(context, delta, divider)
{
    var canvas = context.canvas;
    canvas.autodirect = delta > 0 ? -1 : 1;
    var k = Math.abs(delta)/20;
    if (context.updowntimer)
        divider *= 2.5;
    canvas.slideshow = (Math.PI / canvas.virtualheight) * k;
    canvas.slidereduce = canvas.slideshow / divider;
    
    if (!context.updowntimer)
    context.updowntimer = setTimeout(function(a)
         {
             context.updowntimer = 0;
         }, 400);
}

let b64DecodeUnicode = str =>
  decodeURIComponent(
    Array.prototype.map.call(atob(str), c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''))

let parseJwt = token =>
  JSON.parse(
    b64DecodeUnicode(
      token.split('.')[1].replace('-', '+').replace('_', '/')
    ))  

function googlelogin()
{
    google.accounts.id.initialize(
    {
        client_id:'866271378749-uupeiu6kqu3huchf701akl91p0tdaijr.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: "true",
    });

    google.accounts.id.renderButton(
        document.getElementById("googleLogin"),
        { 
            theme: "outline",
	        logo_alignment: "center",
            size: "large",
            type: "standard",
            shape: "circle",
        }  
    );

    google.accounts.id.prompt((notification) => 
    {
        if (notification.isNotDisplayed()) 
        {
            showdialog("user-login", function(str)
            {
                        
            });
        }
        else if (notification.isSkippedMoment()) 
        {
            var e = notification.getSkippedReason();
        }
        else if (notification.isDismissedMoment()) 
        {
            var e = notification.getDismissedReason();
        }
    })
}

window.onGoogleLibraryLoad = () =>
{
}

function loginbyemail(func)
{
    fetch(`https://usur.reportbase5836.workers.dev/${login.email}`)
        .then((response) => jsonhandler(response))
        .then(function(lst)
        {
            if (lst.length == 0)
            {
                const form = new FormData();
                form.append('name', login.name);
                form.append('email', login.email);
                fetch(`https://usur.reportbase5836.workers.dev`,
                {
                    'method': 'POST',
                    'body': form
                })
                .then(response => response.json())
                .then(function(k)
                {
                    login.id = k.id;
                    login.secret = k.secret;
		            setjson("login", login);	
                    func();
                })
            }
            else
            {
                var k = lst[0];
                login.id = k.id;
                login.secret = k.secret;
                setjson("login", login);
		        func();
            }
        }); 
}

function handleCredentialResponse(response) 
{
    login = Object.assign(login, parseJwt(response.credential));
    login.credential = response.credential;
    loginbyemail(function()
    {
        menuobj.draw();
        dialog.close();   
    })
}     

//bottom
