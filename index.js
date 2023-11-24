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
const FOOTBTNCOLOR = "rgba(0,0,0,0.6)";
const OPTIONFILL = "white";
const THUMBTRANSPARENT = "rgba(0,0,0,0.2)";
const LIGHTHUMBFILLL = "rgba(255,125,0,0.25)";
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
const SLICEWIDTH = 36;
const ZOOMAX = 92;
const IMAGELSTSIZE = 32;
const BOSS = 0;
const GALLERY = 1;
const MENU = 2;
const TIMEMAIN = 4;
const BOSSMAIN = 4;
const GALLERYMAIN = 36;
const CIRCLEIN = 19;
const CIRCLEOUT = 15;
const MULTITEXTROWHEIGHT = 24;

var panel = {};
var global = {};
let photo = {};
let util = {};
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

var templateobj = new circular_array("", templatelst);
templateobj.init = function()
{
    if (!url.searchParams.has("t"))
        return;
    
    var t = url.searchParams.get("t");
    var n = 0;
    for (; n < templateobj.length(); ++n)
        if (t == templateobj.data[n])
            break;

    if (n != templateobj.length())
        templateobj.set(n);
}

templateobj.reset = function() 
{
    var hh = buttonobj.value();
    var ww = galleryobj.height ? (hh * (galleryobj.width/galleryobj.height)) : 0;
    var n = 0;
    for (; n < templatelst.length; ++n)
        {
            var j = templatelst[n].split("x")[0];
            if (ww <= Number(j))
                break;    
        }

    for (var m = 0; m < IMAGELSTSIZE; ++m)
    {
        thumbfittedlst[m] = document.createElement("canvas");
        thumbimglst[m] = new Image();
    }         
    
    templateobj.set(n);
}

var SEAL = 6283.183;
var sealobj = new circular_array("SEAL", SEAL);
sealobj.set(SEAL/2);

var beavobj = new circular_array("BEAV", 100)
beavobj.set(64.40);

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
                    new panel.fill("rgba(0,0,0,0.8)"),
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
    name: "IMAGES",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.uploadrect = new rectangle();
        canvas.closerect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
            [
                new panel.layers(
                [
                    new panel.fill("rgba(0,0,0,0.8)"),
                    new panel.text(),
                    new panel.rectangle(canvas.closerect),
                ]),
                0,
                new panel.layers(
                [
                    new panel.fill(FOOTBTNCOLOR),
                    new panel.cols([0,0.5,0],
                    [
                        0,
                        new panel.layers(
                        [
                            new panel.rectangle(canvas.uploadrect),
                            new panel.text(),
                        ]),
                        0
                    ])                           
                ])
            ]);

        var k = galleryobj.title?galleryobj.title:"Images";
        a.draw(context, rect, 
               [
                   `\u{25C0}   ${k}`,
                   0,
                   "Upload All   \u{25B6}", 
                ], 0);
        
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
                       `Add \u{25B6}`,
                       `Edit \u{25B6}`,
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
    name: "ACCOUNT",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();     
        canvas.homerect = new rectangle();
        canvas.usereditrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
            [
                new panel.layers(
                [
                    new panel.fill("rgba(0,0,0,0.8)"),
                    new panel.text(),
                    new panel.rectangle(canvas.homerect),
                ]),
                0,
                new panel.layers(
                [
                    new panel.fill("rgba(0,0,0,0.8)"),
                    new panel.colsA([0,0,0],
                    [
                        0,
                        new panel.layers(
                        [
                            new panel.rectangle(canvas.usereditrect),
                            new panel.text(),
                        ]),
                        0,
                    ])                            
                ])
            ]);
        
        a.draw(context, rect, 
               [
                   `\u{25C0}   Account`,
                   0,
                   [
                       "",
                       "Logout",
                       "",
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
        canvas.logoutrect = new rectangle();
        var a = new panel.rowsA([ALIEXTENT,0,ALIEXTENT],
            [
                new panel.layers(
                [
                    new panel.fill("rgba(0,0,0,0.8)"),
                    new panel.text(),
                    new panel.rectangle(canvas.closerect),
                ]),
                0,
                new panel.layers(
                [
                    new panel.fill("rgba(0,0,0,0.8)"),
                    new panel.rectangle(canvas.loginrect),
                    new panel.text(),             
                ])
            ]);

        var email = login.email?login.email:"Login";
        a.draw(context, rect, 
               [
                   `\u{25C0}   ${url.host}`,
                    0,
                    `${email}   \u{25B6}`,
                ],
                0);
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
                                    window.innerWidth >= 320 ? (ALIEXTENT + 10) : -1, 
                                    ALIEXTENT, 
                                    0, 
                                    ALIEXTENT, 
                                    5],
                        [
                            0, 0, 0,
                            new panel.previous(),
                            new panel.zoom(),
                            new panel.next(),
                            0, 
                            new panel.closeboss(), 
                            0
                        ]),
                        new panel.cols([0,rainstep,0],
                        [
                                0,
                                new panel.layers(
                                [
                                    new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
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
            delete context.fullrect;
            delete context.leftmenurect;
            delete context.rightmenurect;
            var s = SAFARI ? -1: ALIEXTENT;
            var e = rect.width>=320?(ALIEXTENT+10):-1;
            var a = new panel.rows([BEXTENT, 0],
                [
                    new panel.cols(
                    [5, ALIEXTENT, 0, s, e, ALIEXTENT, 0, ALIEXTENT, 5],
                    [
                        0,
                        new panel.leftmenu(),
                        0,
                        g ? new panel.fullscreen() : 0,
                        g ? new panel.zoom() : 0,
                        g ? new panel.fitwidth() : 0,
                        0,
                        new panel.rightmenu(),
                        0,
                    ]),
                    0
                ]);
            
            a.draw(context, rect, 0, 0);
            context.restore();        
    }
},
{
    name: "BUTTON",
    draw: function(context, rect, user, time)
    {
            var canvas = context.canvas;
            context.clear();
            context.save();
            var ctx = menuobj.value();
            var g = ctx == _8cnvctx;
            delete context.zoomrect;
            delete context.fitwidthrect;
            delete context.fullrect;
            delete context.leftmenurect;
            delete context.rightmenurect;
            var s = SAFARI ? -1: ALIEXTENT;
            var e = rect.width>=320?(ALIEXTENT+10):-1;
            var a = new panel.rows([BEXTENT, 0],
                [
                    new panel.cols(
                    [5, ALIEXTENT, 0, s, e, ALIEXTENT, 0, ALIEXTENT, 5],
                    [
                        0,
                        0,
                        0,
                        g ? new panel.fullscreen() : 0,
                        g ? new panel.zoom() : 0,
                        g ? new panel.fitwidth() : 0,
                        0,
                        new panel.closeboss(),
                        0,
                    ]),
                    0
                ]);
            
            a.draw(context, rect, 0, 0);
            context.restore();        
    }
}
]

var headobj = new circular_array("HEAD", headlst);

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
            //data.push(`${canvas.timeobj.current().toFixed(FIXEDTIME)} of ${canvas.timeobj.length()}`);
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
                            new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
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
                        new panel.rounded(NUBACK, 0, TRANSPARENT, 8, 8),
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
                        new panel.rounded(NUBACK, 0, TRANSPARENT, 8, 8),
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
                            new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
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
},
    
{
    name: "STORAGE",
    title: "Storage",
    draw: function(context, rect, user, time)
    {
        if (!photo.image || !photo.image.width)
            return;
        var canvas = context.canvas
        var data = [];
        context.downloadimagerect = new rectangle();
        context.uploadimagerect = new rectangle();
        context.deleteimagerect = new rectangle();
        var data = [];
        
        var b = 360;
        if (b > rect.width-40)
            b = rect.width-40;

        data.push("Image");
        data.push(`${galleryobj.current()+1} of ${galleryobj.length()}`);
        data.push(" ");
        
        data.push("ID");
        data.push(galleryobj.value().id?galleryobj.value().id:"Undefined");
        data.push(" ");
        
        var mp = (photo.image.width * photo.image.height) / 1000000;
        data.push("Size");
        data.push(`${mp.toFixed(2)} MP`);
        data.push(" ");
        
        data.push("Width");
        data.push(`${photo.image.width}`);
        data.push(" ");

        data.push("Height");
        data.push(`${photo.image.height}`);
        data.push(" ");

        var j = data.length*25;
        if (j > rect.height-HEADTOP-ALIEXTENT-ALIEXTENT-FOOTHEIGHT)
            j = rect.height-HEADTOP-ALIEXTENT-ALIEXTENT-FOOTHEIGHT;
        
        var a = new panel.layers(
        [
            0,
            new panel.rowsA([HEADTOP,ALIEXTENT,j,0,ALIEXTENT,FOOTHEIGHT],
            [
                0,
                0,
                new panel.cols([0,b,0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.rectangle(context.hollyrect),
                        //new panel.rectangle(context.copyidrect),
                        new panel.multitext(0, new panel.shadow(new panel.text())),
                    ]),
                    0,
                ]),
                0,
                0,
                new panel.colsA([0,BETHWIDTH,BETHCIDTH,BETHWIDTH,0],
                [
                    0,
                    new panel.layers(
                    [
                        new panel.fill(FOOTBTNCOLOR),
                        new panel.rectangle(context.uploadimagerect),
                        new panel.shadow(new panel.text()),
                    ]),
                    new panel.layers(
                    [
                        new panel.fill(FOOTBTNCOLOR),
                        new panel.rectangle(context.downloadimagerect),
                        new panel.shadow(new panel.text()),
                    ]),
                    new panel.layers(
                    [
                        new panel.fill(FOOTBTNCOLOR),
                        new panel.rectangle(context.deleteimagerect),
                        new panel.shadow(new panel.text()),
                    ]),
                    0,
                ]),
            ])
        ])
        
        a.draw(context, rect, 
        [
           0,
           0,
           data,
           0,
           0,
           [
               0,
               "Upload",
               "Download",
               "Delete",
               0
            ]
        ], 0)        
    }
},    

];

var bossdisplayobj = new circular_array("", bossdisplaylst);

var displaylst = 
[
{
    name: "BUTTON",
    draw: function(context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();
        var hollyobj = canvas.hollyobj;
        canvas.buttonrect = new rectangle();
        canvas.templaterect = new rectangle();
        context.buttonmenurect = new rectangle();
        context.templatemenurect = new rectangle();
        if (!headcnv.height)
            return;
        var bh = rect.height * 0.4;
        var a = new panel.cols([SCROLLMARGIN, SCROLLEXTENT, 0],
            [
                0,
                new panel.rows([0, bh, 0],
                    [
                        0,
                        new panel.layers(
                            [
                                new panel.rounded(NUBACK, 0, TRANSPARENT, 8, 8),
                                new panel.expand(new panel.rectangle(canvas.buttonrect), 20, 0),
                                new panel.shrink(new panel.currentV(new panel.rounded("white", 0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3),
                            ]),
                        0,
                    ]),
                0
            ]);

        a.draw(context, rect, buttonobj, 0); 
        const rainstep = Math.min(420,window.innerWidth-60);
        var a = new panel.rows([0, SCROLLEXTENT, SCROLLMARGIN],
            [
                0,
                new panel.cols([0, rainstep, 0],
                    [
                        0,
                        new panel.layers(
                            [
                                new panel.rounded(NUBACK, 0, TRANSPARENT, 8, 8),
                                new panel.expand(new panel.rectangle(canvas.templaterect), 0, 20),
                                new panel.shrink(new panel.currentH(
                                    new panel.rounded("white", 0, TRANSPARENT, 5, 5), ALIEXTENT, 0), 3, 3)
                            ]),
                        0,
                    ])
            ])

        a.draw(context, rect, templateobj, 0);

        var w = Math.min(360, rect.width - 100);
        var data = [];
        var hh = buttonobj.value();
        var ww = galleryobj.height ? (hh * (galleryobj.width/galleryobj.height)).toFixed(0) : '000';
        var st = `\u{25C0}    ${ww} x ${hh.toFixed(0)}    \u{25B6}`;
        data.push(`\u{25C0}    ${templateobj.value()}    \u{25B6}`);
        var a = new panel.rowsA([HEADTOP, HEADBOT, 23, 0, (data.length*WRAPROWHEIGHT), 
                                 FOOTSEP, SCROLLEXTENT, SCROLLMARGIN],
        [
            0,    
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
                    new panel.expand(new panel.rectangle(context.buttonmenurect), 10, 10),
                    new panel.shrink(new panel.text(), 10, 10),
                ]),
                0
            ]), 
            0,
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
                    new panel.expand(new panel.rectangle(context.templatemenurect), 10, 10),
                    new panel.gridA(1, data.length, 1, 
                            new panel.shrink(new panel.text(), 10, 10)),
                ]),
                0,
            ]),
            0,
            0,
            0,
        ]);

        a.draw(context, rect, 
        [
            0,
            st,
            "",
            0,
            data,
            0,
            0,
            0
        ], 0);      
        context.restore();
    }
},
{
    name: "GALLERY",
    draw: function(context, rect, user, time)
    {    
        var canvas = context.canvas;
        context.save();
        canvas.vscrollrect = new rectangle();
        canvas.hollyrect = new rectangle();
        context.folderect = new rectangle();
        context.cursorect = new rectangle();
        if (!headcnv.height)
            return;        
        var bh = rect.height * 0.4;
        const rainstep = Math.min(420,window.innerWidth-60);
        var a = new panel.cols([0, SCROLLEXTENT, SCROLLMARGIN],
            [
                0,
                new panel.rows([0, bh, 0],
                    [
                        0,
                        new panel.layers(
                            [
                                new panel.rounded(NUBACK, 0, TRANSPARENT, 8, 8),
                                new panel.expand(new panel.rectangle(canvas.vscrollrect), 20, 0),
                                new panel.shrink(new panel.currentV(new panel.rounded("white", 0, TRANSPARENT, 5, 5), ALIEXTENT, 1), 3, 3),
                            ]),
                        0,
                    ]),
                0
            ]);

        a.draw(context, rect, context.canvas.timeobj, 0);
        
        var a = new panel.rows([0, SCROLLEXTENT, 6],
            [
                0,
                new panel.cols([0, rainstep, 0],
                    [
                        0,
                        new panel.layers(
                            [
                                new panel.rounded(NUBACK, 0, TRANSPARENT, 8, 8),
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
        var a = new panel.rowsA([80, 40, 0, 
                folders.length?folders.length*WRAPROWHEIGHT:-1, 
                10, data.length*WRAPROWHEIGHT, FOOTSEP, SCROLLEXTENT, SCROLLMARGIN],
        [
            0,
            0,
            0,
            new panel.cols([0, rainstep, 0],
            [
                0,
                new panel.layers(
                    [
                        new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
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
                            new panel.rounded(NUBACK, 0, TRANSPARENT, 12, 12),
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
        canvas.vscrollrect = new rectangle();
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
    if (!url.searchParams.has("b"))
        return;
    
    var b = Number(url.searchParams.get("b"));
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
    var gheight = window.innerHeight/2;
    if (h < gheight)
        gheight = h;
    var dheight = Math.floor(window.innerWidth / a) - gheight;
    if (dheight < 0)
        dheight = 0;
    var bheight = h*6;
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
        context.fullrect = new rectangle()
        var a = new panel.layers(
            [
                new panel.rectangle(context.fullrect),
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

panel.open = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        
        var Panel = function()
        {
            this.draw = function(context, rect, user, time)
            {
                context.save();
                var w = rect.width;
                var h = rect.height;
                var a = new panel.arrow(ARROWFILL, 180);
                a.draw(context, rect, user, time);
                var a = new panel.fill(ARROWFILL);
                var r = new rectangle(rect.x + rect.width / 2 - 3, rect.y - rect.height / 2 + 1, 6, 10);
                a.draw(context, r, user, time);
                var r = new rectangle(rect.x, rect.y + rect.height + 3, rect.width, 3);
                a.draw(context, r, user, time);
                context.restore();
            }
        };

        var a = new panel.layers(
            [
                new panel.shrink(new panel.circle(SCROLLNAB, SEARCHFRAME, 4), 15, 15),
                new panel.shrink(new Panel(), 20, 34),
            ]);

        a.draw(context, rect, user, time);
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

panel.rightmenu = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        if (menuobj.value() == _8cnvctx ||
            menuobj.value() != galleryobj.leftctx)
        {
            context.rightmenurect = new rectangle();
            var s = menuobj.value() == galleryobj.rightctx;
            var j = 5;
            var k = j / 2;
            var e = new panel.fill(OPTIONFILL);
            var a = new panel.layers(
                [
                    new panel.rectangle(context.rightmenurect),
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

panel.previous = function()
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

panel.next = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        context.movenext = new rectangle()
        var a = new panel.layers(
            [
                new panel.rectangle(context.movenext),
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

function rectangle(x, y, w, h, user)
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
    headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
    delete photo.image;
    contextobj.reset();
}

CanvasRenderingContext2D.prototype.hide = function()
{
    if (this.canvas.height == 0)
        return;
    this.canvas.height = 0;
};

CanvasRenderingContext2D.prototype.savetime = function()
{
    var canvas = this.canvas;
    clearTimeout(this.savetimeout);
    this.savetimeout = setTimeout(function()
        {
            var e = url.searchParams.get('_8');
            if (e != _8cnv.timeobj.current().toFixed(5))
            {
                var k = _8cnv.timeobj.current();
                if (typeof k !== "undefined" && !Number.isNaN(k) && k != null)
                    url.searchParams.set('_8', k.toFixed(5));
                url.searchParams.set("t",templateobj.value());
                url.searchParams.set("b",buttonobj.value());
                window.history.replaceState("", url.origin, url);
            }
      }, 1000)
}

CanvasRenderingContext2D.prototype.refresh = function()
{
    var context = this;
    clearInterval(global.swipetimeout);
    global.swipetimeout = setInterval(function()
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
        //if (Math.abs(deltax) <= 1 && Math.abs(deltay) <= 1)
        //    return;
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
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad) {},
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad) {},
},
{
    name: "GALLERY",
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        var canvas = context.canvas;
        context.canvas.slideshow = 0;

        if (ctrl)
        {
            var k = headlst.findIndex(function(a){return a.name == "BUTTON"});
            if (headham.panel != headlst[k])
            {
                headham.panel = headlst[k];
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);     
            }
            
            var k = displaylst.findIndex(function(a){return a.name == "BUTTON"});
            if (displaylst[k] != displayobj.value()) 
                displayobj.set(k);
        
            var j = buttonobj.length()/20;
            context.canvas.pinching = 1;
            var k = delta < 0 ? 1 : -1;
            var e = k*j;
            if (!context.elst)
                context.elst = [];
            context.elst.push(delta);
            if (!(context.elst.length % 5))
            {
                buttonobj.add(e);
                menuobj.draw();
            }
            
            context.canvas.pinching = 0;
        }
        else if (canvas.buttonrect &&
            canvas.buttonrect.hitest(x, y))
        {
            buttonobj.addperc(-1 * delta * 0.001);
            menuobj.draw();
        }
        else
        {
            if (Math.abs(delta) > 320)
            {
                headcnvctx.show(0, 0, window.innerWidth, 0);
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            }
            
            clearInterval(context.canvas.leftright)
            menuobj.updown(context, delta)
            menuobj.draw();
            if (global.swipetimeout)
                return;            
            global.swipetimeout = setInterval(function()
            {
                context.canvas.lastime = -0.0000000000101010101;
                menuobj.draw();
            }, GALLERYMAIN);
        }
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        if (SAFARI || FIREFOX)
        {
            context.canvas.hollyobj.addperc(delta / 2000);
            menuobj.draw();
        }
        else
        {
            galleryobj.leftright(context, delta);
        }
    },
},
{
    name: "MENU",
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        if (ctrl)
            return;
        menuobj.updown(context, delta);
        if (global.swipetimeout)
            return;            
        global.swipetimeout = setInterval(function()
        {
            context.canvas.lastime = -0.0000000000101010101;
            menuobj.draw();
        }, GALLERYMAIN);
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, trackpad)
    {
        context.canvas.hollyobj.addperc(delta / 1000);
        menuobj.draw();
    },
},
{
    name: "BOSS",
    updown: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    {
        var canvas = context.canvas;
        if (ctrl)
        {
            var isthumb = context.canvas.thumbrect &&
                context.canvas.thumbrect.hitest(x, y);
            if (isthumb)
            {
                heightobj.addperc(type == "wheelup" ? 0.02 : -0.02);
                bossobj.draw();
            }
            else
            {
                zoomobj.addperc(type == "wheelup" ? 0.025 : -0.025);
                contextobj.reset()
            }
        }
        else if (context.zoomrect &&
            context.zoomrect.hitest(x, y))
        {
            zoomobj.addperc(delta/500);
            contextobj.reset()
        }
        else if (0 && context.hollyrect &&
            context.hollyrect.hitest(x, y))
        {
            var hollyobj = context.canvas.hollyobj;
            hollyobj.addperc(delta/500);
            bossobj.draw();
        }
        else if (context.stretchrect &&
            context.stretchrect.hitest(x, y))
        {
            stretchobj.addperc(delta/500);
            bossobj.draw();
        }
        else
        {
            rowobj.addperc(delta/1000);
            contextobj.reset()
        }
    },
    leftright: function(context, x, y, delta, ctrl, shift, alt, type, trackpad)
    { 
        if (context.hollyrect &&
            context.hollyrect.hitest(x, y))
        {
            var hollyobj = context.canvas.hollyobj;
            hollyobj.addperc(delta/500);
            bossobj.draw();
        }
        else
        {
            var k = _4cnv.timeobj.length();
            var j = k*(-delta/5000);
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
        var k = headlst.findIndex(function(a){return a.name == "BUTTON"});
        headham.panel = headlst[k];
        headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);     
        var k = displaylst.findIndex(function(a){return a.name == "BUTTON"});
        displayobj.set(k);
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
    galleryobj.title = "";
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
    galleryobj.width = 0;
    galleryobj.height = 0;
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

var droplst = 
[
{
    name: "DEFAULT",
    drop: function(context, evt)
    {
        if (menuobj.value() && menuobj.value() != _8cnvctx)
            return;
        galleryobj.boss = 1;
        var files = evt.dataTransfer.files;
        delete galleryobj.datalength;
        if (files.length == 1 && files[0].name)
        {
            if (files[0].name.isimage())
            {
                loadimages(files);
            }
            else if (files[0].name.iszip())
            {
                loadzip(files[0]);
            }
            else if (files[0].name.isjson())
            {
                loadjson(files[0]);
            }
        }
        else
        {
            loadimages(files);
        }
    },
}, ];

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
        if (canvas.pinching)
            return;

        var canvas = context.canvas;
        var obj = canvas.hollyobj;
        
        if (type == "panleft" || type == "panright")
        {
            if (canvas.isbuttonrect)
            {
            }   
            else if (canvas.issealrect)
            {
                var k = (x - canvas.sealrect.x) / canvas.sealrect.width;
                sealobj.setperc(k);
                menuobj.draw();
            }
            else if (canvas.ishollyrect)
            {
                var k = (x - canvas.hollyrect.x) / canvas.hollyrect.width;
                context.canvas.hollyobj.setperc(k);
                menuobj.draw();
            }
            else if (canvas.istemplaterect)
            {
                for (var n = 0; n < IMAGELSTSIZE; ++n)
                {
                    thumbfittedlst[n] = document.createElement("canvas");
                    thumbimglst[n] = new Image();
                }                
          
                var k = (x - canvas.templaterect.x) / canvas.templaterect.width;
                templateobj.setperc(k);
                buttonobj.reset();
                menuobj.draw();
            }
            else
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
        }
        else if (type == "panup" || type == "pandown")
        {
            if (canvas.isvscrollrect)
            {
                var k = (y - canvas.vscrollrect.y) / canvas.vscrollrect.height;
                canvas.timeobj.setperc(1-k);
            }
            else if (canvas.isbeavrect)
            {
                var k = (y - canvas.beavrect.y) / canvas.beavrect.height;
                beavobj.setperc(1-k);
                menuobj.draw();
            }
            else if (canvas.isbuttonrect)
            {
                var k = (y - canvas.buttonrect.y) / canvas.buttonrect.height;
                buttonobj.setperc(k);
            }
            else
            {
                var e = canvas.starty - y;
                var k = sealobj.value() / canvas.virtualheight
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
        canvas.istemplaterect = canvas.templaterect && canvas.templaterect.hitest(x, y);
        canvas.isbuttonrect = canvas.buttonrect && canvas.buttonrect.hitest(x, y);
        canvas.isvscrollrect = canvas.vscrollrect && canvas.vscrollrect.hitest(x, y);
        canvas.ishollyrect = canvas.hollyrect && canvas.hollyrect.hitest(x, y);
        canvas.isbeavrect = canvas.beavrect && canvas.beavrect.hitest(x, y);
        canvas.issealrect = canvas.sealrect && canvas.sealrect.hitest(x, y);
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
        delete canvas.istemplaterect;
        delete canvas.isbuttonrect;
        delete canvas.isvscrollrect;
        delete canvas.ishollyrect;
        delete canvas.isbeavrect;
        delete canvas.issealrect;
    }
},
{
    name: "MENU",
    updown: function(context, rect, x, y, type) {},
    leftright: function(context, rect, x, y, type) {},

    pan: function(context, rect, x, y, type)
    {
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
            var canvas = context.canvas;
            if (canvas.ishollyrect)
            {
                var obj = canvas.timeobj;
                var k = (y - canvas.hollyrect.y) / canvas.hollyrect.height;
                obj.setperc(1 - k);
                menuobj.draw();
            }
            else if (canvas.isvscrollrect)
            {
                var obj = canvas.hollyobj;
                var k = (y - canvas.vscrollrect.y) / canvas.vscrollrect.height;
                obj.setperc(k);
                menuobj.draw();
            }
            else
            {
                var e = canvas.starty - y;
                var jvalue = sealobj.value() / canvas.virtualheight
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
        canvas.isvscrollrect = canvas.vscrollrect && canvas.vscrollrect.hitest(x, y);
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
                var k = sealobj.value() / canvas.virtualwidth
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
            else if (context.isgalleryrect)
            {
                var k = (y - context.galleryrect.y) / context.galleryrect.height;
                var j = Math.floor(Math.lerp(0,galleryobj.length()-1,k));
                galleryobj.set(j);
                context.pangallery = 1;
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
        headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        context.isgalleryrect = context.galleryrect && context.galleryrect.hitest(x, y);
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
        delete photo.image;
        delete canvas.hollyobj.offset;
        if (context.pangallery)
            contextobj.reset();
        delete context.pangallery; 
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
    press: function(context, rect, x, y) {}
},
{
    name: "MENU",
    pressup: function(context, rect, x, y) {},
    press: function(context, rect, x, y) {}
},
{
    name: "BOSS",
    pressup: function(context, rect, x, y)
    {
   },
    press: function(context, rect, x, y) {}
}, 
];

var pressobj = new circular_array("PRESS", presslst);
pressobj.set(3);

function gotoimage(n)
{
    n = util.clamp(0, n, n);
    var k = 1-(n/galleryobj.length())
    var j = k*sealobj.value()
    _8cnv.timeobj.set(j);
    
    var k = sealobj.value() / galleryobj.length() / 2;
    _8cnv.timeobj.CURRENT += k;
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
        galleryobj.leftright(context, k * context.canvas.speed);
    },
    swipeupdown: function(context, rect, x, y, evt)
    {
        if (evt.type == context.lastswipe)
            return;

        headcnvctx.show(0, 0, window.innerWidth, 0);
        headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        
        var k = evt.type == "swipeup" ? 1 : -1;
        menuobj.updown(context, k * context.canvas.speed);
        if (!global.swipetimeout)
            global.swipetimeout = setInterval(function()
            {
                context.canvas.lastime = -0.0000000000101010101;
                menuobj.draw();
            }, GALLERYMAIN);
    },
},
{
    name: "MENU",
    swipeleftright: function(context, rect, x, y, evt) {},
    swipeupdown: function(context, rect, x, y, evt)
    {
        var k = evt.type == "swipeup" ? 1 : -1;
        menuobj.updown(context, k * context.canvas.speed);
    },
}, ];

var swipeobj = new circular_array("SWIPE", swipelst);
swipeobj.set(3);

var keylst = [
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
            canvas.keydown = 0;
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
            canvas.keydown = 1;

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
                menuobj.updown(context, -120)
                if (global.swipetimeout)
                    return;            
                global.swipetimeout = setInterval(function()
                {
                    context.canvas.lastime = -0.0000000000101010101;
                    menuobj.draw();
                }, GALLERYMAIN);
                evt.preventDefault();
            }
            else if (
                key == "arrowdown" ||
                key == "j")
            {
                menuobj.updown(context, 120)
                if (global.swipetimeout)
                    return;            
                global.swipetimeout = setInterval(function()
                {
                    context.canvas.lastime = -0.0000000000101010101;
                    menuobj.draw();
                }, GALLERYMAIN);
                evt.preventDefault();
            }
            else if (key == " ")
            {
                menuobj.updown(context, canvas.shiftKey?-360:360)
                if (global.swipetimeout)
                    return;            
                global.swipetimeout = setInterval(function()
                {
                    context.canvas.lastime = -0.0000000000101010101;
                    menuobj.draw();
                }, GALLERYMAIN);
                evt.preventDefault();
            }                
            else if (key == "\\" || key == "/" || key == "tab")
            {
                var h = headcnv.height ? 0 : HEADHEIGHT;
                headcnvctx.show(0, 0, window.innerWidth, h);
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
                menuobj.draw()
                evt.preventDefault();
            }
            else if (key == "-" || key == "[")
            {
                var k = displaylst.findIndex(function(a){return a.name == "BUTTON"});
                displayobj.set(k);
                buttonobj.addperc(-1.0 / 100);
                menuobj.draw()
                evt.preventDefault();
            }
            else if (key == "+" || key == "]" || key == "=")
            {
                var k = displaylst.findIndex(function(a){return a.name == "BUTTON"});
                displayobj.set(k);
                buttonobj.addperc(1.0 / 100);
                menuobj.draw()
                evt.preventDefault();
            }
            else if (
                key == "arrowleft" ||
                key == "h")
            {
                evt.preventDefault();
                galleryobj.leftright(context, -canvas.speed / 2)
            }
            else if (
                key == "arrowright" ||
                key == "l")
            {
                evt.preventDefault();
                galleryobj.leftright(context, canvas.speed / 2)
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
                menuobj.updown(context, -60)
                if (global.swipetimeout)
                    return;            
                global.swipetimeout = setInterval(function(){
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
                menuobj.updown(context, 60)
                if (global.swipetimeout)
                    return;            
                global.swipetimeout = setInterval(function(){
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
                var k = _4cnv.timeobj.length();
                var j = k*(1/50);
                _4cnv.timeobj.CURRENT += j;
                bossobj.draw()
            }
            else if (
                key == "arrowright" ||
                key == "l")
            {
                var k = _4cnv.timeobj.length();
                var j = k*(-1/50);
                _4cnv.timeobj.CURRENT += j;
                bossobj.draw() 
            }
            else if (key == "/" || key == "\\" || key == "tab")
            {
                var h = headcnv.height ? 0 : HEADHEIGHT;
                headcnvctx.show(0, 0, window.innerWidth, h);
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
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
        var m = (1 - b) * sealobj.value();
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
        headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);

        if (headcnvctx.moveprev && headcnvctx.moveprev.hitest(x, y))
        {
            _4cnvctx.movepage(-1);
        }
        else if (headcnvctx.movenext && headcnvctx.movenext.hitest(x, y))
        {
            _4cnvctx.movepage(1);
        }
        else if (context.uploadimagerect && context.uploadimagerect.hitest(x, y))
        {
                
        }
        else if (context.deleteimagerect && context.deleteimagerect.hitest(x, y))
        {
        }
        else if (context.downloadimagerect && context.downloadimagerect.hitest(x, y))
        {
            if (galleryobj.value().blob)
            {
                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(galleryobj.value().blob);
                anchor.download = galleryobj.value().name;
                anchor.click();
                URL.revokeObjectURL(anchor.href);
                anchor.remove();
            }
            else
            {
                var id = galleryobj.value().id;
                var path = `https://image.reportbase5836.workers.dev/image/${id}/blob`;
                if (galleryobj.value().full)
                    path = galleryobj.value().full;
                else if (!id && galleryobj.value().url)
                    path = galleryobj.value().url;
                const anchor = document.createElement('a');
                anchor.href = path;
                anchor.download = id;
                anchor.click();
                URL.revokeObjectURL(anchor.href);
                anchor.remove();
            }
        }
        else if (context.copyidrect && context.copyidrect.hitest(x, y))
        {
             copytext(galleryobj.value().id);   
        }
        else if (
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
            bossobj.draw();
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
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            bossobj.draw();
        }
        else if (
            headcnvctx.closebossrect &&
            headcnvctx.closebossrect.hitest(x, y))
        {
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
            headham.panel = headlst[k];
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (
            headcnvctx.bossdisplayrect &&
            headcnvctx.bossdisplayrect.hitest(x, y))
        {
            delete context.canvas.thumbrect;
            context.nostretchcolumn = 0;
            var k = (x - headcnvctx.bossdisplayrect.x) / headcnvctx.bossdisplayrect.width;
            bossdisplayobj.rotate(k < 0.5 ? -1 : 1);
            contextobj.reset();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (
            context.pagerect &&
            context.pagerect.hitest(x, y))
        {
            var k = (x - context.pagerect.x) / context.pagerect.width;
            context.movepage(k < 0.5 ? -1 : 1);
        }    
        else
        {
            var h = headcnv.height ? 0 : HEADHEIGHT;
            headcnvctx.show(0, 0, window.innerWidth, h);
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
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
        context.refresh();
        var k = displaylst.findIndex(function(a){
            return a.name == "BUTTON"});
        var button = displaylst[k] 
        
        if (headcnvctx.leftmenurect && headcnvctx.leftmenurect.hitest(x, y))
        {
            galleryobj.set(_8cnv.lastcurrent)
            galleryobj.rightctx.hide()
            if (menuobj.value() == galleryobj.leftctx)
            {
                galleryobj.leftctx.hide();
                galleryobj.rightctx.hide();
                galleryobj.leftcnv = _7cnv;
                galleryobj.leftctx = _7cnvctx;
                menuobj.setindex(_8cnvctx);
            }
            else
            {
                menuobj.setindex(galleryobj.leftctx);
            }

            var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
            displayobj.set(k);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (
            (headcnvctx.rightmenurect &&
            headcnvctx.rightmenurect.hitest(x, y)))
        {
            galleryobj.set(_8cnv.lastcurrent)
            galleryobj.leftctx.hide()
            if (menuobj.value() == galleryobj.rightctx)
            {
                galleryobj.leftctx.hide();
                galleryobj.rightctx.hide();
                galleryobj.leftcnv = _7cnv;
                galleryobj.leftctx = _7cnvctx;
                menuobj.setindex(_8cnvctx);
            }
            else
            {
                menuobj.setindex(galleryobj.rightctx);
            }

            var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
            displayobj.set(k);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (
            headcnvctx.closebossrect &&
            headcnvctx.closebossrect.hitest(x, y))
        {
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
            headham.panel = headlst[k];
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (
            context.buttonmenurect &&
            context.buttonmenurect.hitest(x, y))
        {
            var k = (x - context.buttonmenurect.x) / context.buttonmenurect.width;
            buttonobj.addperc(k < 0.5 ? -0.025 : 0.025);
            menuobj.draw();
        }
        else if (
            context.templatemenurect &&
            context.templatemenurect.hitest(x, y))
        {
             for (var n = 0; n < IMAGELSTSIZE; ++n)
            {
                thumbfittedlst[n] = document.createElement("canvas");
                thumbimglst[n] = new Image();
            }      
            
            var k = (x - context.templatemenurect.x) / context.templatemenurect.width;
            templateobj.add(k < 0.5 ? -1 : 1);
            buttonobj.reset();
            menuobj.draw();            
        }
        else if (
            context.folderect &&
            context.folderect.hitest(x, y))
        {
            galleryobj.leftcnv = _5cnv;
            galleryobj.leftctx = _5cnvctx;
            menuobj.setindex(galleryobj.leftctx);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (
            context.cursorect &&
            context.cursorect.hitest(x, y))
        {
            var k = (x - context.cursorect.x) / context.cursorect.width;
            var j = canvas.timeobj.length() / galleryobj.length();
            canvas.timeobj.rotate(k < 0.5 ? j :-j);
            menuobj.draw();    
        }
        else if (
            headcnvctx.fitwidthrect &&
            headcnvctx.fitwidthrect.hitest(x, y))
        {
            buttonobj.reset();
            templateobj.reset();
            _8cnv.fitflash = 1;
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            setTimeout(function()
            {
                _8cnv.fitflash = 0;
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            }, 400);
        
            menuobj.draw();
        }
        else if (
            canvas.buttonrect &&
            canvas.buttonrect.hitest(x, y))
        {
            var k = (y - canvas.buttonrect.y) / canvas.buttonrect.height;
            buttonobj.setperc(k);
            menuobj.draw()              
        }
        else if (
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
            headcnvctx.fullrect &&
            headcnvctx.fullrect.hitest(x, y))
        {
            screenfull.toggle()
        }
        else if (canvas.vscrollrect && canvas.vscrollrect.hitest(x, y))
        {
            var k = (y - canvas.vscrollrect.y) / canvas.vscrollrect.height;
            canvas.timeobj.setperc(1 - k);
            menuobj.draw()
        }
        else if (canvas.templaterect && canvas.templaterect.hitest(x, y))
        {
            for (var n = 0; n < IMAGELSTSIZE; ++n)
            {
                thumbfittedlst[n] = document.createElement("canvas");
                thumbimglst[n] = new Image();
            }                
           
            var k = (x - canvas.templaterect.x) / canvas.templaterect.width;
            var j = Math.lerp(0,templateobj.length()-1,k);
            templateobj.set(Math.round(j));
            buttonobj.reset();
            menuobj.draw()
        }
        else if (canvas.hollyrect && canvas.hollyrect.hitest(x, y))
        {
            var k = (x - canvas.hollyrect.x) / canvas.hollyrect.width;
            context.canvas.hollyobj.setperc(k);
            menuobj.draw()
        }
        else if (headcnv.height && displayobj.value() == button)
        {
            headobj.reset();
            menuobj.draw();
        }
        else if (menuobj.value() && menuobj.value() != _8cnvctx)
        {
            galleryobj.set(_8cnv.lastcurrent)
            galleryobj.leftctx.hide()
            galleryobj.rightctx.hide();
            galleryobj.leftcnv = _7cnv;
            galleryobj.leftctx = _7cnvctx;
            menuobj.setindex(_8cnvctx);
            var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
            displayobj.set(k);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (!headcnv.height)
        {
            headobj.reset();
            menuobj.draw();
        }
        else if (!galleryobj.noboss)
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
            var slice = canvas.sliceobj.data[n];
            slice.tap = 1;
            menuobj.draw();
            setTimeout(function()
            {
                slice.tap = 0;
                galleryobj.set(n);
                var k = headlst.findIndex(function(a){return a.name == "BOSS"});
                headham.panel = headlst[k];
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
                delete photo.image;
                menuobj.hide();
                contextobj.reset();
            }, 200);
        }
    },
},
{
    name: "MENU",
    tap: function(context, rect, x, y)
    {
        var canvas = context.canvas;   
        if (headcnvctx.leftmenurect && 
            headcnvctx.leftmenurect.hitest(x, y))
        {
            galleryobj.set(_8cnv.lastcurrent)
            galleryobj.rightctx.hide()
            if (menuobj.value() == galleryobj.leftctx)
            {
                galleryobj.leftctx.hide();
                menuobj.setindex(_8cnvctx);
                menuobj.draw();
                galleryobj.leftnv = _7cnv;
                galleryobj.leftctx = _7cnvctx;
            }
            else
            {
                menuobj.setindex(galleryobj.leftctx);
                menuobj.show();
            }

            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            return true;
        }
        else if (
            headcnvctx.rightmenurect &&
            headcnvctx.rightmenurect.hitest(x, y))
        {
            galleryobj.leftctx.hide()
            if (menuobj.value() == galleryobj.rightctx)
            {
                galleryobj.rightctx.hide();
                menuobj.setindex(_8cnvctx);
                menuobj.draw();
            }
            else
            {
                menuobj.setindex(galleryobj.rightctx);
                menuobj.show();
            }

            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            return true;
        }
        else if (canvas.gallerypatchrect && canvas.gallerypatchrect.hitest(x, y))
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
        else if (canvas.galleryopenrect && canvas.galleryopenrect.hitest(x, y))
        {
           for (var n = 0; n < IMAGELSTSIZE; ++n)
            {
                thumbfittedlst[n] = document.createElement("canvas");
                thumbimglst[n] = new Image();
            }

            var gallery = _2cnv.sliceobj.value();
            url.searchParams.set("id",gallery.id);
            window.history.replaceState("", url.origin, url); 
            url = new URL(window.location.href);
            url.path = gallery.id;
            fetch(gallery.json)
                .then((response) => jsonhandler(response))
                .then((obj) => galleryobj.init(obj))
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
                .catch(error => console.log(error));                
            })
        }
        else if (canvas.loginrect && canvas.loginrect.hitest(x, y))
        {  
            googlelogin();
            return true;
        }
        else if (canvas.logoutrect && canvas.logoutrect.hitest(x, y))
        {
            google.accounts.id.revoke(login.credential, handleRevokedSession);
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
            galleryobj.leftctx.hide();
            galleryobj.rightctx.hide();
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            galleryobj.leftnv = _7cnv;
            galleryobj.leftctx = _7cnvctx;
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
           return false;
        }
        else if (canvas.homerect && canvas.homerect.hitest(x, y))
        {
            galleryobj.leftctx.hide();
            galleryobj.rightctx.hide();
            galleryobj.leftcnv = _7cnv;
            galleryobj.leftctx = _7cnvctx;
            menuobj.setindex(galleryobj.leftctx);
            menuobj.show();
            return false;
        }
        else if (canvas.vscrollrect &&
            canvas.vscrollrect.hitest(x, y))
        {
            var k = (y - canvas.vscrollrect.y) / canvas.vscrollrect.height;
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
            context.refresh();
                
            setTimeout(function()
            {
                delete slice.tap;
                menuobj.draw();
                if (!slice.func(n, x, y))
                    return;
                
                galleryobj.leftctx.hide();
                galleryobj.rightctx.hide();
                menuobj.setindex(_8cnvctx);
                menuobj.show();
                galleryobj.leftnv = _7cnv;
                galleryobj.leftctx = _7cnvctx;
                headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
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

    if (canvas.lastime == canvas.timeobj.current())
        return;
    else
        canvas.lastime = canvas.timeobj.current();

    var stretch = stretchobj;
    var virtualpinch = _4cnv.virtualwidth * (stretch.value() / 100);
    var colwidth = _4cnv.colwidth;
    var virtualeft = (virtualpinch - rect.width) / 2;
    var j = (colwidth / (colwidth + _4cnv.virtualwidth)) * sealobj.value();
    var time = (canvas.timeobj.value() + j) / 1000;

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
    delete context.downloadimagerect;
    delete context.uploadimagerect;
    delete context.deleteimagerect;

    //others
    delete context.slicerect;
    delete context.stretchrect;
    delete context.canvas.thumbrect;
    delete context.copyidrect;
    delete context.gallerydeleterect;
    delete context.downloadimagerect;
    delete context.uploadimagerect;
    delete context.hollyyrect;
    
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

    context.refresh();
}

var buttonlst = [
{
    name: "DEFAULT",
    draw: function(context, rect, user, time) {}
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
        var d = "\n";
        if (!k)
        {
            k = user.folder;
            d = "/";
        }

        a.draw(context, rect, k ? k.split(d) : "", time);
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

        var a = new panel.cols([BUTTONMARGIN, 0, BUTTONMARGIN],
            [
                0,
                new panel.layers(
                [
                    new panel.rounded(clr, 4, SEARCHFRAME, 8, 8),
                    new panel.text()
                ]),
                0,
            ]);

        var k = typeof(user.title) == "function" ? user.title() : user.title;
        a.draw(context, rect, k, time);
        context.restore();
    }
},
{
    name: "CURRENT",
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
                        new panel.shrink(new panel.multitext(e, new panel.text()), 20, 20),
                    ]),
                0,
            ]);

        var title = typeof(user.title) == "function" ? user.title() : user.title;
        a.draw(context, rect, title?title.split("\n"):"", time);
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
            if (user.rect.y < 0)
            {
                yyy = -user.rect.y;
                hhh = user.rect.height + user.rect.y
                if (hhh > window.innerHeight)
                    hhh = window.innerHeight;
            }
            else
            {
                var j = user.rect.height - user.rect.y;
                if (j > window.innerHeight)
                    hhh = window.innerHeight - user.rect.y;
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

    headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
}

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
    _4cnv.height = 0;
    delete photo.image

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
    var time = canvas.timeobj.value() / 1000;
    var slices = context.canvas.sliceobj.data;
    const rect = context.rect();
    if (!rect.width || !rect.height)
        return;
    if (context.canvas.slideshow > 0)
    {
        var k = canvas.autodirect;
        context.canvas.timeobj.rotate(k * context.canvas.slideshow);
        context.canvas.slideshow -= context.canvas.slidereduce
    }
    else if (global.swipetimeout)
    {
        clearInterval(global.swipetimeout)
        global.swipetimeout = 0;
        context.canvas.slideshow = 0;
    }

    var delayinterval = sealobj.value() / slices.length / 1000;
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
        var size = Math.ceil(rect.height / canvas.buttonheight) + 4;
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
                thumbimg.src = imagepath(slice,templateobj.value());
        }
        else
        {
            var t = time + (n * delayinterval);
            var bos = Math.tan(t);
            var j = Math.berp(-1, 1, bos);
            var y = j * context.canvas.virtualheight;
            var e = (canvas.virtualheight - rect.height) / 2;
            y -= e;
            if (y > 0 && y < lasty)
                y = lasty;
            lasty = y;

            var x = rect.width / 2;
            var j = {slice,x,y,n};
            slice.rect = new rectangle(0, j.y, rect.width, canvas.buttonheight);
            slice.isvisible = j.y > -canvas.buttonheight && j.y < window.innerHeight;
            if (slice.isvisible)
            {
                if (slice.isvisible)
                {
                    if (j.slice.rect.hitest(window.innerWidth / 2, window.innerHeight / 2))
                    {
                        galleryobj.width = thumbimg.width;
                        galleryobj.height = thumbimg.height;
                        context.canvas.centered = j.n;
                    }
                    
                    context.canvas.visibles.push(j);
                }
                
                context.translate(0, j.y);
                context.canvas.draw(context, r, j.slice, j.n);
                context.translate(0, -j.y);
            }
        }
    }

    //gallery
    delete canvas.buttonrect;
    delete canvas.templaterect;
    delete context.buttonmenurect;
    delete context.templatemenurect;

    //button
    delete canvas.vscrollrect;
    delete canvas.hollyrect;
    delete context.cursorect;
    delete context.folderect;

    displayobj.value().draw(context, rect, 0, 0);
    context.canvas.footer.draw(context, rect, 0, 0);
    context.savetime();
}

var eventlst = 
[
{ //1 unused
    hideontap: 1,
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
    footer: "DEFAULT",
    buttonheight: 180,
    buttonmargin: 20,
    width: 640
},
{ 
    //2 galleries
    hideontap: 0,
    speed: 60,
    reduce: 2.5,
    updownmax: 60,
    mouse: "DEFAULT",
    thumb: "DEFAULT",
    tap: "MENU",
    pan: "MENU",
    swipe: "MENU",
    button: "CURRENT",
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
{ //3 debug
    hideontap: 1,
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
{ //4
    hideontap: 1,
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
{ //5 folders
    hideontap: 1,
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
    footer: "FOLDERS",
    buttonheight: 150,
    buttonmargin: 10,
    width: 640
},
{ //6 images
    hideontap: 1,
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
    footer: "IMAGES",
    buttonheight: 70,
    buttonmargin: 15,
    width: 640
},
{ //7
    hideontap: 1,
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
{ //8
    hideontap: 1,
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
{ //9 help
    hideontap: 1,
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
    footer: "HELP",
    buttonheight: 240,
    buttonmargin: 30,
    width: 640
},
{ //10
    hideontap: 1,
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
    footer: "ACCOUNT",
    buttonheight: 50,
    buttonmargin: 10,
    width: 640
},
{ //11
    hideontap: 1,
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
    footer: "DEFAULT",
    buttonheight: 90,
    buttonmargin: 10,
    width: 640
},
{ //12
    hideontap: 1,
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
{ //13
    hideontap: 1,
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
{ //14
    hideontap: 1,
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
{ //15
    hideontap: 1,
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
        canvas.autodirect = -1;
        canvas.slideshow = 0;
        canvas.slidereduce = 0;
        canvas.slidestop = 0;
        canvas.lastime = 0;
        canvas.sliceobj = new circular_array("", []);
        canvas.timeobj = new circular_array("", sealobj.value());
        canvas.timeobj.set(sealobj.value() / 2);
        canvas.hollyobj = new circular_array("TEXTSCROLL", window.innerHeight);
        canvas.speed = obj.speed;
        canvas.reduce = obj.reduce;
        canvas.autodirect = -1;
        canvas.hideontap = obj.hideontap;
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
        
        headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);

        photo.image.onerror =
            photo.image.onabort = function(e)
            {
                console.log(e);
            }

        photo.image.onload = function()
        {
            var e = galleryobj.value();
            document.title = galleryobj.title?galleryobj.title:url.host;
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnv.autodirect = -_4cnv.movingpage;
            _4cnv.movingpage = 0;
            contextobj.reset()

            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
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
        if (!r)
            r = user;
        Object.assign(r, rect);
    }
}

panel.circle = function(color, scolor, width)
{
    this.draw = function(context, rect, user, time)
    {
        context.save();
        var radius = rect.height / 2;
        if (radius <= 0)
            return;
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

panel.leftmenu = function()
{
    this.draw = function(context, rect, user, time)
    {
        context.save()
        if (menuobj.value() == _8cnvctx ||
            menuobj.value() != galleryobj.rightctx)
        {
            context.leftmenurect = new rectangle()
            var j = 5;
            var k = j / 2;
            var e = new panel.fill(OPTIONFILL);
            var s = menuobj.value() == galleryobj.leftctx;
            var a = new panel.layers(
                [
                    new panel.rectangle(context.leftmenurect),
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
        headobj.reset();
        if (menuobj.value() != _8cnvctx)
        {
            menuobj.hide();
            menuobj.setindex(_8cnvctx);
        }
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

async function getblobpath(img, slice)
{
    var blob = await slice.entry.blob(`image/${slice.ext}`);
    img.src = URL.createObjectURL(blob);
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

var padlst = 
[
    3,2,1,0,0,0,0,0,0,0,//00
    0,0,0,0,0,0,0,0,0,0,//10
    0,0,0,0,0,0,0,0,0,0,//20
    0,0,0,9,8,7,6,5,4,3,//30
    2,1,0,0,0,0,0,0,0,0,//40
    0,0,0,0,0,0,0,0,0,0,//50
    0,0,0,0,9,8,7,6,5,4,//60
    3,2,1,0,0,0,0,0,0,0,//70
    0,0,0,0,0,0,0,0,0,0,//80
    0,0,0,0,0,0,0,0,0,0,//90
    0,0,0,0,0,0,0,0,0,0,//100
    0,0,0,0,0,0,0,0,0,0,//110
    0,0,0,0,0,2,0,0,0,0,//120
    0,0,0,0,0,0,0,0,0,0,//130
    0,0,0,0,0,0,0,0,0,0,//140
    0,0,0,0,0,0,0,0,0,0,//150
    0,0,0,0,0,0,0,0,0,0,//160
    0,0,0,0,0,0,0,0,0,0,//170
    0,0,0,0,0,0,0,0,0,0,//180
    0,0,0,0,0,0,0,0,0,0,//190
    0,0,0,0,0,0,0,0,0,0,//200
    0,0,0,0,0,0,0,0,0,0,//210
    0,0,0,0,0,0,0,0,0,0,//220
    0,0,0,0,0,0,0,0,0,0,//230
    0,0,0,0,0,0,0,0,0,0,//240
    0,0,0,0,0,0,0,0,0,4,//250
    3,2,1,0,0,0,0,0,0,0,//260
];

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

headobj.reset = function()
{
    var k = headlst.findIndex(function(a){return a.name == "GALLERY"});
    headham.panel = headlst[k];
    var k = displaylst.findIndex(function(a){return a.name == "GALLERY"});
    displayobj.set(k);
    headcnvctx.show(0, 0, window.innerWidth, HEADHEIGHT);
    headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);  
    menuobj.draw();
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
            title: "users-list",
            func: function()
            {        
                fetch(`https://user.reportbase5836.workers.dev/list`)
                  .then(function(response)
                  {
                    for (let [key, value] of response.headers)
                        console.log(`${key} = ${value}`);
                      return response.json();
                  })
                  .then(function(obj)
                        {
                            console.log(obj);
                        });  
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
        {
            title: "users-delete",
            func: function()
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
                    .catch(err => console.error(err));  
            }
        },
    ];

    _7cnv.sliceobj.data = 
    [
    {
        title: `Open   \u{25B6}\n*.zip, *.cbz, *.json, *.png,\n*.jpg, *.avif, *.webp, *.gif`,
        func: function()
        {
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
        title: "https://zip-view.com\nImage Viewer\nDrag and drop images (*.jpg, *.png, *.webp, *.avif) and zip file image galleries (*.zip, *.cbz) from the desktop or load them from the cloud.",
        func: function() 
        {
            return true;
        }
    },     
    {
        title: `Images   \u{25B6}`,
        func: function()
        {
        }
   },
   {
        title: `Galleries   \u{25B6}`,
        func: function(n, x, y)
        {
           if (!login.id)
               return;
    
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
                    var a = Array(_7cnv.sliceobj.length()).fill().map((_, index) => index);
                    _7cnv.rotated = [...a, ...a, ...a];

                    menuobj.hide();
                    galleryobj.leftcnv = _2cnv;
                    galleryobj.leftctx = _2cnvctx;
                    menuobj.setindex(galleryobj.leftctx);
                    menuobj.show();
                    headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
                })
            return false;
        }
     },
     {
        title: `Account   \u{25B6}`,
        func: function()
        {
            menuobj.hide();
            galleryobj.leftcnv = _10cnv;
            galleryobj.leftctx = _10cnvctx;
            menuobj.setindex(galleryobj.leftctx);
            menuobj.show();
            return false;
        },
    },
    {
        title: "Folders   \u{25B6}",
        func: function()
        {
            menuobj.hide();
            galleryobj.leftcnv = _5cnv;
            galleryobj.leftctx = _5cnvctx;
            menuobj.setindex(galleryobj.leftctx);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            return false;
        }
    },
    {
        title: "Debug   \u{25B6}",
        func: function()
        {
            menuobj.hide();
            galleryobj.leftcnv = _3cnv;
            galleryobj.leftctx = _3cnvctx;
            menuobj.setindex(galleryobj.leftctx);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
            return false;
        }
    }
    ];
    
    _10cnv.sliceobj.data = 
    [
        {
            title: function(){return `ID: ${login.id?login.id:""}`},
            func: function(){copytext(login.id); return false;}
        },
        {
            title: function(){return `Email: ${login.email?login.email:""}`},
            func: function(){copytext(login.email); return false;}
        },
        {
            title: function(){return `Name: ${login.name?login.name:""}`},
            func: function(){copytext(login.name); return false;}
        },
        {
            title: function(){return `Secret: ${login.secret?login.secret:""}`},
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
    
    _6cnv.sliceobj.data = [];
    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var k = galleryobj.data[n];
        var j = {};
        j.index = n;
        j.title = `${n+1}`;
        j.func = function()
        {
            gotoimage(this.index+1)
            galleryobj.rightctx.hide();
            galleryobj.leftcnv = _7cnv;
            galleryobj.leftctx = _7cnvctx;
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            headham.panel.draw(headcnvctx, headcnvctx.rect(), 0);
        };
        
        _6cnv.sliceobj.data.push(j);
    };

    _8cnv.sliceobj.data = galleryobj.data;
    _9cnv.sliceobj.data = [];
    _2cnv.sliceobj.data = [];
    _11cnv.sliceobj.data = [];

    var lst = [_2cnv, _3cnv, _5cnv, _6cnv, _7cnv, _8cnv, _9cnv, _10cnv, _11cnv];
    for (var n = 0; n < lst.length; n++)
    {
        var cnv = lst[n];
        var a = Array(cnv.sliceobj.length()).fill().map((_, index) => index);
        cnv.lastcurrent = -1;
        cnv.rotated = [...a, ...a, ...a];
    }

    galleryobj.leftcnv = _7cnv;
    galleryobj.leftctx = _7cnvctx;
    galleryobj.rightcnv = _6cnv;
    galleryobj.rightctx = _6cnvctx;    
}

//galleryobj init
galleryobj.init = function(obj)
{
    if (obj)
        Object.assign(galleryobj, obj);
    
    if (url.searchParams.has('length'))
    {
        var length = Number(url.searchParams.get('length'));
        galleryobj.data.length = length;    
    }
    
    if (!galleryobj.length())
        return;
    
    var length = galleryobj.length();
    var pad = padlst[length-1];
    var pad2 = Number(url.searchParams.get('pad'));
    if (pad2)
        pad = pad2
    for (var n = 0; n < pad; ++n)
    {
        var e = {};
        Object.assign(e,galleryobj.data[galleryobj.data.length-1]);
        galleryobj.data.push(e);
    }
    
    delete photo.image;
    
    setfavicon();
    stretchobj.makerange("40-90", stretchobj.length());  
    stretchobj.set(90);
    slicewidthobj.set(SLICEWIDTH);
    headcnv.style.pointerEvents = "none";
    headobj.reset();
    setupmenus();
    
    var image = new Image();
    image.onload = function()
    {
        galleryobj.width = this.width;
        galleryobj.height = this.height;
        contextobj.reset();
        buttonobj.reset();
        templateobj.reset();
        templateobj.init();
        buttonobj.init()
        menuobj.set(_8cnvctx);
        menuobj.toggle(_8cnvctx);
        menuobj.show();
    };    
   
    _8cnv.timeobj.set(0);
    var k = Number(url.searchParams.get('_8'));
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

var login = {};

if (url.searchParams.has("data"))
{
    url.path = url.searchParams.get("data");
    fetch(`data/${url.path}/index.json`)
        .then(response => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
        .catch((error) =>
        {});
}
else if (url.searchParams.has("search"))
{
    url.path = url.searchParams.get("search");
    fetch(`https://pexels.reportbase5836.workers.dev/?search=${url.path}`)
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
    url.path = url.searchParams.get("id");
    fetch(`https://gallery.reportbase5836.workers.dev/${url.path}`)
        .then((response) => jsonhandler(response))
        .then(function(obj)
          {
                 fetch(obj.json)
                    .then((response) => jsonhandler(response))
                    .then((obj) => galleryobj.init(obj))
          })
}
else if (url.searchParams.has("path"))
{
    url.path = url.searchParams.get("path");
    if (url.path.isimage())
    {
        loadimages(url.path);
    }
    else if (url.path.isjson())
    {
        fetch(url.path)
            .then((response) => jsonhandler(response))
            .then((obj) => galleryobj.init(obj))
    }
    else
    {
        loadzip(url.path);
    }
}
else
{
    url.path = "res/home.json";
    fetch(url.path)
        .then((response) => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
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
    dialog.addEventListener("click", function(event)
    {
        if (event.target.id == `${str}-ok`)
        {
            dialog.close();
            menuobj.draw();
            return func();
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
            galleryobj.boss = 1;
            var files = Array.from(input.files);
            delete galleryobj.datalength;
            if (files.length == 1 && files[0].name)
            {
                var name = files[0].name;
                if (name.isimage())
                {
                    loadimages(files);
                }
                else if (name.iszip())
                {
                    loadzip(files[0]);
                }
                else if (name.isjson())
                {
                    var blob = files[0];
                    loadjson(blob);
                }
            }
            else
            {
                loadimages(files);
            }
        };

        input.click();
    });
}

//menuobj updown
menuobj.updown = function(context, delta)
{
    var canvas = context.canvas;
    canvas.autodirect = delta < 0 ? 1 : -1;
    var k = Math.abs(delta)/20;
    canvas.slideshow = (sealobj.value() / canvas.virtualheight) * k;
    canvas.slidereduce = canvas.slideshow / 30;
}

function selectname(name)
{
    for (var m = 0; m < galleryobj.data.length; ++m)
    {
        var e = galleryobj.data[m];
        if (!e.name || !e.name.wild(name))
            continue;
        gotoimage(m);
        galleryobj.width = 0;
        galleryobj.height = 0;
        galleryobj.init();
        break;
    }
}

function selectid(id)
{
    for (var m = 0; m < galleryobj.data.length; ++m)
    {
        var e = galleryobj.data[m];
        if (!e.id || e.id != id)
            continue;
        gotoimage(m);
        galleryobj.width = 0;
        galleryobj.height = 0;
        galleryobj.init();
        break;
    }
}

galleryobj.leftright = function(context, delta)
{
    if (context.pinching)
        return;
    if (!delta)
        return;

    if (delta != context.canvas.leftrighttype)
    {
        clearInterval(context.canvas.leftrightime);
        context.canvas.leftrightime = 0;
        context.canvas.leftrighttype = delta;
    }

    var j = context.canvas.centered;
    var index = j % IMAGELSTSIZE;
    var w = thumbfittedlst[index].width;
    var h = thumbfittedlst[index].height;
    if (w != window.innerWidth)
        context.canvas.startleftright = (window.innerWidth / w) * Math.abs(delta);
    else
        context.canvas.startleftright = (window.innerHeight / h) * Math.abs(delta);
    var e = context.canvas.startleftright / 40;
    var obj = context.canvas.hollyobj;
    clearInterval(context.canvas.leftrightime);
    menuobj.draw();
    context.canvas.leftrightime = setInterval(function()
    {
        obj.add(delta < 0 ? -context.canvas.startleftright :
            context.canvas.startleftright);
        context.canvas.startleftright -= e;
        if (context.canvas.startleftright < 0)
        {
            clearInterval(context.canvas.leftrightime);
            context.canvas.leftrightime = 0;
            return;
        }

        menuobj.draw();
    }, GALLERYMAIN);
}

window.onGoogleLibraryLoad = () => 
{
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
    )
  )  

function handleRevokedSession(e) 
{
      
}

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

function handleCredentialResponse(response) 
{
    login = Object.assign(login, parseJwt(response.credential));
    login.credential = response.credential;
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
                    menuobj.draw();
                    dialog.close();
                })
                .catch(err => console.error(err));
            }
            else
            {
                var k = lst[0];
                login.id = k.id;
                login.secret = k.secret;
                menuobj.draw();
                dialog.close();
            }
        }); 
}        
