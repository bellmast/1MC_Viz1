var totalxCoords;
var totalyCoords;
var paper;
var canvasWidth = 800;
var canvasHeight= 700;
var logoWidth = 160;
var logoHeight = 74;
var legendWidth = 166;
var legendHeight = 75;
var checkBoxesHeight = 21;
var padding = 10;
newRadiiArray = []


$(document).ready(function () {runProgram()});

function runProgram() {
    paper = new Raphael(document.getElementById('canvas_container'), canvasWidth, canvasHeight);  
    jQuery.getJSON("1MC_data4.js", function (data)
    {drawNetwork(data)});       
}  

function randomCoord(minC, maxC) {
        return Math.floor(Math.random() * (maxC - minC + 1) + minC)
        }

function scatterDots(x) {
        radii = randomCoord(frameMaxRadius, containerMaxRadius)
        angle = randomCoord(0, 360)
        randomXCoord = canvasWidth/2 + radii*Math.cos(angle)
        randomYCoord = canvasHeight/2 + radii*Math.sin(angle)

        if (randomXCoord < (padding + legendWidth) && randomYCoord < (padding + legendHeight)) {
                var xOrY = Math.floor(Math.random()*2)
                        if (xOrY == 1) {
                                randomXCoord += randomCoord((legendWidth+padding-randomXCoord+10), (canvasWidth-padding-logoWidth-randomXCoord-10))
                        } else {
                                if (randomXCoord > (frameMinX)) {
                                        //calculate secant
                                        //top or bot
                                        //launch
                                } else {
                                        randomYCoord += randomCoord((legendHeight+padding-randomYCoord+10), (canvasHeight-checkBoxesHeight-padding-randomYCoord-10))
                                }
                        }
        } else if (randomXCoord > (canvasWidth-padding-logoWidth) && randomYCoord < (padding + logoHeight)) {
                var xOrY = Math.floor(Math.random()*2)
                        if (xOrY == 1) {
                                randomXCoord -= randomCoord((logoWidth+padding-randomXCoord+10), (canvasWidth-padding-legendWidth-(logoWidth-randomXCoord)-10))
                        } else {
                                if (randomXCoord < frameMaxX) {
                                        //calculate secant
                                        //top or bot
                                        //launch
                                } else {
                                        randomYCoord += randomCoord((logoHeight+padding-randomYCoord+10), (canvasHeight-padding-randomYCoord-10))
                                }
                        }
        }
}


function drawNetwork(data) {
        
        maleSet = paper.set();
        maleYesSet = paper.set();
        maleNoSet = paper.set();
        femaleSet = paper.set();
        femaleYesSet = paper.set();
        femaleNoSet = paper.set();
        yesSet = paper.set();
        noSet = paper.set();
        linesSet = paper.set()
        linesMYSet = paper.set();
        linesMNSet = paper.set();
        linesFYSet = paper.set();
        linesFNSet = paper.set();
        linesMaleSet = paper.set();
        linesFemaleSet = paper.set();
        orgSet = paper.set();
        allSet = paper.set();
        textSet = paper.set();

        var pathCount = data.length - 1;
        myArray = data[pathCount]

        arrayCount = myArray.length

        myArrayMax = myArray[arrayCount-1]
        orgSet.push(paper.circle(canvasWidth/2, canvasHeight/2, myArrayMax*2))
        
        textSet.push(paper.text(canvasWidth/2, (canvasHeight/2)+myArrayMax, "Startup\nWeekend"))

        xcoordArray = []
        ycoordArray = []
        radiiArray = []

        orgNames = ["N/A","N/A","N/A","HEMP","Geek Night","KC Roundtable","UMKCE Scholars","FastTrac","Pipeline","KCNext","Betablox","Hackathon","Sourcelink","ThinkBig","Venture Fridays","SW"] 
        q = 0
        for (i = 0; i < arrayCount - 1; i++) {
                h = myArray[i]
                var radius = Math.log(((1/h)*1000))*50
                var xcoord = canvasWidth/2 + radius*Math.cos(2*Math.PI/12*q)
                var ycoord = canvasHeight/2 + radius*Math.sin(2*Math.PI/12*q)
                orgSet.push(paper.circle(xcoord, ycoord, h*2))
                xcoordArray.push(xcoord)
                ycoordArray.push(ycoord)
                radiiArray.push(radius)
                if (i > 2) {
                        var radiix = (h*2.7)*Math.cos(2*Math.PI/12*q)
                        var radiiy = (h*2.7)*Math.sin(2*Math.PI/12*q)
                        xcoord = xcoord + radiix
                        ycoord = ycoord + radiiy
                        if (orgNames[i] == "Sourcelink") {
                                radiix = (h)*Math.cos(2*Math.PI/12*q)
                                radiiy = (h)*Math.sin(2*Math.PI/12*q)
                                xcoord = xcoord + radiix
                                ycoord = ycoord + radiiy
                                textSet.push(paper.text(xcoord, ycoord, orgNames[i]))
                        } else if (orgNames[i] == "UMKCE Scholars") {
                                radiix = (h*2)*Math.cos(2*Math.PI/12*q)
                                radiiy = (h*2)*Math.sin(2*Math.PI/12*q)
                                xcoord = xcoord + radiix
                                ycoord = ycoord + radiiy
                                textSet.push(paper.text(xcoord, ycoord, orgNames[i]))
                        } else if (radiix > 0) {
                                textSet.push(paper.text(xcoord, ycoord, orgNames[i]).attr({'text-anchor': 'start'}))
                        } else if (radiix < 0) {
                                radiix = (h*3.3)*Math.cos(2*Math.PI/12*q)
                                radiiy = (h*3.3)*Math.sin(2*Math.PI/12*q)
                                xcoord = xcoord + radiix
                                ycoord = ycoord + radiiy
                                textSet.push(paper.text(xcoord, ycoord, orgNames[i]))
                        }
                        q += 1
                }
        }
        
        textSet.attr({"font-weight":"450", "font-size":12, fill:"#FF6620", "font-family":"Arial"})
        orgSet.attr({stroke:0}).glow({width:3, color:"#5b5a59"})
        
        nullCheckArray = []
        for (n = 3; n < arrayCount; n++) {
                        nullCheckArray.push(0)
        }
        xcoordArray.push(canvasWidth/2)
        ycoordArray.push(canvasHeight/2)
        
        frameMinY = Math.min.apply(null, ycoordArray.slice(3, arrayCount))-50;
        frameMaxY = Math.max.apply(null, ycoordArray.slice(3, arrayCount))+50;
        frameMinX = Math.min.apply(null, xcoordArray.slice(3, arrayCount))-50;
        frameMaxX = Math.max.apply(null, xcoordArray.slice(3, arrayCount))+50;
        frameMaxRadius = Math.max.apply(null, radiiArray.slice(3, arrayCount))+20;
        containerMaxRadius = (Math.min(canvasWidth, canvasHeight))/2;

        for (i = 0; i < pathCount; i++) {
                currentxArray = []
                currentyArray = []
                nullTestArray = data[i].slice(3, arrayCount)
                if (JSON.stringify(nullTestArray)===JSON.stringify(nullCheckArray)) {
                        randomXCoord = Math.floor(Math.random()*(canvasWidth-10))
                        scatterDots(randomXCoord)
                        
                        if (data[i][0] == "Male") {
                                if (data[i][1] == "Yes") {
                                        maleYesSet.push(paper.circle(randomXCoord,randomYCoord, 5).attr({fill:"#F58823"}))
                                } else if (data[i][1] == "No" || data[i][1] == "N/A") {
                                        maleNoSet.push(paper.circle(randomXCoord,randomYCoord, 5).attr({fill:"#918070"}))
                                }
                        } else if (data[i][0] == "Female") {
                                if (data[i][1] == "Yes") {
                                        femaleYesSet.push(paper.rect(randomXCoord,randomYCoord, 5*(Math.PI/2), 5*(Math.PI/2)).attr({fill:"#F58823"}))
                                } else if (data[i][1] == "No" || data[i][1] == "N/A") {
                                        femaleNoSet.push(paper.rect(randomXCoord,randomYCoord, 5*(Math.PI/2), 5*(Math.PI/2)).attr({fill:"#918070"}))
                                }
                        }
        
                } else {
                        for (h = 0; h < arrayCount; h++) {
                                if (data[i][h] == "1") {
                                        currentxArray.push(xcoordArray[h])
                                        currentyArray.push(ycoordArray[h])
                                }
                        }
                        currentLength = currentxArray.length
                        totalxCoords = 0
                        totalyCoords = 0
                        for (t = 0; t < currentLength; t++) {
                                totalxCoords += currentxArray[t]
                                totalyCoords += currentyArray[t]
                        }
                        avgxCoord = totalxCoords/currentLength
                        avgyCoord = totalyCoords/currentLength
                        currentLength2 = currentLength*1.5
                        newRadius = ((frameMaxRadius-20)/currentLength)
                        newRadiiArray.push(newRadius)
                        theta = Math.atan2(avgyCoord - canvasHeight/2, avgxCoord - canvasWidth/2)
                        avgxCoord = canvasWidth/2 + newRadius*Math.cos(theta)
                        avgyCoord = canvasHeight/2 + newRadius*Math.sin(theta)
                        if (data[i][0] == "Male") {
                                if (data[i][1] == "Yes") {
                                        maleYesSet.push(paper.circle(avgxCoord,avgyCoord, currentLength2).attr({fill:"#F58823"}))
                                        for (p = 0; p < currentLength; p++) {                
                                                linesMYSet.push(
                                                        paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".2"})
                                                )
                                        }
                                } else if (data[i][1] == "No" || data[i][1] == "N/A") {
                                        maleNoSet.push(paper.circle(avgxCoord,avgyCoord, currentLength2).attr({fill:"#918070"}))
                                        for (p = 0; p < currentLength; p++) {                
                                                linesMNSet.push(
                                                        paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".2"})
                                                )
                                        }
                                }
                        } else if (data[i][0] == "Female") {
                                if (data[i][1] == "Yes") {
                                        femaleYesSet.push(paper.rect(avgxCoord-((currentLength2*(Math.PI/2))/2),avgyCoord-((currentLength2*(Math.PI/2))/2), currentLength2*(Math.PI/2), currentLength2*(Math.PI/2)).attr({fill:"#F58823"}))
                                        for (p = 0; p < currentLength; p++) {                
                                                linesFYSet.push(
                                                        paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".2"})
                                                )
                                        }
                                } else if (data[i][1] == "No" || data[i][1] == "N/A") {
                                        femaleNoSet.push(paper.rect(avgxCoord-((currentLength2*(Math.PI/2))/2),avgyCoord-((currentLength2*(Math.PI/2))/2), currentLength2*(Math.PI/2), currentLength2*(Math.PI/2)).attr({fill:"#918070"}))
                                        for (p = 0; p < currentLength; p++) {                
                                                linesFNSet.push(
                                                        paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".2"})
                                                )
                                        }
                                } 
                        }
        
                        
                }
        }

        yesSet.push(maleYesSet, femaleYesSet);
        noSet.push(maleNoSet, femaleNoSet);
        maleSet.push(maleYesSet, maleNoSet);
        femaleSet.push(femaleYesSet, femaleNoSet);
        linesSet.push(linesMYSet, linesMNSet, linesFYSet, linesFNSet);
        linesMaleSet.push(linesMYSet, linesMNSet);
        linesFemaleSet.push(linesFYSet, linesFNSet);
        allSet.push(maleSet, femaleSet)

        allSet.attr({stroke:"none"})
        
        yesSet.hide()
        noSet.hide()
        maleSet.hide()
        femaleSet.hide()
        linesSet.hide()
        
        paper.circle(10,10,5)
        paper.rect(10-((5*(Math.PI/2))/2),25-(5*(Math.PI/2)/2),5*(Math.PI/2), 5*(Math.PI/2))
        paper.circle(10,40,5).attr({fill:"#F58823", stroke:"none"})
        paper.circle(10,55,5).attr({fill:"#918070", stroke:"none"})
        

        maleText = paper.text(20, 10, "Males").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
        maleText.hover(function() {
                allSet.hide()
                maleSet.show()
                linesSet.hide()
        },
        function () {
                    maleSet.hide()
                allSet.hide()
                maleCheck = false
                femaleCheck = false
                yesCheck = false
                noCheck = false
                checkAll("Elementz", false)
          }
        );
        femaleText = paper.text(20, 25, "Females").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
        femaleText.hover(function() {
                allSet.hide()
                femaleSet.show()
                linesSet.hide()
        },
        function () {
                    femaleSet.hide()
                allSet.hide()
                maleCheck = false
                femaleCheck = false
                yesCheck = false
                noCheck = false
                checkAll("Elementz", false)
          }
        );
        yesText = paper.text(20, 40, "Revenue: Yes").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
        yesText.hover(function() {
                allSet.hide()
                yesSet.show()
                linesSet.hide()
        },
        function () {
                    yesSet.hide()
                allSet.hide()
                maleCheck = false
                femaleCheck = false
                yesCheck = false
                noCheck = false
                checkAll("Elementz", false)
          }
        );
        noText = paper.text(20, 55, "Revenue: No, N/A").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
        noText.hover(function() {
                allSet.hide()
                noSet.show()
                linesSet.hide()
        },
        function () {
                    noSet.hide()
                allSet.hide()
                maleCheck = false
                femaleCheck = false
                yesCheck = false
                noCheck = false
                checkAll("Elementz", false)
          }
        );
        $('#yearbutton_radio').click(function (e) {yearClick(e);});
}

maleCheck = false
femaleCheck = false
yesCheck = false
noCheck = false
lineTarget = undefined

function yearClick(e) {
        whatisThis = e.target
        var thisElement = e.target.value
        if (thisElement == "Males") {
                if (e.target.checked) {
                        maleCheck = true
                        if (yesCheck == true) {
                                maleYesSet.show()
                        }
                        if (noCheck == true) {
                                maleNoSet.show()
                        }
                } else {
                        maleCheck = false
                        maleSet.hide()
                }
        }
        if (thisElement == "Females") {
                if (e.target.checked) {
                        femaleCheck = true
                        if (yesCheck == true) {
                                femaleYesSet.show()
                        }
                        if (noCheck == true) {
                                femaleNoSet.show()
                        }
                } else {
                        femaleCheck = false
                        femaleSet.hide()
                }
        }
        if (thisElement == "Revenue: Yes") {
                if (e.target.checked) {
                        yesCheck = true
                        if (maleCheck == true) {
                                maleYesSet.show()
                        }
                        if (femaleCheck == true) {
                                femaleYesSet.show()
                        }
                } else {
                        yesCheck = false
                        yesSet.hide()
                }
        }
        if (thisElement == "Revenue: No, N/A") {
                if (e.target.checked) {
                        noCheck = true
                        if (maleCheck == true) {
                                maleNoSet.show()
                        }
                        if (femaleCheck == true) {
                                femaleNoSet.show()
                        }
                } else {
                        noCheck = false
                        noSet.hide()
                }
        }
        if (thisElement == "Connection Lines") {
                lineTarget = e.target
        }
        if (lineTarget != undefined) {
                checkLines()
        }
}

function checkLines() {
        if (lineTarget.checked) {
                if (maleCheck == true) {
                        if (yesCheck == true) {
                                linesMYSet.show()
                        } else {
                                linesMYSet.hide()
                        }
                        if (noCheck == true) {
                                linesMNSet.show()
                        } else {
                                linesMNSet.hide()
                        }
                } else {
                        linesMaleSet.hide()
                }
                if (femaleCheck == true) {
                        if (yesCheck == true) {
                                linesFYSet.show()
                        } else {
                                linesFYSet.hide()
                        }
                        if (noCheck == true) {
                                linesFNSet.show()
                        } else {
                                linesFNSet.hide()
                        }
                } else {
                        linesFemaleSet.hide()
                }
        } else {
                linesSet.hide()
        }
}

function checkAll(formname, checktoggle)
{
  var checkboxes = new Array(); 
  checkboxes = document[formname].getElementsByTagName('input');
 
  for (var i=0; i<checkboxes.length; i++)  {
    if (checkboxes[i].type == 'checkbox')   {
      checkboxes[i].checked = checktoggle;
    }
  }
}
