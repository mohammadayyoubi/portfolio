(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ================= I18N ================= */
  // English lives in the HTML; Arabic overrides come from here.
  var AR = {
    'nav.about': 'نبذة',
    'nav.experience': 'الخبرات',
    'nav.projects': 'المشاريع',
    'nav.skills': 'المهارات',
    'nav.contact': 'تواصل',

    'hero.status': 'متاح لفرص عمل جديدة · بيروت، لبنان',
    'hero.first': 'محمد',
    'hero.last': 'الأيوبي',
    'hero.iam': 'أنا',
    'hero.sub': 'خريج علوم حاسوب، أبني تطبيقات ويب متكاملة، وأحافظ على عمل الشبكات بكفاءة، وأعلّم الجيل القادم البرمجة.',
    'hero.cta1': 'شاهد أعمالي',
    'hero.cta2': 'تحميل السيرة الذاتية',
    'hero.scroll': 'مرّر',

    'about.title': 'من أنا',
    'about.lead': 'أعمل حيث يلتقي الكود بالبنية التحتية وبالناس.',
    'about.p1': 'تخرّجت في علوم الحاسوب من جامعة العلوم والآداب اللبنانية (USAL)، وحصل مشروع تخرّجي على العلامة الكاملة 100/100. أبني تطبيقات متكاملة باستخدام ASP.NET Core وFlask وأدوات الواجهات الحديثة — وأنا مرتاح بالقدر نفسه في إعداد الشبكات، وإحياء حاسوب بطيء، أو تهيئة Windows Server.',
    'about.p2': 'بصفتي شريكاً مؤسساً في TechWrap، أقود تطوير البرمجيات وخدمات تكنولوجيا المعلومات للأفراد والشركات. عملت عن بُعد مع فريق متعدد الجنسيات في Netways على أنظمة هيئة الصحة بدبي، واليوم أدرّس أيضاً البرمجة ومهارات الحاسوب في لوياك لبنان.',
    'edu.degree': 'بكالوريوس في علوم الحاسوب',
    'edu.school': 'جامعة العلوم والآداب اللبنانية (USAL) · بيروت',
    'edu.date': 'أيلول 2022 — كانون الأول 2025',
    'stat.fyp': 'علامة مشروع التخرّج',
    'stat.gold': 'الميدالية الذهبية — معسكر CodeCrafters',
    'stat.roles': 'أدوار في التقنية والتعليم والعمل الأهلي',
    'stat.repos': 'مشروعاً منشوراً على GitHub',

    'exp.title': 'الخبرات',
    'tag.edu': 'تعليم',
    'tag.founder': 'مؤسس',
    'tag.intern': 'تدريب',
    'tag.uni': 'جامعة',
    'tag.ngo': 'عمل إنساني',
    'loc.beirut': 'بيروت، لبنان',

    'exp1.date': 'تشرين الأول 2026 — حتى الآن',
    'exp1.role': 'مدرّب برمجة ومهارات حاسوب',
    'exp1.org': 'جمعية لوياك لبنان',
    'exp1.type': 'دوام جزئي · بيروت',
    'exp1.b1': 'تدريس دورات بدوام جزئي في مهارات الحاسوب وتطوير الويب.',

    'exp2.date': '2024 — حتى الآن',
    'exp2.role': 'شريك مؤسس وقائد تطوير البرمجيات',
    'exp2.b1': 'شاركت في تأسيس TechWrap، شركة خدمات تقنية تقدّم تطوير البرمجيات، والدعم التقني ودعم الشبكات، وأنظمة الأمان وكاميرات المراقبة (CCTV)، وبيع المنتجات التقنية، والصيانة للأفراد والشركات.',
    'exp2.b2': 'أترأس قسم تطوير البرمجيات، وأتولّى مسؤولية تخطيط حلول الويب والبرمجيات الخاصة بالشركة وبنائها وتسليمها.',
    'exp2.b3': 'تقديم خدمات تقنية تشمل صيانة الحواسيب، وتثبيت أنظمة التشغيل، وإزالة البرمجيات الخبيثة، وترقية SSD/RAM، والنسخ الاحتياطي للبيانات، وتحسين أداء الأنظمة، وإعداد الشبكات.',

    'exp3.date': 'آب 2025',
    'exp3.role': 'متدرّب مطوّر ويب متكامل',
    'exp3.loc': 'دبي، الإمارات (عن بُعد)',
    'exp3.b1': 'تنفيذ مهام تطوير متكاملة باستخدام ASP.NET Core MVC.',
    'exp3.b2': 'المساهمة في وحدات هيئة الصحة بدبي، بما فيها أتمتة سير العمل ولوحات التقارير.',
    'exp3.b3': 'التعاون مع فريق هندسي متعدد الجنسيات وفق منهجية Agile/Scrum.',

    'exp4.date': 'أيلول 2024 وأيلول 2025',
    'exp4.role': 'مرشد طلابي',
    'exp4.org': 'جامعة USAL',
    'exp4.b1': 'إرشاد طلاب علوم الحاسوب ودعم تسجيل المقررات عبر نظام UMS.',
    'exp4.b2': 'تقديم تقارير يومية عن سير العمل وتوضيح متطلبات القسم.',

    'exp5.date': 'أيلول 2024 — كانون الأول 2024',
    'exp5.role': 'قائد قطاع',
    'exp5.b1': 'قيادة قطاع التبرّع بالفرش والأغطية خلال أزمة لبنان 2024، وتنسيق المتطوعين والعمليات اللوجستية.',
    'exp5.b2': 'جمع البيانات الميدانية وتقييم احتياجات مراكز الإيواء لدعم التوزيع الفعّال للموارد والمساعدات الإنسانية.',

    'proj.title': 'مشاريع مختارة',
    'proj.ai': 'مدعوم بالذكاء الاصطناعي',
    'proj.mobile': 'تطبيق جوال',
    'proj.gold': '🥇 الميدالية الذهبية',
    'proj.github': 'GitHub',
    'proj.more': '// المزيد من المختبر',
    'p1.name': 'نظام إدارة تأجير السيارات',
    'p1.desc': 'منصة تأجير متكاملة بوحدات حسب الدور للمدير والموظف والعميل — حجز المركبات، وإدارة الإيجارات، ومسار الدفع، وسجل التدقيق، وإدارة الشركة، مبنية على بنية طبقية نظيفة. ويتولّى روبوت محادثة Gemini مرتبط بقاعدة البيانات، مع محادثة فورية وخدمة بريد إلكتروني، دعمَ العملاء.',
    'p2.name': 'نظام إدارة العقارات',
    'p2.desc': 'إدارة مستخدمين تشمل المصادقة والصلاحيات وسجل التدقيق والقائمة السوداء، مع روبوت محادثة ذكي للدعم الآلي وخدمة بريد للإشعارات — كل ذلك على بنية Flask Blueprint.',
    'p3.name': 'تطبيق IPTV لأندرويد',
    'p3.desc': 'تطبيق IPTV لأندرويد مع بث مباشر، وحفظ القنوات في SQLite، ومصادقة Firebase.',
    'p4.name': 'موقع استضافة أفلام',
    'p4.desc': 'واجهة أمامية متجاوبة بالكامل لموقع بث أفلام ومسلسلات وأنمي، بنيتها مع فريقي في معسكر CodeCrafters — حيث فزنا بالميدالية الذهبية.',
    'more.ums': 'نظام إدارة جامعة',
    'more.snake3d': 'لعبة الأفعى ثلاثية الأبعاد',
    'more.snake': 'لعبة الأفعى',
    'more.bash': 'مدير ملفات من الطرفية',
    'more.scraper': 'أداة استخراج بيانات الويب',
    'more.cinema': 'موقع حجز سينما',

    'skills.title': 'أدواتي',
    'skills.lang': 'لغات البرمجة',
    'skills.fw': 'أطر العمل',
    'skills.net': 'الشبكات والأنظمة',
    'skills.tools': 'الأدوات',
    'skills.soft': 'المهارات الشخصية',
    'soft.1': 'قيادة الفرق',
    'soft.2': 'إدارة الوقت',
    'soft.3': 'حل المشكلات',
    'soft.4': 'العمل الجماعي',
    'soft.5': 'العمل تحت الضغط',
    'soft.6': 'التدريس',
    'soft.7': 'العربية والإنجليزية',

    'contact.title': 'تواصل',
    'contact.big1': 'لنبنِ معاً',
    'contact.big2': 'شيئاً رائعاً.',
    'contact.sub': 'منفتح على فرص في هندسة البرمجيات، وتطوير الويب، والدعم التقني، وإدارة الشبكات — وعلى المشاريع الحرة عبر TechWrap.',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'هاتف / واتساب',

    'footer.name': 'محمد الأيوبي',
    'footer.made': 'صُمّم وبُني في بيروت',
    'footer.top': 'العودة للأعلى ↑'
  };
  Object.assign(AR, {
    'hero.hello': 'مرحباً، أنا',
    'fc.fyp': 'مشروع التخرّج',
    'fc.gold': 'الميدالية الذهبية',
    'fc.cofounder': 'شريك مؤسس'
  });

  var ROLES = {
    en: ['Software Developer', 'Full-Stack Engineer', 'IT & Network Specialist', 'Coding Instructor', 'Co-Founder @ TechWrap'],
    ar: ['مطوّر برمجيات', 'مهندس ويب متكامل', 'أخصائي شبكات وتقنية', 'مدرّب برمجة', 'شريك مؤسس في TechWrap']
  };

  var TITLES = {
    en: 'Mohammad Al Ayoubi — Portfolio',
    ar: 'محمد الأيوبي — معرض الأعمال'
  };

  var nodes = document.querySelectorAll('[data-i18n]');
  var EN = {};
  nodes.forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in EN)) EN[k] = el.textContent;
  });

  var lang = root.lang === 'ar' ? 'ar' : 'en';

  // Split hero name into animated pieces: letters in English, whole words in
  // Arabic (splitting Arabic letters would break their joined forms).
  function splitText(el) {
    if (el.classList.contains('grad')) return;
    var text = el.textContent;
    var parts = lang === 'ar' ? text.split(/(\s+)/) : Array.from(text);
    el.setAttribute('aria-label', text);
    el.innerHTML = '';
    parts.forEach(function (p, i) {
      if (!p) return;
      var s = document.createElement('span');
      s.className = 'ch' + (/^\s+$/.test(p) ? ' sp' : '');
      s.setAttribute('aria-hidden', 'true');
      s.style.setProperty('--i', i);
      s.textContent = /^\s+$/.test(p) ? ' ' : p;
      el.appendChild(s);
    });
  }

  function applyLang(l) {
    lang = l;
    root.lang = l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
    var dict = l === 'ar' ? AR : EN;
    cancelScrambles();
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-split]').forEach(splitText);
    document.title = TITLES[l];
    restartRotator();
    requestAnimationFrame(moveNavPill);
  }

  document.getElementById('langBtn').addEventListener('click', function () {
    var next = lang === 'ar' ? 'en' : 'ar';
    store('lang', next);
    if (reduceMotion) return applyLang(next);
    body.classList.add('swapping');
    setTimeout(function () {
      applyLang(next);
      body.classList.remove('swapping');
    }, 260);
  });

  /* ================= THEME ================= */
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = root.getAttribute('data-theme');
    return t ? t === 'dark' : mq.matches;
  }
  document.getElementById('themeBtn').addEventListener('click', function (e) {
    var next = isDark() ? 'light' : 'dark';
    function swap() {
      root.setAttribute('data-theme', next);
      store('theme', next);
    }
    if (!document.startViewTransition || reduceMotion) return swap();
    // Circular reveal of the new theme from the button
    var r = e.currentTarget.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var t = document.startViewTransition(swap);
    t.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + end + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 700, easing: 'cubic-bezier(.76,0,.24,1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  });

  /* ================= MOBILE MENU ================= */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ================= NAV: pill, hide-on-scroll, progress ================= */
  var nav = document.querySelector('.nav');
  var pill = document.getElementById('navPill');
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a'));
  var progress = document.getElementById('progress');
  var lastY = window.scrollY;

  function moveNavPill(target) {
    var a = (target && target.tagName === 'A') ? target : navLinks.querySelector('a.active');
    if (!a) { pill.style.opacity = 0; return; }
    pill.style.opacity = 1;
    pill.style.width = a.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + a.offsetLeft + 'px)';
  }
  links.forEach(function (a) {
    a.addEventListener('mouseenter', function () { moveNavPill(a); });
  });
  navLinks.addEventListener('mouseleave', function () { moveNavPill(); });

  var tl = document.getElementById('timeline');
  var tProg = document.getElementById('tProgress');

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    nav.classList.toggle('scrolled', y > 20);
    var menuOpen = navLinks.classList.contains('open');
    nav.classList.toggle('hide', !menuOpen && y > lastY && y > 400);
    lastY = y;

    // Timeline rail fills as you scroll through it
    var r = tl.getBoundingClientRect();
    var p = (innerHeight * 0.6 - r.top) / r.height;
    tProg.style.setProperty('--p', Math.max(0, Math.min(1, p)));
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
      });
      moveNavPill();
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

  /* ================= SCRAMBLE HEADINGS ================= */
  var GLYPHS = '!<>-_\\/[]{}—=+*^?#01';
  var scrambles = [];
  function cancelScrambles() {
    scrambles.forEach(cancelAnimationFrame);
    scrambles = [];
  }
  function scramble(el) {
    if (reduceMotion || lang === 'ar') return;
    var target = el.textContent, frame = 0, total = 28;
    (function tick() {
      var out = '';
      for (var i = 0; i < target.length; i++) {
        var reveal = (i / target.length) * total * 0.7;
        out += (frame >= reveal + 6 || target[i] === ' ') ? target[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (frame++ < total + 6) scrambles.push(requestAnimationFrame(tick));
      else el.textContent = target;
    })();
  }

  /* ================= REVEAL + COUNTERS ================= */
  function countUp(el) {
    var to = +el.getAttribute('data-to');
    if (reduceMotion) { el.textContent = to; return; }
    var start = performance.now(), dur = 1600;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('in');
      el.querySelectorAll('.count').forEach(countUp);
      var h = el.querySelector('[data-scramble]');
      if (h) scramble(h);
      revealer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function startReveals() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      var sibs = el.parentElement.querySelectorAll(':scope > .reveal');
      var i = Array.prototype.indexOf.call(sibs, el);
      el.style.transitionDelay = Math.min(i * 90, 450) + 'ms';
      revealer.observe(el);
    });
  }
  // once revealed, drop the stagger so hover transitions feel instant
  document.addEventListener('transitionend', function (e) {
    var el = e.target;
    if (el.classList && el.classList.contains('reveal') && el.classList.contains('in') && e.propertyName === 'opacity') {
      el.style.transitionDelay = '';
    }
  });

  document.querySelectorAll('.chips.pop').forEach(function (ul) {
    Array.prototype.forEach.call(ul.children, function (li, i) { li.style.setProperty('--i', i); });
  });

  /* ================= CARD SPOTLIGHT + TILT ================= */
  document.querySelectorAll('.glow-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      if (finePointer && !reduceMotion && card.classList.contains('tilt') && card.classList.contains('in')) {
        var rx = ((y / r.height) - 0.5) * -8;
        var ry = ((x / r.width) - 0.5) * 8;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
      }
    });
    card.addEventListener('pointerleave', function () { card.style.transform = ''; });
  });

  /* ================= MAGNETIC BUTTONS ================= */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.35 + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }

  /* ================= CURSOR GLOW + ORBIT PARALLAX ================= */
  var glow = document.getElementById('cursorGlow');
  var orbit = document.getElementById('orbitWrap');
  var mouse = { x: -9999, y: -9999 }, gx = innerWidth / 2, gy = innerHeight / 2;
  window.addEventListener('pointermove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });

  if (finePointer && !reduceMotion) {
    (function follow() {
      if (mouse.x > -9999) {
        gx += (mouse.x - gx) * 0.12;
        gy += (mouse.y - gy) * 0.12;
        glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)';
        var dx = (mouse.x / innerWidth - 0.5), dy = (mouse.y / innerHeight - 0.5);
        if (window.scrollY < innerHeight) {
          orbit.style.transform = 'rotateX(' + (-dy * 10) + 'deg) rotateY(' + (dx * 10) + 'deg)';
        }
      }
      requestAnimationFrame(follow);
    })();
  } else {
    glow.style.display = 'none';
  }

  /* ================= ROLE ROTATOR ================= */
  var rot = document.getElementById('rotator');
  var rotTimer = null;
  function restartRotator() {
    clearTimeout(rotTimer);
    var words = ROLES[lang], wi = 0, ci = words[0].length, deleting = false;
    rot.textContent = words[0];
    if (reduceMotion) return;
    function step() {
      var w = words[wi];
      if (!deleting) {
        ci++;
        rot.textContent = w.slice(0, ci);
        if (ci >= w.length) { deleting = true; rotTimer = setTimeout(step, 1900); return; }
        rotTimer = setTimeout(step, 65);
      } else {
        ci--;
        rot.textContent = w.slice(0, ci);
        if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; rotTimer = setTimeout(step, 250); return; }
        rotTimer = setTimeout(step, 32);
      }
    }
    rotTimer = setTimeout(function () { deleting = true; step(); }, 2400);
  }

  /* ================= NETWORK CANVAS ================= */
  var canvas = document.getElementById('net');
  var ctx = canvas.getContext('2d');
  var pts = [], W = 0, H = 0, dpr = 1;

  function nodeColor() {
    return getComputedStyle(root).getPropertyValue('--node').trim() || '37,99,235';
  }
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.round(Math.min(80, (W * H) / 20000));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + 0.8 });
    }
  }
  function draw() {
    var c = nodeColor();
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (!reduceMotion) {
        // gently pushed away from the cursor
        var mdx = p.x - mouse.x, mdy = p.y - mouse.y, md2 = mdx * mdx + mdy * mdy;
        if (md2 < 12000) { p.x += mdx * 0.015; p.y += mdy * 0.015; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
        if (d < 16000) {
          ctx.strokeStyle = 'rgba(' + c + ',' + (0.16 * (1 - d / 16000)) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      var md = (p.x - mouse.x) * (p.x - mouse.x) + (p.y - mouse.y) * (p.y - mouse.y);
      if (md < 30000) {
        ctx.strokeStyle = 'rgba(34,211,238,' + (0.45 * (1 - md / 30000)) + ')';
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(' + c + ',.45)';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  window.addEventListener('resize', function () { resize(); if (reduceMotion) draw(); moveNavPill(); });
  resize(); draw();

  /* ================= PRELOADER ================= */
  var pre = document.getElementById('preloader');
  var plCount = document.getElementById('plCount');
  var plBar = document.getElementById('plBar');

  function finishLoading() {
    pre.classList.add('done');
    body.classList.remove('loading');
    body.classList.add('ready');
    startReveals();
    onScroll();
    setTimeout(function () { pre.remove(); }, 1100);
  }

  /* ================= INIT ================= */
  document.getElementById('year').textContent = new Date().getFullYear();
  applyLang(lang);

  if (reduceMotion) {
    finishLoading();
  } else {
    var loaded = document.readyState === 'complete';
    window.addEventListener('load', function () { loaded = true; });
    var n = 0;
    (function tick() {
      // advance quickly to 90, then wait for the page to finish loading
      n += loaded ? 6 : (n < 90 ? 3 : 0);
      n = Math.min(n, 100);
      plCount.textContent = n;
      plBar.style.width = n + '%';
      if (n < 100) setTimeout(tick, 24);
      else setTimeout(finishLoading, 200);
    })();
  }
})();
