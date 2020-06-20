//Utilities

let values = [];
let w = 10;
let states = [];

genereateArray = () => {
    values = new Array(floor(width / w));
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }
}

var speedValue = 0;
function setSpeed() {
    var speed = document.getElementById("speedValue");
    speedValue = speed.value;
}


async function swap(arr, a, b) {
    await sleep(110 - speedValue);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

///////////

function doQuickSort() {
    quickSort(values, 0, values.length - 1);
}

function doBubbleSort() {
    bubbleSort(values);
}

function doSelectionSort() {
    selectionSort(values);
}

function setup() {
    createCanvas(1000, 600);
    genereateArray();
}

//Quick Sort
async function quickSort(arr, start, end) {
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
        states[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swap(arr, i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(arr, pivotIndex, end);
    return pivotIndex;
}

// End Quick Sort

//Bubble Sort
async function bubbleSort(unsorted) {
    for (let i = 0; i < unsorted.length; i++) {
        states[i] = 1;
    }
    for (let i = 0; i < unsorted.length; i++) {
        for (let j = 0; j < unsorted.length - i; j++) {
            var a = unsorted[j];
            var b = unsorted[j + 1];
            if (a > b) {
                states[j] = 0;
                states[j + 1] = 0;
                await swap(unsorted, j, j + 1);
                states[j] = -1;
                states[j + 1] = -1;
            }
        }
    }
}
//End Bubble Sort

//Selection sort
function selectionSort(unsorted) {
    for (let i = 0; i < unsorted.length; i++) {
        var minIndex = i;
        for (let j = i+1; j < unsorted.length; j++) {
            if (unsorted[j] < unsorted[minIndex]) {
                minIndex = j;
            }
        }
        if (i!= minIndex) {
            swap(unsorted, i, minIndex);
        }
    }
}
//End selection sort

function draw() {
    background("white");
    for (let i = 0; i < values.length; i++) {
        stroke('grey');
        strokeWeight(1);
        if (states[i] == 0) {
            fill('#ff847c');
        } else if (states[i] == 1) {
            fill('#b2d3e7');
        } else {
            fill('#8cf18b');
        }
        rect(i * w, height - values[i], w, values[i]);
    }

}

