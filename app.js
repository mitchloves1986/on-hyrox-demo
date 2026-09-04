(function () {
  if (
    window.__wxjs_environment === "miniprogram"
    || /miniProgram/i.test(navigator.userAgent || "")
  ) {
    document.documentElement.classList.add("in-mp");
  }

  var ON_SHORT_LINK = "#小程序://On昂跑/DkogaZ0vkvCkRFh";
  var ON_APP_ID = "";
  var PRODUCTS = {
    x5: {
      name: "Cloud X 5",
      path: "shopPages/productDetail/productDetail?styleSku=3WG3006&productId=3WG30065101&utm_channel=Paid_Social&utm_source=roxscan&utm_medium=product_tempopro&utm_time=202609",
    },
    tempo: {
      name: "Cloud X Tempo",
      path: "shopPages/productDetail/productDetail?styleSku=3WG3009&productId=3WG30095084&utm_channel=Paid_Social&utm_source=roxscan&utm_medium=product_tempo&utm_time=202609",
    },
    tempoPro: {
      name: "Cloud X Tempo Pro",
      path: "shopPages/productDetail/productDetail?styleSku=3MH1033&productId=3MH10335109&utm_channel=Paid_Social&utm_source=roxscan&utm_medium=product_tempopro&utm_time=202609",
    },
  };

  var sheets = {
    officer: {
      kicker: "PRODUCT TEST",
      title: "产品体验官",
      action: "提交体验官申请",
      html:
        "<p>完赛选手试穿 Cloud X，把工位脚感交回来。</p>" +
        "<ul><li>试穿指定 Cloud X</li><li>提交一场脚感记录</li></ul>",
      kind: "recruit",
    },
    elite: {
      kicker: "ELITE TEAM",
      title: "精英战队",
      action: "提交战队申请",
      html:
        "<p>成绩达标选手代表昂跑出战。</p>" +
        "<ul><li>门槛与名额以正式口径为准</li></ul>",
      kind: "recruit",
    },
  };

  var mask = document.getElementById("sheetMask");
  var kicker = document.getElementById("sheetKicker");
  var title = document.getElementById("sheetTitle");
  var body = document.getElementById("sheetBody");
  var action = document.getElementById("sheetAction");
  var closeBtn = document.getElementById("sheetClose");
  var current = null;

  function openSheet(key) {
    current = sheets[key];
    if (!current) return;
    kicker.textContent = current.kicker;
    title.textContent = current.title;
    body.innerHTML = current.html;
    action.textContent = current.action;
    mask.hidden = false;
    mask.classList.remove("hidden");
  }

  function closeSheet() {
    mask.hidden = true;
    mask.classList.add("hidden");
    current = null;
  }

  function openOnProduct(key) {
    var product = PRODUCTS[key];
    if (!product) return;
    var mp = window.wx && window.wx.miniProgram;
    if (mp && typeof mp.navigateTo === "function") {
      mp.navigateTo({
        url:
          "/pages/webview/on-shop?name=" +
          encodeURIComponent(product.name) +
          "&path=" +
          encodeURIComponent(product.path) +
          "&shortLink=" +
          encodeURIComponent(ON_SHORT_LINK) +
          "&appId=" +
          encodeURIComponent(ON_APP_ID),
      });
      return;
    }
    kicker.textContent = "ON";
    title.textContent = "即刻选购 " + product.name;
    body.innerHTML = "<p>将打开昂跑小程序对应鞋款页。</p>";
    action.textContent = "知道了";
    current = { kind: "info" };
    mask.hidden = false;
    mask.classList.remove("hidden");
  }

  document.querySelectorAll("[data-product]").forEach(function (el) {
    el.addEventListener("click", function () {
      openOnProduct(el.getAttribute("data-product"));
    });
  });

  document.querySelectorAll(".entry").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openSheet(btn.getAttribute("data-entry"));
    });
  });

  closeBtn.addEventListener("click", closeSheet);
  mask.addEventListener("click", function (event) {
    if (event.target === mask) closeSheet();
  });
  action.addEventListener("click", closeSheet);
})();
