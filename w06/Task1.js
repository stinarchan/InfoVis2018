function main()
{
    var width = 500;
    var height = 500;

    var scene_Gouraud_Lambertian = new THREE.Scene();
    var scene_Gouraud_Phong = new THREE.Scene();

    var fov = 50;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene_Gouraud_Lambertian.add( camera );
    scene_Gouraud_Phong.add( camera);

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene_Gouraud_Lambertian.add( light );
    scene_Gouraud_Phong.add(light);

    var renderer_Gouraud_Lambertian = new THREE.WebGLRenderer();
    renderer_Gouraud_Lambertian.setSize( width, height );
    document.body.appendChild( renderer_Gouraud_Lambertian.domElement );
    var renderer_Gouraud_Phong = new THREE.WebGLRenderer();
    renderer_Gouraud_Phong.setSize( 500, 500 );
    document.body.appendChild (renderer_Gouraud_Phong.domElement );

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material_Gouraud_Lambertian = new THREE.ShaderMaterial({
      vertexColors: THREE.VertexColors,
      vertexShader: document.getElementById('Gouraud_Lambertian.vert').text,
      fragmentShader:document.getElementById('Gouraud_Lambertian.frag').text
    });

    var material_Gouraud_Phong = new THREE.ShaderMaterial({
      vertexColors: THREE.VertexColors,
      vertexShader: document.getElementById('Gouraud_Phong.vert').text,
      fragmentShader:document.getElementById('Gouraud_Phong.frag').text
    });

    var torus_knot_Gouraud_Lambertian = new THREE.Mesh( geometry, material_Gouraud_Lambertian );
    var torus_knot_Gouraud_Phong = new THREE.Mesh( geometry, material_Gouraud_Phong );
    scene_Gouraud_Lambertian.add( torus_knot_Gouraud_Lambertian );
    scene_Gouraud_Phong.add( torus_knot_Gouraud_Phong );
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot_Gouraud_Lambertian.rotation.x += 0.01;
        torus_knot_Gouraud_Lambertian.rotation.y += 0.01;
        torus_knot_Gouraud_Phong.rotation.x += 0.01;
        torus_knot_Gouraud_Phong.rotation.y += 0.01;
        renderer_Gouraud_Lambertian.render( scene_Gouraud_Lambertian, camera );
        renderer_Gouraud_Phong.render(scene_Gouraud_Phong, camera);
    }
}
