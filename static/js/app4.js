startTheShow();

function optionChanged(belly){
    var newBelly = belly;
    pie(newBelly);
    bubble(newBelly);
    metaData(newBelly);
}

function startTheShow(){
    dropDown();
    var firstNum = 940;
    pie(firstNum);
    bubble(firstNum); 
    metaData(firstNum);

}

function metaData(newBelly){
    var url = "/metadata/" + newBelly;
    d3.json(url).then(function(metaData){
        console.log(metaData);
        var meta = d3.select("#sample-metadata");
        meta.html("");
        Object.keys(metaData).forEach((key)=>{
            meta.append("text").html(key+": "+ metaData[key]).append("br");

        });
/*
AGE: 24
BBTYPE: "I"
ETHNICITY: "Caucasian"
GENDER: "F"
LOCATION: "Beaufort/NC"
WFREQ: 2
sample: 940
*/







    });

}


function dropDown(){
    var url = "/names";

    d3.json(url).then(function(names){
        //console.log(names);
        d3.select("#selDataset")
            .selectAll("option")
            .data(names)
            .enter()
            .append("option")
            .text(function (d) {
                return d;
            }).attr("value", function(d) {
                return d;
            });
    
    }); 

}


function pie(newBelly){
    var pieDiv = document.getElementById("pie");
    var url = "/samples/" + newBelly;
    
    d3.json(url).then(function(sampleData){
       // console.log(sampleData);
        //console.log(sampleData.sample_values);
        //console.log(sampleData.otu_ids);
        //console.log(sampleData.otu_labels);
        
        var lableSlice = sampleData.otu_labels.slice(0,10);
        var idSlice = sampleData.otu_ids.slice(0,10);
        
        var traceA = {
        type: "pie",
        values: sampleData.sample_values.slice(0,10),
        labels: idSlice,
        text: lableSlice,
        textinfo: "percent",
        hoverinfo: "label+text+value+percent"

        };
        
        var data = [traceA];
        
        var layout = {
        title: "Pie Belly Top Ten"
        };
        
        Plotly.newPlot(pieDiv, data, layout);
    });
}

function bubble(newBelly){
    var bubbleDiv = document.getElementById("bubble");
    var url = "/samples/" + newBelly;
    
    d3.json(url).then(function(sampleData){
        //console.log(sampleData);
        //console.log(sampleData.sample_values);
       // console.log(sampleData.otu_ids);
        //console.log(sampleData.otu_labels);
        
          var traceA = {
          type: "scatter",
          mode: "markers",
          x: sampleData.otu_ids,
          y: sampleData.sample_values,
          text: sampleData.otu_labels,
          marker: {
            size: sampleData.sample_values,
            color: sampleData.otu_ids
            
          }
        };
         
        var data = [traceA];
         
        var layout = {
          title: "A Belly Bubble Chart"
        };
         
        Plotly.plot(bubbleDiv, data, layout);
       



    });
}