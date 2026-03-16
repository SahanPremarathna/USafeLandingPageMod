import * as THREE from "three";

export function initThreeScene() {
    var mount = document.getElementById("hero-three-scene");
    var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!mount || reducedMotion) {
        return;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 3.5, 8.5);
    camera.lookAt(0, 0, 0);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    var ambient = new THREE.AmbientLight(0x88bbff, 1.8);
    scene.add(ambient);

    var pointLight = new THREE.PointLight(0x35d5ff, 5, 30, 2);
    pointLight.position.set(0, 6, 5);
    scene.add(pointLight);

    var gridGroup = new THREE.Group();
    scene.add(gridGroup);

    var nodeGeometry = new THREE.SphereGeometry(0.06, 18, 18);
    var safeMaterial = new THREE.MeshBasicMaterial({ color: 0x7af0b2 });
    var alertMaterial = new THREE.MeshBasicMaterial({ color: 0xff5b7f });

    for (var x = -6; x <= 6; x += 1) {
        for (var z = -4; z <= 4; z += 1) {
            var material = (x === 3 && z === -1) || (x === 1 && z === 2) ? alertMaterial : safeMaterial;
            var mesh = new THREE.Mesh(nodeGeometry, material);
            mesh.position.set(x * 0.48, Math.sin((x + z) * 0.5) * 0.04, z * 0.48);
            mesh.userData.baseY = mesh.position.y;
            gridGroup.add(mesh);
        }
    }

    var routeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.8, 0.05, 1.7),
        new THREE.Vector3(-1.4, 0.14, 0.9),
        new THREE.Vector3(0.3, 0.08, 0.3),
        new THREE.Vector3(1.7, 0.1, -0.5),
        new THREE.Vector3(2.8, 0.04, -1.6)
    ]);
    var routeGeometry = new THREE.TubeGeometry(routeCurve, 80, 0.028, 8, false);
    var routeMaterial = new THREE.MeshBasicMaterial({ color: 0x35d5ff, transparent: true, opacity: 0.82 });
    var routeMesh = new THREE.Mesh(routeGeometry, routeMaterial);
    gridGroup.add(routeMesh);

    function resize() {
        var width = mount.clientWidth || 1;
        var height = mount.clientHeight || 1;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
    }

    var resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    var pointerX = 0;
    var pointerY = 0;

    mount.addEventListener("pointermove", function (event) {
        var rect = mount.getBoundingClientRect();
        pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;
        pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.45;
    });

    mount.addEventListener("pointerleave", function () {
        pointerX = 0;
        pointerY = 0;
    });

    var clock = new THREE.Clock();

    function animate() {
        var elapsed = clock.getElapsedTime();

        gridGroup.rotation.x = -0.9 + pointerY * 0.24;
        gridGroup.rotation.y += ((pointerX * 0.42) - gridGroup.rotation.y) * 0.05;

        for (var i = 0; i < gridGroup.children.length; i += 1) {
            var node = gridGroup.children[i];
            if (node.geometry !== nodeGeometry) {
                continue;
            }
            node.position.y = node.userData.baseY + Math.sin(elapsed * 1.7 + i * 0.12) * 0.035;
        }

        routeMaterial.opacity = 0.72 + Math.sin(elapsed * 2.4) * 0.18;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}
