import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Morango from "./Morango/Morango.js";
import Morango2 from "./Morango2/Morango2.js";
import Cesta from "./Cesta/Cesta.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Morango: new Morango({
    x: 100,
    y: 60,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50,
    visible: true,
    layerOrder: 2,
  }),
  Morango2: new Morango2({
    x: 74,
    y: 65,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 50,
    visible: true,
    layerOrder: 1,
  }),
  Cesta: new Cesta({
    x: 71,
    y: -96,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 110.00000000000001,
    visible: true,
    layerOrder: 3,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
