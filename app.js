(function () {
  var ON_MINIPROGRAM_APPID = "";
  var ON_MINIPROGRAM_PATH = "";

  var sheets = {
    miniProgram: {
      kicker: "ON MINI PROGRAM",
      title: "进入昂跑小程序",
      action: "打开昂跑小程序",
      html:
        "<p>产品详情、鞋款与官方渠道走昂跑自己的小程序，不在 Roxscan 福利中心里完成。</p>" +
        "<ul><li>正式环境：Roxscan 打开昂跑小程序（需昂跑提供 appId / 落地页路径）。</li>" +
        "<li>当前是 Demo，用于给品牌看跳转位置。</li></ul>",
      kind: "miniprogram",
    },
    officer: {
      kicker: "PRODUCT TEST",
      title: "产品体验官",
      action: "提交体验官申请",
      html:
        "<p>面向本赛季完赛选手。穿上 Cloud X 上场，把工位脚感和跑段反馈交回来。</p>" +
        "<ul><li>试穿指定 Cloud X 鞋款</li>" +
        "<li>提交一场比赛的脚感记录</li>" +
        "<li>可选：出镜或内容合作</li></ul>" +
        "<p>正式报名表与名额由昂跑确认。Demo 只展示入口。</p>",
      kind: "recruit",
    },
    elite: {
      kicker: "ELITE TEAM",
      title: "精英战队",
      action: "提交战队申请",
      html:
        "<p>面向成绩达标选手。代表昂跑出战，获得战队身份与赛场露出。</p>" +
        "<ul><li>成绩门槛、名额与任务以昂跑正式口径为准</li>" +
        "<li>完赛露出、装备支持在入选后通知</li></ul>" +
        "<p>正式报名表与审核在入口接通后进行。Demo 只展示入口。</p>",
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

  function jumpToOnMiniProgram() {
    action.textContent = ON_MINIPROGRAM_APPID
      ? "正在打开昂跑小程序…"
      : "Demo：待接入昂跑 appId";
  }

  document.getElementById("openOnMiniProgram").addEventListener("click", function () {
    openSheet("miniProgram");
  });

  document.querySelectorAll(".product-card").forEach(function (card) {
    card.addEventListener("click", function () {
      openSheet("miniProgram");
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSheet("miniProgram");
      }
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

  action.addEventListener("click", function () {
    if (!current) return;
    if (current.kind === "miniprogram") {
      jumpToOnMiniProgram();
      return;
    }
    action.textContent = "Demo：报名入口已记录位置";
  });
})();
