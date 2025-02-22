
svg.playImage{
zoom: 70% !important;
opacity: 20% !important;
}

.card {
    // font-family:Arial;
    font-size: 20px;
    text-align: center;
    color: black;

    background-color: white;

}


.iphone .card{
margin-left: 12px !important;
}


pre, blockquote {
		font-family:unset;
font-family:Georgia;		
background-color: unset;
background-color: #E6E6E6;
		color: #000000;
    font-size: 20px;
    border-left: 2px solid #808080;
    padding-left: 10px;

    text-wrap: wrap;
    white-space: pre-wrap;
} 


ins{
text-decoration: unset;
    bold: unset;
    border: 0.5px solid #aef3fd;
    box-shadow: 0 0 10px #aef3fd;
display: inline-block; 
background-color: rgba(46, 46, 46, 0.5); /* Optional: Background color of the box */
}


strong {
    bold: unset;
    border: 0.5px solid #fdf7d5;
    box-shadow: 0 0 10px #fdf7d5;
display: inline-block; 
background-color: rgba(46, 46, 46, 0.5); 
}

.right-margin-2  img {
    bold: unset !important;

    box-shadow: 0 0 10px #fdf7d5;
}


.hover-box {
position: fixed;
top: 88%;           /*93.7%;*/
left: 50%; /* Center the text box horizontally */
transform: translate(-50%, -50%); /* Center the text box vertically */
width: 100%;
max-width: 54%; /* Set a maximum width if needed */
z-index: 999;
}

.mobile .hover-box{display:none;}

.win .scratchpad 
{ 
width: 100%; 
height: 110px; 
resize: none; 
font-size: 16pt; 
background-color: rgba(215,215,215,0.65);
border-color: rgba(197,182,148,0.65);
/* Increased text size to 15px / overflow-y: auto; box-sizing: border-box; line-height: 1.5; opacity: 0.9; / Increased opacity to 0.9 for better readability / border: none; padding: 10px; / Add padding for better visibility */ 
outline: none; /* Remove the default blue outline on focus */
}


.scratchpad-toggle {
  position: absolute;
  bottom: 1px; /* Adjust this to your desired spacing */
  right: 1px; /* Adjust this to your desired spacing */

  background-color: #E7E7E7;
  border: none;
  border-radius: 50%;
  width: 4px;
  height: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
 }

.win .card{
max-width:95vw !important;
}



.mobile .card
{

}



.iphone .card, div, span, i, u, ul, li{

font-family: Hiragino Mincho ProN;

}



.ipad .card, div, span, i, u, ul, li{

font-family: Hiragino Mincho ProN;

}


.ipad i, u {

font-size: 20px;

}

.ipad .card {
max-width : 92% !important;
overflow-x : hidden !important; 
}

 .page {
    display: flex;
    max-width: 95vw;  
    border: 0px solid #000;
    position: relative;
}


.ipad .page {

width: 90vw;  

}



.iphone .card {

max-width: 95% !important;

}

.iphone .page {
    display: flex;
    width: 96vw;  
   
    position: relative;
}



.content {
flex: ;
width: 85%;
}


.right-margin {
width: 5%;  
background: #3b3b3b;
}

.right-margin-2 {
    width: 10vw;  
padding-left: 4px;
text-align: right !important; 
//border-left: 1px solid #313131 ;
border-left: 1px solid rgba(255, 255, 255, 0.13);

}

hr {
    border-top: 1px solid #aaaaaa;
    width: 100%;
    margin: 0;
    padding: 0;
    opacity: 0.2;
}



cite
{
  borderfont-family:unset;: 1px solid red;
  position: relative;
}


////////////////////////////



.iphone ul, ol {
opacity: 1;
margin-left:12%;
padding-left: 5%;
font-size: 105%;
list-style: none;
content: counter(list, disc) " ";
margin-left:-6%;
}

.iphone  li{
opacity: 1;
padding-left: 0px;
font-size:105%; 
list-style: none;
content: counter(list, disc) " ";
}

.iphone ul > li {
list-style: none;
counter-increment: list ;
content: counter(list, disc) " ";
margin-left:-20px;
}


.iphone ul > li:before {
list-style: none;
content: counter(list, disc) " ";
margin-left:-6%;
}


iphone ul > li > li {
margin-left:-20px;
}

.iphone ul > ul > li {
list-style: none;
margin-left:-6%;
}

.iphone ul > ul > li:before {
list-style: none;
content: counter(list2, circle) " ";
counter-increment: list2 -1;
}


.iphone ul > ul > ul > li:before {
content: counter(list,disc);
margin-left:-6%;
}


.iphone ul > li > ul > li: > li {
margin-left:-6%;
}


  .container2 {
    display: flex; /* Ensures that the triangle and the text are on the same line */
    align-items: center; /* Vertically aligns the text with the center of the triangle */
    font-size: 16px; /* Adjust as needed for your design */
    white-space: nowrap; /* Prevents the text from wrapping */
  }




.container{
  zoom: 50%;
//margin-top: -100px;  
//margin: 30px auto;
margin-left: -4.5%
}



div back_blower
{
    font-size: 20px;

}



/*             tr begins               */



.wi img{
  transform-origin: 0% 0%;
transition: transform 0.45s;
transition-delay: 0.45s

}


.wi img:hover {
   transform: scale(4);

  transform-origin: 0% 0%;


   transition: transform 0.45s;
transition-delay: 0.2s
  z-index:5;

}


details > summary {
 
  list-style: none;
}

details[open] summary:after {
  content: "﹣";
position: relative;
left:17px;
top:-30px;
color: rgb(125,125,125);
}



table {


border: 1px solid rgba(255, 255, 255, 0.6);

}




