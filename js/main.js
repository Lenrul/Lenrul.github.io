/* =============================================================
   Lén Rui — lenrui.net
   Site behaviour: mobile nav, scroll-reveal, snowfall.
   Vanilla JS, no dependencies.
   ============================================================= */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Mobile navigation toggle ---------- */
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    if (nav && toggle) {
        toggle.addEventListener("click", function () {
            nav.classList.toggle("open");
            var open = nav.classList.contains("open");
            toggle.setAttribute("aria-expanded", String(open));
        });
        // close the menu after tapping a link (mobile)
        nav.querySelectorAll(".nav__links a").forEach(function (a) {
            a.addEventListener("click", function () { nav.classList.remove("open"); });
        });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && !reduceMotion) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add("in-view"); });
    }

    /* ---------- Snowfall ---------- */
    var canvas = document.getElementById("snow");
    if (canvas && !reduceMotion) {
        var ctx = canvas.getContext("2d");
        var flakes = [];
        var w, h, count;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            count = Math.min(140, Math.round((w * h) / 16000));
            build();
        }
        function rand(min, max) { return Math.random() * (max - min) + min; }
        function build() {
            flakes = [];
            for (var i = 0; i < count; i++) {
                flakes.push({
                    x: rand(0, w),
                    y: rand(0, h),
                    r: rand(1, 3.4),
                    d: rand(0.4, 1.4),          // fall speed factor
                    sway: rand(0, Math.PI * 2),  // horizontal phase
                    swaySpeed: rand(0.005, 0.02),
                    o: rand(0.35, 0.9)           // opacity
                });
            }
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (var i = 0; i < flakes.length; i++) {
                var f = flakes[i];
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, " + f.o + ")";
                ctx.fill();
            }
            update();
            requestAnimationFrame(draw);
        }
        function update() {
            for (var i = 0; i < flakes.length; i++) {
                var f = flakes[i];
                f.sway += f.swaySpeed;
                f.y += f.d * 0.9;
                f.x += Math.sin(f.sway) * 0.6;
                if (f.y > h + 5) { f.y = -5; f.x = rand(0, w); }
                if (f.x > w + 5) f.x = -5;
                else if (f.x < -5) f.x = w + 5;
            }
        }
        window.addEventListener("resize", resize);
        resize();
        requestAnimationFrame(draw);
    }

    /* ---------- Footer year ---------- */
    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
})();
