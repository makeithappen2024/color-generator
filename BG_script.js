////---------Cashing default elements-----------
const body = document.querySelector("body");
const container = document.querySelector(".container");
const twoThree = document.querySelector(".twoThree");
const colorPickers = document.querySelector(".colorPickers");


//---------Cashing primary buttons---------
const buttonTwo = document.querySelector(".buttonTwo");
const buttonThree = document.querySelector(".buttonThree");
const buttonLinear = document.querySelector(".buttonLinear");
const buttonRadial = document.querySelector(".buttonRadial");


//---------Cashing secondary buttons---------
//-----------Cashing colorPickers------------
const input1 = document.createElement("input");
input1.setAttribute("type","color");
input1.setAttribute("value","#82dce8");
input1.className = "colorPicker";
const input2 = document.createElement("input");
input2.setAttribute("type","color");
input2.setAttribute("value","#f09347");
input2.className = "colorPicker";
const input3 = document.createElement("input");
input3.setAttribute("type","color");
input3.setAttribute("value","#fd8aff");
input3.className = "colorPicker";
//----------Cashing randomizer-----------
const randomizer = document.createElement("button");
randomizer.className = "randomizer";
//----------Cashing hexReference-----------
const hexReferences = document.querySelector(".hexReferences");
const hexFirstColor = document.createElement("h5");
const hexSecondColor = document.createElement("h5");
const hexThirdColor = document.createElement("h5");


//----Creating pickers & randomizer----
const createDoubleSetButtons = () => {  
	twoThree.appendChild(input1);
	twoThree.appendChild(input2);
	if (twoThree.children.length > 2){ 
		twoThree.removeChild(input3);
		hexReferences.removeChild(hexThirdColor);
	}
	createRandomizer();
	renderLinearOrRadialBackground();
}

const createTripleSetButtons = () => {
	createDoubleSetButtons();
	twoThree.appendChild(input3);
	createRandomizer();
	renderLinearOrRadialBackground();
}

const createRandomizer = () => {
	colorPickers.appendChild(randomizer);
	randomizer.textContent = "Generate it!";
}


//----Rendering background without dark shades----
const generateColor = () => {
	let symbols = "0123456789abcdef"
	let symbolsNoDark = "7890abcdef"
	let color = "#"; 
	for(let i =0; i<2; i++){
		color = color + symbolsNoDark[Math.floor(Math.random()*10)];
	} 
	for(let i =0; i<4; i++){
	color = color + symbols[Math.floor(Math.random()*16)];
	} 	
	return color;
}

const coloringPickers = () => {
	if (twoThree.children.length > 2){
	input1.value = generateColor();
	input2.value = generateColor();
	input3.value = generateColor();
	} else{	input1.value = generateColor();
	input2.value = generateColor();
}
	renderLinearOrRadialBackground();
}

const renderLinearBackground = () => {
	if (twoThree.children.length > 2){
	body.style.background = "linear-gradient(to right,"  
	+input1.value
	+"," 
	+input2.value 
	+","
	+input3.value	
	+")";
	}
	else{body.style.background = "linear-gradient(to right,"  
	+input1.value
	+"," 
	+input2.value 
	+")";	
	}
	createHexReference(); 
}


//----Fancy multi-ellipse radial gradient----
const renderRadialBackground = () => {
	if (twoThree.children.length > 2){
	body.style.background = "radial-gradient(ellipse at top,"  
	+input1.value
	+", transparent)," 
	+"radial-gradient(ellipse at bottom,"
	+input2.value 
	+", transparent)," 
	+"radial-gradient(ellipse at left,"
	+input3.value	
	+", transparent)," 
	+"radial-gradient(ellipse at right,"
	+input3.value	
	+", transparent)";
	}
	else{body.style.background = "radial-gradient(ellipse at top,"  
	+input1.value
	+", transparent)," 
	+"radial-gradient(ellipse at bottom,"
	+input2.value 
	+", transparent)";
	}
	createHexReference(); 
}

//----simple circle at center radial gradient----
// const renderRadialBackground = () => {
// 	if (twoThree.children.length > 2){
// 	body.style.background = "radial-gradient(circle at center,"  
// 	+input1.value
// 	+" 0," 
// 	+input2.value 
// 	+" 60%,"
// 	+input3.value	
// 	+" 100%)";
// 	}
// 	else{body.style.background = "radial-gradient(circle at center,"  
// 	+input1.value
// 	+" 0," 
// 	+input2.value 
// 	+" 100%";
// 	}
// 	createHexReference(); 
// }

const renderLinearOrRadialBackground = () => {
	if (buttonRadial.getAttribute("name") === "active"){
		renderRadialBackground();
	}else{renderLinearBackground()
	}
}
//----Setting togglers for Linear or Radial rendering----
const activateLinearRendering = () => {
	buttonLinear.setAttribute("name", "active");
	buttonLinear.classList.add("buttonLinearFocus");
	renderLinearBackground();
	if (buttonRadial.getAttribute("name") === "active"){
		buttonRadial.removeAttribute("name");
	}
}

const activateRadialRendering = () => {
	buttonRadial.setAttribute("name", "active");
	renderRadialBackground();
	if (buttonLinear.getAttribute("name") === "active"){
		buttonLinear.removeAttribute("name");
	}
}

//----Setting CLICKABLE hex text at the bottom section----
const createHexReference = () => {
	hexReferences.appendChild(hexFirstColor);
	hexFirstColor.textContent = input1.value;
	hexReferences.appendChild(hexSecondColor);
	hexSecondColor.textContent = input2.value;
	 	if (twoThree.children.length > 2){
	 	hexReferences.appendChild(hexThirdColor);
		hexThirdColor.textContent = input3.value;
	}
}

const copyHexColor = (event) =>{
	let hexText = event.target;
	 navigator.clipboard.writeText(hexText.textContent+" ");
	 createPopUpHex();
}

const createPopUpHex = () => {
	let createPopUpHexText = document.createElement("h6");
	container.appendChild(createPopUpHexText);
	createPopUpHexText.classList.add("createPopUpHex");
	createPopUpHexText.textContent = "Copied!";
	setTimeout(removeHEX, 1000);
}

const removeHEX = () =>{
Array.from(document.getElementsByClassName("createPopUpHex")).forEach(
	(element, index, array) => {
	element.remove();
}
);
}

//---------Configuring Randomizer---------
const launchRandomizer = () => {
	coloringPickers();
	createHexReference();
}

//---------Listening to primary buttons---------
buttonTwo.addEventListener("click", createDoubleSetButtons);
buttonThree.addEventListener("click", createTripleSetButtons);
buttonLinear.addEventListener("click", activateLinearRendering);
buttonRadial.addEventListener("click", activateRadialRendering);

//---------Listening to secondary buttons---------
input1.addEventListener("input", renderLinearOrRadialBackground);
input2.addEventListener("input", renderLinearOrRadialBackground);
input3.addEventListener("input", renderLinearOrRadialBackground);
randomizer.addEventListener("click", launchRandomizer);
hexReferences.addEventListener("click", copyHexColor);