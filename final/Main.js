$(function() {
  var volume = new KVS.LobsterData();
  var screen = new KVS.THREEScreen();
  screen.init(volume, {
    width: window.innerWidth * 0.78,
    height: window.innerHeight * 0.87,
    targetDom: document.getElementById('display'),
    enableAutoResize: false,
  });

  var bounds = Bounds(volume);

  var isovalue = 15;
  var surfaces = Isosurfaces(volume, isovalue);
  screen.scene.add(surfaces);

  document.addEventListener('mousemove', function() {
    screen.light.position.copy(screen.camera.position);
  });

  window.addEventListener('resize', function() {
    screen.resize([window.innerWidth * 0.78, window.innerHeight * 0.87]);
  });

  var light = new THREE.PointLight();
  light.position.set(5, 5, 5);
  screen.scene.add(light);

  screen.loop();

  $('#iso_score').html($('#iso_bar').val());
  $('#iso_bar').on('input change', function() {
    $('#iso_score').html($(this).val());
    screen.scene.remove(surfaces);
    isovalue = $(this).val();
    surfaces = Isosurfaces(volume, isovalue);
    screen.scene.add(surfaces);
  });

  $('#R_score').html($('#R_bar').val());
  $('#R_bar').on('input change', function() {
    $('#R_score').html($(this).val());
    screen.scene.remove(surfaces);
    r_value = $(this).val();
    changeRedColor(r_value)
    surfaces = Isosurfaces(volume, isovalue);
    screen.scene.add(surfaces);
  });

  $('#G_score').html($('#G_bar').val());
  $('#G_bar').on('input change', function() {
    $('#G_score').html($(this).val());
    screen.scene.remove(surfaces);
    g_value = $(this).val();
    changeGreenColor(g_value)
    surfaces = Isosurfaces(volume, isovalue);
    screen.scene.add(surfaces);
  });

  $('#B_score').html($('#B_bar').val());
  $('#B_bar').on('input change', function() {
    $('#B_score').html($(this).val());
    screen.scene.remove(surfaces);
    b_value = $(this).val();
    changeBlueColor(b_value)
    surfaces = Isosurfaces(volume, isovalue);
    screen.scene.add(surfaces);
  });

  $('.square_btn_s').on('click', function(){
      var name = $(this).attr("id");
      $('#choosing_shading').val(name);
  });

  $('.square_btn_r').on('click', function(){
      var name = $(this).attr("id");
      $('#choosing_reflection').val(name);
  });

  $('.shading_btn').on('click', function(){
      var shading = $('#choosing_shading').val();
      var reflection = $('#choosing_reflection').val();
      screen.scene.remove(surfaces);
      if(shading == "Gouraud"){
      surfaces = IsosurfacesWithGouraudShading(volume, isovalue, shading, reflection, screen);
    }else if(shading == "Phong"){
      surfaces = IsosurfacesWithPhongShading(volume, isovalue, shading, reflection, screen);
    }
      screen.scene.add(surfaces);
  });

  $('.initialize_btn').on('click', function(){
    screen.scene.remove(surfaces);
    $('#iso_bar').val(15);
    $('#iso_score').html(15);
    $('#R_bar').val(180);
    $('#R_score').html(180);
    $('#G_bar').val(110);
    $('#G_score').html(110);
    $('#B_bar').val(80);
    $('#B_score').html(80);
  })
});
