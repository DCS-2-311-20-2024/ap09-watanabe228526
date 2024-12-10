//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G285262022 渡邉秋
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import{OrbitControls}from'three/addons';
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
    handtoss:false,
    kr:false,
    tx: "マルゲリータ",
  };
  const textures = ["マルゲリータ", "テリヤキチキン","ペパロニ"];

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");
  gui.add(param, "handtoss").name("ハンドトス");
  gui.add(param, "kr").name("クリスピー");
  gui.add(param, "tx", textures).name("ピザの種類");

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  
  
  //テクスチャ
  const textureLoader=new THREE.TextureLoader();
  const texture1=textureLoader.load("11475281.png");
  const texture2=textureLoader.load("teriyaki.png");
  const texture3=textureLoader.load("peparoni.png");
  texture1.repeat.set(0.9, 0.9);
  texture1.offset.set(0.05, 0.05);
  texture2.repeat.set(0.84, 0.84);
  texture2.offset.set(0.089, 0.089);
  texture3.repeat.set(0.84,0.84);
  texture3.offset.set(0.065, 0.099);
  
  // 光源の設定
  { // 環境ライト
    const light = new THREE.AmbientLight();
    light.intensity=1.5;
    scene.add(light);
  }
  { // ポイントライト
    const light = new THREE.PointLight(0xffffff, 5000);
    light.position.set(0, 50, 0);
    scene.add(light);
  }
  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  // camera.position.set(1,2,3);
  // camera.lookAt(0,0,0);
  camera.position.set(0,5,0);
  camera.up.set(0,0,1);
  camera.lookAt(0,0,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
    document.getElementById("output").appendChild(renderer.domElement);

  // カメラ制御
  const orbitControls
      =new OrbitControls(camera,renderer.domElement);
    orbitControls.listenToKeyEvents(window);
    orbitControls.enableDamping=true;
  //ピザの作成
  const pizzaGeometry=new THREE.CircleGeometry(2,32);//,Math.PI/2.0,Math.PI);
  const pizzaMaterial=new THREE.MeshLambertMaterial({color:0xcc9933});
  const pizza=new THREE.Mesh(pizzaGeometry,pizzaMaterial);
  pizza.position.y=0.1;
  pizza.rotation.x = -0.5 * Math.PI;
  scene.add(pizza);
  // const pizza2Geometry=new THREE.CircleGeometry(2,32,3*Math.PI/2.0,Math.PI);
  // const pizza2Material=new THREE.MeshLambertMaterial({color:0xcc9933});
  // const pizza2=new THREE.Mesh(pizza2Geometry,pizza2Material);
  // pizza2.position.y=0.1;
  // pizza2.rotation.x = -0.5 * Math.PI;
  // scene.add(pizza2);
  // pizza2Material.map=texture2;
  //生地の選択
  const handtossGeometry=new THREE.TorusGeometry(1.9,0.15,32,32);
  const handtossMaterial=new THREE.MeshLambertMaterial({color:0xcc9933});
  const handtoss=new THREE.Mesh(handtossGeometry,handtossMaterial);
  handtoss.position.y=0.1;
  handtoss.rotation.x = -0.5 * Math.PI;
  scene.add(handtoss);

  const krGeometry=new THREE.RingGeometry(1.8,2,32);
  const krMaterial=new THREE.MeshLambertMaterial({color:0xcc9933});
  const kr=new THREE.Mesh(krGeometry,krMaterial);
  kr.position.y=0.11;
  kr.rotation.x = -0.5 * Math.PI;
  scene.add(kr);

  //平面の追加
  const planeGeometry = new THREE.PlaneGeometry(20, 15);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x808080});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  scene.add(plane);
  
  
  
  // 描画処理

  // 描画関数
  function render() {
    //生地の有無
    handtoss.visible=param.handtoss;
    kr.visible=param.kr;
    // 座標軸の表示
    axes.visible = param.axes;
    // カメラ位置の制御
    orbitControls.update();
    switch (param.tx) {
      case "マルゲリータ": pizzaMaterial.map = texture1;
        document.getElementById("info").innerHTML = "マルゲリータ 2000円<br/>イタリアのナポリを代表するピザの名前で、<br/>トマトソース、モッツァレラチーズ、バジルを<br/>トッピングしたピザです。";
        break;
      case "テリヤキチキン": pizzaMaterial.map = texture2;
        document.getElementById("info").innerHTML = "テリヤキチキン 2200円<br/>照り焼きチキンをトッピングした<br/>和風テイストのピザです。";
        break;
      case "ペパロニ": pizzaMaterial.map = texture3;
      document.getElementById("info").innerHTML = "ペパロニ 2100円<br/>アメリカで生まれたピザで、<br/>スパイシーなペパロニがトッピングされたピザです。";
        
        break;
    }
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();