function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var material = new THREE.MeshLambertMaterial();

    var torus_knot = new THREE.Mesh( geometry, material );
    scene.add( torus_knot );

    vec3 PhongReflection( vec3 C, vec3 L, vec3 N ) 
    {
        float ka = 0.3; 
        float kd = 0.5; 
        float ks = 0.8; 
        float n = 50.0;
        
        vec3 R = reflect( -L, N ); 
        float dd = max( dot( N, L ), 0.0 ); 
        float ds = pow( max( dot( R, V ), 0.0 ), n );
        if ( dd <= 0.0 ) { ds = 0.0; }

        float Ia = ka; 
        float Id = kd * dd; 
        float Is = ks * ds; 
        return C * ( Ia + Id + Is );
    }
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot.rotation.x += 0.01;
        torus_knot.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
