var file = document.getElementById('file');
var canvas = document.getElementById('canvas');
var canvasWidth = 224;
var canvasHeight = 224;
var uploadImgSrc;

// Canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

function loadLocalImage(e) {
  // ファイル情報を取得
  var fileData = e.target.files[0];

  // 画像ファイル以外は処理を止める
  if(!fileData.type.match('image.*')) {
    alert('画像を選択してください');
    return;
  }

  // FileReaderオブジェクトを使ってファイル読み込み
  var reader = new FileReader();
  // ファイル読み込みに成功したときの処理
  reader.onload = function() {
    // Canvas上に表示する
    uploadImgSrc = reader.result;
    canvasDraw();
  }
  // ファイル読み込みを実行
  reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

// Canvas上に画像を表示する
function canvasDraw() {
  // canvas内の要素をクリアする
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Canvas上に画像を表示
  var img = new Image();
  img.src = uploadImgSrc;
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
  }
}