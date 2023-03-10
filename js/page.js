(function(c, k) {
    "function" === typeof define && define.amd ? define(["jquery"], function(m) {
        return k(m, c, c.document, c.Math)
    }) : "undefined" !== typeof exports ? module.exports = k(require("jquery"), c, c.document, c.Math) : k(jQuery, c, c.document, c.Math)
})("undefined" !== typeof window ? window : this, function(c, k, m, p, D) {
    var n = c(k),
        t = c(m);
    c.fn.fullpage = function(d) {
        function La() {
            d.css3 && (d.css3 = Ma());
            d.anchors.length || (d.anchors = c("[data-anchor]").map(function() {
                return c(this).data("anchor").toString()
            }).get());
            Na();
            e.setAllowScrolling(!0);
            q = n.height();
            e.setAutoScrolling(d.autoScrolling, "internal");
            var a = c(".fp-section.active").find(".fp-slide.active");
            a.length && (0 !== c(".fp-section.active").index(".fp-section") || 0 === c(".fp-section.active").index(".fp-section") && 0 !== a.index()) && T(a);
            ja();
            ka();
            n.on("load", function() {
                var a = k.location.hash.replace("#", "").split("/"),
                    c = a[0],
                    a = a[1];
                c && (d.animateAnchor ? U(c, a) : e.silentMoveTo(c, a))
            })
        }

        function Na() {
            h.css({
                height: "100%",
                position: "relative"
            });
            h.addClass("fullpage-wrapper");
            c("html").addClass("fp-enabled");
            h.removeClass("fp-destroyed");
            Oa();
            c(".fp-section").each(function(a) {
                var b = c(this),
                    g = b.find(".fp-slide"),
                    f = g.length;
                a || 0 !== c(".fp-section.active").length || b.addClass("active");
                b.css("height", q + "px");
                d.paddingTop && b.css("padding-top", d.paddingTop);
                d.paddingBottom && b.css("padding-bottom", d.paddingBottom);
                "undefined" !== typeof d.sectionsColor[a] && b.css("background-color", d.sectionsColor[a]);
                "undefined" !== typeof d.anchors[a] && b.attr("data-anchor", d.anchors[a]);
                "undefined" !== typeof d.anchors[a] && b.hasClass("active") &&
                    V(d.anchors[a], a);
                d.menu && d.css3 && c(d.menu).closest(".fullpage-wrapper").length && c(d.menu).appendTo(r);
                0 < f ? Pa(b, g, f) : d.verticalCentered && la(b)
            });
            d.fixedElements && d.css3 && c(d.fixedElements).appendTo(r);
            d.navigation && Qa();
            d.scrollOverflow ? ("complete" === m.readyState && ma(), n.on("load", ma)) : na()
        }

        function Pa(a, b, g) {
            var f = 100 * g,
                e = 100 / g;
            b.wrapAll('<div class="fp-slidesContainer" />');
            b.parent().wrap('<div class="fp-slides" />');
            a.find(".fp-slidesContainer").css("width", f + "%");
            1 < g && (d.controlArrows && Ra(a),
                d.slidesNavigation && Sa(a, g));
            b.each(function(a) {
                c(this).css("width", e + "%");
                d.verticalCentered && la(c(this))
            });
            a = a.find(".fp-slide.active");
            a.length && (0 !== c(".fp-section.active").index(".fp-section") || 0 === c(".fp-section.active").index(".fp-section") && 0 !== a.index()) ? T(a) : b.eq(0).addClass("active")
        }

        function Oa() {
            c(d.sectionSelector).each(function() {
                c(this).addClass("fp-section")
            });
            c(d.slideSelector).each(function() {
                c(this).addClass("fp-slide")
            })
        }

        function Ra(a) {
            a.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');
            "#fff" != d.controlArrowColor && (a.find(".fp-controlArrow.fp-next").css("border-color", "transparent transparent transparent " + d.controlArrowColor), a.find(".fp-controlArrow.fp-prev").css("border-color", "transparent " + d.controlArrowColor + " transparent transparent"));
            d.loopHorizontal || a.find(".fp-controlArrow.fp-prev").hide()
        }

        function Qa() {
            r.append('<div id="fp-nav"><ul></ul></div>');
            var a = c("#fp-nav");
            a.addClass(function() {
                return d.showActiveTooltip ? "fp-show-active " + d.navigationPosition : d.navigationPosition
            });
            for (var b = 0; b < c(".fp-section").length; b++) {
                var g = "";
                d.anchors.length && (g = d.anchors[b]);
                var g = '<li><a href="#' + g + '"><span></span></a>',
                    f = d.navigationTooltips[b];
                "undefined" !== typeof f && "" !== f && (g += '<div class="fp-tooltip ' + d.navigationPosition + '">' + f + "</div>");
                g += "</li>";
                a.find("ul").append(g)
            }
            c("#fp-nav").css("margin-top", "-" + c("#fp-nav").height() / 2 + "px");
            c("#fp-nav").find("li").eq(c(".fp-section.active").index(".fp-section")).find("a").addClass("active")
        }

        function ma() {
            c(".fp-section").each(function() {
                var a =
                    c(this).find(".fp-slide");
                a.length ? a.each(function() {
                    I(c(this))
                }) : I(c(this))
            });
            na()
        }

        function na() {
            var a = c(".fp-section.active"),
                b = a.find("SLIDES_WRAPPER"),
                g = a.find(".fp-scrollable");
            b.length && (g = b.find(".fp-slide.active"));
            g.mouseover();
            J(a);
            oa(a);
            c.isFunction(d.afterLoad) && d.afterLoad.call(a, a.data("anchor"), a.index(".fp-section") + 1);
            c.isFunction(d.afterRender) && d.afterRender.call(h)
        }

        function pa() {
            var a;
            if (!d.autoScrolling || d.scrollBar) {
                for (var b = n.scrollTop(), g = 0, f = p.abs(b - m.querySelectorAll(".fp-section")[0].offsetTop),
                        e = m.querySelectorAll(".fp-section"), h = 0; h < e.length; ++h) {
                    var k = p.abs(b - e[h].offsetTop);
                    k < f && (g = h, f = k)
                }
                a = c(e).eq(g);
                if (!a.hasClass("active") && !a.hasClass("fp-auto-height")) {
                    W = !0;
                    b = c(".fp-section.active");
                    g = b.index(".fp-section") + 1;
                    f = X(a);
                    e = a.data("anchor");
                    h = a.index(".fp-section") + 1;
                    k = a.find(".fp-slide.active");
                    if (k.length) var l = k.data("anchor"),
                        q = k.index();
                    u && (a.addClass("active").siblings().removeClass("active"), c.isFunction(d.onLeave) && d.onLeave.call(b, g, h, f), c.isFunction(d.afterLoad) && d.afterLoad.call(a,
                        e, h), J(a), V(e, h - 1), d.anchors.length && (y = e, Y(q, l, e, h)));
                    clearTimeout(Z);
                    Z = setTimeout(function() {
                        W = !1
                    }, 100)
                }
                d.fitToSection && (clearTimeout(aa), aa = setTimeout(function() {
                    u && d.fitToSection && (c(".fp-section.active").is(a) && requestAnimFrame(function() {
                        v = !0
                    }), z(a), requestAnimFrame(function() {
                        v = !1
                    }))
                }, d.fitToSectionDelay))
            }
        }

        function qa(a) {
            return a.find(".fp-slides").length ? a.find(".fp-slide.active").find(".fp-scrollable") : a.find(".fp-scrollable")
        }

        function K(a, b) {
            if (l.m[a]) {
                var d, c;
                "down" == a ? (d = "bottom", c = e.moveSectionDown) :
                    (d = "top", c = e.moveSectionUp);
                if (0 < b.length)
                    if (d = "top" === d ? !b.scrollTop() : "bottom" === d ? b.scrollTop() + 1 + b.innerHeight() >= b[0].scrollHeight : void 0, d) c();
                    else return !0;
                else c()
            }
        }

        function Ta(a) {
            var b = a.originalEvent;
            if (!ra(a.target) && ba(b)) {
                d.autoScrolling && a.preventDefault();
                a = c(".fp-section.active");
                var g = qa(a);
                u && !w && (b = sa(b), E = b.y, L = b.x, a.find(".fp-slides").length && p.abs(M - L) > p.abs(F - E) ? p.abs(M - L) > n.width() / 100 * d.touchSensitivity && (M > L ? l.m.right && e.moveSlideRight() : l.m.left && e.moveSlideLeft()) : d.autoScrolling &&
                    p.abs(F - E) > n.height() / 100 * d.touchSensitivity && (F > E ? K("down", g) : E > F && K("up", g)))
            }
        }

        function ra(a, b) {
            b = b || 0;
            var g = c(a).parent();
            return b < d.normalScrollElementTouchThreshold && g.is(d.normalScrollElements) ? !0 : b == d.normalScrollElementTouchThreshold ? !1 : ra(g, ++b)
        }

        function ba(a) {
            return "undefined" === typeof a.pointerType || "mouse" != a.pointerType
        }

        function Ua(a) {
            a = a.originalEvent;
            d.fitToSection && x.stop();
            ba(a) && (a = sa(a), F = a.y, M = a.x)
        }

        function ta(a, b) {
            for (var d = 0, c = a.slice(p.max(a.length - b, 1)), e = 0; e < c.length; e++) d +=
                c[e];
            return p.ceil(d / b)
        }

        function A(a) {
            var b = (new Date).getTime();
            if (d.autoScrolling && !N) {
                a = a || k.event;
                var g = a.wheelDelta || -a.deltaY || -a.detail,
                    f = p.max(-1, p.min(1, g)),
                    e = "undefined" !== typeof a.wheelDeltaX || "undefined" !== typeof a.deltaX,
                    e = p.abs(a.wheelDeltaX) < p.abs(a.wheelDelta) || p.abs(a.deltaX) < p.abs(a.deltaY) || !e;
                149 < B.length && B.shift();
                B.push(p.abs(g));
                // d.scrollBar && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
                a = c(".fp-section.active");
                a = qa(a);
                g = b - ua;
                ua = b;
                200 < g && (B = []);
                u && (b = ta(B, 10), g = ta(B,
                    70), b >= g && e && (0 > f ? K("down", a) : K("up", a)));
                return !1
            }
            d.fitToSection && x.stop()
        }

        function va(a) {
            var b = c(".fp-section.active").find(".fp-slides"),
                g = b.find(".fp-slide").length;
            if (!(!b.length || w || 2 > g)) {
                var g = b.find(".fp-slide.active"),
                    f = null,
                    f = "prev" === a ? g.prev(".fp-slide") : g.next(".fp-slide");
                if (!f.length) {
                    if (!d.loopHorizontal) return;
                    f = "prev" === a ? g.siblings(":last") : g.siblings(":first")
                }
                w = !0;
                G(b, f)
            }
        }

        function wa() {
            c(".fp-slide.active").each(function() {
                T(c(this), "internal")
            })
        }

        function z(a, b, g) {
            requestAnimFrame(function() {
                var f =
                    a.position();
                if ("undefined" !== typeof f) {
                    var e = a.hasClass("fp-auto-height") ? f.top - q + a.height() : f.top,
                        f = {
                            element: a,
                            callback: b,
                            isMovementUp: g,
                            dest: f,
                            dtop: e,
                            yMovement: X(a),
                            anchorLink: a.data("anchor"),
                            sectionIndex: a.index(".fp-section"),
                            activeSlide: a.find(".fp-slide.active"),
                            activeSection: c(".fp-section.active"),
                            leavingSection: c(".fp-section.active").index(".fp-section") + 1,
                            localIsResizing: v
                        };
                    if (!(f.activeSection.is(a) && !v || d.scrollBar && n.scrollTop() === f.dtop && !a.hasClass("fp-auto-height"))) {
                        if (f.activeSlide.length) var h =
                            f.activeSlide.data("anchor"),
                            k = f.activeSlide.index();
                        d.autoScrolling && d.continuousVertical && "undefined" !== typeof f.isMovementUp && (!f.isMovementUp && "up" == f.yMovement || f.isMovementUp && "down" == f.yMovement) && (f.isMovementUp ? c(".fp-section.active").before(f.activeSection.nextAll(".fp-section")) : c(".fp-section.active").after(f.activeSection.prevAll(".fp-section").get().reverse()), H(c(".fp-section.active").position().top), wa(), f.wrapAroundElements = f.activeSection, f.dest = f.element.position(), f.dtop = f.dest.top,
                            f.yMovement = X(f.element));
                        if (c.isFunction(d.onLeave) && !f.localIsResizing) {
                            if (!1 === d.onLeave.call(f.activeSection, f.leavingSection, f.sectionIndex + 1, f.yMovement)) return;
                            Va(f.activeSection)
                        }
                        a.addClass("active").siblings().removeClass("active");
                        J(a);
                        u = !1;
                        Y(k, h, f.anchorLink, f.sectionIndex);
                        Wa(f);
                        y = f.anchorLink;
                        V(f.anchorLink, f.sectionIndex)
                    }
                }
            })
        }

        function Wa(a) {
            if (d.css3 && d.autoScrolling && !d.scrollBar) xa("translate3d(0px, -" + a.dtop + "px, 0px)", !0), d.scrollingSpeed ? ca = setTimeout(function() {
                    da(a)
                }, d.scrollingSpeed) :
                da(a);
            else {
                var b = Xa(a);
                c(b.element).animate(b.options, d.scrollingSpeed, d.easing).promise().done(function() {
                    da(a)
                })
            }
        }

        function Xa(a) {
            var b = {};
            d.autoScrolling && !d.scrollBar ? (b.options = {
                top: -a.dtop
            }, b.element = ".fullpage-wrapper") : (b.options = {
                scrollTop: a.dtop
            }, b.element = "html, body");
            return b
        }

        function da(a) {
            a.wrapAroundElements && a.wrapAroundElements.length && (a.isMovementUp ? c(".fp-section:first").before(a.wrapAroundElements) : c(".fp-section:last").after(a.wrapAroundElements), H(c(".fp-section.active").position().top),
                wa());
            a.element.find(".fp-scrollable").mouseover();
            c.isFunction(d.afterLoad) && !a.localIsResizing && d.afterLoad.call(a.element, a.anchorLink, a.sectionIndex + 1);
            oa(a.element);
            u = !0;
            c.isFunction(a.callback) && a.callback.call(this)
        }

        function J(a) {
            var b = a.find(".fp-slide.active");
            b.length && (a = c(b));
            a.find("img[data-src], source[data-src], audio[data-src]").each(function() {
                c(this).attr("src", c(this).data("src"));
                c(this).removeAttr("data-src");
                c(this).is("source") && c(this).closest("video").get(0).load()
            })
        }

        function oa(a) {
            a.find("video, audio").each(function() {
                var a =
                    c(this).get(0);
                a.hasAttribute("autoplay") && "function" === typeof a.play && a.play()
            })
        }

        function Va(a) {
            a.find("video, audio").each(function() {
                var a = c(this).get(0);
                a.hasAttribute("data-ignore") || "function" !== typeof a.pause || a.pause()
            })
        }

        function ya() {
            if (!W && !d.lockAnchors) {
                var a = k.location.hash.replace("#", "").split("/"),
                    b = a[0],
                    a = a[1],
                    c = "undefined" === typeof y,
                    f = "undefined" === typeof y && "undefined" === typeof a && !w;
                b.length && (b && b !== y && !c || f || !w && ea != a) && U(b, a)
            }
        }

        function Ya(a) {
            u && (a.pageY < O ? e.moveSectionUp() :
                a.pageY > O && e.moveSectionDown());
            O = a.pageY
        }

        function G(a, b) {
            var g = b.position(),
                f = b.index(),
                e = a.closest(".fp-section"),
                h = e.index(".fp-section"),
                k = e.data("anchor"),
                l = e.find(".fp-slidesNav"),
                m = fa(b),
                n = v;
            if (d.onSlideLeave) {
                var q = e.find(".fp-slide.active"),
                    r = q.index(),
                    t;
                t = r == f ? "none" : r > f ? "left" : "right";
                if (!n && "none" !== t && c.isFunction(d.onSlideLeave) && !1 === d.onSlideLeave.call(q, k, h + 1, r, t, f)) {
                    w = !1;
                    return
                }
            }
            b.addClass("active").siblings().removeClass("active");
            n || J(b);
            !d.loopHorizontal && d.controlArrows && (e.find(".fp-controlArrow.fp-prev").toggle(0 !==
                f), e.find(".fp-controlArrow.fp-next").toggle(!b.is(":last-child")));
            e.hasClass("active") && Y(f, m, k, h);
            var u = function() {
                n || c.isFunction(d.afterSlideLoad) && d.afterSlideLoad.call(b, k, h + 1, m, f);
                w = !1
            };
            d.css3 ? (g = "translate3d(-" + p.round(g.left) + "px, 0px, 0px)", za(a.find(".fp-slidesContainer"), 0 < d.scrollingSpeed).css(Aa(g)), ga = setTimeout(function() {
                u()
            }, d.scrollingSpeed, d.easing)) : a.animate({
                scrollLeft: p.round(g.left)
            }, d.scrollingSpeed, d.easing, function() {
                u()
            });
            l.find(".active").removeClass("active");
            l.find("li").eq(f).find("a").addClass("active")
        }

        function Ba() {
            ja();
            if (P) {
                var a = c(m.activeElement);
                a.is("textarea") || a.is("input") || a.is("select") || (a = n.height(), p.abs(a - ha) > 20 * p.max(ha, a) / 100 && (e.reBuild(!0), ha = a))
            } else clearTimeout(ia), ia = setTimeout(function() {
                e.reBuild(!0)
            }, 350)
        }

        function ja() {
            var a = d.responsive || d.responsiveWidth,
                b = d.responsiveHeight,
                c = a && n.width() < a,
                f = b && n.height() < b;
            a && b ? e.setResponsive(c || f) : a ? e.setResponsive(c) : b && e.setResponsive(f)
        }

        function za(a) {
            var b = "all " + d.scrollingSpeed + "ms " + d.easingcss3;
            a.removeClass("fp-notransition");
            return a.css({
                "-webkit-transition": b,
                transition: b
            })
        }

        function Za(a, b) {
            if (825 > a || 900 > b) {
                var c = p.min(100 * a / 825, 100 * b / 900).toFixed(2);
                r.css("font-size", c + "%")
            } else r.css("font-size", "100%")
        }

        function V(a, b) {
            d.menu && (c(d.menu).find(".active").removeClass("active"), c(d.menu).find('[data-menuanchor="' + a + '"]').addClass("active"));
            d.navigation && (c("#fp-nav").find(".active").removeClass("active"), a ? c("#fp-nav").find('a[href="#' + a + '"]').addClass("active") : c("#fp-nav").find("li").eq(b).find("a").addClass("active"))
        }

        function X(a) {
            var b = c(".fp-section.active").index(".fp-section");
            a = a.index(".fp-section");
            return b == a ? "none" : b > a ? "up" : "down"
        }

        function I(a) {
            a.css("overflow", "hidden");
            var b = a.closest(".fp-section"),
                c = a.find(".fp-scrollable"),
                f;
            c.length ? f = c.get(0).scrollHeight : (f = a.get(0).scrollHeight, d.verticalCentered && (f = a.find(".fp-tableCell").get(0).scrollHeight));
            b = q - parseInt(b.css("padding-bottom")) - parseInt(b.css("padding-top"));
            f > b ? c.length ? c.css("height", b + "px").parent().css("height", b + "px") : (d.verticalCentered ?
                a.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />') : a.wrapInner('<div class="fp-scrollable" />'), a.find(".fp-scrollable").slimScroll({
                    allowPageScroll: !0,
                    height: b + "px",
                    size: "10px",
                    alwaysVisible: !0
                })) : Ca(a);
            a.css("overflow", "")
        }

        function Ca(a) {
            a.find(".fp-scrollable").children().first().unwrap().unwrap();
            a.find(".slimScrollBar").remove();
            a.find(".slimScrollRail").remove()
        }

        function la(a) {
            a.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:' + Da(a) + 'px;" />')
        }

        function Da(a) {
            var b =
                q;
            if (d.paddingTop || d.paddingBottom) b = a, b.hasClass("fp-section") || (b = a.closest(".fp-section")), a = parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom")), b = q - a;
            return b
        }

        function xa(a, b) {
            b ? za(h) : h.addClass("fp-notransition");
            h.css(Aa(a));
            setTimeout(function() {
                h.removeClass("fp-notransition")
            }, 10)
        }

        function Ea(a) {
            var b = c('.fp-section[data-anchor="' + a + '"]');
            b.length || (b = c(".fp-section").eq(a - 1));
            return b
        }

        function U(a, b) {
            var c = Ea(a);
            "undefined" === typeof b && (b = 0);
            a === y || c.hasClass("active") ? Fa(c,
                b) : z(c, function() {
                Fa(c, b)
            })
        }

        function Fa(a, b) {
            if ("undefined" !== typeof b) {
                var c = a.find(".fp-slides"),
                    d;
                d = a.find(".fp-slides");
                var e = d.find('.fp-slide[data-anchor="' + b + '"]');
                e.length || (e = d.find(".fp-slide").eq(b));
                d = e;
                d.length && G(c, d)
            }
        }

        function Sa(a, b) {
            a.append('<div class="fp-slidesNav"><ul></ul></div>');
            var c = a.find(".fp-slidesNav");
            c.addClass(d.slidesNavPosition);
            for (var f = 0; f < b; f++) c.find("ul").append('<li><a href="#"><span></span></a></li>');
            c.css("margin-left", "-" + c.width() / 2 + "px");
            c.find("li").first().find("a").addClass("active")
        }

        function Y(a, b, c, f) {
            f = "";
            d.anchors.length && !d.lockAnchors && (a ? ("undefined" !== typeof c && (f = c), "undefined" === typeof b && (b = a), ea = b, Ga(f + "/" + b)) : ("undefined" !== typeof a && (ea = b), Ga(c)));
            ka()
        }

        function Ga(a) {
            if (d.recordHistory) location.hash = a;
            else if (P || Q) history.replaceState(D, D, "#" + a);
            else {
                var b = k.location.href.split("#")[0];
                k.location.replace(b + "#" + a)
            }
        }

        function fa(a) {
            var b = a.data("anchor");
            a = a.index();
            "undefined" === typeof b && (b = a);
            return b
        }

        function ka() {
            var a = c(".fp-section.active"),
                b = a.find(".fp-slide.active"),
                d = fa(a),
                f = fa(b);
            a.index(".fp-section");
            a = String(d);
            b.length && (a = a + "-" + f);
            a = a.replace("/", "-").replace("#", "");
            r[0].className = r[0].className.replace(RegExp("\\b\\s?fp-viewing-[^\\s]+\\b", "g"), "");
            r.addClass("fp-viewing-" + a)
        }

        function Ma() {
            var a = m.createElement("p"),
                b, c = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            m.body.insertBefore(a, null);
            for (var d in c) a.style[d] !== D && (a.style[d] = "translate3d(1px,1px,1px)",
                b = k.getComputedStyle(a).getPropertyValue(c[d]));
            m.body.removeChild(a);
            return b !== D && 0 < b.length && "none" !== b
        }

        function $a() {
            if (P || Q) {
                var a = Ha();
                c(".fullpage-wrapper").off("touchstart " + a.down).on("touchstart " + a.down, Ua);
                c(".fullpage-wrapper").off("touchmove " + a.move).on("touchmove " + a.move, Ta)
            }
        }

        function ab() {
            if (P || Q) {
                var a = Ha();
                c(".fullpage-wrapper").off("touchstart " + a.down);
                c(".fullpage-wrapper").off("touchmove " + a.move)
            }
        }

        function Ha() {
            return k.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }
        }

        function sa(a) {
            var b = [];
            b.y = "undefined" !== typeof a.pageY && (a.pageY || a.pageX) ? a.pageY : a.touches[0].pageY;
            b.x = "undefined" !== typeof a.pageX && (a.pageY || a.pageX) ? a.pageX : a.touches[0].pageX;
            Q && ba(a) && d.scrollBar && (b.y = a.touches[0].pageY, b.x = a.touches[0].pageX);
            return b
        }

        function T(a, b) {
            e.setScrollingSpeed(0, "internal");
            "undefined" !== typeof b && (v = !0);
            G(a.closest(".fp-slides"), a);
            "undefined" !== typeof b && (v = !1);
            e.setScrollingSpeed(C.scrollingSpeed, "internal")
        }

        function H(a) {
            d.scrollBar ?
                h.scrollTop(a) : d.css3 ? xa("translate3d(0px, -" + a + "px, 0px)", !1) : h.css("top", -a)
        }

        function Aa(a) {
            return {
                "-webkit-transform": a,
                "-moz-transform": a,
                "-ms-transform": a,
                transform: a
            }
        }

        function Ia(a, b, c) {
            switch (b) {
                case "up":
                    l[c].up = a;
                    break;
                case "down":
                    l[c].down = a;
                    break;
                case "left":
                    l[c].left = a;
                    break;
                case "right":
                    l[c].right = a;
                    break;
                case "all":
                    "m" == c ? e.setAllowScrolling(a) : e.setKeyboardScrolling(a)
            }
        }

        function bb() {
            H(0);
            c("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove();
            c(".fp-section").css({
                height: "",
                "background-color": "",
                padding: ""
            });
            c(".fp-slide").css({
                width: ""
            });
            h.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            });
            x.css({
                overflow: "",
                height: ""
            });
            c("html").removeClass("fp-enabled");
            c.each(r.get(0).className.split(/\s+/), function(a, b) {
                0 === b.indexOf("fp-viewing") && r.removeClass(b)
            });
            c(".fp-section, .fp-slide").each(function() {
                Ca(c(this));
                c(this).removeClass("fp-table active")
            });
            h.addClass("fp-notransition");
            h.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function() {
                c(this).replaceWith(this.childNodes)
            });
            x.scrollTop(0)
        }

        function R(a, b, c) {
            d[a] = b;
            "internal" !== c && (C[a] = b)
        }

        function S(a, b) {
            console && console[a] && console[a]("fullPage: " + b)
        }
        var x = c("html, body"),
            r = c("body"),
            e = c.fn.fullpage;
        d = c.extend({
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1E3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            resize: !1,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            responsiveWidth: 0,
            responsiveHeight: 0,
            sectionSelector: ".section",
            slideSelector: ".slide",
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, d);
        (function() {
            d.continuousVertical && (d.loopTop || d.loopBottom) && (d.continuousVertical = !1, S("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
            d.scrollBar && d.scrollOverflow && S("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox");
            d.continuousVertical && d.scrollBar && (d.continuousVertical = !1, S("warn",
                "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
            c.each(d.anchors, function(a, b) {
                (c("#" + b).length || c('[name="' + b + '"]').length) && S("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")
            })
        })();
        c.extend(c.easing, {
            easeInOutCubic: function(a, b, c, d, e) {
                return 1 > (b /= e / 2) ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
            }
        });
        c.extend(c.easing, {
            easeInQuart: function(a, b, c, d, e) {
                return d * (b /= e) * b * b * b + c
            }
        });
        e.setAutoScrolling =
            function(a, b) {
                R("autoScrolling", a, b);
                var g = c(".fp-section.active");
                d.autoScrolling && !d.scrollBar ? (x.css({
                    overflow: "hidden",
                    height: "100%"
                }), e.setRecordHistory(C.recordHistory, "internal"), h.css({
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                }), g.length && H(g.position().top)) : (x.css({
                    overflow: "visible",
                    height: "initial"
                }), e.setRecordHistory(!1, "internal"), h.css({
                    "-ms-touch-action": "",
                    "touch-action": ""
                }), H(0), g.length && x.scrollTop(g.position().top))
            };
        e.setRecordHistory = function(a, b) {
            R("recordHistory",
                a, b)
        };
        e.setScrollingSpeed = function(a, b) {
            R("scrollingSpeed", a, b)
        };
        e.setFitToSection = function(a, b) {
            R("fitToSection", a, b)
        };
        e.setLockAnchors = function(a) {
            d.lockAnchors = a
        };
        e.setMouseWheelScrolling = function(a) {
            if (a) {
                a = "";
                var b;
                k.addEventListener ? b = "addEventListener" : (b = "attachEvent", a = "on");
                var c = "onwheel" in m.createElement("div") ? "wheel" : m.onmousewheel !== D ? "mousewheel" : "DOMMouseScroll";
                if ("DOMMouseScroll" == c) m[b](a + "MozMousePixelScroll", A, !1);
                else m[b](a + c, A, !1)
            } else m.addEventListener ? (m.removeEventListener("mousewheel",
                A, !1), m.removeEventListener("wheel", A, !1), m.removeEventListener("MozMousePixelScroll", A, !1)) : m.detachEvent("onmousewheel", A)
        };
        e.setAllowScrolling = function(a, b) {
            "undefined" !== typeof b ? (b = b.replace(/ /g, "").split(","), c.each(b, function(b, c) {
                Ia(a, c, "m")
            })) : a ? (e.setMouseWheelScrolling(!0), $a()) : (e.setMouseWheelScrolling(!1), ab())
        };
        e.setKeyboardScrolling = function(a, b) {
            "undefined" !== typeof b ? (b = b.replace(/ /g, "").split(","), c.each(b, function(b, c) {
                Ia(a, c, "k")
            })) : d.keyboardScrolling = a
        };
        e.moveSectionUp = function() {
            var a =
                c(".fp-section.active").prev(".fp-section");
            a.length || !d.loopTop && !d.continuousVertical || (a = c(".fp-section").last());
            a.length && z(a, null, !0)
        };
        e.moveSectionDown = function() {
            var a = c(".fp-section.active").next(".fp-section");
            a.length || !d.loopBottom && !d.continuousVertical || (a = c(".fp-section").first());
            a.length && z(a, null, !1)
        };
        e.silentMoveTo = function(a, b) {
            requestAnimFrame(function() {
                e.setScrollingSpeed(0, "internal")
            });
            e.moveTo(a, b);
            requestAnimFrame(function() {
                e.setScrollingSpeed(C.scrollingSpeed, "internal")
            })
        };
        e.moveTo = function(a, b) {
            var c = Ea(a);
            "undefined" !== typeof b ? U(a, b) : 0 < c.length && z(c)
        };
        e.moveSlideRight = function() {
            va("next")
        };
        e.moveSlideLeft = function() {
            va("prev")
        };
        e.reBuild = function(a) {
            if (!h.hasClass("fp-destroyed")) {
                requestAnimFrame(function() {
                    v = !0
                });
                var b = n.width();
                q = n.height();
                d.resize && Za(q, b);
                c(".fp-section").each(function() {
                    var a = c(this).find(".fp-slides"),
                        b = c(this).find(".fp-slide");
                    d.verticalCentered && c(this).find(".fp-tableCell").css("height", Da(c(this)) + "px");
                    c(this).css("height", q + "px");
                    d.scrollOverflow && (b.length ? b.each(function() {
                        I(c(this))
                    }) : I(c(this)));
                    1 < b.length && G(a, a.find(".fp-slide.active"))
                });
                (b = c(".fp-section.active").index(".fp-section")) && e.silentMoveTo(b + 1);
                requestAnimFrame(function() {
                    v = !1
                });
                c.isFunction(d.afterResize) && a && d.afterResize.call(h);
                c.isFunction(d.afterReBuild) && !a && d.afterReBuild.call(h)
            }
        };
        e.setResponsive = function(a) {
            var b = h.hasClass("fp-responsive");
            a ? b || (e.setAutoScrolling(!1, "internal"), e.setFitToSection(!1, "internal"), c("#fp-nav").hide(), h.addClass("fp-responsive")) :
                b && (e.setAutoScrolling(C.autoScrolling, "internal"), e.setFitToSection(C.autoScrolling, "internal"), c("#fp-nav").show(), h.removeClass("fp-responsive"))
        };
        var w = !1,
            P = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            Q = "ontouchstart" in k || 0 < navigator.msMaxTouchPoints || navigator.maxTouchPoints,
            h = c(this),
            q = n.height(),
            v = !1,
            Ja = !0,
            y, ea, u = !0,
            B = [],
            N, l = {
                m: {
                    up: !0,
                    down: !0,
                    left: !0,
                    right: !0
                }
            };
        l.k = c.extend(!0, {}, l.m);
        var C = c.extend(!0, {}, d),
            ia, ca, ga, Z, aa, Ka;
        c(this).length && La();
        var W = !1;
        n.on("scroll", pa);
        var F = 0,
            M = 0,
            E = 0,
            L = 0,
            ua = (new Date).getTime();
        k.requestAnimFrame = function() {
            return k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.mozRequestAnimationFrame || k.oRequestAnimationFrame || k.msRequestAnimationFrame || function(a) {
                a()
            }
        }();
        n.on("hashchange", ya);
        t.keydown(function(a) {
            clearTimeout(Ka);
            var b = c(":focus");
            b.is("textarea") || b.is("input") || b.is("select") || !d.keyboardScrolling || !d.autoScrolling || (-1 < c.inArray(a.which, [40,
                38, 32, 33, 34
            ]) && a.preventDefault(), N = a.ctrlKey, Ka = setTimeout(function() {
                var b = a.shiftKey;
                switch (a.which) {
                    case 38:
                    case 33:
                        l.k.up && e.moveSectionUp();
                        break;
                    case 32:
                        if (b && l.k.up) {
                            e.moveSectionUp();
                            break
                        }
                    case 40:
                    case 34:
                        l.k.down && e.moveSectionDown();
                        break;
                    case 36:
                        l.k.up && e.moveTo(1);
                        break;
                    case 35:
                        l.k.down && e.moveTo(c(".fp-section").length);
                        break;
                    case 37:
                        l.k.left && e.moveSlideLeft();
                        break;
                    case 39:
                        l.k.right && e.moveSlideRight()
                }
            }, 150))
        });
        t.keyup(function(a) {
            Ja && (N = a.ctrlKey)
        });
        c(k).blur(function() {
            N = Ja = !1
        });
        h.mousedown(function(a) {
            2 == a.which && (O = a.pageY, h.on("mousemove", Ya))
        });
        h.mouseup(function(a) {
            2 == a.which && h.off("mousemove")
        });
        var O = 0;
        t.on("click touchstart", "#fp-nav a", function(a) {
            a.preventDefault();
            a = c(this).parent().index();
            z(c(".fp-section").eq(a))
        });
        t.on("click touchstart", ".fp-slidesNav a", function(a) {
            a.preventDefault();
            a = c(this).closest(".fp-section").find(".fp-slides");
            var b = a.find(".fp-slide").eq(c(this).closest("li").index());
            G(a, b)
        });
        d.normalScrollElements && (t.on("mouseenter", d.normalScrollElements,
            function() {
                e.setMouseWheelScrolling(!1)
            }), t.on("mouseleave", d.normalScrollElements, function() {
            e.setMouseWheelScrolling(!0)
        }));
        c(".fp-section").on("click touchstart", ".fp-controlArrow", function() {
            c(this).hasClass("fp-prev") ? l.m.left && e.moveSlideLeft() : l.m.right && e.moveSlideRight()
        });
        n.resize(Ba);
        var ha = q;
        e.destroy = function(a) {
            e.setAutoScrolling(!1, "internal");
            e.setAllowScrolling(!1);
            e.setKeyboardScrolling(!1);
            h.addClass("fp-destroyed");
            clearTimeout(ga);
            clearTimeout(ca);
            clearTimeout(ia);
            clearTimeout(Z);
            clearTimeout(aa);
            n.off("scroll", pa).off("hashchange", ya).off("resize", Ba);
            t.off("click", "#fp-nav a").off("mouseenter", "#fp-nav li").off("mouseleave", "#fp-nav li").off("click", ".fp-slidesNav a").off("mouseover", d.normalScrollElements).off("mouseout", d.normalScrollElements);
            c(".fp-section").off("click", ".fp-controlArrow");
            clearTimeout(ga);
            clearTimeout(ca);
            a && bb()
        }
    }
});