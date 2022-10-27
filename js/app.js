// global variable
let scene;
let camera;
let renderer;
let circle;
let skelet;
let particle;

// основная функция
function init(){
    // создать сцену
    scene = new THREE.Scene();

    // настройка камеры
    const fov = 65;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 400;
    scene.add(camera);
    //camera.position.set(-70, -180, 220);

    //Планета сверху ( camera.position.set(-70, -180, 220); )
    //Планета слева ( camera.position.set(180, 20, 320); )
    //Каиера по центру ( camera.position.set(0, 0, 420); )

    // create renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // 3d object
    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);

    // adding geometry
    let geometry = new THREE.TetrahedronGeometry(2, 1);
    let geomet = new THREE.IcosahedronGeometry(12, 1);
    let geomet2 = new THREE.IcosahedronGeometry(3, 4);

    // adding material
    let material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.FlatShading
    });

    let mat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DobuleSide,
        wireframe: true
    });

    // create particle
    for (let i = 0; i < 1000; i++) {
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() -  0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2 , Math.random() * 2);
        particle.add(mesh);
    }

    // inner planet
    let innerPlanet = new THREE.Mesh(geomet, material);
    innerPlanet.scale.x = innerPlanet.scale.y = innerPlanet.scale.z = 16;//16
    circle.add(innerPlanet);

    // outer planet
    let outerPlanet = new THREE.Mesh(geomet2, mat);
    outerPlanet.scale.x = outerPlanet.scale.y = outerPlanet.scale.z = 0;//10
    skelet.add(outerPlanet);

    // ambient light
    let ambientLight = new THREE.AmbientLight(0x999999);//999999
    scene.add(ambientLight);

    // directional light
    let dLight = [];
    dLight[0] = new THREE.DirectionalLight(0xffffff, 1);//ffffff
    dLight[0].position.set(1, 0, 0);
    dLight[1] = new THREE.DirectionalLight(0x333333, 1);//00dbde
    dLight[1].position.set(0.75, 1, 0.5);
    dLight[2] = new THREE.DirectionalLight(0xfc111111, 1);//fc00ff
    dLight[2].position.set(-0.75, -1, 0.5);
    scene.add(dLight[0]);
    scene.add(dLight[1]);
    scene.add(dLight[2]);

    animate();
    window.addEventListener('resize', onWindowResize, false);
    
}


function animate() {
    requestAnimationFrame(animate);

    //Анимация фона ==============
    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0009;
    particle.rotation.z -= 0.0009;
    //============================

    //circle.rotation.x -= 0.0009;
    //circle.rotation.y -= 0.0009;
    circle.rotation.x -= 0.0009;
    circle.rotation.y -= 0.0009;


    //circle.position.x = -250;


    //skelet.rotation.x +=  0.0040;
    //skelet.rotation.y +=  0.0040;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;



//Планета сверху ( camera.position.set(-70, -180, 220); )
    //Планета слева ( camera.position.set(180, 20, 320); )
    //Каиера по центру ( camera.position.set(0, 0, 420); )
const buttonLeft = document.querySelector('._ponel-button__left');
const buttonTop = document.querySelector('._ponel-button__top');
const buttonCenter = document.querySelector('._ponel-button__center');

const slaid1 = document.querySelector('.slaid-1');
const slaid2 = document.querySelector('.slaid-2');

if (buttonLeft) {
    buttonLeft.addEventListener("click", function (e) {
        /*circle.position.x = 0;
        circle.position.y = 0;
        circle.position.z = 0;*/
        //camera.position.set(180, 20, 320);
        let start3 = Date.now(); 
        let timer3 = setInterval(function() {
            let timePassed = Date.now() - start3;

            if (timePassed >= 500) {
                clearInterval(timer); 
                return;
            }

           
            draw(timePassed);

        }, 20);

        function draw(timePassed) {
            circle.position.x = timePassed/500;
            circle.position.y = timePassed/500;
            circle.position.z = timePassed/500;
        }
    });
}

if (buttonTop) {
    //const slaid1 = document.querySelector('._slaid-1');
    
    buttonTop.addEventListener("click", function (e) {
        

        let start2 = Date.now(); // запомнить время начала
        let timer2 = setInterval(function() {
        // сколько времени прошло с начала анимации?
            let timePassed = Date.now() - start2;

            if (timePassed >= 250) {
                clearInterval(timer); // закончить анимацию через 2 секунды
                return;
            }

            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
            draw(timePassed);

        }, 20);

        // в то время как timePassed идёт от 0 до 2000
        // left изменяет значение от 0px до 400px
        function draw(timePassed) {
            circle.position.x = timePassed;
            circle.position.y = timePassed;
            circle.position.z = timePassed;
        }
    });
}

if (buttonCenter) {
    buttonCenter.addEventListener("click", function (e) {

        slaid1.classList.remove("_active");
        slaid2.classList.add("_active");

        /*camera.position.set(-70, -180, 220);*/
        //requestAnimationFrame(animate);

        /*camera.position.y = 0;
        camera.position.x = 0;
        camera.position.z = 420;*/

        /*camera.position.y = 0;
        camera.position.x = 0;
        camera.position.z = 420;*/


        /*camera.position.y = 0;
        camera.position.x = 0;
        camera.position.z = 420;*/
        //camera.position.set(0, 0, 420);
        //requestAnimationFrame(animate);
        //circle.position.x = -250;
        let start = Date.now(); // запомнить время начала

        let timer = setInterval(function() {
        // сколько времени прошло с начала анимации?
            let timePassed = Date.now() - start;

            if (timePassed >= 250) {
                clearInterval(timer); // закончить анимацию через 2 секунды
                return;
            }

            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
            draw(timePassed);

        }, 20);

        // в то время как timePassed идёт от 0 до 2000
        // left изменяет значение от 0px до 400px
        function draw(timePassed) {
            circle.position.x = -timePassed;
            circle.position.y = -timePassed/2;
            circle.position.z = timePassed/1.5;
        }
    });
}