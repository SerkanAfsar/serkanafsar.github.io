const ws = new WebSocket('wss://nc.ciner.com.tr/sub/dot');
const wrapper = document.getElementById('wrapper');

let arr = [];


ws.addEventListener('open', (event) => {
    console.log(event);
    console.log("bağlandı");
});

ws.addEventListener('close', (event) => {
    console.log(event);
})

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    addData(data);
    console.log(data);

});
ws.addEventListener('error', (error) => {
    console.log("Error Accoured", error);
})

const addData = (data) => {
    const index = arr.findIndex(a => a.SecuritySlug == data.SecuritySlug);
    if (index === -1) {
        arr.push(data);
    }
    else {
        arr[index] = data;
    }
    createElem(index, data);
}

const createElem = (index, item) => {
    if (index == -1) {
        const elem = document.createElement("div");
        elem.className = "col-md-6 col-sm-12 col-xs-12 col-lg-3 mb-4";
        elem.innerHTML = createCard(item);
        wrapper.appendChild(elem);

    }
    else {
        const elem = wrapper.childNodes[index + 1];
        elem.innerHTML = createCard(item);
        elem.classList.add("deneme");
        setTimeout(() => {
            elem.classList.remove("deneme");
        }, 700);
    }

}

const createCard = (item) => {
    return `
    <div class="card">
        <div class="card-body">
            <div class="left">
                <h5 class="card-title">${item.SecuritySlug.split('-').join(" ")}</h5>
                <p class="card-text">
                    <span>${item.LastPrice}</span>
                    <b>${item.PercentChange}</b>
                </p>
            </div>
            <div class="right">
            ${item.ChangeDirection == 1 ? '<i class="fa-solid fa-circle-arrow-up"></i>' : '<i class="fa-solid fa-circle-arrow-down"></i>'}
            </div>
        </div>
    </div>
    `
}


