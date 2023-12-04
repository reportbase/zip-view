/* 
Copyright 2017 Tom Brinkman
https://zip-view.com 
https://ipfs-view.com
*/

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

let url = new URL(window.location.href);
const NUBACK = "rgba(0,0,0,0.4)";
const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*3;
const THUMBORDER = 5;
const BUTTONMARGIN = 30;
const IFRAME = window.self !== window.top;
const ALIEXTENT = 60;
const BEXTENT = 80;
const BETHCIDTH = (window.innerWidth < 420 ? window.innerWidth/3 : 420/3)+20;
const BETHWIDTH = (window.innerWidth < 420 ? window.innerWidth/3 : 420/3)-10;
const BOSSMIN = 4;
const FOOTSEP = 20;
const HEADTOP = 80;
const HEADBOT = 40;
const FIXEDTIME = 2;
const WRAPROWHEIGHT = 40;
const HEADHEIGHT = IFRAME ? 0 : HEADTOP+HEADBOT;
const FOOTHEIGHT = 80;
const MAXEXTENT = 10000;
const MAXIMAGESIZE = MAXEXTENT*MAXEXTENT;
const MENUSELECT = "rgba(255,175,0,0.4)";
const MENUTAP = "rgba(255,125,0,0.7)";
const SCROLLNAB = "rgba(0,0,0,0.3)";
const MENUCOLOR = "rgba(0,0,0,0.5)";
const FOOTBTNCOLOR = "rgba(0,0,0,0.75)";
const OPTIONFILL = "white";
const THUMBTRANSPARENT = "rgba(0,0,0,0.2)";
const LIGHTHUMBFILLL = "rgba(255,125,0,0.25)";
const HEAVYFILL = "rgba(0,0,0,0.25)";
const THUMBFILL = "rgba(255,125,0,0.40)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const SEARCHFRAME = "rgba(255,255,255,0.5)";
const TRANSPARENT = "rgba(0,0,0,0)";
const FILLBAR = "rgba(0,0,0,0.3)";
const NUBAR = "rgba(255,255,255,0.8)";
const FILLMENU = "rgba(0,0,0,0.6)";
const ARROWFILL = "white";
const SCROLLEXTENT = 16;
const SCROLLMARGIN = 6;
const SMALLFONT = "16px archivo black";
const DEFAULTFONT = "17px archivo black";
const MEDIUMFONT = "19px archivo black";
const LARGEFONT = "21px archivo black";
const HUGEFONT = "24px archivo black";
const SLICEWIDTH = 16;
const ROTATEANCHORSIAE = 3;
const BOSS = 0;
const GALLERY = 1;
const MENU = 2;
const BOSSMAIN = 4;
const MENUMAIN = 4;
const GALLERYMAIN = 12;
const CIRCLEIN = 19;
const CIRCLEOUT = 15;
const MULTITEXTROWHEIGHT = 24;
const IMAGELSTSIZE = 32;

function setjson(key, value)
{
    try
    {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch(e)
    {
    }
}

function removejson(key)
{
    try
    {
        localStorage.removeItem(key);
    }
    catch(e)
    {
    }
}

function getjson(key)
{
    try
    {
        var k = localStorage.getItem(key);
        if (k)
            return JSON.parse(k);
    }
    catch(e)
    {
    }
}

var panel = {};
var global = {};
let photo = {};
let util = {};

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
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

util.istouch = function()
{
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

util.rotated_list = function(lst, size, start, width)
{
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

var beavobj = new circular_array("BEAV", 100)
beavobj.set(64.2);

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
		   `\u{25C0}   Folders`,
		   0 
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
        canvas.homerect = new rectangle();
        canvas.uploadrect = new rectangle();
        canvas.downloadrect = new rectangle();
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
				new panel.colsA([0,0],
				[
					new panel.layers(
					[
						new panel.rectangle(canvas.downloadrect),
						new panel.text(),
					]),
					new panel.layers(
					[
						new panel.rectangle(canvas.uploadrect),
						new panel.text(),
					]),
				])                            
			])
		]);
        
        a.draw(context, rect, 
	   	[
		   `\u{25C0}   Images`,
		   0,
		   [
			   `Download`,
			   `Upload`,
			], 
		]);
        
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
        canvas.useropenrect = new rectangle();
        canvas.useraddrect = new rectangle();
        canvas.userpatchrect = new rectangle();
        canvas.userdeleterect = new rectangle();
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
				new panel.colsA([0,0,0,0],
				[
					new panel.layers(
					[
						new panel.rectangle(canvas.useropenrect),
						new panel.text(),
					]),
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
			   `Open`,
			   `Add`,
			   `Edit`,
			   `Delete`,
			], 
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
        canvas.homerect = new rectangle();
        canvas.galleryopenrect = new rectangle();
        canvas.galleryaddrect = new rectangle();
        canvas.gallerypatchrect = new rectangle();
        canvas.gallerydeleterect = new rectangle();
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
				new panel.colsA([0,0,0,0],
				[
					new panel.layers(
					[
						new panel.rectangle(canvas.galleryopenrect),
						new panel.text(),
					]),
					new panel.layers(
					[
						new panel.rectangle(canvas.galleryaddrect),
						new panel.text(),
					]),
					new panel.layers(
					[
						new panel.rectangle(canvas.gallerypatchrect),
						new panel.text(),
					]),
					new panel.layers(
					[
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
			   `Open`,
			   `Add`,
			   `Edit`,
			   `Delete`,
			], 
		]);
        
        context.restore();    
    }
},
{
    name: "DEBUG",
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
        
        a.draw(context, rect, `\u{25C0}   Debug`, 0);
        context.restore();
    }
},
{
    name: "TEMPLATE",
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
           `\u{25C0}   Templates`,
           0 
        ], 0);
        
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
        canvas.usereditrect = new rectangle();
        canvas.loginrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
        [
            new panel.layers(
            [
                new panel.fill(FOOTBTNCOLOR),
                new panel.text(),
                new panel.rectangle(canvas.homerect),
            ]),
            0,
            new panel.layers(
            [
                new panel.fill(FOOTBTNCOLOR),
                new panel.colsA([0,0],
                [
                    new panel.layers(
                    [
                        new panel.rectangle(canvas.usereditrect),
                        new panel.text(),
                    ]),
                    new panel.layers(
                    [
                        new panel.rectangle(canvas.loginrect),
                        new panel.text(),
                    ])
                ])                            
            ])
        ]);
        
        a.draw(context, rect, 
        [
           `\u{25C0}   Account`,
           0,
           [
               "Edit",
               login.id?"Logout":"Login",
           ], 
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

	    var str = login.id ? "Logout" : "Login";
        a.draw(context, rect, 
	   	[
		   `\u{25C0}   ${url.host}`,
			0,
			`${str}`,
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
		context.clear();
		context.bossdisplayrect = new rectangle();
		var b = 0;
		var k = menuobj.value();
		var w = k ? k.canvas.width : 0;
		var b = window.innerWidth == w;
		context.save();
		const rainstep = Math.min(420,window.innerWidth-60);

		var a = new panel.rows([BEXTENT, 0],
        [
            new panel.cols([5, 
                            ALIEXTENT, 0, 
                            ALIEXTENT, 
                            window.innerWidth >= 320 ? (ALIEXTENT+10) : -1, 
                            ALIEXTENT, 
                            0, 
                            ALIEXTENT, 
                            5],
                [
                    0, 0, 0,
                    new panel.fullscreen(),
                    new panel.zoom(),
                    new panel.download(),
                    0, 
                    new panel.closeboss(), 
                    0
                ]),
                new panel.cols([0,rainstep,0],
                [
                        0,
                        new panel.layers(
                        [
                            new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 12, 12),
                            new panel.expand(new panel.rectangle(context.bossdisplayrect), 10, 10),
                            new panel.shrink(new panel.text(),10,10),
                        ]),
                        0,
                ]),               
        ]);

		a.draw(context, rect, `\u{25C0}    ${bossdisplayobj.value().title}    \u{25B6}`, 0);
		context.restore();        
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
        delete context.fitwidthrect;
        delete context.fullscreenrect;
        delete context.homemenurect;
        delete context.imagemenurect;
        var s = SAFARI ? -1: ALIEXTENT;
        var e = rect.width>=320?(ALIEXTENT+10):-1;
        var a = new panel.rows([BEXTENT, 0],
        [
            new panel.cols([5, ALIEXTENT, 0, s, e, ALIEXTENT, 0, ALIEXTENT, 5],
            [
                0,
                new panel.homemenu(),
                0,
                g ? new panel.fullscreen() : 0,
                g ? new panel.zoom() : 0,
                g ? new panel.fitwidth() : 0,
                0,
                new panel.imagemenu(),
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
        var canvas = context.canvas;
        context.pagerect = new rectangle();
        
        if (
            !photo.image ||
            !photo.image.complete ||
            !photo.image.naturalHeight)
            return;

        var w = Math.min(320, r.width - 100);
        var j = window.innerWidth - r.width >= 180;

        var data = [];
        var index = galleryobj.current();
        data.push(`\u{25C0}   ${index+1} of ${galleryobj.length()}   \u{25B6}`);
        const rainstep = Math.min(420,window.innerWidth-60);
    
        var a = new panel.rowsA([HEADTOP, HEADBOT, 0, 
                             (data.length*WRAPROWHEIGHT), 
                             20],
        [
            0,
            0,
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 12, 12),
                    new panel.expand(new panel.rectangle(context.pagerect), 10, 10),
                    new panel.gridA(1, data.length, 1,
                        new panel.shrink(new panel.text(),10,10)),
                ]),
                0,
            ]),
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

        var he = heightobj;
        var b = Math.berp(0, he.length() - 1, he.current());
        var height = Math.lerp(90, rect.height - 180, b);
        if (height > 320)
            height = 320;
        var width = Math.lerp(90, rect.width - 80, b);
        var r = calculateAspectRatioFit(photo.image.width, photo.image.height, width, height);
        var h = r.height;
        var w = r.width;
        var x = Math.floor(Math.nub(positxobj.value(), positxobj.length(), w, rect.width));
        var y = Math.floor(Math.nub(posityobj.value(), posityobj.length(), h, rect.height));
        if (!headcnv.height)
            return;
        canvas.thumbrect = new rectangle(x, y, w, h);
        var r = canvas.thumbrect;
        context.save();
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        var blackfill = new panel.fill(THUMBTRANSPARENT);
        blackfill.draw(context, canvas.thumbrect, 0, 0);
    
        var whitestroke = new panel.stroke(THUMBSTROKE, THUMBORDER);
        whitestroke.draw(context, r, 0, 0);
        var region = new Path2D();
        region.rect(x, y, w, h);
        context.clip(region);

        var ww = Math.max(30, (rect.width / canvas.virtualwidth) * w);
        var stretch = stretchobj.value();
        if (stretch < 50)
            stretch = (50 - stretchobj.value()) / 100;
        else
            stretch = (stretchobj.value() - 50) / 100;
        stretch = 1 - stretch;
        ww *= stretch;

        var b = Math.berp(0, photo.image.height, canvas.imageheight);
        var hh = Math.lerp(0, h, b);
        var b = Math.berp(0, photo.image.height, _4cnv.nuby);
        var yy = y + Math.lerp(0, h, b);
        var jj = canvas.timeobj.berp();
        var bb = w * (1 - jj);
        var xx = x + bb - ww / 2;
        context.lineWidth = THUMBORDER;
        var r = new rectangle(xx, yy, ww, hh);
        canvas.selectrect = []
        canvas.selectrect.push(r);
        var blackfill = new panel.fill("rgba(0,0,0,0.2)");
        blackfill.draw(context, r, 0, 0);
        whitestroke.draw(context, r, 0, 0);
        if (xx > x) //leftside
        {
            var r = new rectangle(xx - w, yy, ww, hh);
            canvas.selectrect.push(r);
            blackfill.draw(context, r, 0, 0);
            whitestroke.draw(context, r, 0, 0);
        }
        else if (xx < x) //right side
        {
            var r = new rectangle(w + xx, yy, ww, hh);
            canvas.selectrect.push(r);
            blackfill.draw(context, r, 0, 0);
            whitestroke.draw(context, r, 0, 0);
        }

        context.restore();
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
            
            if (
                !photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var bh = rect.height * 0.4;
            var a = new panel.colsA([SCROLLMARGIN, SCROLLEXTENT, 0, SCROLLEXTENT, SCROLLMARGIN],
            [
                0,
                new panel.rows([0,bh,0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 8, 8),
                        new panel.expand(new panel.rectangle(context.zoomrect), 10, 1),
                        new panel.shrink(new panel.currentV(new panel.rounded("white", 
                                0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3),
                    ]),
                    0,
                ]),
                0,
                new panel.rows([0, bh, 0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 8, 8),
                        new panel.expand(new panel.rectangle(context.stretchrect), 10, 0),
                        new panel.shrink(new panel.currentV(new panel.rounded("white", 0, 
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
                zoomobj,
                0,
                stretchobj,
                0,
            ]);

            var data = [];
            var index = galleryobj.current();
            data.push(`\u{25C0}   ${index} of ${galleryobj.length()}   \u{25B6}`);
            const rainstep = Math.min(420,window.innerWidth-60);
        
            var a = new panel.rowsA([HEADTOP, HEADBOT, 0, 
                                 (data.length*WRAPROWHEIGHT), 
                                 20],
            [
                0,
                0,
                0,
                new panel.cols([0, rainstep, 0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 12, 12),
                        new panel.expand(new panel.rectangle(context.pagerect), 10, 10),
                        new panel.gridA(1, data.length, 1,
                            new panel.shrink(new panel.text(),10,10)),
                    ]),
                    0,
                ]),
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

var displaylst = 
[
{
    name: "GALLERY",
    draw: function(context, rect, user, time)
    {    
        var canvas = context.canvas;
        context.save();
        canvas.timeobjrect = new rectangle();
        canvas.hollyrect = new rectangle();
        context.folderect = new rectangle();
        context.cursorect = new rectangle();
	    context.templaterect = new rectangle();
        if (!headcnv.height)
            return;        
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
                    new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 8, 8),
                    new panel.expand(new panel.rectangle(canvas.hollyrect), 0, 20),
                    new panel.shrink(new panel.currentH(
                    new panel.rounded("white", 0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3)
                ]),
                0,
            ])
        ])

        a.draw(context, rect, context.canvas.hollyobj, 0);
        
        var index = 1 - canvas.timeobj.berp();
        index *= galleryobj.length();
        var k = Math.floor(index);
        var value = galleryobj.data[k];
        var folders = [];
        if (value && value.folder)
            folders = value.folder.split("/");
        var data = [];
        data.push(`\u{25C0}    ${index.toFixed(FIXEDTIME)} of ${galleryobj.length()}    \u{25B6}`);
        var w = Math.min(360, rect.width - 100);
        var st = `\u{25C0}    ${_9cnv.sliceobj.value().title}    \u{25B6}`;
        
        var a = new panel.rowsA([HEADTOP, HEADBOT, 23, 0, 
                folders.length?folders.length*WRAPROWHEIGHT:-1, 
                10, data.length*WRAPROWHEIGHT, FOOTSEP, SCROLLEXTENT, SCROLLMARGIN],
        [
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 12, 12),
                    new panel.expand(new panel.rectangle(context.templaterect), 10, 10),
                    new panel.text(),
                ]),
                0,
            ]),
            0,
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 12, 12),
                    new panel.expand(new panel.rectangle(context.folderect), 10, 10),
                    new panel.gridA(1, folders.length, 1,
                        new panel.shrink(new panel.text(), 10, 10)),
                ]),
                0,
            ]),
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 12, 12),
                    new panel.expand(new panel.rectangle(context.cursorect), 10, 10),
                    new panel.gridA(1, data.length, 1,
                        new panel.shrink(new panel.text(), 10, 10)),
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
    		st,
    		0,
            0,
            folders,
            0,
            data,
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
        canvas.timeobjrect = new rectangle();
        canvas.hollyrect = new rectangle();
        var kh = context.rect().width == window.innerWidth ? 90 : ALIEXTENT;
        var a = new panel.colsA([5, 9, 0, 9, 5],
	    [
    		0,
    		0,
    		0,
    		new panel.rows([kh, 0, kh],
    		    [
    			0,
    			new panel.layers(
    			    [
    				new panel.expand(new panel.rectangle(canvas.hollyrect), 10, 0),
    				new panel.currentV(new panel.rounded("white", 0, TRANSPARENT, 5, 5), 90, 1),
    			    ]),
    			0,
    		    ]),
    		0,
	    ]);

        a.draw(context, rect,
        [
            0,
            0,
            0,
            canvas.timeobj,
            0,
        ]);

        context.restore();    
    }
},
];    

var displayobj = new circular_array("", displaylst);
var buttonobj = new circular_array("", []);

buttonobj.init = function()
{
    var b = Number(local.button);
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
    var gheight = 240;
    var dheight = Math.floor(window.innerWidth / a) - gheight;
    var bheight = h*5;
    var bwidth = bheight*a;
    while (bheight*bwidth > 4000*3000)
    {
        bheight--;
        bwidth = bheight*a;
    }
    
    for (var n = Math.floor(gheight); n <= Math.floor(bheight); ++n)
        buttonobj.data.push(n);
    buttonobj.set(dheight);
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

String.prototype.isext = function(str)
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = [str];
    var k = lst.findIndex(function(a)
    {
        return a == ext;
    })
    return k >= 0;
}

String.prototype.isjson = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['json'];
    var k = lst.findIndex(function(a)
    {
        return a == ext;
    })
    return k >= 0;
}

String.prototype.iszip = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['zip', 'cbz'];
    var k = lst.findIndex(function(a)
    {
        return a == ext;
    })
    return k >= 0;
}

String.prototype.isimage = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif'];
    var k = lst.findIndex(function(a)
    {
        return a == ext;
    })
    return k >= 0;
}

String.prototype.proper = function()
{
    if (!this.length)
        return this;
    return this.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
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
                var str = lines[m];
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
                screenfull.isFullscreen ?
                new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(screenfull.isFullscreen ?
                    TRANSPARENT : SCROLLNAB, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
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

panel.fitwidth = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.fitwidthrect = new rectangle()
        var a = new panel.layers(
            [
                new panel.rectangle(context.fitwidthrect),
                _8cnv.fitflash ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(_8cnv.fitflash ? TRANSPARENT : SCROLLNAB, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
                new panel.shrink(new panel.rounded(TRANSPARENT, 3, "white", 4, 4), 16, 30),
            ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

function leftmenu(context)
{
	if (galleryobj.rightctx)
        galleryobj.rightctx.hide()
    
    if (menuobj.value() == context)
    {
        galleryobj.leftctx.hide();
        menuobj.setindex(_8cnvctx);
    }
    else if (menuobj.value() && menuobj.value() != _8cnvctx)
    {
	    galleryobj.leftctx.hide();
        galleryobj.leftctx = context;
        menuobj.setindex(context);
    }
    else
    {
        galleryobj.leftctx = context;
        menuobj.setindex(context);
    }

    menuobj.show();
    headobj.draw();
}

function rightmenu(context)
{
	if (galleryobj.leftctx)
        galleryobj.leftctx.hide()

    if (menuobj.value() && menuobj.value() != _8cnvctx)
    {
    	galleryobj.rightctx.hide();
        menuobj.setindex(_8cnvctx);
    }
    else
    {
	    galleryobj.rightctx = context;
    	menuobj.setindex(context);
    }

    menuobj.show();
    headobj.draw();
}

panel.imagemenu = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        if (menuobj.value() == _8cnvctx ||
            menuobj.value() == galleryobj.rightctx)
        {
		    context.imagemenurect = new rectangle();
            var s = menuobj.value() == galleryobj.rightctx;
            var j = 5;
            var k = j / 2;
            var e = new panel.fill(OPTIONFILL);
            var a = new panel.layers(
            [
                new panel.rectangle(context.imagemenurect),
                s ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(s ? TRANSPARENT : FILLBAR, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
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

panel.holly = function()
{
    this.draw = function(context, rect, user, time)
    {
        user.hollyrect = new rectangle();
        var a = new panel.layers(
        [
            new panel.rounded(HEAVYFILL, 0, TRANSPARENT, 8, 8),
            new panel.expand(new panel.rectangle(user.hollyrect), 0, 20),
            new panel.shrink(new panel.currentH(
                new panel.rounded("white", 0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3)
        ])

        a.draw(context, rect, _8cnv.hollyobj, time)
    }
}

panel.download = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.downloadrect = new rectangle();
        context.fillStyle = "white";
        context.strokeStyle = "white";

        var a = new panel.layers(
        [
            new panel.rectangle(context.downloadrect),
            new panel.shrink(new panel.circle(_4cnv.movingpage == -1 ? 
		        TRANSPARENT : FILLBAR, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
            new panel.shrink(new panel.fill(ARROWFILL), 21, 31),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.info = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        user.inforect = new rectangle()
	    context.fillStyle = "white";
        context.strokeStyle = "white";

        var j = 5;
        var k = j / 2;
        var e = new panel.fill(OPTIONFILL);
        var a = new panel.layers(
        [
            new panel.rectangle(user.inforect),
            new panel.shrink(new panel.circle(FILLBAR, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
            new panel.rows([0, rect.height * 0.20, 0],
            [
                0,
                new panel.cols([0, j, k, j, k, j, 0], [0, e, 0, e, 0, e, 0, ]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.moveprev = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.moveprev = new rectangle()
        user.moveprev = new rectangle();
        context.fillStyle = "white";
        context.strokeStyle = "white";

        var a = new panel.layers(
            [
                new panel.rectangle(context.moveprev),
                new panel.rectangle(user.moveprev),
                _4cnv.movingpage == -1 ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(_4cnv.movingpage == -1 ? TRANSPARENT : FILLBAR, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
                new panel.shrink(new panel.arrow(ARROWFILL, 270), 20, 30),
            ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.closeboss = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.closebossrect = new rectangle()
        var a = new panel.layers(
            [
                new panel.rectangle(context.closebossrect),
                new panel.shrink(new panel.circle("rgba(255,0,0,0.8)", TRANSPARENT, 4), CIRCLEIN, CIRCLEIN),
                new panel.shrink(new panel.circle(TRANSPARENT, SEARCHFRAME, 5), CIRCLEOUT, CIRCLEOUT),
                new panel.text("white", "center", "middle", 0, 0, DEFAULTFONT),
            ]);

        a.draw(context, rect, 'X', time);
        context.restore();
    }
};

panel.movenext = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.movenext = new rectangle()
        user.movenext = new rectangle();
        var a = new panel.layers(
            [
                new panel.rectangle(context.movenext),
                new panel.rectangle(user.movenext),
                _4cnv.movingpage == 1 ? new panel.shrink(new panel.circle(MENUTAP, TRANSPARENT, 4), CIRCLEIN, CIRCLEIN) : 0,
                new panel.shrink(new panel.circle(_4cnv.movingpage == 1 ? TRANSPARENT : FILLBAR, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
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
                new panel.shrink(new panel.circle(SCROLLNAB, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
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

CanvasRenderingContext2D.prototype.refresh = function()
{
    var context = this;
    clearInterval(context.swipetimeout);
    context.swipetimeout = setInterval(function()
    {
        context.canvas.lastime = -0.0000000000101010101;
        bossobj.draw()
    }, BOSSMAIN);
};

CanvasRenderingContext2D.prototype.show = function(x, y, width, height)
{
    if (this.canvas.style.left != x + "px")
        this.canvas.style.left = x + "px";
    if (this.canvas.style.top != y + "px");
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
    ham.get('press').set({time: 400}); //251

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
        context.elst.push({x,y});
    },
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        var canvas = context.canvas;
        context.canvas.slideshow = 0;

        if (ctrl)
        {
            if (context.elst.length % 3)
                return;         
            var j = buttonobj.length()/40;
            context.canvas.pinching = 1;
            var k = delta < 0 ? 1 : -1;
            var e = k*j;
            buttonobj.add(e);
            menuobj.draw();
            context.swipetimeout = 0;
            context.canvas.pinching = 0;
        }
        else
        {
            if (Math.abs(delta) <= 0.8)
                return;
            menuobj.updown(context, delta, 60)
            menuobj.draw();
            if (!context.swipetimeout)
                context.swipetimeout = setInterval(
                    function(){menuobj.draw();}, GALLERYMAIN);
        }
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        if (Math.abs(delta) <= 0.8)
            return;
        context.canvas.hollyobj.addperc(delta / 2000);
        menuobj.draw(1);
    },
},
{
    name: "MENU",
    wheel: function(context, x, y)
    {
        context.elst.push({x,y});
    },
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        menuobj.updown(context, delta, 30);
        if (!context.swipetimeout)
            context.swipetimeout = setInterval(function(){
                menuobj.draw();}, MENUMAIN);
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, trackpad)
    {
        context.canvas.hollyobj.addperc(delta / 1000);
        menuobj.draw();
    },
},
{
    name: "BOSS",
    wheel: function(context, x, y)
    {
        context.elst.push({x,y});
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
            	var e = delta/200;
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
            var e = delta/1000;
            rowobj.addperc(e);
            bossobj.reset()
	        bossobj.draw();
        }
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    { 
        var e = delta/1000;
        if (context.hollyrect &&
            context.hollyrect.hitest(x, y))
        {
            var hollyobj = context.canvas.hollyobj;
            hollyobj.addperc(e);
            bossobj.draw();
        }
        else
        {
            var k = _4cnv.timeobj.length();
            var j = k*e;
            _4cnv.timeobj.CURRENT += j;
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
	context.elst.push({x,y});
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
    },
    pinchstart: function(context, rect, x, y)
    {
        delete context.scaleanchor;
        delete context.buttonanchor;
        context.canvas.slideshow = 0;
        context.canvas.pinching = 1;
    },
    pinchend: function(context)
    {
        setTimeout(function()
        {
            delete context.scaleanchor;
            context.canvas.pinching = 0;
         }, 40);
    },
},
{
    name: "BOSS",
    pinch: function(context, x, y, scale)
    {
	    context.elst.push({x,y});
        if (context.elst.length % 2)
            return;
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
            var b = zoomobj.data[n - 1];
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
        }, 40);
    },
},
{
    name: "MENU",
    pinch: function(context, x, y, scale) {},
    pinchstart: function(context, rect, x, y) {},
    pinchend: function(context) {},
}, ];

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
        var e = key.split("/");
        k.name = e.pop();
        k.folder = e.join("/");
        galleryobj.data.push(k);
    }

    galleryobj.init(galleryobj)
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
            k.name = name;
            k.blob = blob;
            galleryobj.data.push(k);
        }
        else if (name.isjson())
        {
            var text = await blob.text();
            Object.assign(galleryobj, JSON.parse(text));
        }
    }

    galleryobj.init(galleryobj)
    menuobj.draw();
}

function loadfiles(files)
{
	for (var n = 0; n < IMAGELSTSIZE; ++n)
    {
		thumbfittedlst[n] = document.createElement("canvas");
		thumbimglst[n] = new Image();
    }

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
        if (menuobj.value() && menuobj.value() != _8cnvctx)
            return;
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
       context.elst.push({x,y});
        
        if (type == "panleft" || type == "panright")
        {
            var obj = context.canvas.hollyobj;
            var e = canvas.startx - x;
            var k = panhorz(obj, e);
            if (k == -1)
                return;
            if (k == obj.anchor())
                return;
            obj.set(k);
            menuobj.draw();
        }
        else if (type == "panup" || type == "pandown")
        {
            if (canvas.istimeobjrect)
            {
                var k = (y - canvas.timeobjrect.y) / canvas.timeobjrect.height;
                canvas.timeobj.setperc(1-k);
            }
            else
            {
                var e = canvas.starty - y;
                var k = Math.PI / canvas.virtualheight
                k *= e;
                canvas.timeobj.rotateanchored(k);
            }
            
            menuobj.draw()
        }
    },
    panstart: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        canvas.panning = 1;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        delete canvas.slideshow;
        clearInterval(context.canvas.leftright)
        clearInterval(global.timeauto);
        global.timeauto = 0;
        canvas.startx = x;
        canvas.starty = y;
        canvas.timeobj.ANCHOR = canvas.timeobj.CURRENT;
        canvas.istimeobjrect = canvas.timeobjrect && canvas.timeobjrect.hitest(x, y);
        canvas.ishollyrect = canvas.hollyrect && canvas.hollyrect.hitest(x, y);
    },
    panend: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        delete context.canvas.type;
        delete context.canvas.panning;
        delete context.canvas.starty;
        delete context.startt;
        delete context.canvas.timeobj.offset;
        delete buttonobj.offset;
        delete context.canvas.isvbarect;
        delete context.canvas.hollyobj.offset;
        delete canvas.istimeobjrect;
        delete canvas.ishollyrect;
        local.set();
    }
},
{
    name: "MENU",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},

    pan: function(context, rect, x, y, type)
    {
        var canvas = context.canvas;
        context.elst.push({x,y});
        if (context.elst.length % 2)
            return;
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
            if (canvas.ishollyrect)
            {
                var obj = canvas.timeobj;
                var k = (y - canvas.hollyrect.y) / canvas.hollyrect.height;
                obj.setperc(1 - k);
                menuobj.draw();
            }
            else if (canvas.istimeobjrect)
            {
                var obj = canvas.hollyobj;
                var k = (y - canvas.timeobjrect.y) / canvas.timeobjrect.height;
                obj.setperc(k);
                menuobj.draw();
            }
            else
            {
                var e = canvas.starty - y;
                var jvalue = Math.PI / canvas.virtualheight
                jvalue *= e;
                canvas.timeobj.rotateanchored(jvalue);
                menuobj.draw();
            }
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
        canvas.ishollyrect = canvas.hollyrect && canvas.hollyrect.hitest(x, y);
        canvas.istimeobjrect = canvas.timeobjrect && canvas.timeobjrect.hitest(x, y);
    },
    panend: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        delete canvas.starty;
        delete context.startt;
        delete canvas.timeobj.offset;
        var obj = context.canvas.hollyobj;
        delete obj.offset;
    }
},
{
    name: "BOSS",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},
    pan: function(context, rect, x, y, type)
    {
        var canvas = context.canvas;
        context.elst.push({x,y});
        if (context.elst.length % 2)
            return;
        if (canvas.pinching)
            return;
        if (context.canvas.isthumb)
        {
            x = movingx.update(x);
            y = movingy.update(y);
            context.hithumb(x, y);
            if (y != canvas.lasty)
                contextobj.reset()
            else
                bossobj.draw();
            canvas.lasty = y;
        }
        else if (type == "panleft" || type == "panright")
        {
            if (context.istimerect)
            {
                var k = (x - context.timerect.x) / context.timerect.width;
                canvas.timeobj.setperc(1 - k);
                bossobj.draw()
            }
            else if (context.hollyrect &&
                context.hollyrect.hitest(x, y))
            {
                var obj = context.canvas.hollyobj;
                var k = (x - context.hollyrect.x) / context.hollyrect.width;
                obj.setperc(1 - k);
                bossobj.draw()
            }
            else
            {
                var e = canvas.startx-x;
                var k = Math.PI / canvas.virtualwidth
                k *= e;
                canvas.timeobj.CURRENT = canvas.timeobj.ANCHOR - k;
                context.canvas.lastime = -0.0000000000101010101;
                bossobj.draw();               
            }
        }
        else if (type == "panup" || type == "pandown")
        {
            if (context.iszoomrect)
            {
                var k = (y - context.zoomrect.y) / context.zoomrect.height;
                zoomobj.setperc(k);
                contextobj.reset()
            }
            else if (context.isstretchrect)
            {
                var k = (y - context.stretchrect.y) / context.stretchrect.height;
                stretchobj.setperc(k);
                contextobj.reset()
            }
            else
            {
                var a = photo.image.width/photo.image.height;
                var h = canvas.virtualwidth / a;
                var j = rect.height/h;
                var e = canvas.starty - y;
                var k = panvert(rowobj, e*j);
                if (k == -1)
                    return;
                if (k == rowobj.anchor())
                    return;
                rowobj.set(k);
                contextobj.reset();
            }

            bossobj.draw()
        }
    },
    panstart: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        canvas.slidestop = 0;
        canvas.startx = x;
        canvas.starty = y;
        rowobj.setanchor(rowobj.current());
        canvas.timeobj.ANCHOR = canvas.timeobj.CURRENT;
        canvas.isthumb = canvas.thumbrect &&
            canvas.thumbrect.hitest(x, y);
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        headobj.draw();
        context.istimerect = context.timerect && context.timerect.hitest(x, y);
        context.ishollyrect = context.hollyrect && context.hollyrect.hitest(x, y);
        context.iszoomrect = context.zoomrect && context.zoomrect.hitest(x, y);
        context.isstretchrect = context.stretchrect && context.stretchrect.hitest(x, y);
        contextobj.reset();
    },
    panend: function(context, rect, x, y)
    {
        var canvas = context.canvas;
        clearTimeout(context.timepan)
        canvas.slidestop = 0;
        canvas.isthumb = 0;
        delete canvas.timeobj.offset;
        delete stretchobj.offset;
        delete zoomobj.offset;
        delete canvas.startx;
        delete canvas.starty;
        delete rowobj.offset;
        delete canvas.hollyobj.offset;
    }
}, ];

var mouselst = [
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
    move: function(context, rect, x, y) {},
}, ];

var mouseobj = new circular_array("MOUSE", mouselst);

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
        headobj.toggle();    
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
        var h = headcnv.height ? 0 : HEADHEIGHT;
        headcnvctx.show(0, 0, window.innerWidth, h);
        headobj.draw();
    }
}, 
];

var pressobj = new circular_array("PRESS", presslst);
pressobj.set(3);

function gotoimage(n)
{
    var e = Math.berp(0, galleryobj.length()-1, n);
    var k = 1-e;
    var j = k*Math.PI
    _8cnv.timeobj.set(j);
    
    //var k = Math.PI / galleryobj.length() / 2;
    //_8cnv.timeobj.CURRENT += k;
    _8cnv.hollyobj.CURRENT = 0;
    
    menuobj.draw();
    return true;
}

var swipelst = [
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
        menuobj.draw(1);
    },
    swipeupdown: function(context, rect, x, y, evt)
    {
        if (evt.type == context.lastswipe)
            return;

        headcnvctx.show(0, 0, window.innerWidth, 0);
        headobj.draw();
        
        var k = evt.type == "swipeup" ? 1 : -1;
        menuobj.updown(context, k * 90, 50);
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
        menuobj.updown(context, k * 50, 50);
	    if (!context.swipetimeout)
            context.swipetimeout = setInterval(
                function(){menuobj.draw();}, MENUMAIN);
    },
}, ];

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
                var k = canvas.timeobj.length() / galleryobj.length();
                canvas.timeobj.rotate(k);
                menuobj.draw();
            }
            else if (key == "pagedown" || key == "enter")
            {
                var k = canvas.timeobj.length() / galleryobj.length();
                canvas.timeobj.rotate(-k);
                menuobj.draw();
            }
            else if (
                key == "arrowup" ||
                key == "k")
            {
                if (canvas.ctrlKey)
                {
                    var k = canvas.timeobj.length() / galleryobj.length();
                    canvas.timeobj.rotate(k);
                    menuobj.draw();
                }
                else
                {
	                menuobj.updown(context, -120, 30)
                    if (!context.swipetimeout)
                        context.swipetimeout = 
                            setInterval(function(){menuobj.draw()}, GALLERYMAIN);
                }
                
                evt.preventDefault();
            }
            else if (
                key == "arrowdown" ||
                key == "j")
            {
                 if (canvas.ctrlKey)
                {
                    var k = canvas.timeobj.length() / galleryobj.length();
                    canvas.timeobj.rotate(-k);
                    menuobj.draw();
                }
                else
                {
                    menuobj.updown(context, 120, 30)
                    if (!context.swipetimeout)
                        context.swipetimeout = 
                            setInterval(function(){menuobj.draw();}, GALLERYMAIN);
                }
                
                evt.preventDefault();
            }
            else if (key == "e")
            {
                resetview();
                evt.preventDefault();
            }                
            else if (key == " ")
            {
                menuobj.updown(context, canvas.shiftKey?-360:360, 30)
                if (!context.swipetimeout)
                    context.swipetimeout = 
                        setInterval(function(){menuobj.draw();}, GALLERYMAIN);
                evt.preventDefault();
            }                
            else if (key == "\\" || key == "/" || key == "tab")
            {
                var h = headcnv.height ? 0 : HEADHEIGHT;
                headcnvctx.show(0, 0, window.innerWidth, h);
                headobj.draw();
                menuobj.draw()
                evt.preventDefault();
            }
            else if (key == "-" || key == "[")
            {
                buttonobj.addperc(-1.0 / 100);
                menuobj.draw()
                evt.preventDefault();
            }
            else if (key == "+" || key == "]" || key == "=")
            {
                buttonobj.addperc(1.0 / 100);
                menuobj.draw()
                evt.preventDefault();
            }
            else if (
                key == "arrowleft" ||
                key == "h")
            {
                context.canvas.hollyobj.addperc(-25 / 2000);
                menuobj.draw(1);
                evt.preventDefault();
            }
            else if (
                key == "arrowright" ||
                key == "l")
            {
                context.canvas.hollyobj.addperc(25 / 2000);
                menuobj.draw(1);
                evt.preventDefault();
            }
            else if (key == "w")
            {
                evt.preventDefault();
                buttonobj.fitwidth();
            }
            else if (key == "x")
            {
                evt.preventDefault();
                importdialog();
            }
            else if (key == "f")
            {
                evt.preventDefault();
                screenfull.toggle();
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
                screenfull.toggle()
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

CanvasRenderingContext2D.prototype.hithumb = function(x, y)
{
    if (typeof x !== "undefined")
    {
        var rect = this.canvas.thumbrect;
        var c = (x - rect.x);
        var b = c / rect.width;
        var m = (1 - b) * Math.PI;
        this.canvas.timeobj.CURRENT = m;
    }

    if (typeof y !== "undefined")
    {
        var b = (y - rect.y) / rect.height;
        var e = b * rowobj.length();
        rowobj.set(e);
    }
}

var taplst = 
[
{
    name: "BOSS",
    tap: function(context, rect, x, y, shift, ctrl)
    {
        headobj.draw();
        if (headcnv.height &&
            headcnvctx.moveprev && 
            headcnvctx.moveprev.hitest(x, y))
        {
            _4cnvctx.movepage(-1);
        }
        else if (headcnv.height && 
                 headcnvctx.movenext && 
                 headcnvctx.movenext.hitest(x, y))
        {
            _4cnvctx.movepage(1);
        }
        else if (context.copyidrect && 
                 context.copyidrect.hitest(x, y))
        {
             copytext(galleryobj.value().id);   
        }
        else if (
            headcnv.height &&
            headcnvctx.zoomrect &&
            headcnvctx.zoomrect.hitest(x, y))
        {
            var input = document.getElementById("goto-input");
            input.value = galleryobj.current().toFixed(0);
            showdialog("goto", function(image)
            {
                var image = input.value.clean();
                image = Math.floor(image);
                image = util.clamp(0, galleryobj.length()-1, image);
                galleryobj.set(image);
                delete photo.image;
                contextobj.reset();
            })
        }
        else if (context.canvas.thumbrect && 
                 context.canvas.thumbrect.hitest(x, y))
        {
            if (context.canvas.selectrect &&
                context.canvas.selectrect.hitest(x, y) >= 0)
            {
                galleryobj.notransparent = galleryobj.notransparent ? 1 : 0;
                bossobj.draw();
            }
            else
            {
                context.hithumb(x, y);
                galleryobj.transparent = 1;
                contextobj.reset()
            }
        }
        else if (headcnv.height && 
                 headcnvctx.downloadrect && 
                 headcnvctx.downloadrect.hitest(x, y))
        {
	        download()
        }
        else if (context.timerect && context.timerect.hitest(x, y))
        {
            var k = (x - context.timerect.x) / context.timerect.width;
            context.canvas.timeobj.setperc(k);
            bossobj.draw();
        }
        else if (context.zoomrect && context.zoomrect.hitest(x, y))
        {
            var k = (y - context.zoomrect.y) / context.zoomrect.height;
            zoomobj.setperc(k);
            contextobj.reset();
        }
        else if (context.stretchrect && context.stretchrect.hitest(x, y))
        {
            var k = (y - context.stretchrect.y) / context.stretchrect.height;
            stretchobj.setperc(k);
            bossobj.draw();
        }
        else if (!headcnv.height)
        {
            headcnv.height = HEADHEIGHT;
            headobj.draw();
            bossobj.draw();
        }
        else if (
            headcnv.height &&
            headcnvctx.fullscreenrect &&
            headcnvctx.fullscreenrect.hitest(x, y))
        {
            screenfull.toggle()
        }
         else if (
            headcnv.height &&
            headcnvctx.closebossrect &&
            headcnvctx.closebossrect.hitest(x, y))
        {
            _4cnv.width = 0;
            _4cnv.height = 0;
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
            headham.panel = headlst[k];
            headobj.draw();
        }
        else if (
            headcnv.height &&
            headcnvctx.bossdisplayrect &&
            headcnvctx.bossdisplayrect.hitest(x, y))
        {
            delete context.canvas.thumbrect;
            context.nostretchcolumn = 0;
            var k = (x - headcnvctx.bossdisplayrect.x) / headcnvctx.bossdisplayrect.width;
            if (k < 0.2)
            {
                rowobj.addperc(-0.05);
                contextobj.reset()
            }
            else if (k > 0.8)
            {
                rowobj.addperc(0.05);
                contextobj.reset()
            }
            else
            {
                bossdisplayobj.rotate(k < 0.5 ? -1 : 1);
                contextobj.reset();
                headobj.draw();
            }
        }
        else if (
            context.pagerect &&
            context.pagerect.hitest(x, y))
        {
            var k = (x - context.pagerect.x) / context.pagerect.width;
	        if (k < 0.2)
                bossobj.leftright(25);
            else if (k > 0.8)
                bossobj.leftright(-25);
            else
                context.movepage(k < 0.5 ? -1 : 1);
        }    
        
        _4cnvctx.refresh();
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
        else if (
            headcnv.height &&
            (headcnvctx.imagemenurect &&
            headcnvctx.imagemenurect.hitest(x, y)))
        {
		    rightmenu(_6cnvctx)
        }
        else if (
            headcnv.height &&
            headcnvctx.closebossrect &&
            headcnvctx.closebossrect.hitest(x, y))
        {
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
            headham.panel = headlst[k];
            headobj.draw();
        }
        else if (
            context.templaterect &&
            context.templaterect.hitest(x, y))
        {
            var k = (x - context.templaterect.x) / context.templaterect.width;
            if (k > 0.35 && k < 0.65)
            {
                leftmenu(_9cnvctx);
            }
            else
            {
        		for (var n = 0; n < IMAGELSTSIZE; ++n)
        	    {
        			thumbfittedlst[n] = document.createElement("canvas");
        			thumbimglst[n] = new Image();
        	    }
	    
                _9cnv.sliceobj.add(k < 0.5 ? -1 : 1);
                menuobj.draw();
            }            
            
            menuobj.draw(1);
        }
        else if (
            context.folderect &&
            context.folderect.hitest(x, y))
        {
		    leftmenu(_5cnvctx);
        }
        else if (
            context.cursorect &&
            context.cursorect.hitest(x, y))
        {
	        var k = (x - context.cursorect.x) / context.cursorect.width;
            if (k > 0.35 && k < 0.65)
            {
                rightmenu(_6cnvctx)
            }
            else
            {
                var j = canvas.timeobj.length() / galleryobj.length();
                canvas.timeobj.rotate(k < 0.5 ? j :-j);              
            }  

            menuobj.draw();
        }
        else if (
            headcnv.height &&
            headcnvctx.fitwidthrect &&
            headcnvctx.fitwidthrect.hitest(x, y))
        {
            buttonobj.reset();
            _8cnv.fitflash = 1;
            headobj.draw();
            setTimeout(function()
            {
                _8cnv.fitflash = 0;
                headobj.draw();
            }, 400);
        
            menuobj.draw();
        }
        else if (
            headcnv.height &&
            headcnvctx.zoomrect &&
            headcnvctx.zoomrect.hitest(x, y))
        {
            var index = 1 - _8cnv.timeobj.berp();
            index *= galleryobj.length();
            var input = document.getElementById("goto-input");
            input.value = index.toFixed(4);
            showdialog("goto", function(image)
            {
                var image = input.value.clean();
                gotoimage(image);
                menuobj.draw();
            })
        }
        else if (
            headcnv.height &&
            headcnvctx.fullscreenrect &&
            headcnvctx.fullscreenrect.hitest(x, y))
        {
            screenfull.toggle()
        }
        else if (canvas.timeobjrect && canvas.timeobjrect.hitest(x, y))
        {
            var k = (y - canvas.timeobjrect.y) / canvas.timeobjrect.height;
            canvas.timeobj.setperc(1 - k);
            menuobj.draw()
        }
        else if (canvas.hollyrect && canvas.hollyrect.hitest(x, y))
        {
            var k = (x - canvas.hollyrect.x) / canvas.hollyrect.width;
            if (k < 0.2)
                context.canvas.hollyobj.addperc(-25 / 2000);
            else if (k > 0.8)
                context.canvas.hollyobj.addperc(25 / 2000);
            else
                context.canvas.hollyobj.setperc(k);
            menuobj.draw()
        }
        else if (menuobj.value() && menuobj.value() != _8cnvctx)
        {
            closemenu()
        }
        else 
        {
            var visibles = canvas.visibles;
            var k;
            for (k = 0; k < visibles.length; k++)
            {
                var j = visibles[k];
                if (!j.slice || !j.slice.rect)
                    continue;
                if (j.slice.rect.hitest(x, y))
                    break;
            }

            if (k == visibles.length)
                return;
            var n = visibles[k].n;
            var nn = n+1;
            var np = n-1;
            if (nn >= galleryobj.length())
                nn = 0;
            if (nn == -1)
                nn = galleryobj.length()-1;
            var slice = canvas.sliceobj.data[n];
            y -= slice.rect.y;
           	if (slice.moveprev && slice.moveprev.hitest(x, y))
    		{
    		    var j = canvas.timeobj.length() / galleryobj.length();
    		    canvas.timeobj.rotate(j);  
                galleryobj.set(np);        
                menuobj.draw();
    		}
    		else if (slice.movenext && slice.movenext.hitest(x, y))
    		{
    		    var j = canvas.timeobj.length() / galleryobj.length();
    		    canvas.timeobj.rotate(-j);     
                galleryobj.set(nn);
                menuobj.draw();
    		}
            else if (slice.inforect && slice.inforect.hitest(x, y))
            {
                rightmenu(_6cnvctx)
            }
            else
            { 
                if (headcnv.height)
                {
                    headobj.toggle();
                    galleryobj.set(n);
                    menuobj.draw()
                }
                else if (galleryobj.current() == n)
                {
                    headobj.toggle();
                }
                else
                {
                    galleryobj.set(n);
                    menuobj.draw()
                } 
            }

            local.set();
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
            var gallery = _2cnv.sliceobj.value();
            var title = document.getElementById("gallery-add-title");
            var json = document.getElementById("gallery-add-json");
            title.value = gallery.title;
            json.value = gallery.json;
            showdialog("gallery-add", function(image)
            {
                const form = new FormData();
                form.append('title', title.value);
                form.append('json', json.value);
                fetch(`https://gallery.reportbase5836.workers.dev/${login.id}`,
                {
                    'method': 'PATCH',
                    'body': form
                })
                .then((response) => jsonhandler(response))
                .then(function(obj)
                {
                     var gallery = _2cnv.sliceobj.value();
                     k.title = obj.title;
                     k.json = obj.json;
                     menuobj.draw();
                })
            })
        }
        else if (canvas.uploadrect && canvas.uploadrect.hitest(x, y))
        {
        }
        else if (canvas.downloadrect && canvas.downloadrect.hitest(x, y))
        {
            download();             
        }
        else if (canvas.galleryopenrect && canvas.galleryopenrect.hitest(x, y))
        {
           for (var n = 0; n < IMAGELSTSIZE; ++n)
            {
                thumbfittedlst[n] = document.createElement("canvas");
                thumbimglst[n] = new Image();
            }

            url = new URL(url.origin);
            var gallery = _2cnv.sliceobj.value();
            url.searchParams.set("id",gallery.id);
            window.open(url.href,"_self")
        }
        else if (canvas.gallerydeleterect && canvas.gallerydeleterect.hitest(x, y))
        {
            showdialog("confirm", function(image)
            {
                var gallery = _2cnv.sliceobj.value();
                fetch(`https://gallery.reportbase5836.workers.dev/${gallery.id}`,
                {
                    'method': 'DELETE'
                })
                .then((response) => jsonhandler(response))
                .then(function(obj)
                {
                    _2cnv.sliceobj.data.splice(_2cnv.sliceobj.current(),1);
                    menuobj.draw();
                })
            });
        }    
        else if (canvas.galleryaddrect && canvas.galleryaddrect.hitest(x, y))
        {
            var title = document.getElementById("gallery-add-title");
            var json = document.getElementById("gallery-add-json");
            showdialog("gallery-add", function(image)
            {
                const form = new FormData();
                form.append('title', title.value);
                form.append('json', json.value);
                form.append('user_id', login.id);
                fetch(`https://gallery.reportbase5836.workers.dev`,
                {
                    'method': 'POST',
                    'body': form
                })
                .then((response) => jsonhandler(response))
                .then(function(obj)
                {
                    var j = _2cnv.sliceobj.data[0];
                    var k = {};
                    k = Object.assign(k, j);
                    k.title = obj.title;
                    k.json = obj.json;
                    k.id = obj.id;   
                    _2cnv.sliceobj.data.push(k);
                    var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
                    _2cnv.rotated = [...a, ...a, ...a];
                    menuobj.draw();
                    dialog.close();
                })
            })
        }
        else if (canvas.loginrect && canvas.loginrect.hitest(x, y))
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
        else if (canvas.usereditrect && canvas.usereditrect.hitest(x, y))
        {
            var name = document.getElementById("user-edit-name");
            var email = document.getElementById("user-edit-email");
            var secret = document.getElementById("user-edit-secret");
            var id = document.getElementById("user-edit-id");
            name.value = login.name?login.name:"";
            email.value = login.email?login.email:"";
            secret.value = login.secret?login.secret:"";
            id.value = login.id?login.id:"";
            showdialog("user-edit", function(str)
            {
                const form = new FormData();
                form.append('name', name.value);
                form.append('email.old', login.email);
                form.append('email', email.value);
                form.append('id', id.value);
                form.append('secret', secret.value);
                fetch(`https://user.reportbase5836.workers.dev`,
                {
                    'method': 'PATCH',
                    'body': form
                })
              .then(response => response.json())
                .then(function(obj)
                      {
                          console.log(obj);
                      })
                .catch(err => console.error(err));        
            });
                
            return true;              
        }
        else if (canvas.closerect && 
                 canvas.closerect.hitest(x, y))
        {
            closemenu();
            return false;
        }
        else if (canvas.useraddrect && canvas.useraddrect.hitest(x, y))
        {
            showdialog("user-login", function(str)
            {
                var user = _1cnv.sliceobj.value();            
                const form = new FormData();
                form.append('name', user.name);
                form.append('email', user.email);
                fetch(`https://user.reportbase5836.workers.dev`,
                {
                    'method': 'POST',
                    'body': form
                })
                .then(response => response.json())
                .then(function(k)
                {
                    login = Object.assign(login, k);
                    setjson("login", login);	
                    menuobj.draw();
                })                  
            });

            return false;
        }
        else if (canvas.useropenrect && canvas.useropenrect.hitest(x, y))
        {
            login = _1cnv.sliceobj.value();
            loginbyemail(function()
            {
                menuobj.hide();
                galleryobj.leftctx = _10cnvctx;
                menuobj.setindex(galleryobj.leftctx);
                menuobj.show();
            })
		    
            return false;
        }
        else if (canvas.userpatchrect && canvas.userpatchrect.hitest(x, y))
        {
            showdialog("user-login", function(str)
            {
                        
            });

            return false;
        }
        else if (canvas.userdeleterect && canvas.userdeleterect.hitest(x, y))
        {
            showdialog("confirm", function(str)
            {
                    fetch(`https://user.reportbase5836.workers.dev/reportbase@gmail.com`,
                    {
                        'method': 'DELETE'
                    })
                  .then(response => response.json())
                    .then(function(obj)
                          {
                              console.log(obj);
                          })
            });

            return false;
        }
        else if (canvas.homerect && canvas.homerect.hitest(x, y))
        {
	        leftmenu(_7cnvctx);
            return false;
        }
        else if (canvas.timeobjrect &&
            canvas.timeobjrect.hitest(x, y))
        {
            var k = (y - canvas.timeobjrect.y) / canvas.timeobjrect.height;
            canvas.hollyobj.setperc(k);
            menuobj.draw();
            return true;
        }
        else if (canvas.hollyrect &&
            canvas.hollyrect.hitest(x, y))
        {
            var k = (y - canvas.hollyrect.y) / canvas.hollyrect.height;
            context.canvas.timeobj.setperc(1 - k);
            menuobj.draw();
            return true;
        }
        else
        {
            var canvas = context.canvas;
            var visibles = canvas.visibles;
            var k;
            for (k = 0; k < visibles.length; k++)
            {
                var j = visibles[k];
                if (j.slice.rect.hitest(x, y))
                    break;
            }

            if (k == visibles.length)
                return;

            var n = visibles[k].n;
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
    var k = _4cnv.timeobj.length();
    var j = k*(1/e);
    _4cnv.timeobj.CURRENT += j;
    bossobj.draw()
}

//bossobj draw
bossobj.draw = function()
{
    if (!photo.image)
        return;
    if (!photo.image.complete)
        return;
    if (menuobj.value())
        return;
    
    var canvas = _4cnv;
    var context = _4cnvctx;
    var rect = context.rect();

    if (!canvas.width)
        return;
	if (!canvas.height)
        return;
    
    if (canvas.lastime == canvas.timeobj.current())
        return;
    else
        canvas.lastime = canvas.timeobj.current();

    var stretch = stretchobj;
    var virtualpinch = _4cnv.virtualwidth * (stretch.value() / 100);
    var colwidth = _4cnv.colwidth;
    var virtualeft = (virtualpinch - rect.width) / 2;
    var j = (colwidth / (colwidth + _4cnv.virtualwidth)) * Math.PI;
    var time = canvas.timeobj.value() + j;

    var slices = _4cnv.sliceobj.data;
    var slice = slices[0];
    if (!slice)
        return;
    context.save();
    if (context.nostretchcolumn || (
        galleryobj.value() && galleryobj.value().ispng))
    {
        context.clear();
    }

    for (var m = 0; m < slices.length; ++m)
        slices[m].stretchwidth = 0;

    for (var m = slices.length; m < slices.length * 2; ++m)
    {
        var n = _4cnv.rotated[m];
        var slice = slices[n];
        var j = time + slice.time;
        var b = Math.tan(j * VIRTCONST);
        var x = Math.berp(-1, 1, b) * virtualpinch - virtualeft;

        var n2 = _4cnv.rotated[m + 1];
        var slice2 = slices[n2];
        var j2 = time + slice2.time;
        var b2 = Math.tan(j2 * VIRTCONST);
        var x2 = Math.berp(-1, 1, b2) * virtualpinch - virtualeft;

        var g = x2 > x ? x2 - x : x - x2;
        var w = context.nostretchcolumn ? colwidth : g;
        w = Math.ceil(x + w) - x;

        if (x < -w || x >= rect.width)
            continue;
        context.drawImage(slice.canvas,
            slice.x, 0, colwidth, rect.height,
            x, 0, w, rect.height);

        //overlayobj.value().draw(context,
          //new rectangle(x,0,w,rect.height),
            //  `${n+1}`, 0);
     }

    context.restore();

    //thumbnail
    delete context.pagerect;
   
    //zoom
    delete context.pagerect;
    delete context.zoomrect;
    delete context.stretchrect;

    //Upload
    delete context.hollyrect;
    delete context.uploadimagerect;
    delete context.deleteimagerect;

    //others
    delete context.slicerect;
    delete context.stretchrect;
    delete context.canvas.thumbrect;
    delete context.copyidrect;
    delete context.gallerydeleterect;
    delete context.uploadimagerect;
    delete context.hollyrect;
    
    if (!menuobj.value() && headcnv.height)
        bossdisplayobj.value().draw(context, rect, 0, 0);
}

//bossobj reset
bossobj.reset = function()
{
    if (!photo.image ||
        !photo.image.complete ||
        !photo.image.naturalHeight)
        return;

    var canvas = _4cnv;
    var context = _4cnvctx;
    if (canvas.width != window.innerWidth ||
        canvas.height != window.innerheight)
    {
        window.headrect = new rectangle(0, 0, window.innerWidth, ALIEXTENT);
        window.leftrect = new rectangle(0, 0, window.innerWidth / 2, window.innerHeight);
        window.rightrect = new rectangle(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
        window.rect = new rectangle(0, 0, window.innerWidth, window.innerHeight);
        window.landscape = function()
        {
            return window.rect.width > window.rect.height ? 1 : 0;
        }
        window.portrait = function()
        {
            return window.rect.width < window.rect.height ? 1 : 0;
        }
        
        context.show(0, 0, window.innerWidth, menuobj.value() ? 0 : window.innerHeight);
    }

    var start = 0;
    for (; start < 100; ++start)
    {
        var zoom = (100 - start) / 100;
        var height = photo.image.height * zoom;
        var aspect = photo.image.width / height;
        var width = window.innerHeight * aspect;
        var j = width / window.innerWidth;
        if (j > 1.5)
            break;
    }

    for (var end = 100; end >= 0; --end)
    {   
        var str = `${start}-${end}`;
        zoomobj.makerange(str, 100);
        var z = zoomobj.value();
        var zoom = (100 - z) / 100;
        _4cnv.imageheight = photo.image.height * zoom;
        _4cnv.virtualheight = _4cnv.height;
        var imageaspect = photo.image.width / _4cnv.imageheight;
        _4cnv.virtualwidth = _4cnv.height * imageaspect;
        var size = _4cnv.virtualwidth * _4cnv.virtualheight;
        if (size < 3000*3000 && _4cnv.virtualwidth < 12000)
            break;
    }
    
    var y = util.clamp(0, _4cnv.height - 1, _4cnv.height * rowobj.berp());
    _4cnv.nuby = Math.nub(y, _4cnv.height, _4cnv.imageheight, photo.image.height);

    var slicewidth = slicewidthobj.value();

    var j = 0;
    for (; j < slicelst.length; ++j)
    {
        var k = slicelst[j];
        var fw = _4cnv.virtualwidth / k.slices;
        if (fw >= slicewidth)
            break;
    }

    var canvaslen = Math.ceil(_4cnv.virtualwidth / MAXVIRTUAL);
    var e = slicelst[j - 1];
    var delay = e.delay;
    var slices = Math.ceil(e.slices / canvaslen);
    var delayinterval = delay / 100000;
    var gwidth = photo.image.width / canvaslen;
    var bwidth = _4cnv.virtualwidth / canvaslen;
    _4cnv.colwidth = bwidth / slices;

    var slice = 0;
    _4cnv.sliceobj.data = []

    var j = 0;
    for (var n = 0; n < canvaslen; ++n)
    {
        var cnv = canvaslst[n];
        if (cnv.height != _4cnv.height)
            cnv.height = _4cnv.height;
        if (cnv.width != bwidth)
            cnv.width = bwidth;

        var ctx = cnv.getContext('2d');
        ctx.drawImage(photo.image,
            n * gwidth, _4cnv.nuby, gwidth, _4cnv.imageheight,
            0, 0, bwidth, cnv.height);

        var tb = new Array(slices).fill(0);
        var jb = gridToGridB(tb, bwidth);

        for (var e = 0; e < slices; ++e)
        {
            var k = {};
            k.x = e * _4cnv.colwidth;
            k.p = k.x / _4cnv.virtualwidth;
            k.slice = slice;
            k.time = j;
            k.canvas = cnv;
            slice++;
            _4cnv.sliceobj.data.push(k);
            j += delayinterval;
        }
    }

    var a = Array(_4cnv.sliceobj.length()).fill().map((_, index) => index);
    _4cnv.rotated = [...a, ...a, ...a];

    //bossobj.draw();
    context.refresh();
}

var buttonlst = 
[
{
    name: "DEFAULT",
    draw: function(context, rect, user, time) {}
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = 
	    [
		    user.title
        ];
        
        a.draw(context, rect, k, time);
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = [];
        k.push(`${user.index+1} of ${galleryobj.length()}`);
        if (user.url)
            k.push(user.url.split("/").pop());
        if (user.id)
            k.push(user.id);
        /*
      	var bad =
    	[
		    "url",
	        "folder",
	        "index",
	        "func",
	        "rect",
	        "isvisible",
        ];

        var j = Object.keys(user);
        for (var n = 0; n < j.length; ++n)
        {
            var name = j[n];
            if (bad.findIndex(function(a){return a == name}) >= 0)
                continue;
            k.push(user[name]);
        }
	    */
        a.draw(context, rect, k, time);
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
                new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = typeof(user.title) == "function" ? user.title() : user.title;
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
                new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
                new panel.shrink(new panel.multitext(e, 
                    new panel.text()), 20, 20),
            ]),
            0,
        ]);

        var k = 
        [
            user.title,
            user.id
        ];
        
        a.draw(context, rect, k, time);
        context.restore();
    }
},    
{
    name: "GALLERY",
    draw: function(context, rect, user, time)
    {
        var index = time % IMAGELSTSIZE;
        var view = Math.floor(time / IMAGELSTSIZE);
        var thumbimg = thumbimglst[index];
        var thumbfitted = thumbfittedlst[index];

        if (thumbimg && thumbimg.width)
        {
            var obj = _8cnv.hollyobj;
            var b = thumbimg.width / thumbimg.height;
            var b2 = rect.width / rect.height;
            var hh = Math.floor(rect.height);
            var ww = Math.floor(rect.width);
            var hhh = hh;
            var yyy = 0;

            //todo
            if (user.rect.y < 0)
            {
		        yyy = -user.rect.y;
		        hhh = Math.min(window.innerHeight,user.rect.height);
            }
            else
            {
                //yyy = user.rect.y;
                hhh = Math.min(window.innerHeight-user.rect.y,user.rect.height);
            }

            if (thumbfitted.view != view)
                thumbfitted.view = view;

            if (b > b2)
            {
                if (thumbfitted.height != hh ||
                    thumbimg.count < 1)
                {
                    var thumbfittedctx = thumbfitted.getContext("2d");
                    thumbfitted.height = hh;
                    thumbfitted.width = Math.floor(hh * b);
                    thumbfittedctx.drawImage(
                        thumbimg, 0, 0, thumbimg.width, thumbimg.height,
                        0, 0, thumbfitted.width, thumbfitted.height);
                    thumbimg.count = 1;
                }

                var x = Math.nub(obj.value(), obj.length(),
                    ww, thumbfitted.width);
                context.drawImage(thumbfitted,
                    Math.floor(x), yyy, ww, hhh,
                    0, yyy, ww, hhh); 
            }
            else
            {
                if (thumbfitted.width != ww ||
                    thumbimg.count < 1)
                {
                    var thumbfittedctx = thumbfitted.getContext("2d");
                    thumbfitted.width = ww
                    thumbfitted.height = Math.floor(ww / b);
                    thumbfittedctx.drawImage(
                        thumbimg, 0, 0, thumbimg.width, thumbimg.height,
                        0, 0, thumbfitted.width, thumbfitted.height);
                    thumbimg.count = 1;
                }

                var y = Math.nub(obj.value(), obj.length(),
                    hh, thumbfitted.height);
                context.drawImage(thumbfitted,
                    0, Math.floor(y) + yyy, ww, hhh,
                    0, yyy, ww, hhh);
            }

            delete user.uploadrect;
            delete user.inforect;
            const rainstep = Math.min(420,window.innerWidth-60);
	        
	        if (!headcnv.height && galleryobj.current() == time)
            {
                var a = new panel.rows([8,BEXTENT,0,BEXTENT,SCROLLEXTENT,SCROLLMARGIN],
                [
                    0,
                    new panel.cols([5,ALIEXTENT,0,ALIEXTENT,5],
                    [
                        0,
                        new panel.moveprev(),
                        0,
    	                new panel.movenext(),
                        0,
                    ]),
                    0,
                    new panel.cols([0,ALIEXTENT+10,0],
                    [
                        0,
                        new panel.info(),
    	                0,
                    ]),
                    new panel.cols([0, rainstep, 0],
                    [
                        0,
                        new panel.holly(),
                        0,
                    ]),
                          
                    0,
                ]);    
                
                a.draw(context, rect, user, 0);
            }
            
            if (user.tap)
            {
                var a = new panel.fill("rgba(0,0,0,0.5)");
                a.draw(context, rect, 0, 0);
            }
        }
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
    
    for (var n = 0; n < IMAGELSTSIZE; ++n)
    {
        thumbfittedlst[n] = document.createElement("canvas");
        thumbimglst[n] = new Image();
    }                

    context.hide();
    _4cnv.height = window.innerHeight;
    this.setindex(0);
}

//menuobj show
menuobj.show = function()
{
    var context = this.value();
    if (!context)
        return;
    var canvas = context.canvas;
    //_4cnv.height = 0;
   
    var k = displaylst.findIndex(function(a){return a.name == canvas.display});
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

    menuobj.draw();    
}

//menuobj draw
menuobj.draw = function()
{
    var context = this.value();
    if (!context)
    	return;
    	
    var canvas = context.canvas;
    var time = canvas.timeobj.value();
    var slices = context.canvas.sliceobj.data;
    const rect = context.rect();
    if (!rect.width || !rect.height)
        return;
    
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
        local.set()
        resetview()
    }

    var delayinterval = Math.PI / slices.length;
    context.canvas.virtualheight = slices.length * canvas.buttonheight;
    
    context.clear();
    if (context.canvas.virtualheight < window.innerHeight && slices.length)
    {
        canvas.buttonheight = window.innerHeight / slices.length;
        context.canvas.virtualheight = slices.length * canvas.buttonheight;
    }
    else if (context == _8cnvctx)
    {
        canvas.buttonheight = buttonobj.value();
        context.canvas.virtualheight = 
            slices.length * canvas.buttonheight * beavobj.value()/100;
    }

    if (context != _8cnvctx)
    {
        var a = new panel.fill(FILLMENU);
        a.draw(context, new rectangle(0, 0, canvas.width, canvas.height), 0, 0);
    }
    
    var current = context.canvas.sliceobj.lerp(
        1 - context.canvas.timeobj.berp());
    if (canvas.lastcurrent != current || !canvas.normal)
    {
        canvas.lastcurrent = current;
        var size = Math.ceil(rect.height / canvas.buttonheight) + ROTATEANCHORSIAE;
        canvas.normal = util.rotated_list(canvas.rotated, slices.length, current, size);
    }

    context.canvas.visibles = [];
    var ctx = context;
    context.canvas.centered = 0;
    var r = new rectangle(0, 0, rect.width, canvas.buttonheight);
    var lasty = -10000000;
    var delay = 0;
    
    for (var m = 0; m < canvas.normal.length; ++m)
    {
        var n = canvas.normal[m];
        var slice = slices[n];
        var index = n % IMAGELSTSIZE;
        var view = Math.floor(n / IMAGELSTSIZE);
        var thumbimg = thumbimglst[index];
        var thumbfitted = thumbfittedlst[index];
        if (context == _8cnvctx && thumbimg.view != view)
        {
            thumbimg.view = view;
            thumbimg.onload = function()
            {
                this.count = 0;
		        menuobj.draw();
            }

            if (slice.entry)
                getblobpath(thumbimg, slice)	
            else
                thumbimg.src = imagepath(slice,_9cnv.sliceobj.value());
        }
        else
        {
            var t = time + (n * delayinterval);
            var b = Math.tan(t);
            var j = Math.berp(-1, 1, b);
            var y = j * context.canvas.virtualheight;
            var e = (canvas.virtualheight - rect.height) / 2;
            y -= e;
            var x = rect.width / 2;
            var j = {slice,x,y,n};
            slice.rect = new rectangle(0, j.y, rect.width, canvas.buttonheight);
            slice.isvisible = j.y > -canvas.buttonheight && j.y < window.innerHeight;
            if (slice.isvisible)
            {
        	    if (j.slice.rect.hitest(window.innerWidth / 2, window.innerHeight / 2))
        	    {
            		galleryobj.width = thumbimg.width;
            		galleryobj.height = thumbimg.height;
            		context.canvas.centered = j.n;
        	    }
        	    
        	    context.canvas.visibles.push(j);             
                context.translate(0, j.y);
                context.canvas.draw(context, r, j.slice, j.n);
                context.translate(0, -j.y);
            }
	    }
    }

    //gallery
    delete context.templaterect;

    //button
    delete canvas.timeobjrect;
    delete canvas.hollyrect;
    delete context.cursorect;
    delete context.folderect;

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
    mouse: "DEFAULT",
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
    width: 640
},
{ // _2cnvctx galleries
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    buttonheight: 240,
    buttonmargin: 20,
    width: 640
},
{ // _3cnvctx debug
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    footer: "DEBUG",
    buttonheight: 90,
    buttonmargin: 10,
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
    width: 640
},
{ // _5cnvctx folders
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    width: 640
},
{ // _6cnvctx images
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    width: 640
},
{ // _7cnvctx home
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    buttonheight: 320,
    buttonmargin: 10,
    width: 5160
},
{ // _9cnvctx template
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "TEMPLATE",
    wheel: "MENU",
    drop: "DEFAULT",
    key: "MENU",
    press: "MENU",
    pinch: "MENU",
    display: "MENU",
    footer: "TEMPLATE",
    buttonheight: 120,
    buttonmargin: 30,
    width: 640
},
{ // _10cnvctx User
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    buttonheight: 50,
    buttonmargin: 10,
    width: 640
},
{ // _11cnvctx unused
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    width: 640
},
{ // _12cnvctx
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    width: 640
},
{ // _13cnvctx
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    width: 640
},
{ // _14cnvctx
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
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
    width: 640
},
{ // _15cnvctx
    speed: 60,
    reduce: 2,
    updownmax: 60,
    mouse: "DEFAULT",
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
        context.imageSmoothingEnabled = false;
        context.imageSmoothingQuality = "high";
        context.font = DEFAULTFONT;
        context.fillText("  ", 0, 0);
        context.elst = []
        canvas.autodirect = -1;
        canvas.slideshow = 0;
        canvas.slidereduce = 0;
        canvas.slidestop = 0;
        canvas.lastime = 0;
        canvas.sliceobj = new circular_array("", []);
        canvas.timeobj = new circular_array("", Math.PI);
        canvas.timeobj.set(Math.PI / 2);
        canvas.hollyobj = new circular_array("TEXTSCROLL", window.innerHeight);
        canvas.speed = obj.speed;
        canvas.reduce = obj.reduce;
        canvas.autodirect = -1;
        canvas.width_ = obj.width;
        canvas.footer = obj.footer;
        canvas.buttonheight = obj.buttonheight;
        canvas.buttonmargin = obj.buttonmargin;
        canvas.display = obj.display;
        context.drawtimeoutcount = 0;
        context.drawtimeoutcountactual = 0;

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
        if (IFRAME)
        {
            canvas.pressup_ = new panel.empty();
            canvas.press_ = new panel.empty();
        }
        else
        {
            canvas.pressup_ = k.pressup;
            canvas.press_ = k.press;
        }
    
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

//contextobj reset
contextobj.reset = function()
{
   var context = _4cnvctx;
    if (photo.image &&
        photo.image.complete &&
        photo.image.naturalHeight)
    {
	    bossobj.reset();
    }
    else
    {
        photo.image = new Image();
        if (galleryobj.value().entry)
            getblobpath(photo.image, galleryobj.value())
        else
            photo.image.src = galleryobj.getpath(galleryobj.current());  

        photo.image.onerror =
            photo.image.onabort = function(e)
            {
                console.log(e);
            }

        photo.image.onload = function()
        {
            var e = galleryobj.value();
            document.title = galleryobj.title?galleryobj.title:url.host;
            _4cnv.autodirect = -_4cnv.movingpage;
            _4cnv.movingpage = 0;
            bossobj.reset();
            headobj.draw();
            bossobj.draw();

            var rotated = util.rotated_list(
                _8cnv.rotated, galleryobj.length(),
                galleryobj.current() + 1, 9);

            for (var m = 0; m < rotated.length; ++m)
            {
                var n = rotated[m];
                if (galleryobj.data[n].loaded)
                    continue;
                var img = new Image();
                img.src = galleryobj.getpath(n);
                img.index = n;
                img.onload = function()
                {
                    galleryobj.data[this.index].loaded = 1;
                }
            }
        }
    }
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

panel.text = function(color = "white", align = "center", baseline = "middle",
    reverse = 0, noclip = 0, font = DEFAULTFONT)
{
    this.draw = function(context, rect, user, time)
    {
        if (typeof(user) !== "string")
            return;

        if (rect.width < 0)
            return;
        var n = user.length;
        if (n <= 0)
            return;
        
        if (reverse)
            user = user.split("").reverse().join("");

        context.save();
        context.textAlign = align;
        context.textBaseline = baseline;
        context.fillStyle = color;
        context.font = DEFAULTFONT;//font;

        var metrics;
        var str = user;

        if (!noclip)
        {
            do 
            {
                str = user.substr(0, n);
                metrics = context.measureText(str);
                n--;
            }
            while (n >= 0 && metrics.width > rect.width);
        }
        else
        {
            str = user;
        }
        
        var x = rect.x;
        if (align == "center")
            x = rect.x + rect.width / 2;
        else if (align == "right")
            x = rect.x + rect.width - 1;
        var y = rect.y + rect.height / 2;

        if (reverse)
            str = str.split("").reverse().join("");
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
        var k = rev ? user.length() - user.current() : user.current();
        var nub = Math.nub(k, user.length(), extent, rect.height);
        var r = new rectangle(rect.x, rect.y + nub, rect.width, extent);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

//Math.nub(99,100,100,1000) = 900
//Math.nub(0,100,100,1000) = 0
Math.nub = function(n, size, nubextent, extent)
{
    var b = Math.berp(0, size - 1, n);
    var e = b * nubextent;
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
    if (menuobj.value())
    {
        buttonobj.reset()
        contextobj.reset();
        headobj.reset();
        if (menuobj.value() != _8cnvctx)
        {
            menuobj.hide();
            menuobj.setindex(_8cnvctx);
        }
    
        menuobj.show();
    }
    else
    {
        _4cnv.width = window.innerWidth;
        _4cnv.height = window.innerHeight;
	    contextobj.reset();
        headobj.reset();
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
                    new panel.shrink(new panel.circle(s ? TRANSPARENT : FILLBAR, SEARCHFRAME, 4), CIRCLEOUT, CIRCLEOUT),
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
    if (dialog && dialog.open)
        return;
    var context = menuobj.value() ? menuobj.value() : _4cnvctx;
    return context.canvas.keyup_(evt);
});

window.addEventListener("keydown", function(evt)
{
    var key = evt.key.toLowerCase();
    if (key == "escape")
    {
        if (dialog && dialog.open)
        {
            dialog.close();
            return;
        }
        
        if (menuobj.value() && menuobj.value() != _8cnvctx)
        {
            menuobj.hide();
            menuobj.setindex(_8cnvctx);
            headobj.draw();
            return;
        }
    
        headobj.reset();
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

let thumbfittedlst = [];
let thumbimglst = [];

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
        //thumbimg.src = `https://ipfs.io/ipfs/${user.id}`;
        //thumbimg.src = `https://cloudflare-ipfs.com/ipfs/${user.id}`;
        //thumbimg.src = `https://ipfs.filebase.io/ipfs/${user.id}`;
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
    }
    catch (_)
    {
    }
}

function closemenu()
{
    menuobj.hide();
    menuobj.setindex(_8cnvctx);
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
                    .catch(error =>
                    {
                        console.log("error:", error);
                    });
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
        title: `Open   \u{25B6}\n*.zip, *.cbz, *.json, *.png,\n*.jpg, *.avif, *.webp, *.gif`,
        func: function()
        {
            importdialog();
            return true;
        }
    },   
    {
        title: "Developer\nTom Brinkman\n\nEmail\nimages@zip-view.com",
        func: function() 
        {
            return true;
        }
    },     
    {
        title: "Original Image",
        func: function() 
        {
	        clearInterval(_8cnvctx.swipetimeout)
	        _8cnvctx.swipetimeout = 0;
	        _8cnvctx.canvas.slideshow = 0;
            menuobj.hide();
            _8cnv.width = 0;
            _8cnv.height = 0;
	        _4cnv.width = window.innerWidth;
            _4cnv.height = window.innerHeight;
            galleryobj.set(_8cnv.centered);
            headcnvctx.show(0, 0, window.innerWidth, HEADHEIGHT);
            var k = headlst.findIndex(function(a){return a.name == "BOSS"});
            headham.panel = headlst[k];
            delete photo.image;
            contextobj.reset();
            return false;
        }
    },     
    {
        title: `Users   \u{25B6}`,
        func: function()
        {
           fetch(`https://user.reportbase5836.workers.dev/list`)
                .then((response) => jsonhandler(response))
                .then(function(results)
                {
                    for (var n = 0; n < results.length; ++n)
                    {
                        var result = results[n];
                        result.func = function(n, x, y)
                        {
                             _1cnv.sliceobj.set(n);
                            menuobj.draw();
                            return false;
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
   },
   {
        title: `Galleries   \u{25B6}`,
        func: function(n, x, y)
        {
           if (!login.id)
           {
               googlelogin();
               return;
           }
            
           fetch(`https://gallery.reportbase5836.workers.dev/list/${login.id}`)
                .then((response) => jsonhandler(response))
                .then(function(results)
                {
                    for (var n = 0; n < results.length; ++n)
                    {
                        var result = results[n];
                        result.func = function(n, x, y)
                        {
                             _2cnv.sliceobj.set(n);
                            menuobj.draw();
                            return false;
                        }
                    }
        
                    _2cnv.sliceobj.data = results
                    var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
                    _2cnv.rotated = [...a, ...a, ...a];
                    leftmenu(_2cnvctx)
                })
            return false;
        }
     },
     {
        title: function()
        {
            var str = `Account   \u{25B6}`
            if (login.name)
                str += `\n${login.name}`;
	        else if (login.email)
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

            leftmenu(_10cnvctx);
            return false;
        },
    },
    {
        title: "Templates   \u{25B6}",
        func: function()
        {
            leftmenu(_9cnvctx);
            return false;
        }
    },
    {
        title: "Folders   \u{25B6}",
        func: function()
        {
            leftmenu(_5cnvctx);
            return false;
        }
    },
    {
        title: "Debug   \u{25B6}",
        func: function()
        {
            leftmenu(_3cnvctx);
            return false;
        }
    }
    ];
    
    _10cnv.sliceobj.data = 
    [
        {
            title: function(){return `ID\n${login.id?login.id:""}`},
            func: function(){copytext(login.id); return false;}
        },
        {
            title: function(){return `Email\n${login.email?login.email:""}`},
            func: function(){copytext(login.email); return false;}
        },
        {
            title: function(){return `Name\n${login.name?login.name:""}`},
            func: function(){copytext(login.name); return false;}
        },
        {
            title: function(){return `Secret\n${login.secret?login.secret:""}`},
            func: function(){copytext(login.secret); return false;}
        },
    ]

    _5cnv.sliceobj.data = [];
    var j = 0;
    var folder = "";
    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var k = galleryobj.data[n];
        if (!k.folder)
        {
            k.folder = folder;
            continue;
        }
        
        var j = _5cnv.sliceobj.data.findIndex(function(a){
            return a.folder == k.folder;});
        if (j == -1)
            _5cnv.sliceobj.data.push(k);
        
        k.func = function()
        {
            var folder = this.folder;
            var n = galleryobj.data.findIndex(function(a){return a.folder == folder;}); 
            menuobj.hide()
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            gotoimage(n+1);
            return true;
        }
    };

    if (_5cnv.sliceobj.length() == 1)
        _5cnv.sliceobj.data = [];
    
    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var j = galleryobj.data[n];
        j.index = n;
        j.func = function()
        {
	        galleryobj.set(this.index);
            gotoimage(this.index+1)
            return true;
        };   
    };
	
    _6cnv.sliceobj.data = galleryobj.data;
    _8cnv.sliceobj.data = galleryobj.data;

    var templatelst = 
    [
        "360x360",
        "480x480",
        "640x640",
        "800x800",
        "1080x1080",
        "1280x1280",
        "1600x1600",
        "2160x2160",
        "5760x5760"
    ];

	var lst = [];
    for (var n = 0; n < templatelst.length; ++n)
	{
		var j = templatelst[n];
		var k = {};
		k.index = n;
		k.title = j;
		k.func = function()
		{
            for (var n = 0; n < IMAGELSTSIZE; ++n)
            {
                thumbfittedlst[n] = document.createElement("canvas");
                thumbimglst[n] = new Image();
            }
    
            _9cnv.sliceobj.set(this.index);
            closemenu();            
		    return true;
		}
		
		lst.push(k);
	}
	
    _9cnv.sliceobj.data = lst;
    
    var t = local.template;
    var n = 0;
    for (; n < _9cnv.sliceobj.data.length; ++n)
        if (t == _9cnv.sliceobj.data[n])
            break;
    if (n != _9cnv.sliceobj.data.length)
        _9cnv.sliceobj.set(n);

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

galleryobj.reset = function(obj)
{ 
    if (url.searchParams.has('length'))
    {
        var length = Number(url.searchParams.get('length'));
        galleryobj.data.length = length;    
    }
    
    if (!galleryobj.length())
        return;
	
    setfavicon();
    stretchobj.makerange("40-90", stretchobj.length());  
    stretchobj.set(90);
    slicewidthobj.set(SLICEWIDTH);	
    headcnv.style.pointerEvents = "none";
    menuobj.draw();
    setupmenus();

    for (var n = 0; n < IMAGELSTSIZE; ++n)
    {
        thumbfittedlst[n] = document.createElement("canvas");
        thumbimglst[n] = new Image();
    }
    
    var image = new Image();
    image.onload = function()
    {
        galleryobj.width = this.width;
        galleryobj.height = this.height;
        buttonobj.reset();
        buttonobj.init();
    
	    var hh = buttonobj.value();
	    var ww = galleryobj.height ? (hh * (galleryobj.width/galleryobj.height)) : 0;
	    var n = 0;
	    for (; n < _9cnv.sliceobj.data.length; ++n)
	        {
	            var j = _9cnv.sliceobj.data[n].title.split("x")[0];
	            if (ww <= Number(j))
	                break;    
	        }
	    
	    _9cnv.sliceobj.set(n);	  
        menuobj.set(_8cnvctx);
        menuobj.toggle(_8cnvctx);
        menuobj.show();
    };    
   
    _8cnv.timeobj.set(0);
    var k = Number(local._8);
    if (typeof k !== "undefined" && !Number.isNaN(k) && k != null)
        _8cnv.timeobj.set(k);
    var berp = _8cnv.timeobj.berp();
    var current = galleryobj.lerp(1 - berp);
    var j = galleryobj.data[current];
    if (j.entry)
        getblobpath(image, j)
    else
        image.src = imagepath(j,"5760x5760");
}

//galleryobj init
galleryobj.init = function(obj)
{
    if (obj)
        Object.assign(galleryobj, obj);
    if (Array.isArray(obj.data))
    {
	    galleryobj.reset(obj);
	    return;
    }

    fetch(obj.data)
    	.then((response) => texthandler(response))
    	.then(function(str)
    	{
    		var lst = str.split("\n");
    		var k = {}
    		galleryobj.data = [];
    		for (var n = 0; n < lst.length-1; ++n)
    		{
    			var e = {}
			    if (obj.root)
    				e.url = `${root}/${lst[n]}`;
                else
                    e.url = lst[n];
    			galleryobj.data.push(e);
    		}
    
    		galleryobj.reset();
    	})	
}

if (url.searchParams.has("search"))
{
    url.path = "search";
    var path = url.searchParams.get("search");
    fetch(`https://pexels.reportbase5836.workers.dev/?search=${path}`)
        .then((response) => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
        .catch((error) =>
        {});
}
else if (url.searchParams.has("sidney"))
{
    url.path = "sidney";
    fetch(`https://sidney.reportbase5836.workers.dev`)
        .then((response) => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
}
else if (url.searchParams.has("id"))
{
    var id = url.searchParams.get("id");
	url.path = id;
	fetch(`https://gallery.reportbase5836.workers.dev/${id}`)
	.then((response) => jsonhandler(response))
	.then(function(obj)
	{
		 fetch(obj.json)
			.then((response) => jsonhandler(response))
			.then((json) => galleryobj.init(json))   
	  })        
}
else if (url.searchParams.has("path"))
{
    var path = url.searchParams.get("path");
    url.path = path;
    if (path.isjson())
    {
         fetch(path)
	        .then((response) => jsonhandler(response))
	        .then((json) => galleryobj.init(json))        
    }
    else
    {
        var json = {};
        json.data = path;
        galleryobj.init(json)
    }
}
else
{
    url.path = "res/home.json";
    fetch(url.path)
        .then((response) => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
}

var local = {}
local.init = function()
{
    local._8 = 0;
    local.template = "";
    local.button = "";
    var k = getjson(url.path);
    if (k)
        local = k;
}

local.init();
local.set = function()
{
    clearTimeout(global.localtimout)
    global.localtimout = setTimeout(function()
    {
	    var k = {};
        k.button = buttonobj.value();
        k.template = _9cnv.sliceobj.value().title;
    	k._8 = _8cnv.timeobj.current()//"_8"
        setjson(url.path, k);
    }, 400);
}

async function getblobpath(img, slice)
{
    var blob = await slice.entry.blob(`image/${slice.ext}`);
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

function downloadtext(name, text)
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
    dialog.addEventListener("click", function(evt)
    {
        evt.preventDefault();
        if (evt.target.id == `${str}-ok`)
        {
            func();
            dialog.close();
            return false;
        }
        else
        {
            var r = dialog.getBoundingClientRect();
            var rect = new rectangle(r.x,r.y,r.width,r.height);
            if (!rect.hitest(event.x, event.y) && !dialog.clickblocked)
                dialog.close();
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
            galleryobj.rightctx.hide()
            galleryobj.leftctx.hide();
            menuobj.setindex(_8cnvctx);
            menuobj.draw();
            galleryobj.leftnv = _7cnv;
            galleryobj.leftctx = _7cnvctx;
            loadfiles(Array.from(input.files));
        };

        input.click();
    });
}

//menuobj updown
menuobj.updown = function(context, delta, divider)
{
    var canvas = context.canvas;
    canvas.autodirect = delta < 0 ? 1 : -1;
    var k = Math.abs(delta)/20;
    canvas.slideshow = (Math.PI / canvas.virtualheight) * k;
    canvas.slidereduce = canvas.slideshow / divider;
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
    //https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode
    google.accounts.id.initialize(
    {
        client_id:'866271378749-uupeiu6kqu3huchf701akl91p0tdaijr.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: "true",
        //login_hint: "reportbase@gmail.com"
    });

    google.accounts.id.renderButton(
        document.getElementById("googleLogin"),
        { theme: "outline", size: "large" }  
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
    fetch(`https://user.reportbase5836.workers.dev/${login.email}`)
        .then((response) => jsonhandler(response))
        .then(function(lst)
        {
            if (lst.length == 0)
            {
                const form = new FormData();
                form.append('name', login.name);
                form.append('email', login.email);
                fetch(`https://user.reportbase5836.workers.dev`,
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
