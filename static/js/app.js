const bburl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Initial Function
function init() {
    //get JSON data
    d3.json(bburl).then(function (data) {
        console.log(data);
        //Test reading in all data

        let first_id = data.names[0]
        //Get data for all plots

        createChart(data, first_id);
        combobox_load(data.names);
        createMetadata(data, first_id)
    });
};

function optionChanged(id) {
    d3.json(bburl).then(function (data) {
        console.log(data);
        //Test reading in all data


        //Get data for all plots

        createChart(data, id)
        createMetadata(data, id)
    });
}
function combobox_load(names) {
    sel = document.getElementById("selDataset")
    names.forEach(function (name) {
        opt = new Option(name, name);
        sel.appendChild(opt);
    })
};
function createMetadata(data, id) {
    let idx = data.names.indexOf(id);
    let bbmetadata = data.metadata[idx];
    console.log(bbmetadata);

    let Panel = d3.select("#sample-metadata");
    Panel.html("");

    Object.entries(bbmetadata).forEach(function([key, value]) {
        let metadataItems = Panel.append("p");
        metadataItems.text(`${key}: ${value}`);
    });
};


function createChart(data, id) {
    //Assign data to variables
    let idx = data.names.indexOf(id);
    console.log(idx);
    let sample = data.samples[idx];
    let otu_ids = sample.otu_ids;
    let values = sample.sample_values;
    let text = sample.otu_labels;

    //bar chart top ten
    let top_ten_value = values.slice(0, 10).reverse();
    let top_ten_labels = otu_ids.slice(0, 10).reverse();
    let top_ten_text = text.slice(0, 10).reverse();
    console.log(top_ten_value);
    let topTenlabels = top_ten_labels.map(x => `OTU id ${x}`);


    //Bar chart
    let bar_chart = {
        x: top_ten_value,
        y: topTenlabels,
        //labels: top_ten_labels,
        text: top_ten_text,
        type: "bar",
        orientation: "h"
    };
    //Create data array
    let bar_data = [bar_chart];
    //Layout
    let bar_layout = {
        title: "Top ten OTU's"
    };
    // Render the plot
    Plotly.newPlot("bar", bar_data, bar_layout)

    //Bubble chart
    let bubble_chart = {
        x: otu_ids,
        y: values,
        text: text,
        mode: "markers",
        marker:{
            color:otu_ids,
            size: values,
        }
    };
     //Create data array
     let bubble_data = [bubble_chart];
     //Layout
     let bubble_layout = {
         title: "Bacteria per sample"
     };
     // Render the plot
     Plotly.newPlot("bubble", bubble_data, bubble_layout)


};






init();



