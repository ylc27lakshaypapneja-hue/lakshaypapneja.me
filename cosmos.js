// Cosmos 3D Engine for Lakshay Papneja Portfolio
// Spatial data cosmos, interactive 3D system planes, scroll fly-through, and raycasting

(function() {
  const canvas = document.getElementById("c");
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0b, 0.0018);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.set(0, 0, 400);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Systems data
  const systems = [
    {
      id: "scrapers-tech",
      name: "Scrapers.tech",
      category: "Production Intelligence Hub",
      stat: "24 Actors Live",
      desc: "Central catalog and live execution engine serving autonomous agents.",
      color: "#5e6ad2",
      z: 220
    },
    {
      id: "apify-actors",
      name: "Apify Cloud Fleet",
      category: "Monetized Cloud Actors",
      stat: "10/10 Quality Score",
      desc: "Containerized distributed scrapers monetized under Pay-Per-Event.",
      color: "#27c93f",
      z: 70
    },
    {
      id: "mcp-protocol",
      name: "Model Context Protocol",
      category: "Agent Bridge & Tooling",
      stat: "Native MCP",
      desc: "Direct JSON-RPC bridge allowing LLMs to query live web data.",
      color: "#f5a623",
      z: -80
    },
    {
      id: "stealth-mesh",
      name: "Headless Scraper Mesh",
      category: "Distributed Runtime",
      stat: "99.9% Uptime",
      desc: "Fingerprint rotation and DOM extraction pipeline across clouds.",
      color: "#00c4cc",
      z: -230
    },
    {
      id: "sentiment-miner",
      name: "Sentiment & Aspect Miner",
      category: "NLP Intelligence Engine",
      stat: "Multi-Language",
      desc: "Real-time emotion and aspect miner for product & brand reviews.",
      color: "#bd10e0",
      z: -380
    },
    {
      id: "commerce-tracker",
      name: "Ecommerce Price Tracker",
      category: "Commerce Intelligence",
      stat: "Sub-Second Delta",
      desc: "Universal product variant and stock tracker across top retailers.",
      color: "#4a90e2",
      z: -530
    }
  ];

  // Helper to draw high-res 2D canvas texture for 3D card
  function createCardTexture(item, index) {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 300;
    const ctx = c.getContext("2d");

    // Background
    ctx.fillStyle = "#121316";
    ctx.roundRect(0, 0, 512, 300, 24);
    ctx.fill();

    // Subtle gradient glow
    const grad = ctx.createLinearGradient(0, 0, 512, 300);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.01)");
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, 512, 300, 24);
    ctx.fill();

    // Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
    ctx.roundRect(2, 2, 508, 296, 24);
    ctx.stroke();

    // Tag / Category
    ctx.fillStyle = item.color;
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(`0${index + 1} — ${item.category.toUpperCase()}`, 36, 56);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 44px 'Instrument Serif', Georgia, serif";
    ctx.fillText(item.name, 36, 118);

    // Description
    ctx.fillStyle = "rgba(242, 242, 242, 0.72)";
    ctx.font = "22px -apple-system, BlinkMacSystemFont, sans-serif";
    const words = item.desc.split(" ");
    let line = "";
    let y = 175;
    for (let w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > 440) {
        ctx.fillText(line, 36, y);
        line = w + " ";
        y += 32;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, 36, y);

    // Metric badge at bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.roundRect(36, 230, 200, 42, 21);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.roundRect(36, 230, 200, 42, 21);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "17px ui-monospace, Menlo, monospace";
    ctx.fillText(item.stat, 54, 257);

    // Action indicator
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.font = "18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("Click to inspect →", 330, 257);

    const texture = new THREE.CanvasTexture(c);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  }

  // 1. Particle Cloud (Star/Data field)
  const particleCount = 1400;
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 60 + Math.random() * 380;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 500 - Math.random() * 1400;

    const shade = 0.4 + Math.random() * 0.6;
    colors[i * 3] = shade;
    colors[i * 3 + 1] = shade;
    colors[i * 3 + 2] = shade;
  }

  geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const pMaterial = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  const particleSystem = new THREE.Points(geom, pMaterial);
  scene.add(particleSystem);

  // 2. Interactive System Cards in 3D
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  const cardMeshes = [];
  const cardWidth = 72;
  const cardHeight = 42;
  const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

  systems.forEach((item, i) => {
    const texture = createCardTexture(item, i);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(cardGeometry, material);
    // Alternate left / right lanes like Vadim Carazan's middle stream
    const side = (i % 2 === 0 ? 1 : -1);
    mesh.position.set(side * (45 + (i % 3) * 15), ((i % 3) - 1) * 22, item.z);
    mesh.rotation.y = -side * 0.12;
    mesh.userData = { index: i, item };

    cardGroup.add(mesh);
    cardMeshes.push(mesh);
  });

  // Connecting constellation lines between adjacent systems
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12
  });
  const lineGeo = new THREE.BufferGeometry();
  const linePoints = [];
  cardMeshes.forEach(m => linePoints.push(m.position.x, m.position.y, m.position.z));
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePoints, 3));
  const lines = new THREE.Line(lineGeo, lineMat);
  scene.add(lines);

  // Flight & Parallax State
  let targetCamZ = 400;
  let currentCamZ = 400;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  // Raycaster for Hover & Click
  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2(-999, -999);
  let hoveredMesh = null;
  const hud = document.getElementById("hud");
  const hudText = document.getElementById("hud-text");

  // Mouse move listener
  window.addEventListener("pointermove", (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    targetMouseX = nx * 35;
    targetMouseY = ny * 25;

    mouseVec.x = nx;
    mouseVec.y = ny;

    if (hud) {
      hud.style.left = `${e.clientX}px`;
      hud.style.top = `${e.clientY}px`;
    }
  });

  // Wheel listener for scroll fly-through
  window.addEventListener("wheel", (e) => {
    // If a drawer is open, don't fly the camera
    if (document.body.classList.contains("boxed")) return;

    targetCamZ -= e.deltaY * 0.45;
    // Bound camera Z between 480 and -550
    targetCamZ = Math.max(-550, Math.min(480, targetCamZ));

    if (targetCamZ < 350) {
      document.body.classList.add("flying");
    } else {
      document.body.classList.remove("flying");
    }
  }, { passive: true });

  // Touch gesture support for mobile
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (document.body.classList.contains("boxed")) return;
    if (e.touches.length > 0) {
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetCamZ -= delta * 0.8;
      targetCamZ = Math.max(-550, Math.min(480, targetCamZ));
      if (targetCamZ < 350) document.body.classList.add("flying");
      else document.body.classList.remove("flying");
    }
  }, { passive: true });

  // Canvas click listener
  canvas.addEventListener("click", () => {
    if (hoveredMesh && window.openSystemDetail) {
      window.openSystemDetail(hoveredMesh.userData.index);
    }
  });

  // Controls for flybar
  window.flyToPrev = function() {
    targetCamZ = Math.min(480, targetCamZ + 150);
  };
  window.flyToNext = function() {
    targetCamZ = Math.max(-550, targetCamZ - 150);
    document.body.classList.add("flying");
  };
  window.flyToStart = function() {
    targetCamZ = 180;
    document.body.classList.add("flying");
  };

  // Resize handler
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Animation Loop
  let lastTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);

    const dt = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    // Smooth lerp camera
    currentCamZ += (targetCamZ - currentCamZ) * 0.08;
    currentMouseX += (targetMouseX - currentMouseX) * 0.06;
    currentMouseY += (targetMouseY - currentMouseY) * 0.06;

    camera.position.z = currentCamZ;
    camera.position.x = currentMouseX;
    camera.position.y = currentMouseY;
    camera.lookAt(currentMouseX * 0.3, currentMouseY * 0.3, currentCamZ - 300);

    // Slowly rotate background particle constellation
    particleSystem.rotation.z += dt * 0.015;

    // Subtle breathing float for cards
    cardMeshes.forEach((mesh, idx) => {
      mesh.position.y += Math.sin(now * 0.0015 + idx) * 0.03;
    });

    // Raycast hover test
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
          hudText.textContent = `${hoveredMesh.userData.item.name} • Click to inspect`;
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

    // Update Flybar HUD with closest system in front of camera
    updateFlybar(currentCamZ);

    renderer.render(scene, camera);
  }

  // Update Flybar text
  const flybarNum = document.getElementById("now-num");
  const flybarTitle = document.getElementById("now-title");
  const flybarSub = document.getElementById("now-sub");

  function updateFlybar(camZ) {
    if (!flybarNum || !flybarTitle) return;
    // Find system whose Z is closest to camera position - 150
    let bestIdx = 0;
    let minDiff = 99999;
    systems.forEach((s, idx) => {
      const diff = Math.abs(s.z - (camZ - 180));
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = idx;
      }
    });

    const active = systems[bestIdx];
    flybarNum.textContent = `0${bestIdx + 1}`;
    flybarTitle.textContent = active.name;
    flybarSub.textContent = `${active.category} • ${active.stat}`;
  }

  // Expose global flight trigger
  window.flyToSystem = function(idx) {
    if (systems[idx]) {
      targetCamZ = systems[idx].z + 180;
      document.body.classList.add("flying");
    }
  };

  requestAnimationFrame(animate);
})();
