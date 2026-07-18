/* ============================================================
   LAVANDA TEXTILE CONSTRUCTOR — Main Application
   Three.js 3D Viewer · Interactive Decal · Zone Switching
   ============================================================ */

(() => {
    'use strict';

    /* ──────────────── CONSTANTS ──────────────── */
    const ACCENT = 0xFFD400;
    const EPS    = 0.0001;

    /* ──────────────── PRODUCT DATA ──────────────── */
    const PRODUCTS = [
        { id: 'tshirt',        name: 'T-Shirt',        icon: '👕', material: 'Cotton',     weight: '180 g/m²', colors: 12 },
        { id: 'oversize',      name: 'Oversize',       icon: '👕', material: 'Cotton',     weight: '220 g/m²', colors: 10 },
        { id: 'hoodie',        name: 'Hoodie',         icon: '🧥', material: 'Fleece',     weight: '320 g/m²', colors: 8  },
        { id: 'sweatshirt',    name: 'Sweatshirt',     icon: '👕', material: 'French Terry',weight: '280 g/m²', colors: 9  },
        { id: 'raglan',        name: 'Raglan',         icon: '👕', material: 'Cotton',     weight: '180 g/m²', colors: 7  },
        { id: 'longsleeve',    name: 'Long Sleeve',    icon: '👕', material: 'Cotton',     weight: '180 g/m²', colors: 11 },
        { id: 'polo',          name: 'Polo',           icon: '👕', material: 'Piqué',      weight: '210 g/m²', colors: 8  },
        { id: 'cap',           name: 'Cap',            icon: '🧢', material: 'Canvas',     weight: '—',        colors: 15 },
        { id: 'beanie',        name: 'Beanie',         icon: '🧶', material: 'Acrylic',    weight: '—',        colors: 12 },
        { id: 'buckethat',     name: 'Bucket Hat',     icon: '🎩', material: 'Canvas',     weight: '—',        colors: 10 },
        { id: 'shopper',       name: 'Shopper Bag',    icon: '🛍️', material: 'Canvas',     weight: '280 g/m²', colors: 6  },
        { id: 'backpack',      name: 'Backpack',       icon: '🎒', material: 'Polyester',  weight: '600D',      colors: 5  },
        { id: 'apron',         name: 'Apron',          icon: '👨‍🍳', material: 'Canvas',  weight: '240 g/m²', colors: 8  },
        { id: 'jacket',        name: 'Jacket',         icon: '🧥', material: 'Nylon',      weight: '—',        colors: 4  },
        { id: 'vest',          name: 'Vest',           icon: '🦺', material: 'Polyester',  weight: '—',        colors: 6  },
        { id: 'sportsjersey',  name: 'Jersey',         icon: '⚽', material: 'Mesh',       weight: '140 g/m²', colors: 10 },
        { id: 'babybodysuit',  name: 'Baby',           icon: '👶', material: 'Cotton',     weight: '160 g/m²', colors: 8  },
        { id: 'towel',         name: 'Towel',          icon: '🛁', material: 'Cotton',     weight: '450 g/m²', colors: 6  },
        { id: 'pillow',        name: 'Pillow',         icon: '🛋️', material: 'Cotton',     weight: '200 g/m²', colors: 10 },
    ];

    /* Scene environment presets */
    const SCENE_PRESETS = {
        'dark-studio':  { bg: 0x0a0a12, ambient: 0x222233, key: 0xffeedd, fill: 0x8888aa, ground: 0x080810, groundAlpha: 0.4, intensity: 1.2 },
        'white-studio': { bg: 0xe8e8e8, ambient: 0xffffff, key: 0xffffff, fill: 0xccccdd, ground: 0xdddddd, groundAlpha: 0.6, intensity: 1.5 },
        'wood-table':   { bg: 0x1a120a, ambient: 0x553322, key: 0xffcc88, fill: 0x886644, ground: 0x3a2a1a, groundAlpha: 0.5, intensity: 1.0 },
        'concrete':     { bg: 0x2a2a2a, ambient: 0x888888, key: 0xffffff, fill: 0xaaaaaa, ground: 0x555555, groundAlpha: 0.5, intensity: 1.3 },
        'office':       { bg: 0x1a2030, ambient: 0x4466aa, key: 0xddeeff, fill: 0x6688bb, ground: 0x222838, groundAlpha: 0.4, intensity: 1.1 },
        'lifestyle':    { bg: 0x1a0a05, ambient: 0x884422, key: 0xffaa66, fill: 0xcc7744, ground: 0x2a1a10, groundAlpha: 0.45,intensity: 1.2 },
        'warehouse':    { bg: 0x111111, ambient: 0x444444, key: 0xffddbb, fill: 0x888888, ground: 0x1a1a1a, groundAlpha: 0.5, intensity: 1.0 },
        'christmas':    { bg: 0x0a1a0a, ambient: 0x224422, key: 0xff4444, fill: 0x44aa44, ground: 0x0a150a, groundAlpha: 0.5, intensity: 1.2 },
        'football':     { bg: 0x0a1a0a, ambient: 0x226622, key: 0xffffff, fill: 0x44cc44, ground: 0x0a2a0a, groundAlpha: 0.5, intensity: 1.4 },
        'luxury':       { bg: 0x0d0a04, ambient: 0x665522, key: 0xffd700, fill: 0xccaa44, ground: 0x1a1508, groundAlpha: 0.4, intensity: 1.3 },
        'cyber':        { bg: 0x05051a, ambient: 0x4400aa, key: 0xff00ff, fill: 0x0088ff, ground: 0x08081a, groundAlpha: 0.5, intensity: 1.5 },
        'minimal':      { bg: 0xf5f5f5, ambient: 0xffffff, key: 0xffffff, fill: 0xeeeeee, ground: 0xe0e0e0, groundAlpha: 0.7, intensity: 1.4 },
    };

    /* Zone camera presets: where the camera should look from for each zone */
    const ZONE_CAMERAS = {
        'front':         { pos: [0, 0.5, 3.5],  target: [0, 0.2, 0] },
        'back':          { pos: [0, 0.5, -3.5], target: [0, 0.2, 0] },
        'left-sleeve':   { pos: [-3.5, 0.5, 0.8], target: [0, 0.2, 0] },
        'right-sleeve':  { pos: [3.5, 0.5, 0.8],  target: [0, 0.2, 0] },
        'neck':          { pos: [0, 2.0, 2.0],   target: [0, 0.4, 0] },
        'label':         { pos: [0.5, 1.5, 1.5],  target: [0, 0.3, 0] },
        'pocket':        { pos: [0, 0.3, 3.0],    target: [0, -0.2, 0] },
    };

    /* ──────────────── STATE ──────────────── */
    const state = {
        currentProduct: 'tshirt',
        fabricColor: '#FFFFFF',
        printColor: '#FFFFFF',
        printOpacity: 1,
        activeZone: 'front',
        activeTab: 'design',
        activeScene: 'dark-studio',
        material: 'cotton',
        texture: 'matte',
        reflectionIntensity: 0.3,
        layers: [],
        selectedLayerId: null,
        lockAspect: true,
        showGrid: false,
        showSafeArea: false,
        undoStack: [],
        redoStack: [],
        decalTransforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.25, scaleY: 0.25, rotX: 0, rotY: 0, rotZ: 0 },
    };

    /* Per-zone decal storage: each zone has its own transforms + texture reference */
    const zoneDecals = {
        'front':        { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.25, scaleY: 0.25, rotX: 0, rotY: 0, rotZ: 0 } },
        'back':         { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.25, scaleY: 0.25, rotX: 0, rotY: 0, rotZ: 0 } },
        'left-sleeve':  { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.15, scaleY: 0.15, rotX: 0, rotY: 0, rotZ: 0 } },
        'right-sleeve': { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.15, scaleY: 0.15, rotX: 0, rotY: 0, rotZ: 0 } },
        'neck':         { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.12, scaleY: 0.12, rotX: 0, rotY: 0, rotZ: 0 } },
        'label':        { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.08, scaleY: 0.10, rotX: 0, rotY: 0, rotZ: 0 } },
        'pocket':       { texture: null, transforms: { posX: 0, posY: 0, posZ: 0, scaleX: 0.12, scaleY: 0.12, rotX: 0, rotY: 0, rotZ: 0 } },
    };

    /* ──────────────── THREE.JS SETUP ──────────────── */
    const canvas   = document.getElementById('threeCanvas');
    const wrapper  = document.getElementById('canvasWrapper');
    const loading  = document.getElementById('viewerLoading');

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    /* Scene */
    const scene = new THREE.Scene();

    /* Camera */
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.5, 3.5);

    /* Orbit Controls */
    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1.5;
    controls.maxDistance = 8;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.target.set(0, 0.2, 0);

    /* Raycaster for drag interaction */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    /* ──────────────── LIGHTING ──────────────── */
    let ambientLight, keyLight, fillLight, rimLight, groundPlane;

    function setupLighting(preset) {
        [ambientLight, keyLight, fillLight, rimLight].forEach(l => { if (l) scene.remove(l); });
        if (groundPlane) scene.remove(groundPlane);

        const p = SCENE_PRESETS[preset] || SCENE_PRESETS['dark-studio'];
        scene.background = new THREE.Color(p.bg);

        ambientLight = new THREE.AmbientLight(p.ambient, 0.6 * p.intensity);
        scene.add(ambientLight);

        keyLight = new THREE.DirectionalLight(p.key, 1.0 * p.intensity);
        keyLight.position.set(3, 5, 4);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(2048, 2048);
        keyLight.shadow.camera.near = 0.5;
        keyLight.shadow.camera.far = 20;
        keyLight.shadow.camera.left = -3;
        keyLight.shadow.camera.right = 3;
        keyLight.shadow.camera.top = 3;
        keyLight.shadow.camera.bottom = -3;
        keyLight.shadow.bias = -0.0005;
        keyLight.shadow.radius = 4;
        scene.add(keyLight);

        fillLight = new THREE.DirectionalLight(p.fill, 0.4 * p.intensity);
        fillLight.position.set(-3, 3, 2);
        scene.add(fillLight);

        rimLight = new THREE.DirectionalLight(0xffffff, 0.3 * p.intensity);
        rimLight.position.set(0, 2, -4);
        scene.add(rimLight);

        const groundGeo = new THREE.PlaneGeometry(20, 20);
        const groundMat = new THREE.MeshStandardMaterial({
            color: p.ground, roughness: 0.7, metalness: 0.1,
            transparent: true, opacity: p.groundAlpha,
        });
        groundPlane = new THREE.Mesh(groundGeo, groundMat);
        groundPlane.rotation.x = -Math.PI / 2;
        groundPlane.position.y = -1.0;
        groundPlane.receiveShadow = true;
        scene.add(groundPlane);
    }

    setupLighting('dark-studio');

    /* ──────────────── GRID HELPER ──────────────── */
    let gridHelper = null;

    function toggleGrid(show) {
        if (show && !gridHelper) {
            gridHelper = new THREE.GridHelper(6, 20, 0x333333, 0x1a1a1a);
            gridHelper.position.y = -0.99;
            scene.add(gridHelper);
        } else if (!show && gridHelper) {
            scene.remove(gridHelper);
            gridHelper = null;
        }
    }

    /* ──────────────── SAFE AREA HELPER ──────────────── */
    let safeAreaHelper = null;

    function toggleSafeArea(show) {
        if (show && !safeAreaHelper && currentModel) {
            const box = new THREE.Box3().setFromObject(currentModel);
            const size = box.getSize(new THREE.Vector3());
            const safeGeo = new THREE.PlaneGeometry(size.x * 0.5, size.y * 0.5);
            const safeMat = new THREE.MeshBasicMaterial({
                color: ACCENT, transparent: true, opacity: 0.08,
                side: THREE.DoubleSide, depthTest: false,
            });
            safeAreaHelper = new THREE.Mesh(safeGeo, safeMat);
            safeAreaHelper.position.set(0, 0.2, size.z / 2 + 0.01);
            safeAreaHelper.renderOrder = 999;
            scene.add(safeAreaHelper);
        } else if (!show && safeAreaHelper) {
            scene.remove(safeAreaHelper);
            safeAreaHelper = null;
        }
    }

    /* ──────────────── PROCEDURAL T-SHIRT MODEL ──────────────── */
    function createProceduralTShirt(color) {
        const group = new THREE.Group();

        const bodyShape = new THREE.Shape();
        bodyShape.moveTo(-0.4, -0.6);
        bodyShape.lineTo(-0.5, -0.4);
        bodyShape.lineTo(-0.55, 0.0);
        bodyShape.lineTo(-0.7, 0.15);
        bodyShape.lineTo(-0.7, 0.3);
        bodyShape.lineTo(-0.45, 0.35);
        bodyShape.lineTo(-0.35, 0.55);
        bodyShape.lineTo(-0.35, 0.45);
        bodyShape.lineTo(-0.25, 0.35);
        bodyShape.lineTo(0.0, 0.4);
        bodyShape.bezierCurveTo(0.0, 0.5, 0.0, 0.5, 0.0, 0.4);
        bodyShape.lineTo(0.0, 0.35);
        bodyShape.lineTo(0.25, 0.35);
        bodyShape.lineTo(0.35, 0.45);
        bodyShape.lineTo(0.35, 0.55);
        bodyShape.lineTo(0.45, 0.35);
        bodyShape.lineTo(0.7, 0.3);
        bodyShape.lineTo(0.7, 0.15);
        bodyShape.lineTo(0.55, 0.0);
        bodyShape.lineTo(0.5, -0.4);
        bodyShape.lineTo(0.4, -0.6);

        const extrudeSettings = {
            depth: 0.45, bevelEnabled: true,
            bevelThickness: 0.04, bevelSize: 0.03,
            bevelSegments: 6, curveSegments: 24,
        };

        const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
        bodyGeo.center();
        const bodyMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color), roughness: 0.85, metalness: 0.0,
        });
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
        bodyMesh.castShadow = true;
        bodyMesh.receiveShadow = true;
        bodyMesh.name = 'body';
        group.add(bodyMesh);

        const collarGeo = new THREE.TorusGeometry(0.13, 0.025, 12, 32, Math.PI);
        const collarMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color).multiplyScalar(0.85), roughness: 0.9, metalness: 0.0,
        });
        const collarMesh = new THREE.Mesh(collarGeo, collarMat);
        collarMesh.position.set(0, 0.22, 0.24);
        collarMesh.rotation.x = Math.PI;
        collarMesh.castShadow = true;
        collarMesh.name = 'collar';
        group.add(collarMesh);

        group.position.y = 0.0;
        group.scale.set(1.2, 1.2, 1.2);
        return group;
    }

    function createProceduralHoodie(color) {
        const group = createProceduralTShirt(color);
        const hoodGeo = new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6);
        const hoodMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color), roughness: 0.85, metalness: 0.0,
        });
        const hood = new THREE.Mesh(hoodGeo, hoodMat);
        hood.position.set(0, 0.32, 0.1);
        hood.rotation.x = -0.3;
        hood.castShadow = true;
        hood.name = 'hood';
        group.add(hood);
        return group;
    }

    function createProceduralCap(color) {
        const group = new THREE.Group();
        const domeGeo = new THREE.SphereGeometry(0.3, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const domeMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color), roughness: 0.8, metalness: 0.0,
        });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        dome.castShadow = true;
        dome.name = 'dome';
        group.add(dome);

        const brimShape = new THREE.Shape();
        brimShape.moveTo(-0.28, 0);
        brimShape.lineTo(0.32, -0.05);
        brimShape.lineTo(0.35, -0.12);
        brimShape.lineTo(-0.25, -0.08);
        brimShape.closePath();
        const brimGeo = new THREE.ExtrudeGeometry(brimShape, { depth: 0.02, bevelEnabled: false });
        const brim = new THREE.Mesh(brimGeo, domeMat);
        brim.position.set(0, 0, 0.26);
        brim.rotation.x = -0.2;
        brim.castShadow = true;
        brim.name = 'brim';
        group.add(brim);

        group.position.y = 0.2;
        return group;
    }

    function createProceduralBag(color) {
        const group = new THREE.Group();
        const bagGeo = new THREE.BoxGeometry(0.5, 0.6, 0.15);
        const bagMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color), roughness: 0.9, metalness: 0.0,
        });
        const bag = new THREE.Mesh(bagGeo, bagMat);
        bag.castShadow = true;
        bag.receiveShadow = true;
        bag.name = 'body';
        group.add(bag);

        const handleGeo = new THREE.TorusGeometry(0.08, 0.015, 8, 16, Math.PI);
        const handleMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.8), roughness: 0.9 });
        const handleL = new THREE.Mesh(handleGeo, handleMat);
        handleL.position.set(-0.12, 0.35, 0);
        handleL.rotation.z = Math.PI;
        handleL.name = 'handle';
        group.add(handleL);
        const handleR = handleL.clone();
        handleR.position.x = 0.12;
        group.add(handleR);

        group.position.y = -0.1;
        return group;
    }

    /* ──────────────── GLB MODEL FILE MAP ──────────────── */
    const MODEL_FILES = {
        'tshirt':        'three/models/tshirt.glb',
        'oversize':      'three/models/oversize.glb',
        'hoodie':        'three/models/hoodie.glb',
        'sweatshirt':    'three/models/sweatshirt.glb',
        'longsleeve':    'three/models/longsleeve.glb',
        'raglan':        'three/models/raglan.glb',
        'polo':          'three/models/polo.glb',
        'tanktop':       'three/models/tanktop.glb',
        'cap':           'three/models/cap.glb',
        'beanie':        'three/models/beanie.glb',
        'buckethat':     'three/models/buckethat.glb',
        'shopper':       'three/models/shopper.glb',
        'backpack':      'three/models/backpack.glb',
        'apron':         'three/models/apron.glb',
        'jacket':        'three/models/jacket.glb',
        'vest':          'three/models/vest.glb',
        'sportsjersey':  'three/models/sportsjersey.glb',
        'babybodysuit':  'three/models/babybodysuit.glb',
        'towel':         'three/models/towel.glb',
        'pillow':        'three/models/pillow.glb',
        'blanket':       'three/models/blanket.glb',
        'notebook':      'three/models/notebook.glb',
        'phonecase':     'three/models/phonecase.glb',
        'mousepad':      'three/models/mousepad.glb',
    };

    const loader = new THREE.GLTFLoader();

    /* ──────────────── MODEL MANAGEMENT ──────────────── */
    let currentModel = null;

    /* All zone decal meshes stored by zone key */
    const allZoneDecalMeshes = {};

    /* ──── ZONE ANCHORS ──── */
    /* Computed anchor points for each placement zone (world-space) */
    const modelAnchors = {
        front:        new THREE.Vector3(0, 0, 0.29),
        back:         new THREE.Vector3(0, 0, -0.29),
        'left-sleeve':  new THREE.Vector3(-0.6, 0.2, 0.1),
        'right-sleeve': new THREE.Vector3(0.6, 0.2, 0.1),
        neck:         new THREE.Vector3(0, 0.4, 0.1),
        label:        new THREE.Vector3(0.1, 0.35, 0.05),
        pocket:       new THREE.Vector3(-0.12, -0.15, 0.25),
    };
    let modelScale = 0.25;

    /* Recompute anchor points for all zones from model bounding box */
    function computeModelAnchors() {
        if (!currentModel) return;
        const box    = new THREE.Box3().setFromObject(currentModel);
        const size   = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        /* Default scale for decals relative to model */
        modelScale = Math.min(size.x, size.y) * 0.35;

        /* Front: center of front face */
        modelAnchors.front.set(center.x, center.y + size.y * 0.05, box.max.z + 0.02);

        /* Back: center of back face */
        modelAnchors.back.set(center.x, center.y + size.y * 0.05, box.min.z - 0.02);

        /* Left sleeve: left side, upper area */
        modelAnchors['left-sleeve'].set(box.min.x - 0.02, center.y + size.y * 0.15, center.z * 0.5 + box.max.z * 0.5);

        /* Right sleeve: right side, upper area */
        modelAnchors['right-sleeve'].set(box.max.x + 0.02, center.y + size.y * 0.15, center.z * 0.5 + box.max.z * 0.5);

        /* Neck: top center, slightly forward */
        modelAnchors.neck.set(center.x, box.max.y - size.y * 0.05, center.z + size.z * 0.15);

        /* Label: inside neck, back area */
        modelAnchors.label.set(center.x, box.max.y - size.y * 0.1, center.z - size.z * 0.1);

        /* Pocket: front, lower-left chest area */
        modelAnchors.pocket.set(center.x - size.x * 0.18, center.y - size.y * 0.15, box.max.z + 0.02);

        /* Reset active zone transforms to defaults */
        const zd = zoneDecals[state.activeZone];
        if (zd) {
            zd.transforms = {
                posX: 0, posY: 0, posZ: 0,
                scaleX: (state.activeZone === 'left-sleeve' || state.activeZone === 'right-sleeve' || state.activeZone === 'neck' || state.activeZone === 'label' || state.activeZone === 'pocket')
                    ? modelScale * 0.6 : modelScale,
                scaleY: (state.activeZone === 'left-sleeve' || state.activeZone === 'right-sleeve' || state.activeZone === 'neck' || state.activeZone === 'label' || state.activeZone === 'pocket')
                    ? modelScale * 0.6 : modelScale,
                rotX: 0, rotY: 0, rotZ: 0,
            };
        }
        Object.assign(state.decalTransforms, zoneDecals[state.activeZone].transforms);
        syncDesignInputs();
    }

    /* ──── CAMERA ANIMATION ──── */
    let cameraAnim = null; /* { fromPos, toPos, fromTarget, toTarget, t, duration } */

    function animateCameraTo(zone) {
        const preset = ZONE_CAMERAS[zone];
        if (!preset) return;
        cameraAnim = {
            fromPos: camera.position.clone(),
            toPos: new THREE.Vector3(...preset.pos),
            fromTarget: controls.target.clone(),
            toTarget: new THREE.Vector3(...preset.target),
            t: 0,
            duration: 0.6,
        };
    }

    function updateCameraAnimation(dt) {
        if (!cameraAnim) return;
        cameraAnim.t += dt;
        const t = Math.min(cameraAnim.t / cameraAnim.duration, 1);
        /* Ease in-out cubic */
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        camera.position.lerpVectors(cameraAnim.fromPos, cameraAnim.toPos, e);
        controls.target.lerpVectors(cameraAnim.fromTarget, cameraAnim.toTarget, e);

        if (t >= 1) cameraAnim = null;
    }

    /* ──── LOAD PRODUCT ──── */
    function loadProduct(productId, color) {
        if (currentModel) {
            scene.remove(currentModel);
            currentModel = null;
        }
        clearAllZoneDecals();

        const c = color || state.fabricColor;
        const glbPath = MODEL_FILES[productId];

        if (glbPath) {
            loading.classList.remove('hidden');
            loader.load(
                glbPath,
                (gltf) => {
                    currentModel = gltf.scene;
                    currentModel.traverse(child => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                            if (child.material) {
                                child.material.color = new THREE.Color(c);
                                child.material.roughness = child.material.roughness || 0.85;
                            }
                        }
                    });
                    const box = new THREE.Box3().setFromObject(currentModel);
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 1.5 / Math.max(maxDim, EPS);
                    currentModel.scale.setScalar(scale);
                    const center = box.getCenter(new THREE.Vector3());
                    currentModel.position.sub(center);
                    currentModel.position.y += (size.y * scale) / 2 - 0.8;

                    scene.add(currentModel);
                    currentModel.updateMatrixWorld(true);
                    loading.classList.add('hidden');
                    computeModelAnchors();
                    reapplyCurrentZoneDecal();
                    if (state.showSafeArea) toggleSafeArea(false);
                    toggleSafeArea(state.showSafeArea);
                },
                undefined,
                () => { loadProcedural(productId, c); }
            );
        } else {
            loadProcedural(productId, c);
        }
    }

    function loadProcedural(productId, c) {
        switch (productId) {
            case 'hoodie':       currentModel = createProceduralHoodie(c); break;
            case 'cap':          currentModel = createProceduralCap(c); break;
            case 'beanie':       currentModel = createProceduralCap(c); break;
            case 'buckethat':    currentModel = createProceduralCap(c); break;
            case 'shopper':      currentModel = createProceduralBag(c); break;
            case 'backpack':     currentModel = createProceduralBag(c); break;
            default:             currentModel = createProceduralTShirt(c); break;
        }
        scene.add(currentModel);
        currentModel.updateMatrixWorld(true);
        loading.classList.add('hidden');
        computeModelAnchors();
        reapplyCurrentZoneDecal();
        if (state.showSafeArea) toggleSafeArea(false);
        toggleSafeArea(state.showSafeArea);
    }

    function updateFabricColor(color) {
        if (!currentModel) return;
        state.fabricColor = color;
        currentModel.traverse(child => {
            if (child.isMesh && child.material && child.name !== 'decal') {
                child.material.color.set(color);
            }
        });
    }

    /* ──────────────── DECAL SYSTEM (ZONE-AWARE) ──────────────── */

    function clearZoneDecals(zone, disposeTex) {
        const meshes = allZoneDecalMeshes[zone];
        if (!meshes) return;
        meshes.forEach(m => {
            scene.remove(m);
            if (m.geometry) m.geometry.dispose();
            if (m.material) {
                if (disposeTex && m.material.map) m.material.map.dispose();
                m.material.dispose();
            }
        });
        allZoneDecalMeshes[zone] = [];
    }

    function clearAllZoneDecals() {
        Object.keys(allZoneDecalMeshes).forEach(z => clearZoneDecals(z, false));
    }

    function applyDecalToZone(zone, texture, position, rotation, scale) {
        if (!currentModel || !texture) return;

        const anchor = modelAnchors[zone];
        if (!anchor) return;

        /* Compute actual world position: anchor + user offset */
        const worldPos = new THREE.Vector3(
            anchor.x + position.x,
            anchor.y + position.y,
            anchor.z + position.z
        );

        /* Find target meshes */
        const targetMeshes = [];
        currentModel.traverse(child => {
            if (child.isMesh && child.name !== 'decal') {
                targetMeshes.push(child);
            }
        });
        if (targetMeshes.length === 0) return;

        const absScaleX = Math.abs(scale.x) || 0.3;
        const absScaleY = Math.abs(scale.y) || 0.3;
        const size = new THREE.Vector3(absScaleX, absScaleY, Math.max(absScaleX, absScaleY) * 0.5);

        const tintCol = new THREE.Color(state.printColor);
        const mat = new THREE.MeshStandardMaterial({
            map: texture, transparent: true, opacity: state.printOpacity,
            depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1,
            roughness: 0.6, metalness: 0.0, color: tintCol,
        });

        if (!allZoneDecalMeshes[zone]) allZoneDecalMeshes[zone] = [];

        /* Try DecalGeometry first */
        if (typeof THREE.DecalGeometry !== 'undefined') {
            let anySuccess = false;
            targetMeshes.forEach(mesh => {
                try {
                    const decalGeo = new THREE.DecalGeometry(
                        mesh, worldPos,
                        new THREE.Euler(rotation.x, rotation.y, rotation.z),
                        size
                    );
                    if (!decalGeo || decalGeo.attributes.position.count === 0) return;
                    const decalMesh = new THREE.Mesh(decalGeo, mat);
                    decalMesh.name = 'decal';
                    decalMesh.renderOrder = 1;
                    scene.add(decalMesh);
                    allZoneDecalMeshes[zone].push(decalMesh);
                    anySuccess = true;
                } catch (err) {
                    console.warn('DecalGeometry failed on mesh:', err.message);
                }
            });
            if (anySuccess) return;

            /* DecalGeometry produced nothing — fallback to plane */
            console.warn('DecalGeometry empty — fallback plane for zone:', zone);
        }

        /* Fallback: plane-based decal */
        const geo = new THREE.PlaneGeometry(absScaleX, absScaleY);
        const planeMat = new THREE.MeshStandardMaterial({
            map: texture, transparent: true, opacity: state.printOpacity,
            depthWrite: false, side: THREE.DoubleSide, roughness: 0.6,
            metalness: 0.0, color: tintCol,
        });
        const mesh = new THREE.Mesh(geo, planeMat);
        mesh.position.copy(worldPos);

        /* Orient the plane to face the camera direction for this zone */
        const camPreset = ZONE_CAMERAS[zone];
        if (camPreset) {
            const camDir = new THREE.Vector3(...camPreset.pos).normalize().negate();
            mesh.lookAt(mesh.position.clone().add(camDir));
        }

        mesh.name = 'decal';
        mesh.renderOrder = 1;
        scene.add(mesh);
        allZoneDecalMeshes[zone].push(mesh);
    }

    /* Reapply decal for the currently active zone only */
    function reapplyCurrentZoneDecal() {
        const zone = state.activeZone;
        const zd = zoneDecals[zone];
        if (!zd) return;

        clearZoneDecals(zone, false);
        if (!zd.texture) return;

        const t = zd.transforms;
        applyDecalToZone(zone, zd.texture,
            { x: t.posX, y: t.posY, z: t.posZ },
            { x: t.rotX * Math.PI / 180, y: t.rotY * Math.PI / 180, z: t.rotZ * Math.PI / 180 },
            { x: t.scaleX, y: t.scaleY }
        );
    }

    /* ──────────────── LOGO UPLOAD ──────────────── */
    const uploadZone   = document.getElementById('uploadZone');
    const logoInput    = document.getElementById('logoInput');
    const logoPreview  = document.getElementById('logoPreview');
    const logoPreviewImg = document.getElementById('logoPreviewImg');

    uploadZone.addEventListener('click', () => logoInput.click());
    logoInput.addEventListener('change', handleLogoFile);

    uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', e => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) processLogoFile(e.dataTransfer.files[0]);
    });

    function handleLogoFile(e) {
        if (e.target.files.length) processLogoFile(e.target.files[0]);
    }

    function processLogoFile(file) {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            logoPreviewImg.src = ev.target.result;
            logoPreview.style.display = 'flex';
            uploadZone.style.display = 'none';

            const img = new Image();
            img.onload = () => {
                /* Create texture for the active zone */
                const zone = state.activeZone;
                const zd = zoneDecals[zone];

                if (zd.texture) zd.texture.dispose();
                zd.texture = new THREE.Texture(img);
                zd.texture.needsUpdate = true;
                zd.texture.encoding = THREE.sRGBEncoding;

                /* Also keep a global ref for legacy compat */
                decalTexture = zd.texture;

                addLayer(file.name, ev.target.result);
                reapplyCurrentZoneDecal();
                pushUndo();
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }

    /* Legacy ref (for some UI code) */
    let decalTexture = null;

    /* Remove logo from current zone */
    document.getElementById('btnRemoveLogo').addEventListener('click', () => {
        logoPreview.style.display = 'none';
        uploadZone.style.display = 'flex';
        logoInput.value = '';

        const zone = state.activeZone;
        const zd = zoneDecals[zone];
        clearZoneDecals(zone, true);
        if (zd.texture) { zd.texture.dispose(); zd.texture = null; }
        decalTexture = null;

        state.layers = [];
        state.selectedLayerId = null;
        renderLayerList();
        pushUndo();
    });

    /* ──────────────── LAYER SYSTEM ──────────────── */
    function addLayer(name, thumbnail) {
        const id = Date.now().toString(36);
        state.layers.push({
            id, name: name || 'Logo', thumbnail,
            zone: state.activeZone, visible: true, locked: false,
        });
        state.selectedLayerId = id;
        renderLayerList();
    }

    function renderLayerList() {
        const list = document.getElementById('layerList');
        if (state.layers.length === 0) {
            list.innerHTML = '<div class="layer-empty">No layers yet. Upload a logo to begin.</div>';
            return;
        }
        list.innerHTML = state.layers.map(l => `
            <div class="layer-item ${l.id === state.selectedLayerId ? 'active' : ''}" data-id="${l.id}">
                <div class="layer-item-icon">
                    <img src="${l.thumbnail}" alt="">
                </div>
                <span class="layer-item-name">${l.name}</span>
                <span style="font-size:9px;color:${l.visible ? '#FFD400' : '#666'}">${l.visible ? '●' : '○'}</span>
                <span style="font-size:9px;color:${l.locked ? '#FFD400' : '#666'}">${l.locked ? '🔒' : ''}</span>
            </div>
        `).join('');

        list.querySelectorAll('.layer-item').forEach(el => {
            el.addEventListener('click', () => {
                state.selectedLayerId = el.dataset.id;
                renderLayerList();
            });
        });
    }

    document.getElementById('btnDuplicateLayer').addEventListener('click', () => {
        const layer = state.layers.find(l => l.id === state.selectedLayerId);
        if (!layer) return;
        addLayer(layer.name + ' (copy)', layer.thumbnail);
        pushUndo();
    });

    document.getElementById('btnDeleteLayer').addEventListener('click', () => {
        if (!state.selectedLayerId) return;
        state.layers = state.layers.filter(l => l.id !== state.selectedLayerId);
        state.selectedLayerId = state.layers.length ? state.layers[state.layers.length - 1].id : null;
        if (state.layers.length === 0) {
            clearZoneDecals(state.activeZone, true);
            zoneDecals[state.activeZone].texture = null;
            decalTexture = null;
        }
        renderLayerList();
        pushUndo();
    });

    /* ──────────────── ZONE SWITCHING ──────────────── */
    const ZONE_LABELS = {
        'front': 'FRONT', 'back': 'BACK',
        'left-sleeve': 'LEFT SLEEVE', 'right-sleeve': 'RIGHT SLEEVE',
        'neck': 'NECK', 'label': 'LABEL', 'pocket': 'POCKET',
    };

    function switchZone(zone) {
        if (!zoneDecals[zone]) return;

        /* Save current zone transforms back */
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };

        /* Switch */
        state.activeZone = zone;

        /* Load new zone transforms */
        Object.assign(state.decalTransforms, zoneDecals[zone].transforms);
        syncDesignInputs();

        /* Update UI zone buttons */
        document.querySelectorAll('.layer-zone').forEach(el => {
            el.classList.toggle('active', el.dataset.zone === zone);
        });

        /* Update zone hint overlay */
        const hint = document.getElementById('zoneHint');
        if (hint) {
            hint.textContent = (ZONE_LABELS[zone] || zone.toUpperCase()) + ' · Drag to move · Scroll to resize';
        }

        /* Animate camera to face the new zone */
        animateCameraTo(zone);

        /* Reapply decal for new zone */
        reapplyCurrentZoneDecal();

        /* Show logo preview if this zone has a texture */
        const zd = zoneDecals[zone];
        if (zd && zd.texture && zd.texture.image) {
            logoPreviewImg.src = zd.texture.image.src || '';
            logoPreview.style.display = 'flex';
            uploadZone.style.display = 'none';
        } else {
            logoPreview.style.display = 'none';
            uploadZone.style.display = 'flex';
        }
    }

    /* Wire up zone buttons */
    document.querySelectorAll('.layer-zone').forEach(el => {
        el.addEventListener('click', () => switchZone(el.dataset.zone));
    });

    /* ──────────────── MOUSE DRAG SYSTEM ──────────────── */
    let isDragging = false;
    let isResizing = false;
    let dragStartMouse = new THREE.Vector2();
    let dragStartPoint = new THREE.Vector3();
    let dragStartTransforms = {};

    function getMouseNDC(e) {
        const rect = canvas.getBoundingClientRect();
        return new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
    }

    function raycastModel(ndcPos) {
        if (!currentModel) return null;
        raycaster.setFromCamera(ndcPos, camera);
        const meshes = [];
        currentModel.traverse(child => {
            if (child.isMesh && child.name !== 'decal') meshes.push(child);
        });
        const hits = raycaster.intersectObjects(meshes, false);
        return hits.length > 0 ? hits[0] : null;
    }

    canvas.addEventListener('mousedown', (e) => {
        /* Only left click, and only if we have a decal on this zone */
        if (e.button !== 0) return;
        const zd = zoneDecals[state.activeZone];
        if (!zd || !zd.texture) return;

        const ndc = getMouseNDC(e);
        const hit = raycastModel(ndc);
        if (!hit) return;

        isDragging = true;
        controls.enabled = false;  /* Disable orbit while dragging */
        canvas.style.cursor = 'grabbing';

        dragStartMouse.copy(ndc);
        dragStartPoint.copy(hit.point);
        dragStartTransforms = { ...state.decalTransforms };

        e.preventDefault();
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) {
            /* Show grab cursor when hovering over model with decal */
            if (zoneDecals[state.activeZone]?.texture) {
                const ndc = getMouseNDC(e);
                const hit = raycastModel(ndc);
                canvas.style.cursor = hit ? 'grab' : '';
            }
            return;
        }

        const ndc = getMouseNDC(e);
        const hit = raycastModel(ndc);
        if (!hit) return;

        /* Calculate delta in world space on the model surface */
        const anchor = modelAnchors[state.activeZone];
        if (!anchor) return;

        /* Project the delta from 3D space to a 2D offset relative to the anchor */
        const delta = new THREE.Vector3().subVectors(hit.point, dragStartPoint);

        /* Determine the primary plane for this zone to constrain movement */
        const zone = state.activeZone;
        let dx = 0, dy = 0;

        if (zone === 'front' || zone === 'back' || zone === 'pocket') {
            /* Front/back: X = horizontal, Y = vertical */
            dx = hit.point.x - dragStartPoint.x;
            dy = hit.point.y - dragStartPoint.y;
        } else if (zone === 'left-sleeve' || zone === 'right-sleeve') {
            /* Sleeves: constrain to the sleeve surface */
            dx = hit.point.z - dragStartPoint.z;
            dy = hit.point.y - dragStartPoint.y;
        } else if (zone === 'neck' || zone === 'label') {
            dx = hit.point.x - dragStartPoint.x;
            dy = hit.point.z - dragStartPoint.z;
        }

        state.decalTransforms.posX = dragStartTransforms.posX + dx;
        state.decalTransforms.posY = dragStartTransforms.posY + dy;

        syncDesignInputs();
        reapplyCurrentZoneDecal();
    });

    canvas.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            controls.enabled = true;
            canvas.style.cursor = '';
            /* Save zone transforms */
            zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
            pushUndo();
        }
    });

    canvas.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            controls.enabled = true;
            canvas.style.cursor = '';
            zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
            pushUndo();
        }
    });

    /* ──── SCROLL TO RESIZE ──── */
    canvas.addEventListener('wheel', (e) => {
        const zd = zoneDecals[state.activeZone];
        if (!zd || !zd.texture) return;

        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.01 : 0.01;
        const speed = e.shiftKey ? 0.05 : 0.015;

        state.decalTransforms.scaleX += delta * speed / 0.01 * 0.02;
        state.decalTransforms.scaleY += delta * speed / 0.01 * 0.02;

        /* Clamp scale */
        state.decalTransforms.scaleX = Math.max(0.02, Math.min(2.0, state.decalTransforms.scaleX));
        state.decalTransforms.scaleY = Math.max(0.02, Math.min(2.0, state.decalTransforms.scaleY));

        if (state.lockAspect) {
            state.decalTransforms.scaleY = state.decalTransforms.scaleX;
        }

        syncDesignInputs();
        reapplyCurrentZoneDecal();
    }, { passive: false });

    /* ──────────────── PRODUCT SELECT & COLOR ──────────────── */
    document.getElementById('productSelect').addEventListener('change', (e) => {
        const id = e.target.value;
        state.currentProduct = id;
        loadProduct(id, state.fabricColor);
        updateCarouselActive(id);
        pushUndo();
    });

    /* Fabric color swatches */
    document.querySelectorAll('#fabricSwatches .color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
            const c = sw.dataset.color;
            state.fabricColor = c;
            updateFabricColor(c);
            document.getElementById('customFabricColor').value = c;
            document.getElementById('fabricHexInput').value = c;
            updateFabricColorRGB(c);
            syncFabricSwatch(c);
            pushUndo();
        });
    });

    document.getElementById('customFabricColor').addEventListener('input', (e) => {
        updateFabricColor(e.target.value);
        document.getElementById('fabricHexInput').value = e.target.value;
        updateFabricColorRGB(e.target.value);
        syncFabricSwatch(e.target.value);
    });

    document.getElementById('fabricHexInput').addEventListener('change', (e) => {
        const c = e.target.value;
        updateFabricColor(c);
        document.getElementById('customFabricColor').value = c;
        updateFabricColorRGB(c);
        syncFabricSwatch(c);
        pushUndo();
    });

    function updateFabricColorRGB(hex) {
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        document.getElementById('fabricR').value = r;
        document.getElementById('fabricG').value = g;
        document.getElementById('fabricB').value = b;
    }

    function syncFabricSwatch(color) {
        document.querySelectorAll('#fabricSwatches .color-swatch').forEach(sw => {
            sw.classList.toggle('active', sw.dataset.color.toUpperCase() === color.toUpperCase());
        });
    }

    /* Print color swatches */
    document.querySelectorAll('#printSwatches .color-swatch').forEach(sw => {
        sw.addEventListener('click', () => {
            state.printColor = sw.dataset.color;
            document.getElementById('customPrintColor').value = sw.dataset.color;
            reapplyCurrentZoneDecal();
            pushUndo();
        });
    });

    document.getElementById('customPrintColor').addEventListener('input', (e) => {
        state.printColor = e.target.value;
        reapplyCurrentZoneDecal();
    });

    /* ──────────────── RIGHT SIDEBAR TABS ──────────────── */
    document.querySelectorAll('.right-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.right-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.activeTab = tab.dataset.tab;
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById('panel-' + tab.dataset.tab);
            if (panel) panel.classList.add('active');
        });
    });

    /* ──────────────── PRODUCT TAB ──────────────── */
    document.querySelectorAll('.material-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.material-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.material = btn.dataset.material;
            applyMaterialPreset();
        });
    });

    document.querySelectorAll('.texture-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.texture-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.texture = btn.dataset.texture;
            applyMaterialPreset();
        });
    });

    document.getElementById('reflectionIntensity').addEventListener('input', (e) => {
        state.reflectionIntensity = parseInt(e.target.value) / 100;
        document.getElementById('reflectionVal').textContent = state.reflectionIntensity.toFixed(1);
        applyMaterialPreset();
    });

    function applyMaterialPreset() {
        if (!currentModel) return;
        const roughnessMap = {
            'cotton': 0.85, 'polyester': 0.5, 'heavy-cotton': 0.95, 'premium': 0.4, 'organic': 0.9,
        };
        const textureRoughnessMap = { 'matte': 0, 'soft': 0.1, 'gloss': -0.2, 'wrinkles': 0.05 };
        let roughness = roughnessMap[state.material] || 0.85;
        roughness += textureRoughnessMap[state.texture] || 0;
        roughness = Math.max(0.1, Math.min(1.0, roughness));
        currentModel.traverse(child => {
            if (child.isMesh && child.name !== 'decal') {
                child.material.roughness = roughness;
                child.material.metalness = state.reflectionIntensity;
                child.material.needsUpdate = true;
            }
        });
    }

    /* ──────────────── SCENE TAB ──────────────── */
    document.querySelectorAll('.scene-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.activeScene = btn.dataset.scene;
            setupLighting(state.activeScene);
            if (state.showGrid) { toggleGrid(false); toggleGrid(true); }
        });
    });

    /* ──────────────── TOOLBAR ACTIONS ──────────────── */
    document.getElementById('btnGrid').addEventListener('click', function () {
        state.showGrid = !state.showGrid;
        this.classList.toggle('active', state.showGrid);
        toggleGrid(state.showGrid);
    });

    document.getElementById('btnSafeArea').addEventListener('click', function () {
        state.showSafeArea = !state.showSafeArea;
        this.classList.toggle('active', state.showSafeArea);
        toggleSafeArea(state.showSafeArea);
    });

    document.getElementById('btnFullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) {
            wrapper.requestFullscreen?.() || wrapper.webkitRequestFullscreen?.();
        } else {
            document.exitFullscreen?.() || document.webkitExitFullscreen?.();
        }
    });

    /* ──────────────── DESIGN TAB CONTROLS ──────────────── */
    const posInputs = { x: 'posX', y: 'posY', z: 'posZ' };
    const scaleInputs = { w: 'scaleW', h: 'scaleH' };
    const rotInputs = { x: 'rotX', y: 'rotY', z: 'rotZ' };

    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    /* Position */
    Object.entries(posInputs).forEach(([key, id]) => {
        document.getElementById(id).addEventListener('change', (e) => {
            const val = parseFloat(e.target.value) || 0;
            state.decalTransforms['pos' + key.toUpperCase()] = val;
            zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
            reapplyCurrentZoneDecal();
            pushUndo();
        });
    });

    /* Scale */
    document.getElementById('scaleW').addEventListener('change', (e) => {
        const val = Math.max(EPS, parseFloat(e.target.value) || 1);
        state.decalTransforms.scaleX = val;
        if (state.lockAspect) {
            state.decalTransforms.scaleY = val;
            document.getElementById('scaleH').value = val;
        }
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    document.getElementById('scaleH').addEventListener('change', (e) => {
        const val = Math.max(EPS, parseFloat(e.target.value) || 1);
        state.decalTransforms.scaleY = val;
        if (state.lockAspect) {
            state.decalTransforms.scaleX = val;
            document.getElementById('scaleW').value = val;
        }
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    document.getElementById('btnLockAspect').addEventListener('click', function () {
        state.lockAspect = !state.lockAspect;
        this.classList.toggle('active', state.lockAspect);
    });

    /* Rotation */
    Object.entries(rotInputs).forEach(([key, id]) => {
        document.getElementById(id).addEventListener('change', (e) => {
            const val = parseFloat(e.target.value) || 0;
            state.decalTransforms['rot' + key.toUpperCase()] = val;
            zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
            reapplyCurrentZoneDecal();
            pushUndo();
        });
    });

    /* Decal opacity */
    document.getElementById('decalOpacity').addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        document.getElementById('decalOpacityVal').textContent = val;
        state.printOpacity = val / 100;
        /* Update all visible zone decals */
        Object.keys(allZoneDecalMeshes).forEach(zone => {
            allZoneDecalMeshes[zone].forEach(m => { m.material.opacity = state.printOpacity; });
        });
    });

    /* Mirror / Flip */
    document.getElementById('btnMirrorH').addEventListener('click', () => {
        state.decalTransforms.scaleX *= -1;
        document.getElementById('scaleW').value = state.decalTransforms.scaleX;
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    document.getElementById('btnFlipV').addEventListener('click', () => {
        state.decalTransforms.scaleY *= -1;
        document.getElementById('scaleH').value = state.decalTransforms.scaleY;
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    /* Alignment */
    document.getElementById('btnAlignCenter').addEventListener('click', () => {
        state.decalTransforms.posX = 0;
        state.decalTransforms.posY = 0;
        state.decalTransforms.posZ = 0;
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        syncDesignInputs();
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    document.getElementById('btnFitWidth').addEventListener('click', () => {
        state.decalTransforms.scaleX = modelScale * 1.5;
        if (state.lockAspect) state.decalTransforms.scaleY = modelScale * 1.5;
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        syncDesignInputs();
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    document.getElementById('btnFitHeight').addEventListener('click', () => {
        state.decalTransforms.scaleY = modelScale * 1.2;
        if (state.lockAspect) state.decalTransforms.scaleX = modelScale * 1.2;
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        syncDesignInputs();
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    document.getElementById('btnSnap').addEventListener('click', () => {
        state.decalTransforms.posX = 0;
        state.decalTransforms.posY = 0;
        state.decalTransforms.posZ = 0;
        state.decalTransforms.scaleX = modelScale;
        state.decalTransforms.scaleY = modelScale;
        state.decalTransforms.rotX = 0;
        state.decalTransforms.rotY = 0;
        state.decalTransforms.rotZ = 0;
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        syncDesignInputs();
        reapplyCurrentZoneDecal();
        pushUndo();
    });

    function syncDesignInputs() {
        const t = state.decalTransforms;
        document.getElementById('posX').value = t.posX.toFixed(2);
        document.getElementById('posY').value = t.posY.toFixed(2);
        document.getElementById('posZ').value = t.posZ.toFixed(2);
        document.getElementById('scaleW').value = t.scaleX.toFixed(2);
        document.getElementById('scaleH').value = t.scaleY.toFixed(2);
        document.getElementById('rotX').value = t.rotX;
        document.getElementById('rotY').value = t.rotY;
        document.getElementById('rotZ').value = t.rotZ;
    }

    /* ──────────────── UNDO / REDO ──────────────── */
    function pushUndo() {
        const snapshot = {
            product: state.currentProduct,
            fabricColor: state.fabricColor,
            transforms: { ...state.decalTransforms },
            activeZone: state.activeZone,
            hasDecal: !!zoneDecals[state.activeZone]?.texture,
            layers: JSON.parse(JSON.stringify(state.layers.map(l => ({ ...l, thumbnail: undefined })))),
        };
        state.undoStack.push(JSON.stringify(snapshot));
        if (state.undoStack.length > 50) state.undoStack.shift();
        state.redoStack = [];
    }

    document.getElementById('btnUndo').addEventListener('click', undo);
    document.getElementById('btnRedo').addEventListener('click', redo);

    function undo() {
        if (state.undoStack.length < 2) return;
        state.redoStack.push(state.undoStack.pop());
        restoreSnapshot(state.undoStack[state.undoStack.length - 1]);
    }

    function redo() {
        if (state.redoStack.length === 0) return;
        const snap = state.redoStack.pop();
        state.undoStack.push(snap);
        restoreSnapshot(snap);
    }

    function restoreSnapshot(json) {
        const s = JSON.parse(json);
        if (s.product !== state.currentProduct) {
            state.currentProduct = s.product;
            document.getElementById('productSelect').value = s.product;
            loadProduct(s.product, s.fabricColor);
        }
        if (s.fabricColor !== state.fabricColor) {
            updateFabricColor(s.fabricColor);
        }
        if (s.activeZone && s.activeZone !== state.activeZone) {
            switchZone(s.activeZone);
        }
        Object.assign(state.decalTransforms, s.transforms);
        zoneDecals[state.activeZone].transforms = { ...state.decalTransforms };
        syncDesignInputs();
        if (s.hasDecal && zoneDecals[state.activeZone]?.texture) reapplyCurrentZoneDecal();
    }

    /* ──────────────── EXPORT / DOWNLOAD ──────────────── */
    function downloadCanvas(format, transparent) {
        const w = 1920, h = 1440;
        const origW = wrapper.clientWidth || 800;
        const origH = wrapper.clientHeight || 600;
        const originalPixelRatio = renderer.getPixelRatio();

        renderer.setSize(w, h, false);
        renderer.setPixelRatio(1);

        if (transparent) {
            const prevBg = scene.background;
            scene.background = null;
            renderer.render(scene, camera);
            scene.background = prevBg;
        } else {
            renderer.render(scene, camera);
        }

        const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
        const ext = format === 'jpg' ? 'jpg' : format === 'webp' ? 'webp' : 'png';
        const dataUrl = renderer.domElement.toDataURL(mimeType, 0.95);

        renderer.setSize(origW, origH, false);
        renderer.setPixelRatio(originalPixelRatio);
        canvas.style.width  = origW + 'px';
        canvas.style.height = origH + 'px';

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `lavanda-${state.currentProduct}-${Date.now()}.${ext}`;
        a.click();
    }

    document.getElementById('btnRenderPreview').addEventListener('click', () => {
        renderer.render(scene, camera);
        const flash = document.createElement('div');
        flash.style.cssText = 'position:absolute;inset:0;background:white;opacity:.3;pointer-events:none;z-index:50;transition:opacity .4s;';
        wrapper.appendChild(flash);
        requestAnimationFrame(() => { flash.style.opacity = '0'; });
        setTimeout(() => flash.remove(), 500);
    });

    document.getElementById('btnDownloadPNG').addEventListener('click', () => downloadCanvas('png', false));
    document.getElementById('btnDownloadJPG').addEventListener('click', () => downloadCanvas('jpg', false));
    document.getElementById('btnDownloadWEBP').addEventListener('click', () => downloadCanvas('webp', false));
    document.getElementById('btnTransparentExport').addEventListener('click', () => downloadCanvas('png', true));

    document.getElementById('btnExportScene').addEventListener('click', () => {
        const data = {
            product: state.currentProduct, fabricColor: state.fabricColor,
            scene: state.activeScene, material: state.material, texture: state.texture,
            activeZone: state.activeZone,
            zoneDecals: Object.fromEntries(
                Object.entries(zoneDecals).map(([k, v]) => [k, { transforms: { ...v.transforms }, hasTexture: !!v.texture }])
            ),
            layers: state.layers.map(l => ({ ...l, thumbnail: undefined })),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `lavanda-scene-${Date.now()}.json`;
        a.click();
    });

    document.getElementById('btnSaveProject').addEventListener('click', () => {
        const data = {
            product: state.currentProduct, fabricColor: state.fabricColor,
            scene: state.activeScene, material: state.material, texture: state.texture,
            activeZone: state.activeZone,
            zoneDecals: Object.fromEntries(
                Object.entries(zoneDecals).map(([k, v]) => [k, { transforms: { ...v.transforms }, hasTexture: !!v.texture }])
            ),
        };
        localStorage.setItem('lavanda-project', JSON.stringify(data));

        const btn = document.getElementById('btnSaveProject');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span style="color:#FFD400">✓ Saved</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
    });

    document.getElementById('btnExportHeader').addEventListener('click', () => downloadCanvas('png', false));

    /* ──────────────── PRODUCT CAROUSEL ──────────────── */
    const carouselTrack = document.getElementById('carouselTrack');

    function buildCarousel() {
        carouselTrack.innerHTML = PRODUCTS.map(p => `
            <div class="carousel-card ${p.id === state.currentProduct ? 'active' : ''}" data-product="${p.id}">
                <div class="carousel-card-icon">${p.icon}</div>
                <div class="carousel-card-name">${p.name}</div>
                <div class="carousel-card-detail">${p.material}<br>${p.weight} · ${p.colors} colors</div>
            </div>
        `).join('');

        carouselTrack.querySelectorAll('.carousel-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.product;
                state.currentProduct = id;
                document.getElementById('productSelect').value = id;
                loadProduct(id, state.fabricColor);
                updateCarouselActive(id);
                pushUndo();
            });
        });
    }

    function updateCarouselActive(id) {
        carouselTrack.querySelectorAll('.carousel-card').forEach(c => {
            c.classList.toggle('active', c.dataset.product === id);
        });
        const active = carouselTrack.querySelector(`[data-product="${id}"]`);
        if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    buildCarousel();

    document.getElementById('carouselPrev').addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -200, behavior: 'smooth' });
    });
    document.getElementById('carouselNext').addEventListener('click', () => {
        carouselTrack.scrollBy({ left: 200, behavior: 'smooth' });
    });

    /* ──────────────── STEP TOGGLE ──────────────── */
    document.querySelectorAll('.step-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = document.getElementById(header.dataset.toggle);
            const isHidden = content.classList.contains('hidden');
            content.classList.toggle('hidden', !isHidden);
            header.classList.toggle('collapsed', !isHidden);
        });
    });

    /* ──────────────── KEYBOARD SHORTCUTS ──────────────── */
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

        if (e.ctrlKey && e.key === 'z') { e.preventDefault(); if (e.shiftKey) redo(); else undo(); }
        if (e.ctrlKey && e.key === 's') { e.preventDefault(); document.getElementById('btnSaveProject').click(); }
        if (e.ctrlKey && e.key === 'e') { e.preventDefault(); downloadCanvas('png', false); }
        if (e.key === 'Delete' || e.key === 'Backspace') {
            if (state.selectedLayerId) document.getElementById('btnDeleteLayer').click();
        }
        if (e.ctrlKey && e.key === 'd') { e.preventDefault(); document.getElementById('btnDuplicateLayer').click(); }
        if (e.key === 'g') document.getElementById('btnGrid').click();
        if (e.key === 'f') document.getElementById('btnFullscreen').click();
        if (e.key === ' ') {
            e.preventDefault();
            animateCameraTo(state.activeZone);
        }
        /* Zone shortcuts: 1=front, 2=back, 3=left sleeve, 4=right sleeve, 5=neck */
        const zoneKeys = { '1': 'front', '2': 'back', '3': 'left-sleeve', '4': 'right-sleeve', '5': 'neck' };
        if (zoneKeys[e.key]) switchZone(zoneKeys[e.key]);

        /* Arrow nudges */
        if (isDragging) return; /* Don't nudge while dragging */
        const nudge = e.shiftKey ? 0.05 : 0.005;
        if (e.key === 'ArrowLeft')  { state.decalTransforms.posX -= nudge; syncDesignInputs(); reapplyCurrentZoneDecal(); }
        if (e.key === 'ArrowRight') { state.decalTransforms.posX += nudge; syncDesignInputs(); reapplyCurrentZoneDecal(); }
        if (e.key === 'ArrowUp')    { state.decalTransforms.posY += nudge; syncDesignInputs(); reapplyCurrentZoneDecal(); }
        if (e.key === 'ArrowDown')  { state.decalTransforms.posY -= nudge; syncDesignInputs(); reapplyCurrentZoneDecal(); }

        /* +/- to resize */
        if (e.key === '=' || e.key === '+') {
            state.decalTransforms.scaleX += 0.02;
            if (state.lockAspect) state.decalTransforms.scaleY = state.decalTransforms.scaleX;
            syncDesignInputs(); reapplyCurrentZoneDecal();
        }
        if (e.key === '-') {
            state.decalTransforms.scaleX -= 0.02;
            state.decalTransforms.scaleX = Math.max(0.02, state.decalTransforms.scaleX);
            if (state.lockAspect) state.decalTransforms.scaleY = state.decalTransforms.scaleX;
            syncDesignInputs(); reapplyCurrentZoneDecal();
        }
    });

    /* ──────────────── RESIZE HANDLER ──────────────── */
    function onResize() {
        const w = wrapper.clientWidth || 800;
        const h = wrapper.clientHeight || 600;
        if (w < 1 || h < 1) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        canvas.style.width  = w + 'px';
        canvas.style.height = h + 'px';
    }

    window.addEventListener('resize', onResize);
    new ResizeObserver(onResize).observe(wrapper);

    /* ──────────────── AUTO-SAVE ──────────────── */
    setInterval(() => {
        const data = {
            product: state.currentProduct, fabricColor: state.fabricColor,
            scene: state.activeScene, activeZone: state.activeZone,
            zoneDecals: Object.fromEntries(
                Object.entries(zoneDecals).map(([k, v]) => [k, { transforms: { ...v.transforms } }])
            ),
        };
        localStorage.setItem('lavanda-autosave', JSON.stringify(data));
    }, 30000);

    /* ──────────────── LOAD SAVED STATE ──────────────── */
    function loadSavedState() {
        try {
            const saved = JSON.parse(localStorage.getItem('lavanda-autosave') || '{}');
            if (saved.product) {
                state.currentProduct = saved.product;
                document.getElementById('productSelect').value = saved.product;
            }
            if (saved.fabricColor) {
                state.fabricColor = saved.fabricColor;
                document.getElementById('customFabricColor').value = saved.fabricColor;
                document.getElementById('fabricHexInput').value = saved.fabricColor;
                updateFabricColorRGB(saved.fabricColor);
                syncFabricSwatch(saved.fabricColor);
            }
            if (saved.scene) {
                state.activeScene = saved.scene;
                document.querySelectorAll('.scene-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.scene === saved.scene);
                });
                setupLighting(saved.scene);
            }
            if (saved.activeZone) {
                state.activeZone = saved.activeZone;
                document.querySelectorAll('.layer-zone').forEach(el => {
                    el.classList.toggle('active', el.dataset.zone === saved.activeZone);
                });
            }
            if (saved.zoneDecals) {
                Object.keys(saved.zoneDecals).forEach(zone => {
                    if (zoneDecals[zone] && saved.zoneDecals[zone].transforms) {
                        Object.assign(zoneDecals[zone].transforms, saved.zoneDecals[zone].transforms);
                    }
                });
            }
        } catch (e) { /* Ignore parse errors */ }
    }

    /* ──────────────── ANIMATION LOOP ──────────────── */
    let lastTime = performance.now();

    function animate() {
        requestAnimationFrame(animate);
        const now = performance.now();
        const dt = (now - lastTime) / 1000;
        lastTime = now;

        /* Camera animation */
        updateCameraAnimation(dt);

        controls.update();
        renderer.render(scene, camera);
    }

    /* ──────────────── INIT ──────────────── */
    loadSavedState();
    loadProduct(state.currentProduct, state.fabricColor);
    onResize();
    pushUndo();
    animate();

    /* Delayed re-size and decal reapply */
    requestAnimationFrame(() => { onResize(); });
    setTimeout(() => {
        onResize();
        computeModelAnchors();
        if (zoneDecals[state.activeZone]?.texture) reapplyCurrentZoneDecal();
    }, 800);
    setTimeout(() => { onResize(); }, 500);

    console.log('%c◆ LAVANDA TEXTILE CONSTRUCTOR v2', 'color:#FFD400;font-size:16px;font-weight:bold;');
    console.log('%cInteractive Decal · Zone Switching · Mouse Drag', 'color:#999;font-size:11px;');
    console.log('%cKeys: 1-5 = zones, Arrows = nudge, +/- = resize, Space = reset camera', 'color:#666;font-size:10px;');

})();