let all = document.querySelectorAll(".sec");
let list = document.getElementById("list");

let addItems = JSON.parse(localStorage.getItem("list")) || [];

function loadcart(){
    list.innerHTML = "";
    addItems.forEach((item)=>{
        let li = document.createElement("li");
        li.innerHTML = item;

        let delBtn = document.createElement("button");
        delBtn.innerHTML = "❌";
        delBtn.addEventListener("click", (e)=>{
            e.preventDefault();

            li.classList.add("removed");

            setInterval(()=>{
                addItems = addItems.filter(i => i !== item);
                localStorage.setItem("list", JSON.stringify(addItems));
                li.remove();
            }, 300);
        })

        li.appendChild(delBtn);
        list.appendChild(li);
    })
}
loadcart();

all.forEach((s)=>{
    s.addEventListener("click", (e)=>{
        
        if(e.target.classList.contains("add")){
            e.preventDefault();
            let name = s.querySelectorAll("p")[0].innerText;
            let price = s.querySelectorAll("p")[1].innerText;
            let product = `${name} با ${price}` ;

            if(addItems.includes(product)){
                alert(" این محصول قبلا اضافه شده");
                return;
            }
            addItems.push(product);

            let li = document.createElement("li");
            li.innerHTML = product;
            list.appendChild(li);  

            localStorage.setItem("list", JSON.stringify(addItems));
            loadcart();
        }
    })
})

let cl = document.getElementById("cl");
cl.addEventListener("click", (e)=>{
    e.preventDefault();
    localStorage.removeItem("list");
    list.innerHTML = "";
    addItems = [];
})
