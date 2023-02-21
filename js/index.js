const toggleButton = document.querySelector('#menu_bt');
toggleButton.addEventListener('click', () => {
    const container = document.querySelector('.gridbox');
    const container2 = document.querySelector('.gridbox2');
    const container3 = document.querySelector('.gridbox3');
    if (container.getAttribute('id', 'remove')) {
        container.removeAttribute('id', 'remove');
    } else {
        // container.setAttribute('id', 'remove');
    }
    if (container2.getAttribute('id', 'remove')) {

    } else {
        container2.setAttribute('id', 'remove');
    }
    if (container3.getAttribute('id', 'remove')) {

    } else {
        container3.setAttribute('id', 'remove');
    }
})
const toggleButton2 = document.querySelector('#menu_bt2');
toggleButton2.addEventListener('click', () => {
    const container2 = document.querySelector('.gridbox2');
    const container3 = document.querySelector('.gridbox3');
    const container = document.querySelector('.gridbox');
    if (container2.getAttribute('id', 'remove')) {
        container2.removeAttribute('id', 'remove');

    } else {
        // container2.setAttribute('id', 'remove');
    }
    if (container3.getAttribute('id', 'remove')) {

    } else {
        container3.setAttribute('id', 'remove');
    }
    if (container.getAttribute('id', 'remove')) {

    } else {
        container.setAttribute('id', 'remove');
    }
})
const toggleButton3 = document.querySelector('#menu_bt3');
toggleButton3.addEventListener('click', () => {
    const container3 = document.querySelector('.gridbox3');
    const container = document.querySelector('.gridbox');
    const container2 = document.querySelector('.gridbox2');
    if (container3.getAttribute('id', 'remove')) {
        container3.removeAttribute('id', 'remove');

    } else {
        // container3.setAttribute('id', 'remove');
    }
    if (container.getAttribute('id', 'remove')) {

    } else {
        container.setAttribute('id', 'remove');
    }
    if (container2.getAttribute('id', 'remove')) {

    } else {
        container2.setAttribute('id', 'remove');
    }
})


$(document).ready(function () {
    // typing animation
    (function ($) {
        $.fn.writeText = function (content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function () {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };
    })(jQuery);

    // input text for typing animation
    $("#holder").writeText("Web site design / published by sia");

    // initialize wow.js
    new WOW().init();

    // Push the body and the nav over by 285px over
    var main = function () {
        $(".fa-bars").click(function () {
            $(".nav-screen").animate(
                {
                    right: "0px"
                },
                200
            );

            $("body").animate(
                {
                    right: "285px"
                },
                200
            );
        });

        // Then push them back */
        $(".fa-times").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                200
            );

            $("body").animate(
                {
                    right: "0px"
                },
                200
            );
        });

        $(".nav-links a").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                500
            );

            $("body").animate(
                {
                    right: "0px"
                },
                500
            );
        });
    };

    $(document).ready(main);

    // initiate full page scroll

    $("#fullpage").fullpage({
        scrollBar: true,
        responsiveWidth: 300,
        navigation: true,
        navigationTooltips: ["home", "portfolio", "about",  "contact"],
        anchors: ["home", "portfolio", "about", "contact"],
        menu: "#myMenu",
        fitToSection: false,

        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            if (index == 1) {
                /* add opacity to arrow */
                $(".xi-angle-down-thin").each(function () {
                    $(this).css("opacity", "1");
                });
                $(".header-links a").each(function () {
                    $(this).css("color", "white");
                });
                $(".header-links").css("background-color", "transparent");
            } else if (index != 1) {
                $(".header-links a").each(function () {
                    $(this).css("color", "black");
                });
                // $(".header-links").css("background-color", "white");
            }

            //using index
            // if (index == 2) {
            //     /* animate skill bars */
            //     $(".skillbar").each(function () {
            //         $(this)
            //             .find(".skillbar-bar")
            //             .animate(
            //                 {
            //                     width: $(this).attr("data-percent")
            //                 },
            //                 2500
            //             );
            //     });
            // }
        }
    });

    // move section down one
    $(document).on("click", "#moveDown", function () {
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on("click", "#portfolio", function () {
        $.fn.fullpage.moveTo(2);
    });

    $(document).on("click", "#about", function () {
        $.fn.fullpage.moveTo(3);
    });

    $(document).on("click", "#contact", function () {
        $.fn.fullpage.moveTo(4);
    });

    // smooth scrolling
    $(function () {
        $("a[href*=#]:not([href=#])").click(function () {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html,body").animate(
                        {
                            scrollTop: target.offset().top
                        },
                        700
                    );
                    return false;
                }
            }
        });
    });

    //ajax form
    $(function () {
        // Get the form.
        var form = $("#ajax-contact");

        // Get the messages div.
        var formMessages = $("#form-messages");

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: formData
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass("error");
                    $(formMessages).addClass("success");

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $("#name").val("");
                    $("#email").val("");
                    $("#message").val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass("success");
                    $(formMessages).addClass("error");

                    // Set the message text.
                    if (data.responseText !== "") {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        });
    });
});

