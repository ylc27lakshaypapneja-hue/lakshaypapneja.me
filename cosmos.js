// Cosmos 3D Engine for Lakshay Papneja Interactive Portfolio
// Decluttered spatial layout, responsive mobile framing, distance-fade, and End-of-Scroll Finale

(function() {
  const canvas = document.getElementById("c");
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0b, 0.0018);

  const isMobileView = () => window.innerWidth < 768;

  const camera = new THREE.PerspectiveCamera(
    isMobileView() ? 58 : 45,
    window.innerWidth / window.innerHeight,
    1,
    2600
  );

  const START_Z = 460;
  const END_Z = -1680;
  camera.position.set(0, 0, START_Z);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 8 Core Milestones spaced cleanly (240 units apart in Z to prevent overlap)
  const milestones = [
    {
      id: "thirdbase-vc",
      name: "ThirdBase Capital",
      category: "NYC Venture Capital  •  2026",
      stat: "$500K LP Sourced",
      desc: "Sourced a $500K LP investor & advisor. Built a 3,000+ VP engineering database & 50+ US technologist network enabling 2 co-investments.",
      color: "#34d399",
      z: 160
    },
    {
      id: "aviva-ceo",
      name: "Aviva India — CEO's Office",
      category: "Strategy & Partnerships  •  Gurugram",
      stat: "15+ B2B Deals",
      desc: "Initiated 15+ B2B alliances across insurtech & healthtech. Led Fitelo (₹100Cr+ rev) deal end-to-end & doubled funnel conversion (1% → 2%).",
      color: "#60a5fa",
      z: -80
    },
    {
      id: "2cents-hedge",
      name: "2Cents Capital (Dubai)",
      category: "$25M Hedge Fund  •  Awarded PPO",
      stat: "40+ Derivatives Alpha",
      desc: "First intern cohort in 0-to-1 growth phase. Onboarded 3+ custodians & 5+ brokers across India, Dubai & GIFT City; cut launch time 30%.",
      color: "#f59e0b",
      z: -320
    },
    {
      id: "masters-union",
      name: "Masters' Union",
      category: "PGP Tech & Business Management",
      stat: "Top 5% Merit Scholar",
      desc: "Selected 1 of 13 members in the Masters' Union Investment Fund (out of 330+). Awarded 25% Merit Scholarship.",
      color: "#a78bfa",
      z: -560
    },
    {
      id: "josh-talks",
      name: "Josh Talks Speaker",
      category: "10M+ Subscriber Platform  •  Media",
      stat: "2M+ Views",
      desc: "Invited speaker on equity markets, investing psychology & early career learnings — garnering 2M+ views and 5M+ impressions.",
      color: "#f43f5e",
      z: -800
    },
    {
      id: "pegster-ventures",
      name: "Pegster & Scrapers.tech",
      category: "0-to-1 Ventures  •  E-Commerce & AI",
      stat: "₹4L+ Sales in 2 Mo",
      desc: "Scaled Pegster D2C to ₹4,00,000+ in 2 months. Architected Scrapers.tech (73 live cloud actors) & 500K+ organic finance channel views.",
      color: "#2dd4bf",
      z: -1040
    },
    {
      id: "papneja-associates",
      name: "Papneja Associates",
      category: "Tax & Portfolio Advisory  •  2020–24",
      stat: "₹1 Cr+ Tax Saved",
      desc: "Advised 100+ SMEs, structured ₹5Cr+ SIP/SWP portfolios, and handled 2,000+ filings at 99% accuracy while automating workflows by 30%.",
      color: "#eab308",
      z: -1280
    },
    {
      id: "scholars-honours",
      name: "Reliance Scholar & Honours",
      category: "National Merit & State Athletics",
      stat: "Top 5,000 / 50,000+",
      desc: "Reliance Foundation Scholar (₹1.5L), cleared CA Foundation 1st attempt, IIIT Una guest speaker & Haryana State Badminton (Top 10).",
      color: "#38bdf8",
      z: -1520
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
    c.width = 720;
    c.height = 420;
    const ctx = c.getContext("2d");

    // Deep editorial card background
    ctx.fillStyle = "#101115";
    roundRectPolyfill(ctx, 0, 0, 720, 420, 32);
    ctx.fill();

    // Soft top-left radial glow
    const grad = ctx.createRadialGradient(90, 45, 10, 260, 200, 520);
    grad.addColorStop(0, item.color + "28");
    grad.addColorStop(0.55, "rgba(255, 255, 255, 0.02)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    roundRectPolyfill(ctx, 0, 0, 720, 420, 32);
    ctx.fill();

    // Subtle crisp border
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    roundRectPolyfill(ctx, 2, 2, 716, 416, 30);
    ctx.stroke();

    // Index & Category eyebrow
    ctx.fillStyle = item.color;
    ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Inter Tight', sans-serif";
    ctx.fillText(`0${index + 1}   /   ${item.category.toUpperCase()}`, 48, 66);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 52px 'Instrument Serif', Georgia, serif";
    ctx.fillText(item.name, 48, 134);

    // Clean wrapped description (max 3 lines)
    ctx.fillStyle = "rgba(243, 244, 246, 0.72)";
    ctx.font = "23px -apple-system, BlinkMacSystemFont, 'Inter Tight', sans-serif";
    const words = item.desc.split(" ");
    let line = "";
    let y = 192;
    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > 624) {
        ctx.fillText(line, 48, y);
        line = w + " ";
        y += 35;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, 48, y);

    // Subtle divider line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(48, 312);
    ctx.lineTo(672, 312);
    ctx.stroke();

    // Metric Badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    roundRectPolyfill(ctx, 48, 336, 260, 48, 24);
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = item.color + "66";
    roundRectPolyfill(ctx, 48, 336, 260, 48, 24);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 20px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillText(item.stat, 70, 367);

    // Action hint
    ctx.fillStyle = "rgba(243, 244, 246, 0.5)";
    ctx.font = "20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("View details →", 530, 367);

    const texture = new THREE.CanvasTexture(c);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  // 1. Refined Starfield (fewer, cleaner particles so the background feels calm, not noisy)
  const particleCount = 950;
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 80 + Math.random() * 440;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 520 - Math.random() * 2450;

    const shade = 0.28 + Math.random() * 0.55;
    colors[i * 3] = shade;
    colors[i * 3 + 1] = shade;
    colors[i * 3 + 2] = shade;
  }

  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 1.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.58
  });

  const particleSystem = new THREE.Points(geom, pMaterial);
  scene.add(particleSystem);

  // 2. Interactive 3D Milestone Planes
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  const cardMeshes = [];
  const cardGeometry = new THREE.PlaneGeometry(80, 46.6);

  milestones.forEach((item, i) => {
    const texture = createCardTexture(item, i);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(cardGeometry, material);
    mesh.userData = { index: i, item, baseY: 0 };

    cardGroup.add(mesh);
    cardMeshes.push(mesh);
  });

  // Subtle constellation thread connecting milestones
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.06
  });
  const lineGeo = new THREE.BufferGeometry();
  const lines = new THREE.Line(lineGeo, lineMat);
  scene.add(lines);

  function layoutCards() {
    const mobile = isMobileView();
    const linePoints = [];

    cardMeshes.forEach((mesh, i) => {
      const item = mesh.userData.item;
      const side = i % 2 === 0 ? 1 : -1;

      if (mobile) {
        // On mobile: center cards horizontally so they never clip off-screen
        const xOffset = side * 5;
        const yOffset = 6;
        mesh.position.set(xOffset, yOffset, item.z);
        mesh.rotation.y = -side * 0.04;
        mesh.userData.baseY = yOffset;
      } else {
        // On desktop: balanced editorial stagger with clear sightlines
        const xOffset = side * (30 + (i % 2) * 8);
        const yOffset = ((i % 3) - 1) * 11 + 4;
        mesh.position.set(xOffset, yOffset, item.z);
        mesh.rotation.y = -side * 0.1;
        mesh.userData.baseY = yOffset;
      }

      linePoints.push(mesh.position.x, mesh.position.y, mesh.position.z);
    });

    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
  }

  layoutCards();

  // Camera & Input State
  let targetCamZ = START_Z;
  let currentCamZ = START_Z;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2(-999, -999);
  let hoveredMesh = null;
  const hud = document.getElementById("hud");
  const hudText = document.getElementById("hud-text");

  function syncFlightState() {
    // Hero hides as soon as user scrolls into the cosmos
    if (targetCamZ < 390) {
      document.body.classList.add("flying");
    } else {
      document.body.classList.remove("flying");
    }

    // Check if user has scrolled past the 8th milestone into the End Song / Finale
    const wasAtEnd = document.body.classList.contains("at-end");
    if (targetCamZ <= -1500) {
      document.body.classList.add("at-end");
      if (!wasAtEnd && window.playEndSong) {
        window.playEndSong(true);
      }
    } else {
      document.body.classList.remove("at-end");
      if (wasAtEnd && window.stopEndSong) {
        window.stopEndSong();
      }
    }
  }

  window.addEventListener("pointermove", (e) => {
    if (isMobileView()) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    targetMouseX = nx * 24;
    targetMouseY = ny * 14;

    mouseVec.x = nx;
    mouseVec.y = ny;

    if (hud) {
      hud.style.left = `${e.clientX}px`;
      hud.style.top = `${e.clientY}px`;
    }
  });

  window.addEventListener("wheel", (e) => {
    if (document.body.classList.contains("boxed")) return;
    targetCamZ -= e.deltaY * 0.55;
    targetCamZ = Math.max(END_Z, Math.min(START_Z, targetCamZ));
    syncFlightState();
  }, { passive: true });

  let touchStartY = 0;
  let touchStartX = 0;
  let touchMoved = false;

  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      touchMoved = false;
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (document.body.classList.contains("boxed")) return;
    if (e.touches.length > 0) {
      const dy = touchStartY - e.touches[0].clientY;
      const dx = Math.abs(touchStartX - e.touches[0].clientX);
      if (Math.abs(dy) > 4) touchMoved = true;
      // Ignore horizontal swipes on the impact pill strip
      if (dx > Math.abs(dy) * 1.5) return;

      touchStartY = e.touches[0].clientY;
      targetCamZ -= dy * 1.15;
      targetCamZ = Math.max(END_Z, Math.min(START_Z, targetCamZ));
      syncFlightState();
    }
  }, { passive: true });

  canvas.addEventListener("click", (e) => {
    if (touchMoved) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
    const hits = raycaster.intersectObjects(cardMeshes);
    if (hits.length > 0 && window.openSystemDetail) {
      const hitMesh = hits[0].object;
      if (hitMesh.material.opacity > 0.25) {
        window.openSystemDetail(hitMesh.userData.index);
      }
    }
  });

  window.flyToPrev = function() {
    if (document.body.classList.contains("at-end")) {
      window.flyToMilestone(milestones.length - 1);
      return;
    }
    const cur = window.currentActiveMilestoneIndex || 0;
    if (cur <= 0) {
      window.flyToTop();
    } else {
      window.flyToMilestone(cur - 1);
    }
  };

  window.flyToNext = function() {
    const cur = window.currentActiveMilestoneIndex || 0;
    if (!document.body.classList.contains("flying")) {
      window.flyToMilestone(0);
    } else if (cur < milestones.length - 1) {
      window.flyToMilestone(cur + 1);
    } else {
      // Fly to the End Song Finale
      targetCamZ = END_Z;
      syncFlightState();
    }
  };

  window.flyToStart = function() {
    window.flyToMilestone(0);
  };

  window.flyToTop = function() {
    targetCamZ = START_Z;
    syncFlightState();
  };

  window.flyToMilestone = function(idx) {
    if (milestones[idx]) {
      const viewDist = isMobileView() ? 165 : 145;
      targetCamZ = milestones[idx].z + viewDist;
      syncFlightState();
    }
  };

  window.addEventListener("resize", () => {
    camera.fov = isMobileView() ? 58 : 45;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    layoutCards();
  });

  const flybarNum = document.getElementById("now-num");
  const flybarTitle = document.getElementById("now-title");
  const flybarSub = document.getElementById("now-sub");
  const flybarProgress = document.getElementById("fly-progress-fill");

  function updateFlybar(camZ) {
    if (!flybarNum || !flybarTitle) return;
    const viewDist = isMobileView() ? 165 : 145;
    let bestIdx = 0;
    let minDiff = 99999;
    milestones.forEach((m, idx) => {
      const diff = Math.abs(m.z - (camZ - viewDist));
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

    if (flybarProgress) {
      const pct = Math.max(0, Math.min(100, ((START_Z - camZ) / (START_Z - END_Z)) * 100));
      flybarProgress.style.width = `${pct}%`;
    }
  }

  let lastTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    currentCamZ += (targetCamZ - currentCamZ) * 0.085;
    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;

    camera.position.z = currentCamZ;
    camera.position.x = currentMouseX;
    camera.position.y = currentMouseY;
    camera.lookAt(currentMouseX * 0.25, currentMouseY * 0.25, currentCamZ - 300);

    particleSystem.rotation.z += dt * 0.008;

    const isLanding = !document.body.classList.contains("flying");
    const isAtEnd = document.body.classList.contains("at-end");

    cardMeshes.forEach((mesh, idx) => {
      // Gentle float around baseY
      mesh.position.y = mesh.userData.baseY + Math.sin(now * 0.0014 + idx) * 1.4;

      // Distance-based opacity so cards never look cluttered or stacked on top of each other
      const distAhead = currentCamZ - mesh.position.z;
      let targetOpacity = 0;

      if (isAtEnd) {
        targetOpacity = 0.06;
      } else if (isLanding) {
        // On landing screen, keep background cards subtle so hero text is 100% clean
        targetOpacity = idx === 0 ? 0.38 : idx === 1 ? 0.18 : 0.06;
      } else if (distAhead < 45) {
        // Passing or behind camera
        targetOpacity = Math.max(0, (distAhead - 15) / 30);
      } else if (distAhead <= 240) {
        // Active focal zone
        targetOpacity = 0.98;
      } else if (distAhead <= 520) {
        // Next card in queue (soft preview)
        targetOpacity = 0.22 + (1 - (distAhead - 240) / 280) * 0.45;
      } else {
        // Deep background cards
        targetOpacity = 0.08;
      }

      mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.12;
    });

    if (!isMobileView() && !isLanding && !isAtEnd) {
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(cardMeshes);

      if (intersects.length > 0 && intersects[0].object.material.opacity > 0.35) {
        const top = intersects[0].object;
        if (hoveredMesh !== top) {
          if (hoveredMesh) hoveredMesh.scale.set(1, 1, 1);
          hoveredMesh = top;
          hoveredMesh.scale.set(1.04, 1.04, 1.04);
          canvas.classList.add("clickable");
          if (hud && hudText) {
            hudText.textContent = `${hoveredMesh.userData.item.name} (${hoveredMesh.userData.item.stat}) • Click to inspect`;
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
    } else if (hoveredMesh) {
      hoveredMesh.scale.set(1, 1, 1);
      hoveredMesh = null;
      canvas.classList.remove("clickable");
      if (hud) hud.classList.remove("show");
    }

    updateFlybar(currentCamZ);
    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
})();
