function main()
{
    var width = 500;
    var height = 500;

    var scene_Gouraud = new THREE.Scene();
    var scene_Phong = new THREE.Scene();

    var fov = 50;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene_Gouraud.add( camera );
    scene_Phong.add( camera);

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene_Gouraud.add( light );
    scene_Phong.add(light);

    var renderer_Gouraud = new THREE.WebGLRenderer();
    renderer_Gouraud.setSize( width, height );
    document.body.appendChild( renderer_Gouraud.domElement );
    var renderer_Phong = new THREE.WebGLRenderer();
    renderer_Phong.setSize( 500, 500 );
    document.body.appendChild (renderer_Phong.domElement );

    var p1 = document.createElement('p');
    p1.innerHTML = "These two are Cook-Torrance shading."
    +"<br>"
    +"The left is using Gouraud reflection."
    +"<br>"
    +"The right is using Phong reflection.";
    document.body.appendChild( p1 );


    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material_Gouraud = new THREE.ShaderMaterial({
      vertexColors: THREE.VertexColors,
      vertexShader: document.getElementById('gouraud.vert').text,
      fragmentShader:document.getElementById('gouraud.frag').text
    });

    var material_Phong = new THREE.ShaderMaterial({
      vertexColors: THREE.VertexColors,
      vertexShader: document.getElementById('phong.vert').text,
      fragmentShader:document.getElementById('phong.frag').text
    });

    var torus_knot_Gouraud = new THREE.Mesh( geometry, material_Gouraud );
    var torus_knot_Phong = new THREE.Mesh( geometry, material_Phong );
    scene_Gouraud.add( torus_knot_Gouraud );
    scene_Phong.add( torus_knot_Phong );
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot_Gouraud.rotation.x += 0.01;
        torus_knot_Gouraud.rotation.y += 0.01;
        torus_knot_Phong.rotation.x += 0.01;
        torus_knot_Phong.rotation.y += 0.01;
        renderer_Gouraud.render( scene_Gouraud, camera );
        renderer_Phong.render(scene_Phong, camera);
    }
}
