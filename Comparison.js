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

$(document).ready(function () {runProgram()});

function runProgram() {
    paper = new Raphael(document.getElementById('canvas_container'), canvasWidth, canvasHeight);  
    jQuery.getJSON("FT_1MC_Comparison.js", function (data)
    {drawNetwork(data)});       
}  


function drawNetwork(data) {
        
    1MCset = paper.set();
    FTset = paper.set();
    linesFTSet = paper.set();
    lines1MCSet = paper.set();
    orgSet = paper.set();
    allSet = paper.set();
    textSet = paper.set();

        


    orgNames = data[0]

    var pathCount = data.length - 1;
    myArray = data[pathCount]

    arrayCount = myArray.length

    myArrayMax = myArray[arrayCount-1]

    slots = canvasWidth/(arrayCount-2)
    midY = canvasHeight/2
    midX = canvasWidth/2

    org.push(paper.circle(midX, midY+(canvasHeight/3), myArrayMax*2))
    textSet.push(paper.text(midX, midY+(canvasHeight/3)+myArrayMax, myArrayMax*2))
    1MCy = midY+(canvasHeight/3)
    org.push(paper.circle(midX, midY-(canvasHeight/3), myArrayMax*2))
    textSet.push(paper.text(midX, midY-(canvasHeight/3)-myArrayMax, myArrayMax*2))
    FTy = midY-(canvasHeight/3)

    count = 0

    xcoordArray = []
    ycoordArray = []
    radiiArray = []

    for (i = 2; i < arrayCount; i++) {
        h = myArray[i]
        radius = h*2

        count += 1
        xcoord = (slots*count)-(radius*2)          

        orgSet.push(paper.circle(xcoord, midY, radius))
        textSet.push(paper.text(xcoord, midY+radius, orgNames[i]))

        xcoordArray.push(xcoord)
        ycoordArray.push(midY)

    }

        
    textSet.attr({"font-weight":"450", "font-size":12, fill:"#FF6620", "font-family":"Arial"})
    orgSet.attr({stroke:0}).glow({width:3, color:"#5b5a59"})

    for (i = 1; i < pathCount; i++) {
        currentxArray = []
        currentyArray = []
        totalxCoords = midX
        totalyCoords = 0
        currentxArray.push(midX)
        
        if (data[i][0] == "FT") {
            currentyArray.push(FTy)
            totalyCoords += FTy
        } else if (data[i][0] == "1MC") {
            currentyArray.push(1MCy)
            totalyCoords += 1MCy
        }
                


        for (h = 2; h < arrayCount; h++) {
            if (data[i][h] == "1") {
                currentxArray.push(xcoordArray[h-2])
                totalxCoords += xcoordArray[h-2]
                currentyArray.push(ycoordArray[h-2])
                totalyCoords += ycoordArray[h-2]
            }
        }
        currentLength = currentxArray.length
        avgxCoord = totalxCoords/currentLength
        avgyCoord = totalyCoords/currentLength
                        
        if (data[i][0] == "FT") {
            FTset.push(paper.circle(avgxCoord, avgyCoord, currentLength*1.5).attr({fill:"#918070"}))
            for (p = 0; p < currentLength; p++) {                
                linesFTSet.push(
                    paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".2"})
                )
            }
        } else if (data[i][0] == "1MC") {
            1MCset.push(paper.circle(avgxCoord, avgyCoord, currentLength*1.5).attr({fill:"#F58823"}))
            for (p = 0; p < currentLength; p++) {                
                lines1MCSet.push(
                    paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".2"})
                )
            }
        }
    }
  
                        
                       
    linesSet.push(linesFTSet, lines1MCSet);
    allSet.push(FTSet, 1MCSet)

    allSet.attr({stroke:"none"})
        
    1MCSet.hide()
    FTSet.hide()
    linesSet.hide()
        
    paper.circle(10,10,5).attr({fill:"#F58823", stroke:"none"})
    paper.circle(10,25,5).attr({fill:"#918070", stroke:"none"})
        

    1MCText = paper.text(20, 10, "1MC").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
    1MCText.hover(function() {
        allSet.hide()
        1MCSet.show()
        linesSet.hide()
    },
        function () {
            1MCSet.hide()
            allSet.hide()
            1MCCheck = false
            FTCheck = false
            checkAll("Elementz", false)
        }
    );
        
    FTText = paper.text(20, 25, "FT").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
    FTText.hover(function() {
        allSet.hide()
        FTSet.show()
        linesSet.hide()
    },
        function () {
            femaleSet.hide()
            allSet.hide()
            1MCCheck = false
            FTCheck = false
            checkAll("Elementz", false)
        }
    );
        
    $('#yearbutton_radio').click(function (e) {yearClick(e);});
}

1MCCheck = false
FTCheck = false
lineTarget = undefined

function yearClick(e) {
        whatisThis = e.target
        var thisElement = e.target.value
        if (thisElement == "1MC") {
                if (e.target.checked) {
                        1MCCheck = true
                        1MCSet.show()
                } else {
                        1MCheck = false
                        1MCSet.hide()
                }
        }
        if (thisElement == "FT") {
                if (e.target.checked) {
                        FTCheck = true
                        FTSet.show()
                } else {
                        FTCheck = false
                        FTSet.hide()
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
                if (1MCCheck == true) {
                        lines1MCSet.show()
                } else {
                        lines1MCSet.hide()
                }
                if (FTCheck == true) {
                        linesFTSet.show()
                } else {
                        linesFTSet.hide()
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
