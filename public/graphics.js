// Socket.IO connection
const socket=io();

socket.on('connect', () => {
    console.log('Graphics.js Connected to server');
});

/*-------------------------------------------------------------------------------------------*/
// Gauge 1-COP

const gaugeElement = document.querySelector(".COPgauge");

function setGaugeValue(gauge, COP) { // Change the variable name to 'COP'
    if (COP < 0) {
        COP = 0;
    }

    if (COP > 7) {
        COP = 7;
    }

    const COPString = Number(COP).toPrecision(2);
    const trimmedCOPString = COPString.replace(/\.?0+$/, '');

    gauge.querySelector(".gauge__fill").style.transform = `rotate(${COP / 14}turn)`;
    gauge.querySelector(".gauge__cover").textContent = `COP: ${trimmedCOPString}`;
}

/*-------------------------------------------------------------------------------------------*/
// Gauge2-SCOP

const gauge2Element = document.querySelector(".SCOPgauge");

function setGauge2Value(gauge2, SCOP) { // Change the variable name to 'SCOP'
    if (SCOP < 0) {
        SCOP = 0;
    }

    if (SCOP > 7) {
        SCOP = 7;
    }

    const SCOPString = Number(SCOP).toPrecision(2);
    const trimmedSCOPString = SCOPString.replace(/\.?0+$/, '');

    gauge2.querySelector(".gauge2__fill").style.transform = `rotate(${SCOP / 14}turn)`;
    gauge2.querySelector(".gauge2__cover").textContent = `SCOP: ${trimmedSCOPString}`;
}

/*-------------------------------------------------------------------------------------------*/
//Thermometer 1 - Flow Temperature

const thermoElement = document.querySelector(".flow__thermometer");

function setThermoValue(thermometer, Flow_Temperature) { // Change the variable name to 'Flow_Temperature'
    if (Flow_Temperature < 20) {
        Flow_Temperature = 20;
    }

    if (Flow_Temperature > 65) {
        Flow_Temperature = 65;
    }

    const Flow_TemperatureString = Number(Flow_Temperature).toPrecision(2);
    const trimmedFlow_TemperatureString = Flow_TemperatureString.replace(/\.?0+$/, '');

    thermometer.querySelector(".temp__bar").style.transform = `translate(-50%, 0) scaleY(${Flow_Temperature / 65})`;
    thermometer.querySelector(".temp__cover").style.transform = `translateY(${- Flow_Temperature * 340 / 65}px)`;
    thermometer.querySelector(".temp__cover").textContent = `Flow Temp.\ ${trimmedFlow_TemperatureString}\u00B0C`;
}

/*-------------------------------------------------------------------------------------------*/
//Thermometer 2 - Ground Temperature

const thermo2Element = document.querySelector(".ground__thermometer");

function setThermo2Value(thermometer2, Ground_Temperature) { // Change the variable name to 'Flow_Temperature'
    if (Ground_Temperature < -5) {
        Ground_Temperature = -5;
    }

    if (Ground_Temperature > 25) {
        Ground_Temperature = 25;
    }

    const Ground_TemperatureString = Number(Ground_Temperature).toPrecision(2);
    const trimmedGround_TemperatureString = Ground_TemperatureString.replace(/\.?0+$/, '');

    thermometer2.querySelector(".temp2__bar").style.transform = `translate(-50%, 0) scaleY(${(Ground_Temperature+20) / 45})`;
    thermometer2.querySelector(".temp2__cover").style.transform = `translateY(${- (Ground_Temperature + 20) * 340 / 45}px)`;
    thermometer2.querySelector(".temp2__cover").textContent = `Ground Temp.\ ${trimmedGround_TemperatureString}\u00B0C`;
}

/*-------------------------------------------------------------------------------------------*/
//Trees

const treeElement = document.querySelector(".tree__container");

function setTreeValue(tree, Tree) { // Change the variable name to 'Tree'

    //const TreeString = Number(Tree).toPrecision(3);
    //const trimmedTreeString = TreeString.replace(/\.?0+$/, '');
    const formattedNumber = Tree.toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0,
    });

    tree.querySelector(".tree__txt").textContent = `Carbon Offset in Trees: ${formattedNumber}`;
}

/*-------------------------------------------------------------------------------------------*/
//Running Status

const statusElement = document.querySelector(".status__container");
const statusText = document.querySelector(".status__txt").textContent = `Running Status:`;

function setStatusValue(Status) {
    const statusImage = document.getElementById("statusImage");

    if (Status === 1) {
        statusImage.src = "/heat-wave.png";
        statusImage.alt = "Image 1";

    } else if (Status === 0) {
        statusImage.src = "/snowflake.png";
        statusImage.alt = "Image 2";
    }
}


/*-------------------------------------------------------------------------------------------*/



// Receive Live data from the server and update gauges and thermometer
socket.on('liveData', (data_to_send) => {
    if (data_to_send) {
        //console.log('Received data:', data_to_send); // Log the received data to the console
        const { COP, SCOP, Flow_Temperature, Ground_Temperature, Tree, Status } = data_to_send; // Assuming the data_to_send is an object with properties 'COP', 'SCOP', 'Flow_Temperature', and 'Tree'
        setGaugeValue(gaugeElement, COP);
        setGauge2Value(gauge2Element, SCOP);
        setThermoValue(thermoElement, Flow_Temperature);
        setThermo2Value(thermo2Element, Ground_Temperature);
        setTreeValue(treeElement, Tree);
        setStatusValue(Status);
    }
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});