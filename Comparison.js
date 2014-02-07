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
var ourRadius = 5

$(document).ready(function () {runProgram()});

function runProgram() {
    paper = new Raphael(document.getElementById('canvas_container'), canvasWidth, canvasHeight);  
    jQuery.getJSON("FT_1MC_Comparison.js", function (data)
    {drawNetwork(data)});       
}  


function drawNetwork(data) {
        
    oneMCSet = paper.set();
    FTSet = paper.set();
    linesFTSet = paper.set();
    linesoneMCSet = paper.set();
    linesSet = paper.set()
    orgSet = paper.set();
    allSet = paper.set();
    textSet = paper.set();     


    orgNames = data[0]

    var pathCount = data.length - 1;
    myArray = data[pathCount]

    arrayCount = myArray.length

    myArrayMax = myArray[arrayCount-1]

    slots = canvasWidth/(arrayCount-2+1)
    midY = canvasHeight/2
    midX = canvasWidth/2

    orgSet.push(paper.circle(midX, midY+(canvasHeight/3), myArrayMax*2))
    textSet.push(paper.text(midX, midY+(canvasHeight/3)+(myArrayMax*2+10), "1MC"))
    oneMCy = midY+(canvasHeight/3)
    orgSet.push(paper.circle(midX, midY-(canvasHeight/3), myArrayMax*2))
    textSet.push(paper.text(midX, midY-(canvasHeight/3)-(myArrayMax*2+10), "FT"))
    FTy = midY-(canvasHeight/3)

    

    xcoordArray = []
    ycoordArray = []
    radiiArray = []

    count = 0

    // for (i = 2; i < arrayCount; i++) {
    //     h = myArray[i]
    //     radius = h*2

    //     count += 1
    //     xcoord = (slots*count)          

    //     orgSet.push(paper.circle(xcoord, midY, radius))
    //     textSet.push(paper.text(xcoord, midY+radius+10, orgNames[i]))

    //     xcoordArray.push(xcoord)
    //     ycoordArray.push(midY)

    // }

    orgSet.push(paper.circle(slots, midY+(1/2*midY), radius))
    textSet.push(paper.text(slots, midY+(1/2*midY)+radius+10, orgnames[2]))
    xcoordArray.push(slots)
    ycoordArray.push(midY+(1/2*midY))

    orgSet.push(paper.circle(slots*3, midY-(1/2*midY), radius))
    textSet.push(paper.text(slots*3, midY-(1/2*midY)-radius-10, orgnames[3]))
    xcoordArray.push(slots*3)
    ycoordArray.push(midY-(1/2*midY))

    orgSet.push(paper.circle(slots*3, midY+(1/2*midY), radius))
    textSet.push(paper.text(slots*3, midY+(1/2*midY)+radius+10, orgnames[4]))
    xcoordArray.push(slots*3)
    ycoordArray.push(midY+(1/2*midY))
        
    textSet.attr({"font-weight":"450", "font-size":12, fill:"#FF6620", "font-family":"Arial"})
    orgSet.attr({stroke:0}).glow({width:3, color:"#5b5a59"})

    masterxArray = []
    masteryArray = []
    masterCirclePackingArray = []
    layerArray = []

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
            currentyArray.push(oneMCy)
            totalyCoords += oneMCy
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

        masterLength = masterxArray.length

        for (x = 0; x < masterLength; x++) {
            if (avgxCoord == masterxArray[x] && avgyCoord == masteryArray[x]) {
                
                masterCirclePackingArray[x] += 1

                radiusModifier = Math.floor((masterCirclePackingArray[x]-1)/6)*.5+1
                layer = Math.floor((masterCirclePackingArray[x]-1)/6)+1
                layerArray.push(layer)
                if (layer%2 == 1) {
                    avgxCoord += ((ourRadius*radiusModifier*1.5)*Math.cos((Math.PI/180)*(60*(masterCirclePackingArray[x]%6))))
                    avgyCoord += ((ourRadius*radiusModifier*1.5)*Math.sin((Math.PI/180)*(60*(masterCirclePackingArray[x]%6))))
                }
                else if (layer%2 == 0) {
                    avgxCoord += ((ourRadius*radiusModifier*1.5)*Math.cos((Math.PI/180)*(60*(masterCirclePackingArray[x]%6)+30)))
                    avgyCoord += ((ourRadius*radiusModifier*1.5)*Math.sin((Math.PI/180)*(60*(masterCirclePackingArray[x]%6)+30)))
                }
                
            }
        }
        masterxArray.push(avgxCoord)
        masteryArray.push(avgyCoord)
        masterCirclePackingArray.push(0)
                        
        if (data[i][0] == "FT") {
            FTSet.push(paper.circle(avgxCoord, avgyCoord, ourRadius).attr({fill:"#918070"})).toBack()
            for (p = 0; p < currentLength; p++) {                
                linesFTSet.push(
                    paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".5", "stroke-dasharray":"--"})
                )
            }
        } else if (data[i][0] == "1MC") {
            oneMCSet.push(paper.circle(avgxCoord, avgyCoord, ourRadius).attr({fill:"#F58823"})).toBack()
            for (p = 0; p < currentLength; p++) {                
                linesoneMCSet.push(
                    paper.path("M"+avgxCoord+" "+avgyCoord+"L"+currentxArray[p]+" "+currentyArray[p]).attr({"stroke-width": ".4"})
                )
            }
        }
    }
  
                        
                       
    linesSet.push(linesFTSet, linesoneMCSet);
    allSet.push(FTSet, oneMCSet)

    allSet.attr({stroke:"#FFFFFF", "stroke-width":".3"})
        
    oneMCSet.hide()
    FTSet.hide()
    linesSet.hide()
        
    paper.circle(10,10,5).attr({fill:"#F58823", stroke:"none"})
    paper.circle(10,25,5).attr({fill:"#918070", stroke:"none"})
        

    oneMCtext = paper.text(20, 10, "1MC").attr({"font-weight":"450", "font-family": "Arial", "font-size":14, fill:"#FF6620", 'text-anchor':"start"})
    oneMCtext.hover(function() {
        allSet.hide()
        oneMCSet.show()
        linesSet.hide()
    },
        function () {
            oneMCSet.hide()
            allSet.hide()
            oneMCcheck = false
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
            allSet.hide()
            oneMCcheck = false
            FTCheck = false
            checkAll("Elementz", false)
        }
    );
        
    $('#yearbutton_radio').click(function (e) {yearClick(e);});
}

oneMCcheck = false
FTCheck = false
lineTarget = undefined

function yearClick(e) {
        whatisThis = e.target
        var thisElement = e.target.value
        if (thisElement == "1MC") {
                if (e.target.checked) {
                        oneMCcheck = true
                        oneMCSet.show()
                } else {
                        oneMCcheck = false
                        oneMCSet.hide()
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
                if (oneMCcheck == true) {
                        linesoneMCSet.show()
                } else {
                        linesoneMCSet.hide()
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
