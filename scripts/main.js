const gameCanvas = document.getElementById("game-canvas");
const gameContext = gameCanvas.getContext("2d");
gameCanvas.width = window.innerWidth;
gameCanvas.height = window.innerHeight;

var previousTimeStamp = 0;
var maxDeltaTime = 20;

var player;
var camera;

function drawGameObject(gameObject) {
    gameContext.fillStyle = gameObject.color;
    let positionOnScreen = copyVector(gameObject.position);
    subVectors(positionOnScreen, camera.position);
    positionOnScreen.x += gameCanvas.width / 2;
    positionOnScreen.y += gameCanvas.height / 2;
    gameContext.fillRect(positionOnScreen.x, positionOnScreen.y,
        gameObject.scale.x, gameObject.scale.y);
}

function drawGameScreen() {
    gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameObjects.forEach(drawGameObject);
}

window.addEventListener('load', () => {
    player = Player(Vector2D(140,200));
    camera = Camera();
    Block(Vector2D(10, 400), Vector2D(500, 60));
    Block(Vector2D(410, 260), Vector2D(500, 60));
    Enemy(Vector2D(460,-100));
    window.requestAnimationFrame(frame);
});

function frame(timeStamp) {
    if (!previousTimeStamp) {
        previousTimeStamp = timeStamp;
    }
    let deltaTime = timeStamp - previousTimeStamp;
    if (deltaTime > maxDeltaTime) {
        deltaTime = maxDeltaTime;
    }
    updateGameObjects(deltaTime);
    gameObjects = gameObjects.filter(gameObject => {
        return !gameObject.destroy;
    });
    drawGameScreen();
    window.requestAnimationFrame(frame);
}