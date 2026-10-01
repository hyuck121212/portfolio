/* =====================================================================
   main.js
   화면에 꼭 필요한 동작만 넣었습니다.

   [적용 개념] 주의 — 지금 보고 있는 섹션이 메뉴에서 강조되면,
   사용자가 페이지 안에서 자기 위치를 계속 확인할 수 있습니다.
   ===================================================================== */
(function () {
  'use strict';

  var links = document.querySelectorAll('.site-nav a[href^="#"]');
  if (!links.length) return;

  // href="#works" → 실제 섹션 요소를 미리 찾아둡니다.
  var targets = [];
  links.forEach(function (link) {
    var el = document.querySelector(link.getAttribute('href'));
    if (el) targets.push({ link: link, section: el });
  });

  // IntersectionObserver를 지원하지 않는 브라우저에서는 그냥 아무것도 하지 않음
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var match = targets.find(function (t) { return t.section === entry.target; });
      if (!match) return;

      if (entry.isIntersecting) {
        // 강조는 한 번에 하나만 — 여러 개가 동시에 강조되면 강조가 아니게 됩니다.
        targets.forEach(function (t) {
          t.link.style.color = '';
          t.link.removeAttribute('aria-current');
        });
        match.link.style.color = 'var(--accent)';
        match.link.setAttribute('aria-current', 'true');
      }
    });
  }, {
    // 화면 중앙 부근에 들어온 섹션을 '현재 섹션'으로 봅니다.
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
  });

  targets.forEach(function (t) { observer.observe(t.section); });
})();
