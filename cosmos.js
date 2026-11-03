// Cosmos 3D Engine for Lakshay Papneja Interactive Portfolio
// 8 Real Career, Venture, Education & Achievement Milestones in 3D Space

(function() {
  const canvas = document.getElementById("c");
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0b, 0.0014);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2400);
  camera.position.set(0, 0, 420);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 8 Core Milestones from Lakshay Papneja's Resume
  const milestones = [
    {
      id: "thirdbase-vc",
      name: "ThirdBase Capital",
      category: "NYC Venture Capital • Feb '26 – Present",
      stat: "$500K LP Sourced",
      subStat: "3,000+ VP Database • 2 Co-Investments",
      desc: "Sourced a $500K LP investor & advisor. Built a 50+ US senior technologist network & 3,000+ VP engineering database.",
      color: "#34d399",
      z: 240
    },
    {
      id: "aviva-ceo",
      name: "Aviva India — CEO's Office",
      category: "Strategy & Partnerships • Gurugram",
      stat: "15+ B2B Partnerships",
      subStat: "Fitelo (₹100Cr+) • Conversion 1% → 2%",
      desc: "Led end-to-end partnership with Fitelo (₹100Cr+ rev) & 15+ B2B alliances. Doubled funnel conversion from 1% to 2%.",
      color: "#60a5fa",
      z: 90
    },
    {
      id: "2cents-hedge",
      name: "2Cents Capital (Dubai)",
      category: "$25M AUM Hedge Fund • Research Analyst (PPO)",
      stat: "40+ Derivatives Alpha",
      subStat: "0-to-1 Growth • 30% Faster GTM",
      desc: "First intern cohort in 0-to-1 phase. Onboarded 3+ custodians & 5+ brokers across India, Dubai & GIFT City.",
      color: "#f59e0b",
      z: -60
    },
    {
      id: "masters-union",
      name: "Masters' Union",
      category: "PGP Tech & Business Management • 2025 – Present",
      stat: "Top 5% Merit Scholar",
      subStat: "Investment Fund (13 / 330+)",
      desc: "Selected 1 of 13 members in the student-run Investment Fund. Awarded 25% Merit Scholarship (top 5% of 330+ cohort).",
      color: "#a78bfa",
      z: -210
    },
    {
      id: "josh-talks",
      name: "Josh Talks Speaker",
      category: "10M+ Subscriber Platform • Featured Speaker",
      stat: "2M+ Views",
      subStat: "5M+ Impressions Across Platforms",
      desc: "Invited to speak on equity markets, investing psychology, and early career learnings, reaching 2M+ viewers.",
      color: "#f43f5e",
      z: -360
    },
    {
      id: "pegster-ventures",
      name: "Pegster & Scrapers.tech",
      category: "Founder & Builder • E-Commerce & AI Data",
      stat: "₹4,00,000+ in 2 Mo",
      subStat: "24 Cloud Scrapers • 500K+ Content Views",
      desc: "Scaled Pegster to ₹4L+ sales in 2 months. Built Scrapers.tech with 24 public monetized Apify actors & 500K+ YouTube/Reels views.",
      color: "#2dd4bf",
      z: -510
    },
    {
      id: "papneja-associates",
      name: "Papneja Associates",
      category: "Tax & Financial Advisory • 2020 – 2024",
      stat: "₹1 Cr+ Tax Saved",
      subStat: "₹5 Cr+ Portfolios • 2,000+ Filings",
      desc: "Advised 100+ SMEs, structured ₹5Cr+ SIP/SWP portfolios, handled 2,000+ tax filings (99% accuracy) & automated workflows by 30%.",
      color: "#eab308",
      z: -660
    },
    {
      id: "scholars-honours",
      name: "Reliance Scholar & Honours",
      category: "National Scholarships & Athletics",
      stat: "Top 5,000 / 50,000+",
      subStat: "CA Foundation 1st Attempt • State Badminton",
      desc: "Reliance Foundation Undergraduate Scholar (₹1.5L), cleared CA Foundation 1st attempt, IIIT Una speaker & Haryana State Badminton.",
      color: "#38bdf8",
      z: -810
    }
  ];

  window.PORTFOLIO_MILESTONES = milestones;

  function roundRectPolyfill(ctx, x, y, w, h, r) {
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
  }

  function createCardTexture(item, index) {
    const c = document.createElement("canvas");
    c.width = 640;
    c.height = 380;
    const ctx = c.getContext("2d");

    // Card dark background
    ctx.fillStyle = "#111216";
    roundRectPolyfill(ctx, 0, 0, 640, 380, 28);
    ctx.fill();

    // Subtle top-left radial glow with item accent color
    const grad = ctx.createRadialGradient(80, 40, 10, 220, 180, 480);
    grad.addColorStop(0, item.color + "24");
    grad.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    roundRectPolyfill(ctx, 0, 0, 640, 380, 28);
    ctx.fill();

    // Outer border
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    roundRectPolyfill(ctx, 2, 2, 636, 376, 26);
    ctx.stroke();

    // Index & Category header
    ctx.fillStyle = item.color;
    ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Inter Tight', sans-serif";
    ctx.fillText(`0${index + 1}  •  ${item.category.toUpperCase()}`, 42, 58);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 48px 'Instrument Serif', Georgia, serif";
    ctx.fillText(item.name, 42, 122);

    // Description wrapped
    ctx.fillStyle = "rgba(242, 242, 242, 0.76)";
    ctx.font = "22px -apple-system, BlinkMacSystemFont, 'Inter Tight', sans-serif";
    const words = item.desc.split(" ");
    let line = "";
    let y = 176;
    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > 556) {
        ctx.fillText(line, 42, y);
        line = w + " ";
        y += 32;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, 42, y);

    // Divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.09)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(42, 282);
    ctx.lineTo(598, 282);
    ctx.stroke();

    // Primary Metric Pill
    ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
    roundRectPolyfill(ctx, 42, 304, 240, 46, 23);
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = item.color + "66";
    roundRectPolyfill(ctx, 42, 304, 240, 46, 23);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 19px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText(item.stat, 62, 333);

    // Inspect callout
    ctx.fillStyle = "rgba(242, 242, 242, 0.55)";
    ctx.font = "19px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Inspect dossier →", 448, 333);

    const texture = new THREE.CanvasTexture(c);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  // 1. Star & Data Particle Field
  const particleCount = 1600;
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 65 + Math.random() * 420;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 520 - Math.random() * 1650;

    const shade = 0.35 + Math.random() * 0.65;
    colors[i * 3] = shade;
    colors[i * 3 + 1] = shade;
    colors[i * 3 + 2] = shade;
  }

  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 2.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.72
  });

  const particleSystem = new THREE.Points(geom, pMaterial);
  scene.add(particleSystem);

  // 2. Interactive 3D Milestone Planes
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  const cardMeshes = [];
  const cardGeometry = new THREE.PlaneGeometry(78, 46);

  milestones.forEach((item, i) => {
    const texture = createCardTexture(item, i);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(cardGeometry, material);
    const side = i % 2 === 0 ? 1 : -1;
    mesh.position.set(side * (42 + (i % 3) * 14), ((i % 3) - 1) * 20, item.z);
    mesh.rotation.y = -side * 0.12;
    mesh.userData = { index: i, item };

    cardGroup.add(mesh);
    cardMeshes.push(mesh);
  });

  // Subtle constellation thread connecting milestones
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.11
  });
  const lineGeo = new THREE.BufferGeometry();
  const linePoints = [];
  cardMeshes.forEach(m => linePoints.push(m.position.x, m.position.y, m.position.z));
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
  const lines = new THREE.Line(lineGeo, lineMat);
  scene.add(lines);

  // Camera & Mouse State
  let targetCamZ = 420;
  let currentCamZ = 420;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2(-999, -999);
  let hoveredMesh = null;
  const hud = document.getElementById("hud");
  const hudText = document.getElementById("hud-text");

  window.addEventListener("pointermove", (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    targetMouseX = nx * 34;
    targetMouseY = ny * 22;

    mouseVec.x = nx;
    mouseVec.y = ny;

    if (hud) {
      hud.style.left = `${e.clientX}px`;
      hud.style.top = `${e.clientY}px`;
    }
  });

  window.addEventListener("wheel", (e) => {
    if (document.body.classList.contains("boxed")) return;
    targetCamZ -= e.deltaY * 0.48;
    targetCamZ = Math.max(-720, Math.min(460, targetCamZ));

    if (targetCamZ < 360) {
      document.body.classList.add("flying");
    } else {
      document.body.classList.remove("flying");
    }
  }, { passive: true });

  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (document.body.classList.contains("boxed")) return;
    if (e.touches.length > 0) {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetCamZ -= delta * 0.85;
      targetCamZ = Math.max(-720, Math.min(460, targetCamZ));
      if (targetCamZ < 360) document.body.classList.add("flying");
      else document.body.classList.remove("flying");
    }
  }, { passive: true });

  canvas.addEventListener("click", () => {
    if (hoveredMesh && window.openSystemDetail) {
      window.openSystemDetail(hoveredMesh.userData.index);
    }
  });

  window.flyToPrev = function() {
    targetCamZ = Math.min(460, targetCamZ + 150);
    if (targetCamZ >= 360) document.body.classList.remove("flying");
  };

  window.flyToNext = function() {
    targetCamZ = Math.max(-720, targetCamZ - 150);
    document.body.classList.add("flying");
  };

  window.flyToStart = function() {
    targetCamZ = 240;
    document.body.classList.add("flying");
  };

  window.flyToMilestone = function(idx) {
    if (milestones[idx]) {
      targetCamZ = milestones[idx].z + 170;
      document.body.classList.add("flying");
    }
  };

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const flybarNum = document.getElementById("now-num");
  const flybarTitle = document.getElementById("now-title");
  const flybarSub = document.getElementById("now-sub");

  function updateFlybar(camZ) {
    if (!flybarNum || !flybarTitle) return;
    let bestIdx = 0;
    let minDiff = 99999;
    milestones.forEach((m, idx) => {
      const diff = Math.abs(m.z - (camZ - 170));
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = idx;
      }
    });

    window.currentActiveMilestoneIndex = bestIdx;
    const active = milestones[bestIdx];
    flybarNum.textContent = `0${bestIdx + 1}`;
    flybarTitle.textContent = active.name;
    flybarSub.textContent = `${active.category}  •  ${active.stat}`;
  }

  let lastTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    currentCamZ += (targetCamZ - currentCamZ) * 0.08;
    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;

    camera.position.z = currentCamZ;
    camera.position.x = currentMouseX;
    camera.position.y = currentMouseY;
    camera.lookAt(currentMouseX * 0.28, currentMouseY * 0.28, currentCamZ - 300);

    particleSystem.rotation.z += dt * 0.012;

    cardMeshes.forEach((mesh, idx) => {
      mesh.position.y += Math.sin(now * 0.0014 + idx) * 0.028;
    });

    raycaster.setFromCamera(mouseVec, camera);
    const intersects = raycaster.intersectObjects(cardMeshes);

    if (intersects.length > 0) {
      const top = intersects[0].object;
      if (hoveredMesh !== top) {
        if (hoveredMesh) hoveredMesh.scale.set(1, 1, 1);
        hoveredMesh = top;
        hoveredMesh.scale.set(1.05, 1.05, 1.05);
        canvas.classList.add("clickable");
        if (hud && hudText) {
          hudText.textContent = `${hoveredMesh.userData.item.name} (${hoveredMesh.userData.item.stat}) • Click to open`;
          hud.classList.add("show");
        }
      }
    } else {
      if (hoveredMesh) {
        hoveredMesh.scale.set(1, 1, 1);
        hoveredMesh = null;
        canvas.classList.remove("clickable");
        if (hud) hud.classList.remove("show");
      }
    }

    updateFlybar(currentCamZ);
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
