const loginTem = `<div class="modal">
        <div class="login-form">
            <h1>Login</h1>
            <form method="post">
                <div class="txt_field">
                    <input type="text" required>
                    <span></span>
                    <label>Username</label>
                </div>
                <div class="txt_field">
                    <input type="password" required>
                    <span></span>
                    <label>Password</label>
                </div>
                <div class="pass">Forgot Password?</div>
                <input type="submit" value="Login">
                <div class="signup_link">
                    Not a member? <a href="#">Signup</a>
                </div>
            </form>
        </div>
    </div>`;

const searchTem = `<div class="modal">
<div class="search-input">
    <a href="" target="_blank" hidden></a>

    <input type="text" placeholder="Search...">
    <div class="btn btn_common">
        <i class="fas fa-search"></i>
    </div>
    <div class="autocom-box">
    </div>
</div>
</div>`;

const chatboxTem = `<div class="chatbox">
<div class="chatbox-header">
    <span>Chat with SNEAKER</span>
    <div class="icon">
        <i class="fas fa-phone"></i>
        <i class="fas fa-times chatbox-times"></i>
    </div>
</div>
<div class="chatbox-middle"></div>
<div class="chatbox-footer">
    <ion-icon name="add-circle-outline"></ion-icon>
    <input type="text" class="input" placeholder="Send...">
    <ion-icon name="paper-plane-outline"></ion-icon>
</div>
</div>`;

//Khi resize màn hình thì sẽ reload lại trang
// window.addEventListener('resize', function() {
//     "use strict";
//     window.location.reload();
// });
window.addEventListener("load", function() {
    // =============================================================Xử lý Menu
    // Xử lý khi nhấn vào icon bars
    let menuBars = document.querySelector(".fa-bars");
    let menu = document.querySelector(".header-menu");
    menuBars.addEventListener("click", function(event) {
        menu.style.height = `${menu.scrollHeight}px`;
        menuBars.classList.toggle("fa-bars");

        menuBars.classList.toggle("fa-times");
        if (!menuBars.classList.contains("fa-times")) {
            menu.style.height = "0px";
        }
    })

    document.body.addEventListener("click", function(event) {
        if (!event.target.matches(".brands-menu") && !event.target.matches(".brands-dropdown span")) {
            brandsMenu.style.height = "0px";
            brandsMenu.style.border = "none";
            menu.style.height = `${menu.scrollHeight - brandsMenu.scrollHeight}px`;
            brandsMenu.classList.remove("active");
        }
    });
    // Xử lý khi nhấn vào "Brands"
    let brands = document.querySelector(".brands-dropdown span");
    let brandsMenu = document.querySelector(".brands-menu");
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    brands.addEventListener("click", function(event) {
        brandsMenu.style.height = `${brandsMenu.scrollHeight}px`;
        if (vw < 768) {
            menu.style.height = `${menu.scrollHeight + brandsMenu.scrollHeight}px`;
        } else {
            brandsMenu.style.height = `${brandsMenu.scrollHeight}px`;
        }
        brandsMenu.style.border = "2px solid #fff";
        // active chỉ là 1 lớp không có làm gì hết để thực hiện toggle
        brandsMenu.classList.toggle("active");
        if (!brandsMenu.classList.contains("active")) {
            brandsMenu.style = "height: 0px; border: none";
            menu.style.height = `${menu.scrollHeight - brandsMenu.scrollHeight}px`;
        }
    })

    // =============================================================Xử lý liên quan đến Modal
    // Xử lý chung khi nhấn vào Modal 
    document.addEventListener("click", function(event) {
        // Nếu bấm vào modal thì cũng remove modal
        if (event.target.matches(".modal")) {
            event.target.parentNode.removeChild(event.target);
        }
        // Nếu bấm vào modal-search thì translate nó
        if (event.target.matches(".modal-search")) {
            event.target.style.transform = "translateX(100vw)"
        }
    })

    // Xử lý khi nhấn vào Login
    let logIn = document.querySelector(".log-in");
    logIn.addEventListener("click", function() {
        document.body.insertAdjacentHTML("beforeend", loginTem);
    })


    // Xử lý khi nhấn vào Search
    let searchButton = document.querySelector(".sidebar-search");
    if (searchButton) {
        searchButton.addEventListener("click", function() {
            document.querySelector(".modal-search").style.transform = "translateX(0vw)"
        })

        const searchWrapper = document.querySelector(".search-input");
        const inputBox = searchWrapper.querySelector("input");
        const suggBox = searchWrapper.querySelector(".autocom-box");
        const icon = searchWrapper.querySelector(".btn");
        let linkTag = searchWrapper.querySelector("a");
        let webLink;

        inputBox.onkeyup = (e) => {
            let userData = e.target.value; // Lấy giá trị của phím được nhấn
            let emptyArray = [];
            if (userData) {
                icon.onclick = () => {
                    webLink = `https://www.google.com/search?q=${userData}`;
                    linkTag.setAttribute("href", webLink);
                    linkTag.click();
                }

                // filter(): sẽ trả về 1 mảng phần tử thoả mãn function
                // data: phần tử trong mảng "suggestions"
                // Trả về phần tử data có giá trị bắt đầu bằng với giá trị của userData
                emptyArray = suggestions.filter((data) => {
                    return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                });

                // Bây giờ mảng "emptyArray" chứa các phần tử của mảng "suggestions" đã được lọc
                // Duyệt mảng "emptyArray" và gắn các phần tử đó vào trong thẻ <li>
                emptyArray = emptyArray.map((data) => {
                    return data = `<li>${data}</li>`;
                });
                searchWrapper.classList.add("active"); //show autocomplete box
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                // for (let i = 0; i < allList.length; i++) {
                //adding onclick attribute in all li tag
                // allList[i].setAttribute("onclick", "select(this)");
                allList.forEach((elem) => elem.onclick = () => {
                    let selectData = elem.textContent;
                    inputBox.value = selectData;
                    icon.onclick = () => {
                        webLink = `https://www.google.com/search?q=${selectData}`;
                        linkTag.setAttribute("href", webLink);
                        linkTag.click();
                    }
                    searchWrapper.classList.remove("active");
                })

            } else {
                searchWrapper.classList.remove("active"); //hide autocomplete box
            }
        }

        function showSuggestions(list) {
            let listData;
            if (!list.length) {
                listData = `<li>${inputBox.value}</li>`;
            } else {
                listData = list.join('');
            }
            suggBox.innerHTML = listData;
        }

    }
    // =============================================================Xử lý khi Scroll
    let header = document.querySelector("header");
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos < currentScrollPos) {
            header.style.display = "none";
            document.querySelector(".header-menu").style.display = "none";
        } else if (prevScrollpos > currentScrollPos) {
            header.style.display = "flex";
            document.querySelector(".header-menu").style.display = "block";
        }
        prevScrollpos = currentScrollPos;
    }

    // =============================================================Xử lý khi nhấn vào Chatbox
    let chatBoxButton = document.querySelector(".sidebar-chatbox");
    if (chatBoxButton) {
        chatBoxButton.addEventListener("click", function(e) {
            document.body.insertAdjacentHTML("beforeend", chatboxTem);
        })
        document.body.addEventListener("click", function(event) {
            if (event.target.matches(".chatbox-times"))
                event.target.parentNode.parentNode.parentNode.remove();
        })
    }


    // =============================================================Xử lý slider ảnh Hero
    let heroImage = document.querySelector(".hero-image img");
    let arr = ["./images/HERO/HeroImage2.png", "./images/HERO/HeroImage3.png", "./images/HERO/HeroImage.png"];

    if (heroImage) {
        setInterval(function() {
            heroImage.src = arr[Math.floor(Math.random() * arr.length)];
        }, 2000);
    }

    // =============================================================Xử lý Light & Dark Mode
    let lightButton = document.querySelector(".light-button");
    let darkButton = document.querySelector(".dark-button");
    const white = "#fff";
    const lightviolet = "#DDB9DA";
    darkButton.addEventListener("click", function() {
        document.body.style.backgroundColor = "#1E272D";
        document.querySelectorAll(".heading").forEach(item => item.style.backgroundImage = "linear-gradient( to right, #DDB9DA, #fff)");
        // ==============================Phần Header
        document.querySelector(".header").style = "background-image: linear-gradient( to right, #1E272D, #1E272D);";

        // ==============================Phần Hero
        document.querySelector("section.hero").style.backgroundImage = "none";
        document.querySelector(".hero-slogan h1").style.color = `${lightviolet}`;
        document.querySelector(".hero-slogan span").style.color = `${white}`;
        document.querySelector(".hero-slogan p").style.color = "#C2C3CA";
        document.querySelector(".hero-slogan .button .buy").style = `color: ${white}; border: 1px solid ${white}`;
        document.querySelector(".hero-slogan .button .buy").onmouseover = function() {
            document.querySelector(".hero-slogan .button .buy").style = "background-color: #803F95; color: #fff";
        }
        document.querySelector(".hero-slogan .button .buy").onmouseout = function() {
            document.querySelector(".hero-slogan .button .buy").style = "color: #fff; border: 1px solid #fff";
        }

        // ==============================Phần Label
        document.querySelector("section.label").style.backgroundColor = "#192025e5";
        document.querySelector(".label").style = "background-color: #192025e5";
        document.querySelector(".label-container").style = "background-color: #1e272d00; border:2px solid var(--violet)";
        document.querySelector(".label-bar").style = "background-color: #1E272D";

        // ==============================Phần Service
        document.querySelectorAll(".service .container .box").forEach(item => {
            item.style = "background-color: #192025e5; border: none";
        });

        document.querySelectorAll(".service .container .box .image").forEach(item => item.style.backgroundColor = "#1E272D");
        document.querySelectorAll(".service .container h2").forEach(item => item.style.color = `${lightviolet}`);
        document.querySelectorAll(".service .container span").forEach(item => item.style.color = "#C2C3CA");

        // ==============================Phần Feature
        document.querySelector("section.feature").style.backgroundColor = "#192025e5";
        document.querySelectorAll(".feature .box").forEach(item => item.style.border = "2px solid var(--violet)");
        document.querySelectorAll(".feature .box span").forEach(item => item.style.color = "#C2C3CA");
        document.querySelectorAll(".feature .box li").forEach(item => item.style.color = "#C2C3CA");
        document.querySelectorAll(".details-hidden label").forEach(item => {
            item.style.color = `${lightviolet}`;
        });
        document.querySelectorAll(".details-unhidden h2").forEach(item => {
            item.style.color = `${lightviolet}`;
        });

        // ==============================Phần Footer
        document.querySelector("footer").style = "background-color: #192025e5; background-image: none";
        document.querySelector(".background").style.opacity = "0";
        document.querySelector(".footer-logo").style.backgroundColor = "#192025e5";
        document.querySelectorAll(".boxfoot h2").forEach(item => item.style.color = `${lightviolet}`);
        document.querySelectorAll(".boxfoot li").forEach(item => item.style.color = "#C2C3CA");
        document.querySelectorAll(".boxfoot li a").forEach(item => item.style.color = "#C2C3CA");
        document.querySelectorAll(".boxfoot").forEach(item => {
            item.style = "box-shadow: 5px 5px 14px #0e1215, -5px -5px 14px #243037;"
            item.onmouseover = function() {
                item.style = "box-shadow: inset 5px 5px 14px #0e1215, inset -5px -5px 14px #243037;";
            }
            item.onmouseout = function() {
                item.style = "box-shadow: 5px 5px 14px #0e1215, -5px -5px 14px #243037";
            }
        });
    });


    lightButton.addEventListener("click", function() {
        document.body.style.backgroundColor = "#fff";
        document.querySelector(".background").style.opacity = "1";
        document.querySelectorAll(".heading").forEach(item => item.style.backgroundImage = "linear-gradient(to right, #313866, #803F95)");

        // ==============================Phần Header
        document.querySelector(".header").style = "linear-gradient(90deg, #313866, #814096);";

        // ==============================Phần Hero
        document.querySelector("section.hero").style.backgroundImage = "url(../images/HeroBackground.png";
        document.querySelector(".hero-slogan h1").style.color = "#803F95";
        document.querySelector(".hero-slogan span").style.color = "#313866";
        document.querySelector(".hero-slogan p").style.color = "#313866";
        document.querySelector(".hero-slogan .button .buy").style = "color: #803F95";
        document.querySelector(".hero-slogan .button .buy").onmouseover = function() {
            document.querySelector(".hero-slogan .button .buy").style = "background-color: #803F95; color: #fff";
        }
        document.querySelector(".hero-slogan .button .buy").onmouseout = function() {
            document.querySelector(".hero-slogan .button .buy").style = "color: #803F95; border: 1px solid #803F95";
        }

        // ==============================Phần Label
        document.querySelector("section.label").style.backgroundColor = "#fff";
        document.querySelector(".label-container").style = "background-color: none; box-shadow: none";
        document.querySelector(".label-bar").style = "background-color: #B8ABCC";

        // ==============================Phần Service
        document.querySelectorAll(".service .container .box").forEach(item => {
            item.style.backgroundColor = "#fff";
            item.style.border = " 2px solid #313866";
        });

        document.querySelectorAll(".service .container .box .image").forEach(item => item.style.backgroundColor = "#fff");
        document.querySelectorAll(".service .container h2").forEach(item => item.style.color = "#313866");
        document.querySelectorAll(".service .container span").forEach(item => item.style.color = "#313866");

        // ==============================Phần Feature
        document.querySelector("section.feature").style.backgroundColor = "#fff";
        document.querySelectorAll(".feature .box").forEach(item => item.style.border = "2px solid var(--violet)");
        document.querySelectorAll(".feature .box span").forEach(item => item.style.color = "var(--violet)");
        document.querySelectorAll(".feature .box li").forEach(item => item.style.color = "var(--violet)");
        document.querySelectorAll(".details-hidden label").forEach(item => {
            item.style.color = "#313866";
        });
        document.querySelectorAll(".details-unhidden h2").forEach(item => {
            item.style.color = "#313866";
        });

        // ==============================Phần Footer
        document.querySelector("footer").style = "background-color: #313866; background-image: url(../images/FooterBack.png);";
        document.querySelector(".background").style.opacity = "0";
        document.querySelectorAll(".boxfoot h2").forEach(item => item.style.color = "#313866");
        document.querySelectorAll(".boxfoot li").forEach(item => item.style.color = "#313866");
        document.querySelectorAll(".boxfoot li a").forEach(item => item.style.color = "#313866");
        document.querySelector(".footer-logo").style.backgroundColor = "#313866";
        document.querySelectorAll(".boxfoot").forEach(item => {
            item.style = "pointer-events: none;"
        });
    })

    // =============================================================Custom con trỏ
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', e => {
        cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
    })
    document.addEventListener('click', () => {
        cursor.classList.add("expand");

        setTimeout(() => {
            cursor.classList.remove("expand");
        }, 500)
    })


    // =============================================================Scroll to top
    document.querySelector(".footer-logo ion-icon").addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })

})