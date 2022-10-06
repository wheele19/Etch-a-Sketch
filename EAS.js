
const grid = document.getElementById('grid');
const slider = document.getElementById('slider')
let gridSizeDisplay = document.getElementById('gridSizeDisplay')
let defaultColor = '#000000';
let defaultBlank = '#FFFFFF';

selectedColor = defaultColor;
let setting = 'color';
const rainbow = document.getElementById('rainbow');

const colorPicker = document.getElementById('colorPicker');
const erase = document.getElementById('erase');
const eraser = document.getElementById('eraser');
const color = document.getElementById('color');
const easterEgg = document.getElementById('easterEgg');

color.classList.add('active');


rainbow.addEventListener('mouseover', (e) => hover(e));
eraser.addEventListener('mouseover', (e) => hover(e));
erase.addEventListener('mouseover', (e) => hover(e));
color.addEventListener('mouseover', (e) => hover(e));

rainbow.addEventListener('mouseout', (e) => removeHover(e));
color.addEventListener('mouseout', (e) => removeHover(e));
eraser.addEventListener('mouseout', (e) => removeHover(e));
erase.addEventListener('mouseout', (e) => removeHover(e));
buttons = document.querySelectorAll('button');

colorPicker.addEventListener('click', (e) => settingToColor(e));
color.addEventListener('click', (e) => settingToColor(e));
colorPicker.addEventListener('input', (e) => getColor(e));
rainbow.addEventListener('click', (e) => settingToRainbow(e));
eraser.addEventListener('click', (e) => settingToEraser(e));
easterEgg.addEventListener('click', (e) => random(prompt('Size? (1-200)')));

let mouseisdown = false;

document.body.addEventListener(
  "mousedown",
  function() {mouseisdown = true}
);

document.body.addEventListener(
  "mouseup",
  function() {mouseisdown = false}
);

slider.value = 16;
let gridSize = slider.value;

slider.addEventListener('change', (e) => updateGrid(e.target.value));
erase.onclick = () => updateGrid(gridSize);

updateGridSize(gridSize)
makeGrid(gridSize)

function makeGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for (let i = 0; i < size * size; i++) {
      const grid_cell = document.createElement('div');
      grid.style.columnGap = `1px`;
      grid.style.rowGap = grid.style.columnGap;
      grid_cell.classList.add('grid_cell');
      grid_cell.addEventListener('mousechange', (e) => updateColor(e));
      grid_cell.addEventListener('click', (e) => updateColor(e));
      grid_cell.addEventListener('mouseover', (e) => updateColor(e));
      
      grid.appendChild(grid_cell);
      
    }
  }

  function hover(e) {
    e.target.classList.add('active');


 }
 function resetStyle() {
  eraser.classList.remove('active');
  color.classList.remove('active');
  rainbow.classList.remove('active'); 
  console.log('ok')
 }
 function removeHover() {

  if (setting === 'eraser') {
    rainbow.classList.remove('active');
    color.classList.remove('active');
    erase.classList.remove('active');




  }
  else if (setting === 'rainbow') {
    eraser.classList.remove('active');
    color.classList.remove('active');
    erase.classList.remove('active');

    

  }

  else if (setting === 'color') {
    rainbow.classList.remove('active');
    eraser.classList.remove('active');
    erase.classList.remove('active');


  }

 }

 function random(size) {
  if (size > 200) {
    alert('size must be between 1 and 200');
    random(prompt('Size? (1-200)'));
  }

  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
  for (let i = 0; i < size * size; i++) {
    const grid_cell = document.createElement('div');
    grid.style.columnGap = `1px`;
    grid.style.rowGap = grid.style.columnGap;
    grid_cell.classList.add('grid_cell');
    grid_cell.addEventListener('mousechange', (e) => updateColor(e));
    grid_cell.addEventListener('click', (e) => updateColor(e));
    grid_cell.addEventListener('mouseover', (e) => updateColor(e));
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)
    grid_cell.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    grid.appendChild(grid_cell);
    
  }
}


  function settingToEraser(e){
    setting = 'eraser';
    resetStyle()
    eraser.classList.add('active');

  }


  function settingToColor(e){
    setting = 'color';
    resetStyle()
    color.classList.add('active');

  }

  function settingToRainbow(e){
    setting = 'rainbow';
    resetStyle()
    rainbow.classList.add('active');
  }

  function updateColor(e){
       if (e.type === 'mouseover' &&  mouseisdown === false) return
      
       else if (setting === 'color'){ 
       e.target.style.backgroundColor  = selectedColor;
    }

    else if (setting === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
  }
  else if (setting === 'eraser') {
    e.target.style.backgroundColor  = defaultBlank;

}}

  function getColor(e){
    console.log(e);
    selectedColor = e.target.value;
  }

  function refreshGrid(value) {
    grid.innerHTML = '';
    makeGrid(value);
  }

  function updateGrid(value) {
    refreshGrid(value)
    updateGridSize(value)
  }

  function updateGridSize(value) {
  gridSize = value;
  gridSizeDisplay.innerHTML = `${gridSize} x ${gridSize}`;
  }



